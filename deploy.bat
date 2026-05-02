@echo off
REM Deployment script for om-puzzle-games
echo.
echo ====================================
echo   om-puzzle-games Deployment
echo ====================================
echo.

REM Check git
echo [1/4] Checking Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed
    exit /b 1
)
echo ✓ Git found

REM Check gh CLI
echo [2/4] Checking GitHub CLI...
gh --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: GitHub CLI is not installed
    echo Please install from: https://cli.github.com
    exit /b 1
)
echo ✓ GitHub CLI found

REM Authenticate with GitHub
echo [3/4] Authenticating with GitHub...
gh auth status >nul 2>&1
if errorlevel 1 (
    echo Please authenticate with GitHub...
    gh auth login
)
echo ✓ Authenticated

REM Create repository
echo [4/4] Creating GitHub repository...
gh repo create om-puzzle-games --public --source=. --remote=origin --push
if errorlevel 0 (
    echo.
    echo ====================================
    echo ✅ SUCCESS!
    echo ====================================
    echo.
    echo Your code is now on GitHub!
    echo.
    echo Next: Deploy to Render or Railway
    echo.
    echo 1️⃣  RENDER (Recommended)
    echo    - Go to https://render.com
    echo    - Click "New" → "Web Service"  
    echo    - Select your repository
    echo    - Deploy!
    echo.
    echo 2️⃣  RAILWAY
    echo    - Go to https://railway.app
    echo    - New Project → Deploy from GitHub
    echo    - Select your repository
    echo    - Deploy!
    echo.
) else (
    echo ERROR: Failed to create repository
    exit /b 1
)
