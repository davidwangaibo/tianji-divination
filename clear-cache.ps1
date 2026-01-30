# 自动清除缓存脚本 - PowerShell版本
# 用于本地开发环境快速清除浏览器LocalStorage缓存

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "   天机占卜 - 自动清除缓存工具" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否有浏览器正在运行
$browsers = @("chrome", "msedge", "firefox")
$runningBrowsers = @()

foreach ($browser in $browsers) {
    $process = Get-Process -Name $browser -ErrorAction SilentlyContinue
    if ($process) {
        $runningBrowsers += $browser
    }
}

if ($runningBrowsers.Count -gt 0) {
    Write-Host "⚠️  检测到以下浏览器正在运行:" -ForegroundColor Yellow
    foreach ($browser in $runningBrowsers) {
        Write-Host "   - $browser" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "建议操作:" -ForegroundColor Cyan
    Write-Host "1. 关闭所有浏览器窗口" -ForegroundColor White
    Write-Host "2. 重新运行此脚本" -ForegroundColor White
    Write-Host "3. 或者在浏览器控制台(F12)中手动执行:" -ForegroundColor White
    Write-Host "   localStorage.clear(); sessionStorage.clear(); location.reload();" -ForegroundColor Green
    Write-Host ""
}

# 生成带版本号的clear-cache.html
Write-Host "📝 正在更新 clear-cache.html..." -ForegroundColor Cyan

$version = Get-Date -Format "yyyyMMddHHmmss"
$cacheFile = Join-Path $PSScriptRoot "clear-cache.html"

if (Test-Path $cacheFile) {
    # 读取文件内容
    $content = Get-Content $cacheFile -Raw
    
    # 添加版本注释
    $versionComment = "<!-- Cache Clear Version: $version -->`r`n"
    
    if ($content -match "<!-- Cache Clear Version:") {
        # 替换现有版本
        $content = $content -replace "<!-- Cache Clear Version: (\d+) -->", $versionComment
    }
    else {
        # 添加新版本注释
        $content = $versionComment + $content
    }
    
    # 写回文件
    $content | Set-Content $cacheFile -NoNewline
    
    Write-Host "✅ 已更新缓存清除页面，版本号: $version" -ForegroundColor Green
}
else {
    Write-Host "❌ 找不到 clear-cache.html 文件" -ForegroundColor Red
}

Write-Host ""
Write-Host "🌐 访问以下链接清除缓存:" -ForegroundColor Cyan
Write-Host "   本地开发: http://localhost:5173/clear-cache.html" -ForegroundColor White
Write-Host "   生产环境: https://davidwangaibo.github.io/tianji-divination/clear-cache.html" -ForegroundColor White
Write-Host ""

# 询问是否打开浏览器
$openBrowser = Read-Host "是否在浏览器中自动打开清除页面? (Y/N)"
if ($openBrowser -eq "Y" -or $openBrowser -eq "y") {
    Write-Host "🚀 正在打开浏览器..." -ForegroundColor Green
    Start-Process "http://localhost:5173/clear-cache.html"
}

Write-Host ""
Write-Host "完成！" -ForegroundColor Green
Write-Host "======================================"  -ForegroundColor Cyan
