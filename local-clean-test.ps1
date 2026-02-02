Write-Host "🧹 Starting Clean & Test Process..." -ForegroundColor Cyan

# 1. Clean Caches
Write-Host "   - Removing Vite Cache..."
if (Test-Path "node_modules/.vite") { Remove-Item "node_modules/.vite" -Recurse -Force }

Write-Host "   - Removing Dist folder..."
if (Test-Path "dist") { Remove-Item "dist" -Recurse -Force }

# 2. Re-install (Optional but good for sanity)
# Write-Host "   - Checking dependencies..."
# npm install

# 3. Build Check
Write-Host "   - Testing Build..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "✅ Build Successful!" -ForegroundColor Green
} catch {
    Write-Host "❌ Build Failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n🚀 Ready! To test locally, you need to use 'vercel dev' (if installed) or rely on the deployed version."
Write-Host "   The /api/proxy route ONLY works on Vercel, not in 'npm run dev' alone." -ForegroundColor Magenta
