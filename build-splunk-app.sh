#!/bin/bash

# NeoCare360 Splunk App Build Script
# This script builds the React components and packages the app for Splunk deployment

set -e

echo "🏥 Building NeoCare360 Splunk App..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
find appserver/static/build -mindepth 1 -delete 2>/dev/null || true
rm -f neocare360.tar.gz

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build React components
echo "⚛️ Building React components..."
npm run build

# Create symlinks for component packages (since we're using monorepo structure)
echo "🔗 Creating component symlinks..."
mkdir -p node_modules/@splunk
cd node_modules/@splunk

# Create symlinks to our component packages
ln -sf ../../packages/overview overview 2>/dev/null || true
ln -sf ../../packages/patient-monitoring patient-monitoring 2>/dev/null || true
ln -sf ../../packages/icu-command-center icu-command-center 2>/dev/null || true
ln -sf ../../packages/clinical-kp-is clinical-kp-is 2>/dev/null || true
ln -sf ../../packages/resource-management resource-management 2>/dev/null || true
ln -sf ../../packages/alerts alerts 2>/dev/null || true
ln -sf ../../packages/compliance compliance 2>/dev/null || true
ln -sf ../../packages/reports reports 2>/dev/null || true
ln -sf ../../packages/laboratory laboratory 2>/dev/null || true
ln -sf ../../packages/patient-vitals patient-vitals 2>/dev/null || true
ln -sf ../../packages/settings settings 2>/dev/null || true

cd ../..

# Copy built assets to the correct Splunk locations
echo "📁 Organizing Splunk assets..."
mkdir -p appserver/static/js appserver/static/css appserver/static/images

# Copy webpack build outputs
if [ -d "appserver/static/build/js" ]; then
    cp appserver/static/build/js/* appserver/static/js/ 2>/dev/null || true
fi

if [ -d "appserver/static/build/css" ]; then
    cp appserver/static/build/css/* appserver/static/css/ 2>/dev/null || true
fi

if [ -d "appserver/static/build/images" ]; then
    cp appserver/static/build/images/* appserver/static/images/ 2>/dev/null || true
fi

# Validate Splunk app structure
echo "✅ Validating Splunk app structure..."

required_files=(
    "app.conf"
    "default/app.conf"
    "default/data/ui/nav/default.xml"
    "metadata/default.meta"
    "appserver/static/js"
)

for file in "${required_files[@]}"; do
    if [ ! -e "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done

echo "✅ All required files present"

# Create app package
echo "📦 Creating Splunk app package..."
tar --exclude='node_modules' \
    --exclude='.git' \
    --exclude='*.log' \
    --exclude='packages' \
    --exclude='api' \
    --exclude='build-splunk-app.sh' \
    --exclude='appserver/static/demo' \
    --exclude='appserver/static/src' \
    -czf neocare360.tar.gz .

# Display package info
echo "📊 Package Information:"
echo "   Package: neocare360.tar.gz"
echo "   Size: $(du -h neocare360.tar.gz | cut -f1)"
echo "   Contents:"
tar -tzf neocare360.tar.gz | head -20
if [ $(tar -tzf neocare360.tar.gz | wc -l) -gt 20 ]; then
    echo "   ... and $(($$(tar -tzf neocare360.tar.gz | wc -l) - 20)) more files"
fi

echo ""
echo "🎉 NeoCare360 Splunk App built successfully!"
echo ""
echo "📥 Installation Instructions:"
echo "   1. Upload neocare360.tar.gz to Splunk via Apps > Manage Apps > Install app from file"
echo "   2. Or use CLI: splunk install app neocare360.tar.gz"
echo "   3. Restart Splunk if prompted"
echo "   4. Navigate to the NeoCare360 app"
echo ""
echo "🔧 Development:"
echo "   To continue development, use: npm run watch"
echo "   To rebuild: ./build-splunk-app.sh"
