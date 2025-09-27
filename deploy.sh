#!/bin/bash

# GetYourJSON Deployment Script
# This script builds and prepares the application for deployment

echo "🚀 Starting GetYourJSON deployment process..."

# Build the application for production
echo "📦 Building application for production..."
npx nx build getyourjson --configuration=production

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    
    # Create deployment directory
    echo "📁 Creating deployment directory..."
    mkdir -p deploy
    
    # Copy built files to deployment directory
    echo "📋 Copying files to deployment directory..."
    cp -r dist/apps/getyourjson/* deploy/
    
    # Create a simple index.html for SPA routing
    echo "🔧 Creating SPA routing configuration..."
    cat > deploy/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>GetYourJSON</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
</head>
<body>
    <app-root></app-root>
    <script type="module" src="main.js"></script>
</body>
</html>
EOF
    
    echo "✅ Deployment files ready in 'deploy' directory!"
    echo "📁 You can now upload the contents of the 'deploy' directory to your hosting platform."
    echo ""
    echo "🌐 Deployment options:"
    echo "   • Vercel: Connect your GitHub repo and deploy automatically"
    echo "   • Netlify: Drag and drop the 'deploy' folder"
    echo "   • GitHub Pages: Copy contents to 'docs' folder in your repo"
    echo "   • Any static hosting: Upload the 'deploy' folder contents"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
