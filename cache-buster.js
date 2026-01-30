// Cache Busting Script for Production Build
// 自动在构建时添加版本号，强制用户刷新缓存

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const version = new Date().getTime();
const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');

console.log('🔧 正在应用缓存破坏策略...');

if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf-8');

    // 在所有 .js 和 .css 文件后添加版本参数
    content = content.replace(
        /(href|src)="([^"]+\.(css|js))"/g,
        `$1="$2?v=${version}"`
    );

    // 添加 meta 标签禁止缓存
    const metaTags = `
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="version" content="${version}">
`;

    content = content.replace('</head>', `${metaTags}</head>`);

    // 添加自动检测版本的脚本
    const versionCheckScript = `
    <script>
        (function() {
            const currentVersion = '${version}';
            const storedVersion = localStorage.getItem('app_version');
            
            if (storedVersion && storedVersion !== currentVersion) {
                console.log('🔄 检测到新版本，正在清除缓存...');
                localStorage.clear();
                sessionStorage.clear();
                localStorage.setItem('app_version', currentVersion);
                // 不需要重新加载，因为这是首次加载
            } else {
                localStorage.setItem('app_version', currentVersion);
            }
        })();
    </script>
`;

    content = content.replace('</body>', `${versionCheckScript}</body>`);

    fs.writeFileSync(indexPath, content);
    console.log(`✅ 缓存破坏已应用！版本号: ${version}`);
    console.log(`📦 输出目录: ${distDir}`);
} else {
    console.error('❌ 找不到 dist/index.html 文件，请先运行 npm run build');
    process.exit(1);
}
