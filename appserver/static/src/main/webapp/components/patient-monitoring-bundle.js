import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { getThemeOptions } from '@splunk/splunk-utils/themes';

import PatientMonitoring from '../../../components/patient-monitoring/PatientMonitoring';
import { SplunkProvider } from '../../../contexts/SplunkContext';

// Initialize window.NeoCare360 namespace
if (!window.NeoCare360) {
    window.NeoCare360 = {};
}

// Patient Monitoring component initializer for Splunk
window.NeoCare360.initPatientMonitoring = function (containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const theme = getThemeOptions('enterprise');

    // Create filter context from Splunk options
    const filterContext = {
        selectedHospital: options.hospitalFilter || 'all',
        selectedWard: options.wardFilter || 'all',
        dateRange: options.timeRange || '24h',
        currentUser: {
            role: 'nurse',
            permissions: ['view_patients', 'update_vitals'],
        },
        healthcareMetrics: {
            activePatients: 245,
            criticalPatients: 15,
            stablePatients: 180,
            dischargedToday: 23,
            newAdmissions: 18,
        },
        getCurrentScope: () => 'hospital',
        getCurrentLocationName: () => 'Kenyatta National Hospital',
    };

    const PatientMonitoringApp = () => (
        <SplunkProvider value={filterContext}>
            <ThemeProvider theme={theme}>
                <PatientMonitoring
                    name="NeoCare360 Patient Monitoring"
                    filters={filterContext}
                    darkMode={false}
                />
            </ThemeProvider>
        </SplunkProvider>
    );

    const root = createRoot(container);
    root.render(<PatientMonitoringApp />);

    console.log('NeoCare360 Patient Monitoring initialized successfully');
};

// Auto-initialize if running in standalone mode
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('neocare360-patient-monitoring-app');
        if (container && !container.hasChildNodes()) {
            window.NeoCare360.initPatientMonitoring('neocare360-patient-monitoring-app');
        }
    });
} else {
    const container = document.getElementById('neocare360-patient-monitoring-app');
    if (container && !container.hasChildNodes()) {
        window.NeoCare360.initPatientMonitoring('neocare360-patient-monitoring-app');
    }
}
