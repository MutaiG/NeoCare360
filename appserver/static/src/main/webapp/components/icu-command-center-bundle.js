import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { getThemeOptions } from '@splunk/splunk-utils/themes';

import IcuCommandCenter from '../../../components/icu-command-center/IcuCommandCenter';
import { SplunkProvider } from '../../../contexts/SplunkContext';

// Initialize window.NeoCare360 namespace
if (!window.NeoCare360) {
    window.NeoCare360 = {};
}

// ICU Command Center component initializer for Splunk
window.NeoCare360.initICUCommandCenter = function (containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const theme = getThemeOptions('enterprise');

    // Create filter context from Splunk options
    const filterContext = {
        selectedHospital: options.hospitalFilter || 'all',
        riskLevel: options.riskLevel || 'all',
        dateRange: options.timeRange || '4h',
        currentUser: {
            role: 'icu_specialist',
            permissions: ['view_icu', 'manage_emergency', 'access_critical_data'],
        },
        healthcareMetrics: {
            icuBeds: 15,
            criticalPatients: 8,
            stablePatients: 4,
            availableBeds: 3,
            ventilatorsPressure: 18.5,
            activeAlerts: 3,
            avgWaitTime: 4.2,
        },
        getCurrentScope: () => 'hospital',
        getCurrentLocationName: () => 'ICU Ward - Kenyatta National Hospital',
    };

    const ICUApp = () => (
        <SplunkProvider value={filterContext}>
            <ThemeProvider theme={theme}>
                <IcuCommandCenter
                    name="NeoCare360 ICU Command Center"
                    filters={filterContext}
                    darkMode={false}
                    autoRefresh={true}
                />
            </ThemeProvider>
        </SplunkProvider>
    );

    const root = createRoot(container);
    root.render(<ICUApp />);

    console.log('NeoCare360 ICU Command Center initialized successfully');
};

// Auto-initialize if running in standalone mode
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('neocare360-icu-command-center-app');
        if (container && !container.hasChildNodes()) {
            window.NeoCare360.initICUCommandCenter('neocare360-icu-command-center-app');
        }
    });
} else {
    const container = document.getElementById('neocare360-icu-command-center-app');
    if (container && !container.hasChildNodes()) {
        window.NeoCare360.initICUCommandCenter('neocare360-icu-command-center-app');
    }
}
