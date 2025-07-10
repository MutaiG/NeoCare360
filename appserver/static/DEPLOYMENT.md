# NeoCare360 Deployment Guide for Splunk Cloud

## Problem Solved

This configuration fixes the WebSocket connection errors that were occurring when deploying to Splunk Cloud:

- `WebSocket connection to 'wss://...:3001/ws' failed`
- `[webpack-dev-server] Event {isTrusted: true, type: 'error'...}`

## Build for Production

To create a production build that's safe for Splunk Cloud deployment:

```bash
# Navigate to the static directory
cd appserver/static

# Build for production (no WebSocket connections)
yarn build

# Or use the build script
node bin/build.js build
```

## What the Production Build Does

1. **Removes WebSocket connections** - No dev server WebSocket code
2. **Minifies code** - Smaller bundle size
3. **Content hashing** - Cache-busting for browser updates
4. **Splits chunks** - Separates vendor code from app code
5. **Removes source maps** - Cleaner production deployment

## Files Generated

After running the build, you'll find these files in `appserver/static/build/`:

- `index.html` - Main HTML file
- `demo.[hash].js` - Your application code (minified)
- `616.[hash].js` - Third-party vendor libraries (React, etc.)
- `*.LICENSE.txt` - License files for compliance

## Deployment to Splunk Cloud

1. **Build the application:**

   ```bash
   yarn build
   ```

2. **Copy build files** to your Splunk app's static directory structure
3. **Update your Splunk app configuration** to serve the built files
4. **Deploy the app** to Splunk Cloud

## Development vs Production

- **Development** (`yarn start`): Includes hot reload, WebSocket connections, source maps
- **Production** (`yarn build`): No WebSocket connections, minified, optimized for deployment

## Troubleshooting

If you still see WebSocket errors after deployment:

1. Ensure you're using the production build (`yarn build`)
2. Check that no development files are being served
3. Verify your Splunk app is serving static files from the correct build directory

## Environment Variables

The build process respects `NODE_ENV`:

- `NODE_ENV=development` - Development mode with WebSocket support
- `NODE_ENV=production` - Production mode without WebSocket connections
