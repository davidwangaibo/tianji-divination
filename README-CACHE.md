# 缓存清除与版本控制指南

## 🎯 概述

本项目包含多种自动化缓存清除机制，确保用户始终使用最新版本的应用。

## 📋 可用脚本

### 1. **本地开发环境清除缓存**

```powershell
# 运行 PowerShell 清除脚本
npm run clear-cache

# 或直接运行
.\clear-cache.ps1
```

**功能：**
- 检测正在运行的浏览器
- 更新 `clear-cache.html` 的版本号
- 提供清除缓存的链接
- 可选自动打开浏览器

### 2. **生产构建自动缓存破坏**

```bash
# 正常构建（已包含缓存破坏）
npm run build

# 构建并部署
npm run deploy
```

**自动执行：**
- 在所有 JS/CSS 文件添加时间戳版本号
- 添加 HTTP 缓存控制 meta 标签
- 在页面加载时自动检测版本并清除旧缓存

### 3. **一键重新部署**

```bash
# 清除本地缓存 + 构建 + 部署
npm run redeploy
```

## 🔧 工作原理

### 本地开发：`clear-cache.html`

访问 `http://localhost:5173/clear-cache.html` 时：

```javascript
// 清除所有本地存储
localStorage.clear();
sessionStorage.clear();

// 设置正确的模型
localStorage.setItem('user_model', 'gemini-1.5-flash');

// 3秒后自动跳转回应用
```

### 生产环境：自动版本检测

每次构建时，`cache-buster.js` 会：

1. **生成时间戳版本号**
   ```html
   <script src="assets/index-abc123.js?v=1738267988000"></script>
   ```

2. **添加版本检测脚本**
   ```javascript
   const currentVersion = '1738267988000';
   const storedVersion = localStorage.getItem('app_version');
   
   if (storedVersion && storedVersion !== currentVersion) {
       console.log('检测到新版本，清除缓存...');
       localStorage.clear();
       sessionStorage.clear();
   }
   ```

3. **添加缓存控制标头**
   ```html
   <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
   <meta http-equiv="Pragma" content="no-cache">
   <meta http-equiv="Expires" content="0">
   ```

## 📂 相关文件

| 文件 | 用途 |
|------|------|
| `clear-cache.ps1` | PowerShell 本地缓存清除脚本 |
| `clear-cache.html` | 浏览器缓存清除页面 |
| `cache-buster.js` | 生产构建缓存破坏脚本 |
| `package.json` | NPM 脚本定义 |

## 🚀 使用场景

### 场景 1：本地开发时模型配置错误

```bash
npm run clear-cache
# 访问 http://localhost:5173/clear-cache.html
```

### 场景 2：部署新版本后用户看到旧版本

✅ **无需手动操作！** 自动版本检测会在用户首次加载新版本时清除缓存。

### 场景 3：手动强制用户刷新

分享这个链接给用户：
```
https://davidwangaibo.github.io/tianji-divination/clear-cache.html
```

## ⚠️ 注意事项

1. **API Key 不会被清除**
   - 版本检测脚本会在更新前清除缓存
   - 用户需要重新输入 API Key（这是有意为之，确保使用正确的模型）

2. **浏览器兼容性**
   - 所有现代浏览器都支持 `localStorage` 和 `sessionStorage`
   - 缓存控制 meta 标签在所有浏览器中有效

3. **执行策略**
   - PowerShell 脚本可能需要管理员权限
   - 如果遇到权限问题，使用：
     ```powershell
     Set-ExecutionPolicy -Scope CurrentUser Bypass
     ```

## 🔍 调试

在浏览器控制台 (F12)：

```javascript
// 查看当前版本
console.log(localStorage.getItem('app_version'));

// 查看当前模型
console.log(localStorage.getItem('user_model'));

// 手动清除
localStorage.clear();
sessionStorage.clear();
location.reload();
```

## 📊 版本历史追踪

构建的版本号是 Unix 时间戳（毫秒），例如：
- `1738267988000` = 2026-01-30 12:53:08

可以使用在线工具转换：https://www.epochconverter.com/

---

> **提示：** 所有缓存清除机制都已集成到构建流程中，正常使用 `npm run deploy` 即可！
