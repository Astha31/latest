#!/bin/bash
# Deploy script for om-puzzle-games

echo "🚀 Starting deployment..."

# Check if Git is initialized
if [ ! -d .git ]; then
    git init
fi

# Add all files
git add .

# Commit changes
git commit -m "Deploy om-puzzle-games" || echo "Already up to date"

# Push to main branch
echo "📤 Pushing to GitHub..."
git push -u origin main

echo "✅ Code pushed to GitHub!"
echo "🌐 Next steps:"
echo "1. Go to https://render.com"
echo "2. Click 'New' → 'Web Service'"
echo "3. Select your GitHub repository"
echo "4. Render will deploy automatically!"
echo ""
echo "OR deploy to Railway:"
echo "1. Go to https://railway.app"
echo "2. Click 'New Project'"
echo "3. Select 'Deploy from GitHub'"
echo "4. Choose your repository"
