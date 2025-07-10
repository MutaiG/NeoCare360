# NeoCare360 Splunk Cloud Deployment Guide

## ✅ Problem Solved

Your React app now properly integrates with Splunk Cloud and removes the default Splunk navigation, giving you full control over the UI experience.

## 📁 App Structure (Ready for Splunk Cloud)

```
NeoCare360/
├── app.manifest                           # App metadata
├── default/
│   ├── app.conf                          # Main app configuration (✅ Updated)
│   └── data/ui/
│       ├── nav/default.xml               # Minimal navigation (✅ Updated)
│       └── views/react_app.xml           # Main React app view (✅ New)
├── appserver/static/
│   ├── index.html                        # Standalone entry point (✅ New)
│   └── js/
│       ├���─ demo.js                       # Your React app bundle (✅ Built)
│       └── vendors.js                    # React/vendor libraries (✅ Built)
└── SPLUNK_CLOUD_DEPLOYMENT.md            # This guide
```

## 🚀 How to Deploy to Splunk Cloud

### Option 1: Via Splunk Web UI (Recommended)

1. **Package your app:**

   ```bash
   tar -czf neocare360.tar.gz NeoCare360/
   ```

2. **Upload via Splunk Web:**

   - Go to `Settings > Apps > Install app from file`
   - Upload `neocare360.tar.gz`
   - Click "Upload"

3. **Access your app:**
   - Go to `Apps > NeoCare360`
   - You should see your React SPA without Splunk's default navigation

### Option 2: Via Splunk CLI

```bash
# Install the app
splunk install app neocare360.tar.gz

# Restart Splunk
splunk restart
```

### Option 3: Direct Deployment (Splunk Enterprise)

```bash
# Copy app to Splunk apps directory
cp -r NeoCare360/ $SPLUNK_HOME/etc/apps/

# Restart Splunk
splunk restart
```

## 🔧 Key Configuration Changes Made

### 1. App Configuration (`default/app.conf`)

- Clean, standards-compliant configuration
- No non-standard stanzas that could cause warnings
- Uses standard Splunk app configuration patterns

### 2. Navigation (`default/data/ui/nav/default.xml`)

- Minimal navigation that only shows your React app
- No competing navigation elements

### 3. React App View (`default/data/ui/views/react_app.xml`)

- Loads your production React bundles
- Hides Splunk chrome for full-screen experience
- Proper error handling

### 4. Production Assets (`appserver/static/js/`)

- `demo.js` - Your React application code
- `vendors.js` - React and third-party libraries
- Built for production (no WebSocket dev server issues)

## 🎯 Access URLs

Once deployed, your app will be accessible at:

### Splunk Cloud:

- Main app: `https://your-instance.splunkcloud.com/en-US/app/NeoCare360/react_app`
- Direct HTML: `https://your-instance.splunkcloud.com/static/app/NeoCare360/index.html`

### Splunk Enterprise:

- Main app: `https://your-splunk:8000/en-US/app/NeoCare360/react_app`
- Direct HTML: `https://your-splunk:8000/static/app/NeoCare360/index.html`

## 🔍 Benchmarking Apps

Compare your setup with these successful React-based Splunk apps:

1. **Splunk Machine Learning Toolkit (MLTK)**

   - Uses similar React SPA approach
   - Full-screen experience without Splunk chrome

2. **Splunk App for PCI Compliance**

   - Custom navigation
   - Dashboard-style interface

3. **Splunk IT Service Intelligence (ITSI)**
   - React-based interface
   - Custom routing and navigation

## 🐛 Troubleshooting

### Issue: Still seeing Splunk navigation

**Solution:**

- Ensure `[nav] default = none` is in `app.conf`
- Check that `react_app.xml` is the default view
- Clear browser cache

### Issue: React app not loading

**Solution:**

- Check browser console for 404 errors on JS files
- Verify `js/demo.js` and `js/vendors.js` exist
- Check file permissions

### Issue: Permission denied

**Solution:**

- Ensure proper Splunk user roles have access
- Check app permissions in Splunk settings

## ✅ Success Criteria

Your app is properly deployed when:

- ✅ No Splunk default navigation visible
- ✅ Your React sidebar navigation works
- ✅ All components load properly
- ✅ No WebSocket connection errors
- ✅ Full-screen React SPA experience

## 🔄 Updates and Maintenance

To update your app:

1. Build new production assets: `yarn build`
2. Copy new bundles to `appserver/static/js/`
3. Re-package and deploy: `tar -czf neocare360-v2.tar.gz NeoCare360/`
4. Upload via Splunk Web or CLI

Your app is now ready for Splunk Cloud! 🎉
