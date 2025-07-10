# NeoCare360 App Icons

## 🎨 Icon Design

The NeoCare360 app icon combines:

-   **Medical Cross**: Universal healthcare symbol
-   **Blue Color Scheme**: Professional, trustworthy medical theme
-   **Heart Rate Line**: Analytics/monitoring aspect
-   **Green Dot**: Real-time data indicator

## 📐 Required Formats

Splunk requires these icon files:

```
static/
├── appIcon.png          # 36x36 pixels - main icon
├── appIcon_2x.png       # 72x72 pixels - retina display
└── appIconAlt.png       # 36x36 pixels - alternative (optional)
```

## 🔧 Convert SVG to PNG

### Using ImageMagick (Linux/macOS):

```bash
# Install ImageMagick
brew install imagemagick  # macOS
sudo apt install imagemagick  # Ubuntu

# Convert to required sizes
convert app_icon.svg -resize 36x36 appIcon.png
convert app_icon.svg -resize 72x72 appIcon_2x.png
convert app_icon.svg -resize 36x36 appIconAlt.png
```

### Using Inkscape:

```bash
# Install Inkscape
inkscape app_icon.svg -w 36 -h 36 --export-png=appIcon.png
inkscape app_icon.svg -w 72 -h 72 --export-png=appIcon_2x.png
```

### Online Conversion:

1. Go to https://convertio.co/svg-png/
2. Upload `app_icon.svg`
3. Set dimensions to 36x36 and 72x72
4. Download PNG files

## 🎯 Icon Features

-   **Professional**: Medical blue color scheme
-   **Recognizable**: Clear medical cross symbol
-   **Modern**: Clean, flat design style
-   **Scalable**: SVG source for any size needed
-   **Theme-appropriate**: Healthcare analytics focus

## 🖼️ Alternative Icon Ideas

If you want different icons, consider:

-   Stethoscope + chart
-   Hospital building + data lines
-   Heart + monitoring waves
-   Kenya map + medical cross
-   ECG line forming a heart shape
