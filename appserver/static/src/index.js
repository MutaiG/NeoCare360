import React from 'react';
import { createRoot } from 'react-dom/client';
import NeoCare360App from './main/webapp/pages/start/NeoCare360App.jsx';

// Global error handlers to catch unhandled errors
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error || event.message);
    console.error('Error details:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
    });
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault(); // Prevent the default browser behavior
});

// Override console methods to handle [object Event] issues
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

const safeLog = (method, ...args) => {
    const processedArgs = args.map((arg) => {
        if (arg && typeof arg === 'object' && arg.toString() === '[object Event]') {
            return `Event: ${arg.type || 'unknown'} at ${arg.target?.tagName || 'unknown target'}`;
        }
        return arg;
    });
    method.apply(console, processedArgs);
};

console.log = (...args) => safeLog(originalConsoleLog, ...args);
console.error = (...args) => safeLog(originalConsoleError, ...args);
console.warn = (...args) => safeLog(originalConsoleWarn, ...args);

// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('React Error Boundary caught an error:', error, errorInfo);

        // Also log to webpack dev server if available
        if (typeof window.__webpack_dev_server__ !== 'undefined') {
            console.error('[webpack-dev-server] React Error:', error);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                    <h1>Something went wrong.</h1>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        <summary>Error Details</summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.error && this.state.error.stack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

// Function to mount React app to any container
const mountNeoCare360 = (containerId, config = {}) => {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Failed to find element with id="${containerId}"`);
        return false;
    }

    try {
        // Clear any existing content
        container.innerHTML = '';

        // Create a root and render the app with error boundary
        const root = createRoot(container);
        root.render(
            <ErrorBoundary>
                <NeoCare360App initialConfig={config} />
            </ErrorBoundary>
        );

        console.log(`NeoCare360 app mounted successfully to #${containerId}`);
        return true;
    } catch (error) {
        console.error('Failed to render React app:', error);
        container.innerHTML = `<div style="padding: 20px; color: red;">
            <h1>Failed to load NeoCare360</h1>
            <pre>${error.toString()}</pre>
        </div>`;
        return false;
    }
};

// Expose global NeoCare360 functions for Splunk XML integration
window.NeoCare360 = {
    initOverview: (containerId, config) =>
        mountNeoCare360(containerId, { ...config, initialView: 'overview' }),
    initPatientMonitoring: (containerId, config) =>
        mountNeoCare360(containerId, { ...config, initialView: 'patient_monitoring' }),
    initICUCommandCenter: (containerId, config) =>
        mountNeoCare360(containerId, { ...config, initialView: 'icu_command_center' }),
    initClinicalKPIs: (containerId, config) =>
        mountNeoCare360(containerId, { ...config, initialView: 'clinical_kpis' }),
    mount: mountNeoCare360,
};

// Try to mount to 'root' element (for standalone usage)
const rootContainer = document.getElementById('root');
if (rootContainer) {
    mountNeoCare360('root');
} else {
    console.log('No root element found, waiting for Splunk XML integration...');
}
