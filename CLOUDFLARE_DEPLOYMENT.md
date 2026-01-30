# Cloudflare Workers 部署指南

## 🎯 目标
将 API Keys 完全隐藏在后端，任何人都无法从浏览器中获取。

---

## 📋 前置要求

1. ✅ 已完成前面的 API Key 池配置
2. ✅ 有 6 个可用的 Gemini API Keys
3. ⚠️ 需要创建免费 Cloudflare 账号

---

## 🚀 部署步骤

### 第 1 步：创建 Cloudflare 账号

1. 访问：https://workers.cloudflare.com
2. 点击 "Sign Up" 注册（完全免费）
3. 验证邮箱

**免费额度：** 每天 100,000 次请求（远超需求）

---

### 第 2 步：安装 Wrangler CLI

在项目目录打开终端，运行：

```bash
npm install -g wrangler
```

验证安装：
```bash
wrangler --version
```

---

### 第 3 步：登录 Cloudflare

```bash
wrangler login
```

这会打开浏览器，授权 Wrangler 访问你的账号。

---

### 第 4 步：配置环境变量（API Keys）

在项目目录运行以下命令，**一次一个**：

```bash
wrangler secret put GEMINI_KEY_1
# 粘贴: REDACTED_API_KEY
# 按 Enter

wrangler secret put GEMINI_KEY_2
# 粘贴: REDACTED_API_KEY
# 按 Enter

wrangler secret put GEMINI_KEY_3
# 粘贴: REDACTED_API_KEY
# 按 Enter

wrangler secret put GEMINI_KEY_4
# 粘贴: REDACTED_API_KEY
# 按 Enter

wrangler secret put GEMINI_KEY_5
# 粘贴: REDACTED_API_KEY
# 按 Enter

wrangler secret put GEMINI_KEY_6
# 粘贴: REDACTED_API_KEY
# 按 Enter
```

**重要：** 这些 Keys 会被加密存储在 Cloudflare，永远不会出现在代码中！

---

### 第 5 步：部署 Worker

```bash
wrangler deploy
```

成功后，你会看到 Worker 的 URL，类似：
```
https://tianji-gemini-proxy.您的用户名.workers.dev
```

**复制这个 URL！** 下一步需要用到。

---

### 第 6 步：测试 Worker

用以下命令测试（替换成你的 Worker URL）：

```bash
curl -X POST https://tianji-gemini-proxy.您的用户名.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"prompt":"你好", "model":"gemini-1.5-flash"}'
```

如果返回 JSON 响应，说明成功了！✅

---

### 第 7 步：更新前端代码

我已经准备好更新的代码，需要你提供 Worker URL。

**请告诉我你的 Worker URL**，格式类似：
```
https://tianji-gemini-proxy.xxx.workers.dev
```

我会立即更新前端代码并部署。

---

## 🔒 安全验证

部署完成后，验证 API Keys 已完全隐藏：

1. 打开应用：https://davidwangaibo.github.io/tianji-divination/
2. 按 F12 打开开发者工具
3. 进入 "Sources"（源代码）标签
4. 搜索 "AIzaSy"
5. **应该找不到任何 API Key！** ✅

---

## 📊 监控使用情况

访问 Cloudflare Dashboard：
https://dash.cloudflare.com

进入 Workers & Pages → 选择你的 Worker → Analytics

可以看到：
- 请求次数
- 错误率
- 响应时间

---

## ⚙️ 后续维护

**添加新 API Key：**
```bash
wrangler secret put GEMINI_KEY_7
# 然后输入新 Key
```

**更新 Worker 代码：**
```bash
wrangler deploy
```

**查看日志：**
```bash
wrangler tail
```

---

## 🆘 常见问题

**Q: Worker 部署失败？**
A: 确保已经登录：`wrangler login`

**Q: 如何删除 API Key？**
A: 访问 Cloudflare Dashboard，进入 Worker 设置删除环境变量

**Q: 免费额度够用吗？**
A: 每天 100,000 次请求，对于个人应用绰绰有余

**Q: 可以自定义域名吗？**
A: 可以！在 Cloudflare Dashboard 中配置自定义域名

---

## 📝 下一步

完成部署后，把你的 **Worker URL** 告诉我，我会：
1. 更新前端代码调用你的 Worker
2. 从前端删除所有 API Keys
3. 重新部署应用

然后你的 API Keys 就永久安全了！🔐
