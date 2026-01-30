# 天机占卜 - 一键重新部署脚本
# 此脚本会自动部署最新版本到GitHub Pages

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  天机占卜 - 重新部署到GitHub Pages  " -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 1. 确保在正确的目录
$projectDir = "C:\Users\sisen\.gemini\antigravity\scratch\tianji-divination-new"
Set-Location $projectDir
Write-Host "[1/5] 切换到项目目录: $projectDir" -ForegroundColor Green

# 2. 检查是否有未提交的更改
Write-Host "[2/5] 检查代码状态..." -ForegroundColor Green
git status

# 3. 构建最新版本
Write-Host "[3/5] 构建生产版本..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败！请检查错误信息。" -ForegroundColor Red
    exit 1
}

# 4. 部署到GitHub Pages
Write-Host "[4/5] 部署到GitHub Pages..." -ForegroundColor Green
npm run deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "部署失败！请检查错误信息。" -ForegroundColor Red
    exit 1
}

# 5. 完成
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  ✅ 部署完成！                     " -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "请等待3-5分钟后访问你的网站：" -ForegroundColor Yellow
Write-Host "https://davidwangaibo.github.io/tianji-divination/" -ForegroundColor Cyan
Write-Host ""
Write-Host "如果还显示旧错误，请在浏览器中：" -ForegroundColor Yellow
Write-Host "1. 按 F12 打开开发者工具" -ForegroundColor White
Write-Host "2. 在Console中运行：localStorage.clear(); location.reload(true)" -ForegroundColor White
Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
