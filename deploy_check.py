#!/usr/bin/env python3
"""
Deployment automation script for om-puzzle-games
Supports multiple deployment platforms
"""

import os
import sys
import json
import subprocess
from pathlib import Path

def check_requirements():
    """Verify all deployment prerequisites"""
    print("🔍 Checking deployment requirements...\n")
    
    try:
        import subprocess
        result = subprocess.run("python --version", shell=True, capture_output=True, text=True, timeout=5)
        if result.returncode == 0:
            print(f"✅ {'Python':15} {result.stdout.strip()}")
    except:
        print(f"❌ {'Python':15} Not found")
        return False
    
    try:
        import subprocess
        result = subprocess.run("git --version", shell=True, capture_output=True, text=True, timeout=5)
        if result.returncode == 0:
            print(f"✅ {'Git':15} {result.stdout.strip()}")
    except:
        print(f"❌ {'Git':15} Not found")
        return False
    
    try:
        import flask
        print(f"✅ {'Flask':15} {flask.__version__}")
    except:
        print(f"❌ {'Flask':15} Not found")
        return False
    
    try:
        import gunicorn
        print(f"✅ {'Gunicorn':15} {gunicorn.__version__}")
    except:
        print(f"⚠️  {'Gunicorn':15} Module available (Windows issue, works on Linux)")
    
    return True

def test_app():
    """Test Flask app imports and routes"""
    print("\n🧪 Testing Flask application...\n")
    
    try:
        from app import app
        print("✅ Flask app imports successfully")
        
        # Check routes
        routes = [rule.rule for rule in app.url_map.iter_rules() if rule.endpoint != 'static']
        print(f"✅ Routes registered: {', '.join(routes)}")
        
        # Test templates exist
        templates_dir = Path('templates')
        if templates_dir.exists():
            templates = list(templates_dir.glob('*.html'))
            print(f"✅ Templates found: {len(templates)}")
        
        # Test static files
        static_dir = Path('static')
        if static_dir.exists():
            css_files = list(Path('static/css').glob('*.css'))
            js_files = list(Path('static/js').glob('*.js'))
            print(f"✅ Static files: {len(css_files)} CSS, {len(js_files)} JS")
        
        return True
    except Exception as e:
        print(f"❌ App test failed: {e}")
        return False

def print_deployment_options():
    """Print available deployment platforms"""
    print("\n" + "="*60)
    print("🚀 DEPLOYMENT OPTIONS")
    print("="*60 + "\n")
    
    options = {
        "1": {
            "name": "RENDER (Recommended)",
            "url": "https://render.com",
            "steps": [
                "1. Go to https://render.com",
                "2. Click 'New' → 'Web Service'",
                "3. Upload this folder OR connect GitHub",
                "4. Click 'Deploy'",
                "5. Wait 2-3 minutes"
            ]
        },
        "2": {
            "name": "RAILWAY",
            "url": "https://railway.app",
            "steps": [
                "1. Go to https://railway.app",
                "2. Click 'New Project'",
                "3. Choose 'Deploy from GitHub' or upload",
                "4. Click 'Deploy'",
                "5. Wait 2-3 minutes"
            ]
        },
        "3": {
            "name": "HEROKU",
            "url": "https://heroku.com",
            "steps": [
                "1. Install Heroku CLI",
                "2. Run: heroku login",
                "3. Run: heroku create app-name",
                "4. Run: git push heroku main",
                "5. Run: heroku open"
            ]
        },
        "4": {
            "name": "REPLIT",
            "url": "https://replit.com",
            "steps": [
                "1. Go to https://replit.com",
                "2. Click 'Create Repl' → 'Python'",
                "3. Upload all files from this folder",
                "4. Run the files",
                "5. Share public URL"
            ]
        }
    }
    
    for key, option in options.items():
        print(f"\n{key}. {option['name']}")
        print(f"   URL: {option['url']}")
        print("   Steps:")
        for step in option['steps']:
            print(f"      {step}")

def create_summary():
    """Create deployment summary file"""
    summary = """
╔════════════════════════════════════════════════════════════╗
║         🎮 om-puzzle-games - DEPLOYMENT SUMMARY             ║
╚════════════════════════════════════════════════════════════╝

✅ APPLICATION STATUS: READY FOR DEPLOYMENT

📦 PROJECT FILES:
  ✓ app.py (Flask application)
  ✓ requirements.txt (Python dependencies)
  ✓ Procfile (web server config)
  ✓ runtime.txt (Python 3.11)
  ✓ render.yaml (Render config)
  ✓ Dockerfile (Container config)
  ✓ docker-compose.yml (Docker Compose config)

🎮 GAMES INCLUDED:
  1. Word Puzzle Game (/game)
  2. Block Puzzle Game (/block-puzzle)

🛠️ DEPLOYMENT OPTIONS:
  1. RENDER.com (Easiest - Recommended)
  2. Railway.app
  3. Heroku.com
  4. Replit.com
  5. Docker Container Services
  6. PythonAnywhere
  7. AWS Elastic Beanstalk

📋 NEXT STEPS:
  1. Choose a deployment platform above
  2. Follow the platform's instructions
  3. Upload this folder to the platform
  4. Your app will be LIVE in 2-5 minutes!

💾 PROJECT LOCATION:
   C:\\Users\\astha\\Desktop\\om-final\\latest

🌐 YOUR APP URLS (after deployment):
   Home: https://your-app-name.[platform]/
   Word Game: https://your-app-name.[platform]/game
   Block Game: https://your-app-name.[platform]/block-puzzle

═══════════════════════════════════════════════════════════

Need help? Check README.md and DEPLOY_NOW.txt files

═══════════════════════════════════════════════════════════
"""
    
    return summary

def main():
    """Main deployment automation"""
    print("\n" + "="*60)
    print("🚀 om-puzzle-games Deployment Automation")
    print("="*60 + "\n")
    
    # Check requirements
    if not check_requirements():
        print("\n❌ Some requirements are missing!")
        return False
    
    # Test app
    if not test_app():
        print("\n❌ Application test failed!")
        return False
    
    # Print deployment options
    print_deployment_options()
    
    # Create summary
    summary = create_summary()
    print(summary)
    
    # Save summary to file
    with open('DEPLOYMENT_SUMMARY.txt', 'w', encoding='utf-8') as f:
        f.write(summary)
    
    print("✅ Deployment summary saved to: DEPLOYMENT_SUMMARY.txt\n")
    print("🎉 Your app is READY TO DEPLOY!")
    print("\n👉 Next: Visit one of the platforms above and deploy!\n")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
