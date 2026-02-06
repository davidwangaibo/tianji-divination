import React, { useMemo, useState, useEffect, useRef } from 'react';

const BUILDINGS = [
  { key: 'power', name: '发电站', cost: 120, power: 20, income: 0, pop: 0 },
  { key: 'refinery', name: '采矿场', cost: 150, power: -5, income: 60, pop: 0 },
  { key: 'barracks', name: '兵营', cost: 140, power: -5, income: 0, pop: 5 },
  { key: 'factory', name: '战车工厂', cost: 220, power: -10, income: 0, pop: 10 },
  { key: 'lab', name: '科技中心', cost: 260, power: -12, income: 0, pop: 0 },
];

const UNITS = [
  { key: 'infantry', name: '步兵', cost: 50, power: -2, pop: 1, attack: 2 },
  { key: 'tank', name: '坦克', cost: 120, power: -6, pop: 2, attack: 6 },
  { key: 'artillery', name: '火炮', cost: 160, power: -8, pop: 2, attack: 8 },
];

const UPGRADE_BASE_COST = 180;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const calcAttackPower = (
  units: Record<string, number>,
  upgrades: { weapon: number; commander: number },
  penaltyMultiplier: number
) => {
  const base = UNITS.reduce((sum, unit) => sum + unit.attack * (units[unit.key] || 0), 0);
  const weaponBonus = 1 + upgrades.weapon * 0.15;
  const commanderBonus = 1 + upgrades.commander * 0.1;
  return Math.max(0, Math.floor(base * weaponBonus * commanderBonus * penaltyMultiplier));
};

const calcDefenseMultiplier = (armorLevel: number) => 1 - clamp(armorLevel * 0.08, 0, 0.4);

const makeInitialState = () => ({
  credits: 500,
  baseHp: 1000,
  round: 1,
  buildings: { power: 1, refinery: 1, barracks: 1, factory: 0, lab: 0 },
  units: { infantry: 4, tank: 0, artillery: 0 },
  upgrades: { weapon: 0, armor: 0, commander: 0 },
});

type GameState = ReturnType<typeof makeInitialState>;

type LogEntry = { id: string; text: string };

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

const buildKeyMap = (items: { key: string }[]) =>
  items.reduce<Record<string, true>>((acc, item) => {
    acc[item.key] = true;
    return acc;
  }, {});

const buildingKeys = buildKeyMap(BUILDINGS);

const unitKeys = buildKeyMap(UNITS);

const canProduceUnit = (state: GameState, unitKey: string) => {
  if (unitKey === 'infantry') return state.buildings.barracks > 0;
  if (unitKey === 'tank') return state.buildings.factory > 0;
  if (unitKey === 'artillery') return state.buildings.lab > 0;
  return false;
};

const getUpgradeCap = (state: GameState) => (state.buildings.lab > 0 ? 5 : 3);

const calculateEconomy = (state: GameState) => {
  const basePower = 50;
  const basePop = 10;
  const power = BUILDINGS.reduce(
    (total, building) => total + (state.buildings[building.key] || 0) * building.power,
    basePower
  );
  const pop = BUILDINGS.reduce(
    (total, building) => total + (state.buildings[building.key] || 0) * building.pop,
    basePop
  );
  const income = 100 +
    BUILDINGS.reduce(
      (total, building) => total + (state.buildings[building.key] || 0) * building.income,
      0
    );

  const usedPower = BUILDINGS.reduce(
    (total, building) => total + (state.buildings[building.key] || 0) * Math.min(0, building.power),
    0
  ) +
    UNITS.reduce(
      (total, unit) => total + (state.units[unit.key] || 0) * unit.power,
      0
    );

  const usedPop = UNITS.reduce((total, unit) => total + (state.units[unit.key] || 0) * unit.pop, 0);

  return {
    income,
    powerCap: power,
    popCap: pop,
    usedPower: Math.abs(usedPower),
    usedPop,
  };
};

