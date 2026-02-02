$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   TIANJI DIVINATION - AUTO CLEAN & DEPLOY" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Clean Local Cache
Write-Host "Step 1: Cleaning local caches..." -ForegroundColor Green
$viteCache = "node_modules/.vite"
$distFolder = "dist"

if (Test-Path $viteCache) {
    Remove-Item -Path $viteCache -Recurse -Force
    Write-Host "  - Removed Vite cache ($viteCache)" -ForegroundColor Gray
}
if (Test-Path $distFolder) {
    Remove-Item -Path $distFolder -Recurse -Force
    Write-Host "  - Removed Dist folder ($distFolder)" -ForegroundColor Gray
}

# 2. Bump Version to force browser refresh
Write-Host "Step 2: Bumping version..." -ForegroundColor Green
$pkgFile = "package.json"
$pkgContent = Get-Content $pkgFile | ConvertFrom-Json
$versionParts = $pkgContent.version.Split('.')
$versionParts[2] = [int]$versionParts[2] + 1
$newVersion = $versionParts -join '.'
$pkgContent.version = $newVersion
$pkgContent | ConvertTo-Json -Depth 10 | Set-Content $pkgFile
Write-Host "  - Version bumped to $newVersion" -ForegroundColor Yellow

# 3. Build Project
Write-Host "Step 3: Building project..." -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error during build!" -ForegroundColor Red
    exit 1
}

# 4. Git Commit & Push
Write-Host "Step 4: Committing and pushing changes..." -ForegroundColor Green
git add .
git commit -m "Auto-clean: Version bump to $newVersion & standard deployment"
git push origin main

# 5. Deploy to GitHub Pages
Write-Host "Step 5: Deploying to GitHub Pages..." -ForegroundColor Green
npm run deploy

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "   New Version: $newVersion" -ForegroundColor Yellow
Write-Host "   URL: https://davidwangaibo.github.io/tianji-divination/" -ForegroundColor White
Write-Host "==========================================" -ForegroundColor Cyan
