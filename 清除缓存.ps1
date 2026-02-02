# 清除浏览器缓存脚本
# 支持 Chrome, Edge, Firefox

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  浏览器缓存清除工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 关闭浏览器进程
Write-Host "[1/3] 正在关闭浏览器进程..." -ForegroundColor Yellow
$browsers = @("chrome", "msedge", "firefox")
foreach ($browser in $browsers) {
    Get-Process -Name $browser -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
}
Start-Sleep -Seconds 2
Write-Host "✓ 浏览器已关闭" -ForegroundColor Green
Write-Host ""

# 清除 Chrome 缓存
Write-Host "[2/3] 正在清除 Google Chrome 缓存..." -ForegroundColor Yellow
$chromePath = "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache"
$chromeCache2 = "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Code Cache"
if (Test-Path $chromePath) {
    Remove-Item -Path "$chromePath\*" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  ✓ Chrome Cache 已清除" -ForegroundColor Green
}
if (Test-Path $chromeCache2) {
    Remove-Item -Path "$chromeCache2\*" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  ✓ Chrome Code Cache 已清除" -ForegroundColor Green
}

# 清除 Edge 缓存
Write-Host ""
Write-Host "正在清除 Microsoft Edge 缓存..." -ForegroundColor Yellow
$edgePath = "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Cache"
$edgeCache2 = "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Code Cache"
if (Test-Path $edgePath) {
    Remove-Item -Path "$edgePath\*" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  ✓ Edge Cache 已清除" -ForegroundColor Green
}
if (Test-Path $edgeCache2) {
    Remove-Item -Path "$edgeCache2\*" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  ✓ Edge Code Cache 已清除" -ForegroundColor Green
}

# 清除 Firefox 缓存
Write-Host ""
Write-Host "正在清除 Firefox 缓存..." -ForegroundColor Yellow
$firefoxPath = "$env:LOCALAPPDATA\Mozilla\Firefox\Profiles"
if (Test-Path $firefoxPath) {
    Get-ChildItem -Path $firefoxPath -Directory | ForEach-Object {
        $cachePath = Join-Path $_.FullName "cache2"
        if (Test-Path $cachePath) {
            Remove-Item -Path "$cachePath\*" -Recurse -Force -ErrorAction SilentlyContinue
            Write-Host "  ✓ Firefox Cache 已清除" -ForegroundColor Green
        }
    }
}

# 清除 DNS 缓存
Write-Host ""
Write-Host "[3/3] 正在清除 DNS 缓存..." -ForegroundColor Yellow
ipconfig /flushdns | Out-Null
Write-Host "✓ DNS 缓存已清除" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  缓存清除完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "现在可以打开浏览器访问您的应用了：" -ForegroundColor Yellow
Write-Host "https://davidwangaibo.github.io/tianji-divination/" -ForegroundColor Cyan
Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