const applyEconomyTick = (state: GameState) => {
  const economy = calculateEconomy(state);
  return {
    ...state,
    credits: state.credits + economy.income,
    round: state.round + 1,
  };
};

const WarGame: React.FC = () => {
  const [mode, setMode] = useState<'offline' | 'online'>('offline');
  const [player, setPlayer] = useState<GameState>(makeInitialState());
  const [enemy, setEnemy] = useState<GameState>(() => ({
    ...makeInitialState(),
    buildings: { power: 1, refinery: 1, barracks: 1, factory: 1, lab: 0 },
    units: { infantry: 3, tank: 2, artillery: 0 },
  }));
  const [log, setLog] = useState<LogEntry[]>([]);
  const [serverUrl, setServerUrl] = useState('wss://echo.websocket.events');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [remoteState, setRemoteState] = useState<GameState | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const playerEconomy = useMemo(() => calculateEconomy(player), [player]);
  const enemyEconomy = useMemo(() => calculateEconomy(enemy), [enemy]);

  const playerPenalty = playerEconomy.usedPower > playerEconomy.powerCap ? 0.75 : 1;
  const enemyPenalty = enemyEconomy.usedPower > enemyEconomy.powerCap ? 0.75 : 1;

  const playerAttack = useMemo(
    () => calcAttackPower(player.units, player.upgrades, playerPenalty),
    [player.units, player.upgrades, playerPenalty]
  );
  const enemyAttack = useMemo(
    () => calcAttackPower(enemy.units, enemy.upgrades, enemyPenalty),
    [enemy.units, enemy.upgrades, enemyPenalty]
  );

  const pushLog = (text: string) => {
    setLog((prev) => [{ id: `${Date.now()}-${Math.random()}`, text }, ...prev].slice(0, 10));
  };

  const updatePlayer = (updater: (state: GameState) => GameState) => {
    setPlayer((prev) => updater(prev));
  };

  const updateEnemy = (updater: (state: GameState) => GameState) => {
    setEnemy((prev) => updater(prev));
  };

  const buildBuilding = (key: string) => {
    if (!buildingKeys[key]) return;
    const building = BUILDINGS.find((item) => item.key === key);
    if (!building) return;
    updatePlayer((state) => {
      if (state.credits < building.cost) return state;
      return {
        ...state,
        credits: state.credits - building.cost,
        buildings: { ...state.buildings, [key]: (state.buildings[key] || 0) + 1 },
      };
    });
    pushLog(`建造 ${building.name}。`);
  };

  const trainUnit = (key: string) => {
    if (!unitKeys[key]) return;
    const unit = UNITS.find((item) => item.key === key);
    if (!unit || !canProduceUnit(player, key)) return;
    updatePlayer((state) => {
      const economy = calculateEconomy(state);
      if (state.credits < unit.cost) return state;
      if (economy.usedPop + unit.pop > economy.popCap) return state;
      return {
        ...state,
        credits: state.credits - unit.cost,
        units: { ...state.units, [key]: (state.units[key] || 0) + 1 },
      };
    });
    pushLog(`训练 ${unit.name}。`);
  };

  const upgrade = (key: 'weapon' | 'armor' | 'commander') => {
    updatePlayer((state) => {
      const cap = getUpgradeCap(state);
      if (state.upgrades[key] >= cap) return state;
      const cost = UPGRADE_BASE_COST + state.upgrades[key] * 120;
      if (state.credits < cost) return state;
      return {
        ...state,
        credits: state.credits - cost,
        upgrades: { ...state.upgrades, [key]: state.upgrades[key] + 1 },
      };
    });
    pushLog(`升级 ${key === 'weapon' ? '武器' : key === 'armor' ? '护甲' : '指挥官'}。`);
  };

  const nextRound = () => {
    updatePlayer((state) => applyEconomyTick(state));
    if (mode === 'offline') {
      updateEnemy((state) => applyEconomyTick(state));
      aiDecision();
    }
    pushLog('进入下一回合，资源已补给。');
  };

  const resolveAttack = () => {
    const damageToEnemy = Math.floor(playerAttack * calcDefenseMultiplier(enemy.upgrades.armor));
    const damageToPlayer = Math.floor(enemyAttack * calcDefenseMultiplier(player.upgrades.armor));

    updateEnemy((state) => ({
      ...state,
      baseHp: clamp(state.baseHp - damageToEnemy, 0, 1000),
    }));
    updatePlayer((state) => ({
      ...state,
      baseHp: clamp(state.baseHp - damageToPlayer, 0, 1000),
    }));

    pushLog(`我方造成 ${damageToEnemy} 伤害，敌方造成 ${damageToPlayer} 伤害。`);

    if (mode === 'offline') {
      aiDecision();
    } else {
      sendPayload({ type: 'attack', payload: { damageToEnemy, damageToPlayer } });
    }
  };

  const aiDecision = () => {
    updateEnemy((state) => {
      let next = { ...state };
      const economy = calculateEconomy(next);
      if (next.credits >= 200 && next.buildings.factory < 2) {
        next = {
          ...next,
          credits: next.credits - 200,
          buildings: { ...next.buildings, factory: next.buildings.factory + 1 },
        };
        return next;
      }
      if (next.credits >= 160 && economy.usedPop + 2 <= economy.popCap) {
        next = {
          ...next,
          credits: next.credits - 160,
          units: { ...next.units, artillery: next.units.artillery + 1 },
        };
        return next;
      }
      if (next.credits >= 120 && economy.usedPop + 2 <= economy.popCap) {
        next = {
          ...next,
          credits: next.credits - 120,
          units: { ...next.units, tank: next.units.tank + 1 },
        };
        return next;
      }
      if (next.credits >= 60 && economy.usedPop + 1 <= economy.popCap) {
        next = {
          ...next,
          credits: next.credits - 60,
          units: { ...next.units, infantry: next.units.infantry + 1 },
        };
        return next;
      }
      return next;
    });
  };

  const connectOnline = () => {
    if (connectionStatus === 'connected' || connectionStatus === 'connecting') return;
    try {
      setConnectionStatus('connecting');
      const socket = new WebSocket(serverUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        setConnectionStatus('connected');
        pushLog('已连接在线房间，等待同步。');
        sendPayload({ type: 'state', payload: player });
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data?.type === 'state') {
            setRemoteState(data.payload);
            setEnemy(data.payload);
            pushLog('收到对手状态更新。');
          }
          if (data?.type === 'attack') {
            const { damageToPlayer, damageToEnemy } = data.payload || {};
            if (typeof damageToPlayer === 'number') {
              updatePlayer((state) => ({
                ...state,
                baseHp: clamp(state.baseHp - damageToPlayer, 0, 1000),
              }));
            }
            if (typeof damageToEnemy === 'number') {
              updateEnemy((state) => ({
                ...state,
                baseHp: clamp(state.baseHp - damageToEnemy, 0, 1000),
              }));
            }
            pushLog('在线战斗结算完成。');
          }
        } catch (error) {
          pushLog('收到无法解析的在线消息。');
        }
      };

      socket.onerror = () => {
        setConnectionStatus('error');
        pushLog('在线连接失败，请检查服务器地址。');
      };

      socket.onclose = () => {
        setConnectionStatus('disconnected');
        socketRef.current = null;
        pushLog('已断开在线连接。');
      };
    } catch (error) {
      setConnectionStatus('error');
      pushLog('无法连接到在线服务器。');
    }
  };

  const disconnectOnline = () => {
    socketRef.current?.close();
  };

  const sendPayload = (message: Record<string, unknown>) => {
    if (connectionStatus !== 'connected' || !socketRef.current) return;
    socketRef.current.send(JSON.stringify(message));
  };

  useEffect(() => {
    if (mode === 'online' && connectionStatus === 'connected') {
      sendPayload({ type: 'state', payload: player });
    }
  }, [player, mode, connectionStatus]);

  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  const resetGame = () => {
    setPlayer(makeInitialState());
    setEnemy({
      ...makeInitialState(),
      buildings: { power: 1, refinery: 1, barracks: 1, factory: 1, lab: 0 },
      units: { infantry: 3, tank: 2, artillery: 0 },
    });
    setLog([]);
    setRemoteState(null);
  };

  const gameOver = player.baseHp <= 0 || enemy.baseHp <= 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-amber-300">联机/单机基地对战</h1>
              <p className="text-sm text-slate-400">升级武器、士兵与建筑，模拟红警式对抗。</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMode('offline')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  mode === 'offline' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-200'
                }`}
              >
                单机模式
              </button>
              <button
                onClick={() => setMode('online')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  mode === 'online' ? 'bg-emerald-400 text-slate-900' : 'bg-slate-800 text-slate-200'
                }`}
              >
                联机模式
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-800">
              <h2 className="text-sm uppercase text-slate-400 mb-2">指挥中心</h2>
              <div className="flex items-center justify-between text-sm">
                <span>回合</span>
                <span className="font-semibold">{player.round}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>资金</span>
                <span className="font-semibold text-amber-300">{player.credits}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>电力</span>
                <span className={`font-semibold ${playerEconomy.usedPower > playerEconomy.powerCap ? 'text-rose-400' : ''}`}>
                  {playerEconomy.usedPower}/{playerEconomy.powerCap}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>人口</span>
                <span className={`font-semibold ${playerEconomy.usedPop > playerEconomy.popCap ? 'text-rose-400' : ''}`}>
                  {playerEconomy.usedPop}/{playerEconomy.popCap}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>基地耐久</span>
                <span className="font-semibold text-emerald-300">{player.baseHp}</span>
              </div>
            </div>
            <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-800">
              <h2 className="text-sm uppercase text-slate-400 mb-2">战斗预估</h2>
              <div className="flex items-center justify-between text-sm">
                <span>攻击力</span>
                <span className="font-semibold text-emerald-300">{playerAttack}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>防御减伤</span>
                <span className="font-semibold">-{Math.round(calcDefenseMultiplier(player.upgrades.armor) * 100)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>电力惩罚</span>
                <span className={`font-semibold ${playerPenalty < 1 ? 'text-rose-400' : ''}`}>
                  {playerPenalty < 1 ? '攻击 -25%' : '无'}
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={resolveAttack}
                  disabled={gameOver}
                  className="flex-1 rounded-lg bg-rose-500/90 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-500 disabled:opacity-50"
                >
                  发起进攻
                </button>
                <button
                  onClick={nextRound}
                  disabled={gameOver}
                  className="flex-1 rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-600 disabled:opacity-50"
                >
                  下一回合
                </button>
              </div>
              <button
                onClick={resetGame}
                className="mt-3 w-full rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-amber-400 hover:text-amber-200"
              >
                重置战局
              </button>
            </div>
            <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-800">
              <h2 className="text-sm uppercase text-slate-400 mb-2">对手基地</h2>
              <div className="flex items-center justify-between text-sm">
                <span>资金</span>
                <span className="font-semibold text-amber-200">{enemy.credits}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>电力</span>
                <span className={`font-semibold ${enemyEconomy.usedPower > enemyEconomy.powerCap ? 'text-rose-400' : ''}`}>
                  {enemyEconomy.usedPower}/{enemyEconomy.powerCap}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>人口</span>
                <span className={`font-semibold ${enemyEconomy.usedPop > enemyEconomy.popCap ? 'text-rose-400' : ''}`}>
                  {enemyEconomy.usedPop}/{enemyEconomy.popCap}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>基地耐久</span>
                <span className="font-semibold text-emerald-200">{enemy.baseHp}</span>
              </div>
              <div className="mt-3 text-xs text-slate-400">
                {mode === 'online' && remoteState ? '在线状态已同步' : mode === 'online' ? '等待对手连接' : 'AI 对手正在行动'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold text-amber-200">建筑与经济</h3>
            <p className="text-sm text-slate-400 mt-1">建造设施获取电力、人口与收入。</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {BUILDINGS.map((building) => (
                <div key={building.key} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{building.name}</p>
                      <p className="text-xs text-slate-400">建造成本 {building.cost}</p>
                    </div>
                    <span className="text-sm text-amber-200">× {player.buildings[building.key]}</span>
                  </div>
                  <div className="mt-3 text-xs text-slate-400 space-y-1">
                    <p>电力变化: {building.power}</p>
                    <p>人口变化: {building.pop}</p>
                    <p>收入变化: {building.income}</p>
                  </div>
                  <button
                    onClick={() => buildBuilding(building.key)}
                    className="mt-4 w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-amber-500 hover:text-slate-900"
                  >
                    建造
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold text-amber-200">部队训练</h3>
            <p className="text-sm text-slate-400 mt-1">部队越多，攻击力越高。</p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {UNITS.map((unit) => (
                <div key={unit.key} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{unit.name}</p>
                      <p className="text-xs text-slate-400">训练成本 {unit.cost}</p>
                    </div>
                    <span className="text-sm text-emerald-200">× {player.units[unit.key]}</span>
                  </div>
                  <div className="mt-3 text-xs text-slate-400 space-y-1">
                    <p>攻击力 {unit.attack}</p>
                    <p>电力占用 {Math.abs(unit.power)}</p>
                    <p>人口占用 {unit.pop}</p>
                  </div>
                  <button
                    onClick={() => trainUnit(unit.key)}
                    disabled={!canProduceUnit(player, unit.key)}
                    className="mt-4 w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-emerald-500 hover:text-slate-900 disabled:opacity-50"
                  >
                    训练
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold text-amber-200">科技升级</h3>
            <p className="text-sm text-slate-400 mt-1">科技中心提升升级上限（最高 5 级）。</p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {([
                { key: 'weapon', label: '武器升级', description: '提升攻击力' },
                { key: 'armor', label: '护甲升级', description: '降低受到的伤害' },
                { key: 'commander', label: '指挥官升级', description: '提升部队协同输出' },
              ] as const).map((upgradeItem) => {
                const level = player.upgrades[upgradeItem.key];
                const cost = UPGRADE_BASE_COST + level * 120;
                const cap = getUpgradeCap(player);
                return (
                  <div key={upgradeItem.key} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm font-semibold text-slate-100">{upgradeItem.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{upgradeItem.description}</p>
                    <p className="text-xs text-amber-200 mt-2">等级 {level} / {cap}</p>
                    <p className="text-xs text-slate-400 mt-1">消耗 {cost}</p>
                    <button
                      onClick={() => upgrade(upgradeItem.key)}
                      className="mt-4 w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-amber-500 hover:text-slate-900"
                    >
                      升级
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold text-amber-200">在线联机面板</h3>
            <p className="text-sm text-slate-400 mt-1">
              联机模式需要可用的 WebSocket 服务器地址，同一服务器的玩家会同步状态。
            </p>
            <label className="text-xs text-slate-400 mt-4 block">服务器地址</label>
            <input
              value={serverUrl}
              onChange={(event) => setServerUrl(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={connectOnline}
                disabled={mode !== 'online'}
                className="flex-1 rounded-lg bg-emerald-500/80 px-3 py-2 text-sm font-semibold text-slate-900 disabled:opacity-50"
              >
                连接
              </button>
              <button
                onClick={disconnectOnline}
                className="flex-1 rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold text-slate-100"
              >
                断开
              </button>
            </div>
            <div className="mt-3 text-xs text-slate-400">状态: {connectionStatus}</div>
          </div>

          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold text-amber-200">战斗日志</h3>
            <div className="mt-3 space-y-2 text-xs text-slate-300">
              {log.length === 0 && <p className="text-slate-500">暂无日志。</p>}
              {log.map((entry) => (
                <p key={entry.id} className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                  {entry.text}
                </p>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default WarGame;
