import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const healthcareThemes = {
    light: {
        // Primary healthcare colors
        primary: '#2E7D32', // Medical green
        primaryHover: '#1B5E20',
        secondary: '#1976D2', // Trust blue
        accent: '#00ACC1', // Calming teal

        // Background and surfaces
        background: '#FAFAFA', // Soft white
        surface: '#FFFFFF',
        surfaceSecondary: '#F5F5F5',
        surfaceElevated: '#FFFFFF',

        // Text colors
        text: '#212121',
        textSecondary: '#616161',
        textMuted: '#9E9E9E',

        // Status colors for healthcare
        success: '#4CAF50', // Healthy/stable
        warning: '#FF9800', // Attention needed
        error: '#F44336', // Critical/emergency
        info: '#2196F3', // Information

        // Healthcare-specific
        heartRate: '#E91E63', // Pink for vitals
        oxygenLevel: '#3F51B5', // Blue for oxygen
        temperature: '#FF5722', // Orange for temperature
        bloodPressure: '#9C27B0', // Purple for BP

        // Borders and dividers
        border: '#E0E0E0',
        borderFocus: '#2E7D32',
        divider: '#F0F0F0',

        // Shadows and elevation
        shadow: '0 2px 4px rgba(0,0,0,0.1)',
        shadowElevated: '0 4px 12px rgba(0,0,0,0.15)',
        shadowFocus: '0 0 0 3px rgba(46, 125, 50, 0.2)',
    },

    dark: {
        // Primary healthcare colors (adjusted for dark mode)
        primary: '#66BB6A', // Lighter medical green
        primaryHover: '#4CAF50',
        secondary: '#42A5F5', // Lighter trust blue
        accent: '#26C6DA', // Lighter calming teal

        // Background and surfaces
        background: '#0A0E1A', // Deep navy (easier on eyes than pure black)
        surface: '#1A1F2E', // Dark blue-gray
        surfaceSecondary: '#242938',
        surfaceElevated: '#2A2F3E',

        // Text colors
        text: '#E8EAF0', // Soft white
        textSecondary: '#B0B3C1',
        textMuted: '#8085A3',

        // Status colors for healthcare (adjusted for dark mode)
        success: '#66BB6A', // Healthy/stable
        warning: '#FFB74D', // Attention needed
        error: '#EF5350', // Critical/emergency
        info: '#42A5F5', // Information

        // Healthcare-specific (darker background compatible)
        heartRate: '#F06292', // Pink for vitals
        oxygenLevel: '#5C6BC0', // Blue for oxygen
        temperature: '#FF7043', // Orange for temperature
        bloodPressure: '#BA68C8', // Purple for BP

        // Borders and dividers
        border: '#3A3F4E',
        borderFocus: '#66BB6A',
        divider: '#2A2F3E',

        // Shadows and elevation
        shadow: '0 2px 8px rgba(0,0,0,0.4)',
        shadowElevated: '0 4px 16px rgba(0,0,0,0.5)',
        shadowFocus: '0 0 0 3px rgba(102, 187, 106, 0.3)',
    },
};

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('neocare-theme');
        return saved ? JSON.parse(saved) : false;
    });

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('neocare-settings');
        return saved
            ? JSON.parse(saved)
            : {
                  // Theme settings
                  theme: darkMode ? 'dark' : 'light',
                  autoTheme: false,

                  // UI preferences
                  animations: true,
                  reducedMotion: false,
                  highContrast: false,
                  compactMode: false,

                  // Dashboard settings
                  autoRefresh: true,
                  refreshInterval: 30,
                  defaultView: 'overview',
                  alertSounds: true,
                  useRealData: true, // Enable real API data by default

                  // Accessibility
                  fontSize: 'medium',
                  language: 'en',

                  // Notifications
                  emailNotifications: true,
                  desktopNotifications: true,
                  smsNotifications: false,
                  alertFrequency: 'immediate',
              };
    });

    const currentTheme = healthcareThemes[darkMode ? 'dark' : 'light'];

    // Persist theme changes
    useEffect(() => {
        localStorage.setItem('neocare-theme', JSON.stringify(darkMode));
        localStorage.setItem('neocare-settings', JSON.stringify(settings));

        // Update document attributes for CSS access
        document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        document.body.setAttribute('data-animations', settings.animations ? 'enabled' : 'disabled');
        document.body.setAttribute('data-compact', settings.compactMode ? 'true' : 'false');

        // Update CSS custom properties
        const root = document.documentElement;
        Object.entries(currentTheme).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Set global theme variables
        root.style.setProperty('--theme-mode', darkMode ? 'dark' : 'light');
        root.style.setProperty(
            '--font-size-base',
            settings.fontSize === 'small' ? '14px' : settings.fontSize === 'large' ? '18px' : '16px'
        );
    }, [darkMode, settings, currentTheme]);

    // Auto theme detection
    useEffect(() => {
        if (!settings.autoTheme) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => setDarkMode(e.matches);

        mediaQuery.addEventListener('change', handleChange);
        setDarkMode(mediaQuery.matches);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [settings.autoTheme]);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
        updateSetting('theme', !darkMode ? 'dark' : 'light');
    };

    const updateSetting = (key, value) => {
        setSettings((prev) => {
            const newSettings = { ...prev, [key]: value };

            // Handle special theme setting
            if (key === 'theme') {
                if (value === 'auto') {
                    newSettings.autoTheme = true;
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    setDarkMode(prefersDark);
                } else {
                    newSettings.autoTheme = false;
                    setDarkMode(value === 'dark');
                }
            }

            return newSettings;
        });
    };

    const resetSettings = () => {
        const defaultSettings = {
            theme: 'light',
            autoTheme: false,
            animations: true,
            reducedMotion: false,
            highContrast: false,
            compactMode: false,
            autoRefresh: true,
            refreshInterval: 30,
            defaultView: 'overview',
            alertSounds: true,
            fontSize: 'medium',
            language: 'en',
            emailNotifications: true,
            desktopNotifications: true,
            smsNotifications: false,
            alertFrequency: 'immediate',
        };

        setSettings(defaultSettings);
        setDarkMode(false);
        localStorage.removeItem('neocare-theme');
        localStorage.removeItem('neocare-settings');
    };

    const exportSettings = () => {
        const exportData = {
            theme: darkMode ? 'dark' : 'light',
            settings,
            exportedAt: new Date().toISOString(),
            version: '1.0.0',
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `neocare-settings-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const importSettings = (settingsData) => {
        try {
            const { theme, settings: importedSettings } = settingsData;
            setSettings(importedSettings);
            setDarkMode(theme === 'dark');
        } catch (error) {
            console.error('Failed to import settings:', error);
            throw new Error('Invalid settings file format');
        }
    };

    const value = {
        // Theme state
        darkMode,
        theme: currentTheme,
        settings,

        // Theme actions
        toggleTheme,
        updateSetting,
        resetSettings,
        exportSettings,
        importSettings,

        // Computed values
        isAutoTheme: settings.autoTheme,
        currentThemeName: darkMode ? 'dark' : 'light',

        // Helper functions
        getThemeColor: (colorKey) => currentTheme[colorKey],
        isReducedMotion:
            settings.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
