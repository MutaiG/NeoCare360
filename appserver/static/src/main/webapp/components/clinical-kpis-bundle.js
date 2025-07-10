import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { getThemeOptions } from '@splunk/splunk-utils/themes';

import ClinicalKpIs from '../../../components/clinical-kpis/ClinicalKpIs';
import { SplunkProvider } from '../../../contexts/SplunkContext';

// Initialize window.NeoCare360 namespace
if (!window.NeoCare360) {
    window.NeoCare360 = {};
}

// Clinical KPIs component initializer for Splunk
window.NeoCare360.initClinicalKPIs = function (containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const theme = getThemeOptions('enterprise');

    // Create filter context from Splunk options
    const filterContext = {
        selectedHospital: options.hospitalFilter || 'all',
        selectedDepartment: options.departmentFilter || 'all',
        dateRange: options.timeRange || '30d',
        currentUser: {
            role: 'chief_medical_officer',
            permissions: ['view_kpis', 'view_analytics', 'export_reports'],
        },
        healthcareMetrics: {
            patientSatisfaction: 87.5,
            readmissionRate: 8.2,
            mortalityRate: 2.1,
            avgLengthOfStay: 4.2,
            emergencyWaitTime: 45,
            bedOccupancyRate: 78,
            staffProductivity: 92,
            medicationErrors: 0.3,
        },
        getCurrentScope: () => 'county',
        getCurrentLocationName: () => 'Nairobi County Healthcare System',
    };

    const ClinicalKPIsApp = () => (
        <SplunkProvider value={filterContext}>
            <ThemeProvider theme={theme}>
                <ClinicalKpIs
                    name="NeoCare360 Clinical KPIs"
                    filters={filterContext}
                    darkMode={false}
                />
            </ThemeProvider>
        </SplunkProvider>
    );

    const root = createRoot(container);
    root.render(<ClinicalKPIsApp />);

    console.log('NeoCare360 Clinical KPIs initialized successfully');
};

// Auto-initialize if running in standalone mode
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('neocare360-clinical-kpis-app');
        if (container && !container.hasChildNodes()) {
            window.NeoCare360.initClinicalKPIs('neocare360-clinical-kpis-app');
        }
    });
} else {
    const container = document.getElementById('neocare360-clinical-kpis-app');
    if (container && !container.hasChildNodes()) {
        window.NeoCare360.initClinicalKPIs('neocare360-clinical-kpis-app');
    }
}
