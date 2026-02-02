# 天机占卜 (Tianji Divination)

一个集成多种中国传统占卜方法的现代化Web应用。

## 功能特性

- 🪙 **易经占卜** - 传统铜钱占卜法
- 🌸 **梅花易数** - 数字起卦预测
- 📅 **八字分析** - 生辰八字命理解读
- 🙏 **观音灵签** - 观音百签求解
- 🃏 **塔罗牌** - 西方占卜艺术
- ⭐ **印度占星** - 吠陀占星术

## 技术栈

- React 19
- TypeScript
- Vite 6
- Google Generative AI
- Lucide React Icons

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 环境变量

创建 `.env.local` 文件并添加（用于浏览器端直连 Gemini API，适用于 GitHub Pages 等纯静态部署）：

```
VITE_GEMINI_API_KEY=your_api_key_here
```

如需使用服务器代理（例如部署到 Vercel），请配置后端环境变量 `GEMINI_KEY_1~7` 并保留 `/api/proxy` 端点。

## 在线演示

访问: https://davidwangaibo.github.io/tianji-divination-new/

## 许可证

MIT License

---

Created with ❤️ by David Wang
