#!/bin/bash

echo "🔍 Verifying NeoCare360 Splunk Cloud Deployment Structure..."
echo ""

# Check required files
files=(
    "default/app.conf"
    "default/data/ui/nav/default.xml"
    "default/data/ui/views/react_app.xml"
    "appserver/static/index.html"
    "appserver/static/js/demo.js"
    "appserver/static/js/vendors.js"
    "app.manifest"
)

missing_files=0

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (MISSING)"
        missing_files=$((missing_files + 1))
    fi
done

echo ""

# Check file sizes
echo "📊 File Sizes:"
if [ -f "appserver/static/js/demo.js" ]; then
    demo_size=$(du -h appserver/static/js/demo.js | cut -f1)
    echo "   demo.js: $demo_size"
fi

if [ -f "appserver/static/js/vendors.js" ]; then
    vendors_size=$(du -h appserver/static/js/vendors.js | cut -f1)
    echo "   vendors.js: $vendors_size"
fi

echo ""

# Check app.conf configuration
echo "⚙️ App Configuration:"
if [ -f "default/app.conf" ]; then
    if grep -q "default = none" default/app.conf; then
        echo "✅ Navigation disabled correctly"
    else
        echo "⚠️  Navigation may not be disabled"
    fi
    
    if grep -q "default = react_app" default/app.conf; then
        echo "✅ Default view set to react_app"
    else
        echo "⚠️  Default view may not be set correctly"
    fi
fi

echo ""

# Summary
if [ $missing_files -eq 0 ]; then
    echo "🎉 All required files are present!"
    echo "📦 Ready to package for Splunk Cloud deployment:"
    echo "   tar -czf neocare360.tar.gz NeoCare360/"
else
    echo "❌ $missing_files file(s) missing. Please check the deployment guide."
fi
