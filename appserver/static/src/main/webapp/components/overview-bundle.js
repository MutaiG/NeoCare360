import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { getThemeOptions } from '@splunk/splunk-utils/themes';

import Overview from '../../../components/overview/Overview';
import { SplunkProvider } from '../../../contexts/SplunkContext';

// Initialize window.NeoCare360 namespace
if (!window.NeoCare360) {
    window.NeoCare360 = {};
}

// Overview component initializer for Splunk
window.NeoCare360.initOverview = function (containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const theme = getThemeOptions('enterprise');

    // Create filter context from Splunk options
    const filterContext = {
        selectedHospital: options.hospitalFilter || 'all',
        selectedCounty: options.countyFilter || 'all',
        dateRange: options.timeRange || '7d',
        currentUser: {
            role: 'chief_medical_officer', // Default role, should be passed from Splunk
            permissions: ['view_all', 'export_data'],
        },
        healthcareMetrics: {
            // This would typically come from Splunk search results
            totalPatients: 1245,
            totalAdmissions: 89,
            criticalPatients: 15,
            totalHospitals: 47,
            totalCounties: 47,
        },
        // Mock function for scope management
        getCurrentScope: () => 'county',
        getCurrentLocationName: () => 'Nairobi County',
    };

    const OverviewApp = () => (
        <SplunkProvider value={filterContext}>
            <ThemeProvider theme={theme}>
                <Overview
                    name="NeoCare360 Dashboard Overview"
                    filters={filterContext}
                    darkMode={false}
                />
            </ThemeProvider>
        </SplunkProvider>
    );

    const root = createRoot(container);
    root.render(<OverviewApp />);

    console.log('NeoCare360 Overview initialized successfully');
};

// Auto-initialize if running in standalone mode
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('neocare360-overview-app');
        if (container && !container.hasChildNodes()) {
            window.NeoCare360.initOverview('neocare360-overview-app');
        }
    });
} else {
    const container = document.getElementById('neocare360-overview-app');
    if (container && !container.hasChildNodes()) {
        window.NeoCare360.initOverview('neocare360-overview-app');
    }
}
