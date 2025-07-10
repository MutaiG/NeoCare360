/**
 * NeoCare360 API Service Layer
 * Centralized service for all API calls to healthcare data sources
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-healthcare-api.com/api/v1';

// Configuration for different environments
const CONFIG = {
    timeout: 30000, // 30 seconds for healthcare data
    retries: 3,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

/**
 * Generic API request handler with error handling and retries
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        ...CONFIG,
        ...options,
        headers: {
            ...CONFIG.headers,
            ...options.headers,
            // Add authentication headers
            Authorization: `Bearer ${getAuthToken()}`,
            'X-Facility-ID': getCurrentFacilityId(),
        },
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`API Error for ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Authentication helpers
 */
function getAuthToken() {
    return localStorage.getItem('healthcare_auth_token') || sessionStorage.getItem('temp_token');
}

function getCurrentFacilityId() {
    return localStorage.getItem('current_facility_id') || 'default';
}

/**
 * OVERVIEW DASHBOARD APIs
 */
export const overviewAPI = {
    // Get real-time admission statistics
    getAdmissionStats: async (timeframe = '24h') => {
        return apiRequest(`/admissions/stats?timeframe=${timeframe}`);
    },

    // Get bed occupancy data across all wards
    getBedOccupancy: async (facilityId = null) => {
        const facility = facilityId || getCurrentFacilityId();
        return apiRequest(`/beds/occupancy?facility=${facility}`);
    },

    // Get emergency department metrics
    getEDMetrics: async () => {
        return apiRequest('/emergency/metrics');
    },

    // Get lab test data and turnaround times
    getLabMetrics: async () => {
        return apiRequest('/laboratory/metrics');
    },

    // Get active critical alerts
    getCriticalAlerts: async () => {
        return apiRequest('/alerts/critical');
    },

    // Get patient distribution by region
    getPatientDistribution: async () => {
        return apiRequest('/patients/distribution');
    },
};

/**
 * PATIENT MONITORING APIs
 */
export const patientMonitoringAPI = {
    // Get live patient vitals
    getLiveVitals: async (patientIds = []) => {
        const ids = patientIds.length ? `?patient_ids=${patientIds.join(',')}` : '';
        return apiRequest(`/patients/vitals/live${ids}`);
    },

    // Get patients under active monitoring
    getMonitoredPatients: async () => {
        return apiRequest('/patients/monitoring/active');
    },

    // Get clinical alerts by category
    getClinicalAlerts: async () => {
        return apiRequest('/alerts/clinical');
    },

    // Get vitals trends for heatmap
    getVitalsTrends: async (timeframe = '24h') => {
        return apiRequest(`/patients/vitals/trends?timeframe=${timeframe}`);
    },

    // Get alert-based diagnoses
    getAlertDiagnoses: async () => {
        return apiRequest('/diagnosis/alert-based');
    },
};

/**
 * ICU COMMAND CENTER APIs
 */
export const icuAPI = {
    // Get ICU capacity and utilization
    getICUCapacity: async () => {
        return apiRequest('/icu/capacity');
    },

    // Get ICU patients with risk levels
    getICUPatients: async () => {
        return apiRequest('/icu/patients');
    },

    // Get device utilization data
    getDeviceUtilization: async () => {
        return apiRequest('/icu/devices');
    },

    // Get ICU-specific alerts
    getICUAlerts: async () => {
        return apiRequest('/icu/alerts');
    },

    // Get stay duration analytics
    getStayAnalytics: async () => {
        return apiRequest('/icu/analytics/stay-duration');
    },

    // Get ICU diagnoses trends
    getICUDiagnoses: async () => {
        return apiRequest('/icu/diagnoses');
    },
};

/**
 * CLINICAL KPIs APIs
 */
export const clinicalKPIAPI = {
    // Get overall KPI metrics
    getKPIMetrics: async () => {
        return apiRequest('/kpis/clinical');
    },

    // Get department performance data
    getDepartmentPerformance: async () => {
        return apiRequest('/departments/performance');
    },

    // Get case findings trends
    getCaseFindingsTrends: async () => {
        return apiRequest('/clinical/case-findings');
    },

    // Get quality metrics
    getQualityMetrics: async () => {
        return apiRequest('/quality/metrics');
    },

    // Get admission/discharge trends
    getAdmissionTrends: async (period = '7d') => {
        return apiRequest(`/admissions/trends?period=${period}`);
    },
};

/**
 * RESOURCE MANAGEMENT APIs
 */
export const resourceAPI = {
    // Get bed resources by ward
    getBedResources: async () => {
        return apiRequest('/resources/beds');
    },

    // Get staff ratios and scheduling
    getStaffRatios: async () => {
        return apiRequest('/resources/staff');
    },

    // Get supply inventory levels
    getSupplyInventory: async () => {
        return apiRequest('/resources/supplies');
    },

    // Get device utilization across facility
    getDeviceResources: async () => {
        return apiRequest('/resources/devices');
    },

    // Get equipment downtime logs
    getDowntimeLogs: async () => {
        return apiRequest('/resources/downtime');
    },

    // Get resource-linked diagnoses
    getResourceDiagnoses: async () => {
        return apiRequest('/resources/diagnoses-linked');
    },
};

/**
 * REAL-TIME DATA STREAMING
 */
export const realtimeAPI = {
    // WebSocket connection for live updates
    connectLiveStream: (onMessage, onError) => {
        const wsUrl = API_BASE_URL.replace('http', 'ws') + '/stream';
        const socket = new WebSocket(wsUrl);

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (error) {
                console.error('WebSocket message parse error:', error);
            }
        };

        socket.onerror = onError;

        return socket;
    },

    // Server-Sent Events for continuous updates
    connectSSE: (endpoint, onMessage) => {
        const eventSource = new EventSource(`${API_BASE_URL}${endpoint}`);
        eventSource.onmessage = onMessage;
        return eventSource;
    },
};

/**
 * DATA CACHING AND OFFLINE SUPPORT
 */
export const cacheAPI = {
    // Store data locally for offline access
    cacheData: (key, data, ttl = 300000) => {
        // 5 minutes default
        const cacheItem = {
            data,
            timestamp: Date.now(),
            ttl,
        };
        localStorage.setItem(`neocare_cache_${key}`, JSON.stringify(cacheItem));
    },

    // Retrieve cached data if still valid
    getCachedData: (key) => {
        try {
            const cached = localStorage.getItem(`neocare_cache_${key}`);
            if (!cached) return null;

            const { data, timestamp, ttl } = JSON.parse(cached);

            if (Date.now() - timestamp > ttl) {
                localStorage.removeItem(`neocare_cache_${key}`);
                return null;
            }

            return data;
        } catch (error) {
            return null;
        }
    },
};

/**
 * ERROR HANDLING AND RECOVERY
 */
export const errorHandler = {
    // Handle network errors gracefully
    handleNetworkError: (error, fallbackData = null) => {
        console.error('Network Error:', error);

        // Return cached data if available
        if (fallbackData) {
            return fallbackData;
        }

        // Return empty state with error flag
        return {
            data: null,
            error: true,
            message: 'Unable to connect to healthcare systems. Please check your connection.',
        };
    },

    // Retry failed requests
    retryRequest: async (requestFn, maxRetries = 3, delay = 1000) => {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await requestFn();
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
            }
        }
    },
};

export default {
    overviewAPI,
    patientMonitoringAPI,
    icuAPI,
    clinicalKPIAPI,
    resourceAPI,
    realtimeAPI,
    cacheAPI,
    errorHandler,
};
