// NeoCare360 Production API Service
// Replaces the demo API server with real Supabase backend
import axios from 'axios';

class ProductionApiService {
    constructor() {
        // Handle browser environment where process.env might not be available
        const apiUrl =
            typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL
                ? process.env.REACT_APP_API_URL
                : 'https://neocare360-fd1eltfeq-gideons-projects-29cd6adf.vercel.app/api/v1';

        this.baseUrl = apiUrl;
        this.timeout = 30000; // 30 seconds
        this.retryAttempts = 3;
        this.retryDelay = 1000; // 1 second
    }

    // Axios request method - much more reliable than fetch
    async axiosRequest(endpoint) {
        const url = `${this.baseUrl}${endpoint}`;
        console.log(`🚀 Axios API request to: ${url}`);

        try {
            const response = await axios.get(url, {
                timeout: this.timeout,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                // Axios handles CORS automatically
            });

            console.log(`✅ Axios success! Status: ${response.status}`);
            console.log(`📊 Data received:`, response.data);
            return response.data;
        } catch (error) {
            if (error.response) {
                // Handle specific 500 errors first
                if (error.response.status === 500) {
                    console.warn(
                        `🚨 Server Error (500) detected for ${endpoint} - Using fallback data`
                    );
                    return this.getFallbackData(endpoint);
                }

                console.error(`💥 Axios request failed:`, error.message);
                console.error(`📡 Response status: ${error.response.status}`);
                console.error(`📄 Response data:`, error.response.data);
            } else if (error.request) {
                console.error(`📡 No response received:`, error.request);
            } else {
                console.error(`⚙️ Request setup error:`, error.message);
            }

            console.warn(`🔄 Using fallback data for ${endpoint}`);
            return this.getFallbackData(endpoint);
        }
    }

    // Base request method with error handling and retry logic
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            mode: 'cors', // Explicitly set CORS mode
            timeout: this.timeout,
            ...options,
        };

        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                console.log(`🌐 API Request attempt ${attempt}: ${url}`);

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const response = await fetch(url, {
                    ...defaultOptions,
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);
                console.log(`✅ API Response ${response.status}: ${url}`);

                if (!response.ok) {
                    if (response.status === 401) {
                        console.warn('🔐 API Authentication Required. Using fallback mock data.');
                        return this.getFallbackData(endpoint);
                    }
                    if (response.status === 500) {
                        console.warn('💥 API Server Error (500). Using fallback mock data.');
                        return this.getFallbackData(endpoint);
                    }
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.warn(`❌ API request attempt ${attempt} failed:`, error.message);
                console.warn(`🔍 Error details:`, error);

                // Special handling for CORS errors and authentication issues
                if (
                    error.message.includes('Failed to fetch') ||
                    error.message.includes('CORS') ||
                    error.name === 'TypeError'
                ) {
                    console.warn('🚨 Network/CORS Error detected. Using fallback mock data.');
                    console.warn(`🔗 Attempted URL: ${url}`);
                    return this.getFallbackData(endpoint);
                }

                if (attempt === this.retryAttempts) {
                    console.error('🚨 API connection failed. Using fallback mock data.');
                    return this.getFallbackData(endpoint);
                }

                // Wait before retrying
                await new Promise((resolve) => setTimeout(resolve, this.retryDelay * attempt));
            }
        }
    }

    // Fallback data when API is not accessible
    getFallbackData(endpoint) {
        console.log(`🔄 Providing fallback data for ${endpoint}`);

        if (endpoint.includes('overview/dashboard')) {
            return {
                admissions: { admissions24h: 0, trend24h: 0 },
                bedOccupancy: {},
                emergency: { currentLoad: 0, avgWaitTime: 0 },
                laboratory: { testsToday: 0, avgTurnaroundTime: 0 },
                alerts: null,
                patientDistribution: { regions: [] },
                timestamp: new Date().toISOString(),
                _fallback: true,
                _message: 'API deployment protected - Using demo data',
            };
        }

        if (endpoint.includes('alerts/critical')) {
            return {
                criticalAlerts: [
                    {
                        id: 'fallback-001',
                        severity: 'critical',
                        title: 'ICU Capacity Alert',
                        message: 'ICU capacity approaching limit (85%)',
                        timestamp: '2 min ago',
                        priority: 1,
                        patient: 'Patient PT-001',
                        category: 'Capacity',
                        isAcknowledged: false,
                    },
                    {
                        id: 'fallback-002',
                        severity: 'critical',
                        title: 'Patient Vitals Alert',
                        message: 'Critical vital signs detected',
                        timestamp: '5 min ago',
                        priority: 2,
                        patient: 'Patient PT-002',
                        category: 'Clinical',
                        isAcknowledged: false,
                    },
                    {
                        id: 'fallback-003',
                        severity: 'critical',
                        title: 'Equipment Failure',
                        message: 'Ventilator malfunction in ICU-003',
                        timestamp: '12 min ago',
                        priority: 3,
                        patient: 'Patient PT-003',
                        category: 'Equipment',
                        isAcknowledged: false,
                    },
                ],
                totalCount: 3,
                timestamp: new Date().toISOString(),
                _fallback: true,
                _message: 'Using fallback data due to API server error',
            };
        }

        if (endpoint.includes('alerts/clinical')) {
            return {
                alerts: [
                    {
                        category: 'Cardiac',
                        count: 5,
                        severity: 'high',
                        icon: '❤️',
                        description: 'Irregular heart rhythms detected',
                    },
                    {
                        category: 'Respiratory',
                        count: 3,
                        severity: 'critical',
                        icon: '🫁',
                        description: 'Low oxygen saturation alerts',
                    },
                    {
                        category: 'Neurological',
                        count: 2,
                        severity: 'moderate',
                        icon: '🧠',
                        description: 'Consciousness level changes',
                    },
                    {
                        category: 'Metabolic',
                        count: 4,
                        severity: 'moderate',
                        icon: '⚡',
                        description: 'Blood sugar fluctuations',
                    },
                ],
                totalAlerts: 14,
                timestamp: new Date().toISOString(),
                _fallback: true,
                _message: 'Using fallback data due to API server error',
            };
        }

        if (endpoint.includes('patients/throughput')) {
            return {
                emergency: {
                    totalPatients: 156,
                    avgWaitTime: 42,
                    totalThroughput: 148,
                    avgLengthOfStay: 3.2,
                },
                wards: [
                    { name: 'General Medicine', totalAdmissions: 89, avgLengthOfStay: 4.5 },
                    { name: 'Surgery', totalAdmissions: 54, avgLengthOfStay: 6.2 },
                    { name: 'ICU', totalAdmissions: 28, avgLengthOfStay: 8.3 },
                ],
                _fallback: true,
                _message: 'Using fallback data due to API server error',
                timestamp: new Date().toISOString(),
            };
        }

        if (endpoint.includes('compliance/audit')) {
            return {
                overview: { overallScore: 87.3, totalAudits: 24, passedAudits: 21 },
                categories: [
                    { category: 'Patient Safety', score: 92.5, status: 'excellent' },
                    { category: 'Infection Control', score: 88.2, status: 'good' },
                    { category: 'Documentation', score: 85.7, status: 'good' },
                ],
                _fallback: true,
                _message: 'Using fallback data due to API server error',
                timestamp: new Date().toISOString(),
            };
        }

        if (endpoint.includes('reports/analytics')) {
            return {
                summary: { totalReports: 156, scheduledReports: 23, automatedReports: 89 },
                categories: [
                    { category: 'Clinical Reports', count: 45, icon: '📊' },
                    { category: 'Financial Reports', count: 32, icon: '💰' },
                    { category: 'Operational Reports', count: 38, icon: '⚙️' },
                ],
                _fallback: true,
                _message: 'Using fallback data due to API server error',
                timestamp: new Date().toISOString(),
            };
        }

        if (endpoint.includes('settings/user')) {
            return {
                user: { name: 'Demo User', role: 'Hospital Admin' },
                preferences: { theme: 'light', autoRefresh: true },
                permissions: { canViewPatientData: true, dataScope: ['hospital'] },
                _fallback: true,
                _message: 'Using fallback data due to API server error',
                timestamp: new Date().toISOString(),
            };
        }

        if (endpoint.includes('icu/command-center')) {
            return {
                capacity: {
                    totalBeds: 15,
                    availableBeds: 3,
                    occupiedBeds: 12,
                    maintenanceBeds: 0,
                    occupancyRate: 80,
                    averageStay: 4.2,
                    activeAlerts: 2,
                    ventilatorsPressure: 18.5,
                },
                patients: [
                    {
                        id: 'ICU001',
                        name: 'Patient JS',
                        age: 67,
                        diagnosis: 'Respiratory Failure',
                        riskLevel: 'critical',
                        heartRate: 95,
                        bloodPressure: '140/90',
                        oxygenSat: 92,
                        temperature: 38.2,
                        bed: 'ICU-01',
                        admissionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                        attendingPhysician: 'Dr. Smith',
                    },
                    {
                        id: 'ICU002',
                        name: 'Patient MJ',
                        age: 54,
                        diagnosis: 'Post-Surgical Recovery',
                        riskLevel: 'stable',
                        heartRate: 78,
                        bloodPressure: '125/82',
                        oxygenSat: 98,
                        temperature: 36.8,
                        bed: 'ICU-03',
                        admissionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                        attendingPhysician: 'Dr. Johnson',
                    },
                ],
                devices: {
                    devices: [
                        {
                            id: 1,
                            type: 'Ventilator',
                            patient: 'ICU001',
                            status: 'in-use',
                            location: 'ICU-01',
                            pressure: 18.5,
                        },
                        {
                            id: 2,
                            type: 'Cardiac Monitor',
                            patient: 'ICU001',
                            status: 'in-use',
                            location: 'ICU-01',
                        },
                        {
                            id: 3,
                            type: 'Infusion Pump',
                            patient: 'ICU002',
                            status: 'in-use',
                            location: 'ICU-03',
                            rate: 75,
                        },
                        {
                            id: 4,
                            type: 'Ventilator',
                            patient: null,
                            status: 'available',
                            location: 'ICU-05',
                        },
                    ],
                    utilizationRate: 75.0,
                    summary: { total: 4, active: 3, available: 1, maintenance: 0 },
                },
                alerts: [
                    {
                        id: 'ICU-ALERT-001',
                        title: 'Low Oxygen Saturation',
                        message: 'Patient ICU001 oxygen saturation dropping below 90%',
                        severity: 'critical',
                        category: 'clinical',
                        created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
                        is_acknowledged: false,
                        patient: { patient_number: 'ICU001' },
                    },
                ],
                _fallback: true,
                _message: 'Using fallback ICU data due to API server error',
                timestamp: new Date().toISOString(),
            };
        }

        return {
            _fallback: true,
            _message: 'API deployment protected - Using demo data',
            timestamp: new Date().toISOString(),
        };
    }

    // Overview Dashboard API
    async getOverviewDashboard(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.county_id) params.append('county_id', filters.county_id);
        if (filters.timeframe) params.append('timeframe', filters.timeframe);

        const endpoint = `/overview/dashboard${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    // Patient Monitoring API
    async getPatientMonitoring(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.ward) params.append('ward', filters.ward);
        if (filters.status) params.append('status', filters.status);
        if (filters.limit) params.append('limit', filters.limit);

        const endpoint = `/patients/monitoring${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    // ICU Command Center API
    async getICUCommandCenter(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);

        const endpoint = `/icu/command-center${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    // Clinical KPIs API
    async getClinicalKPIs(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.timeframe) params.append('timeframe', filters.timeframe);

        const endpoint = `/kpis/clinical${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    // Department Performance API
    async getDepartmentPerformance(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.days) params.append('days', filters.days);

        const endpoint = `/departments/performance${
            params.toString() ? `?${params.toString()}` : ''
        }`;
        return this.axiosRequest(endpoint);
    }

    // Resource Management APIs
    async getBedResources(filters = {}) {
        const params = new URLSearchParams();
        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);

        const endpoint = `/resources/beds${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    async getStaffResources(filters = {}) {
        const params = new URLSearchParams();
        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);

        const endpoint = `/resources/staff${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    async getSupplyResources(filters = {}) {
        const params = new URLSearchParams();
        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);

        const endpoint = `/resources/supplies${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    // Alerts APIs
    async getCriticalAlerts(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.limit) params.append('limit', filters.limit);

        const endpoint = `/alerts/critical${params.toString() ? `?${params.toString()}` : ''}`;
        console.log('🚨 Requesting critical alerts from:', `${this.baseUrl}${endpoint}`);
        const result = await this.axiosRequest(endpoint);
        console.log('🚨 Critical alerts result:', result._fallback ? 'FALLBACK DATA' : 'REAL DATA');
        return result;
    }

    async getClinicalAlerts(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);

        const endpoint = `/alerts/clinical${params.toString() ? `?${params.toString()}` : ''}`;
        console.log('🔔 Requesting clinical alerts from:', `${this.baseUrl}${endpoint}`);
        const result = await this.axiosRequest(endpoint);
        console.log('🔔 Clinical alerts result:', result._fallback ? 'FALLBACK DATA' : 'REAL DATA');
        return result;
    }

    // Laboratory API
    async getLaboratoryMetrics(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.timeframe) params.append('timeframe', filters.timeframe);

        const endpoint = `/laboratory/metrics${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    // Patient APIs
    async getLiveVitals(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.limit) params.append('limit', filters.limit);

        const endpoint = `/patients/vitals/live${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    async getPatientDistribution(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.county_id) params.append('county_id', filters.county_id);

        const endpoint = `/patients/distribution${
            params.toString() ? `?${params.toString()}` : ''
        }`;
        return this.axiosRequest(endpoint);
    }

    // Real-time data subscription (WebSocket or Server-Sent Events)
    subscribeToRealTimeUpdates(callback, filters = {}) {
        // Implement WebSocket connection for real-time updates
        const ws = new WebSocket(`${this.baseUrl.replace('http', 'ws')}/realtime`);

        ws.onopen = () => {
            console.log('Real-time connection established');
            // Send subscription filters
            ws.send(JSON.stringify({ type: 'subscribe', filters }));
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                callback(data);
            } catch (error) {
                console.error('Failed to parse real-time data:', error);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('Real-time connection closed');
            // Attempt to reconnect after delay
            setTimeout(() => {
                this.subscribeToRealTimeUpdates(callback, filters);
            }, 5000);
        };

        return ws;
    }

    // Patient Throughput API
    async getPatientThroughput(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.days) params.append('days', filters.days);

        const endpoint = `/patients/throughput${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    // Compliance API
    async getComplianceAudit(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.audit_type) params.append('audit_type', filters.audit_type);
        if (filters.days) params.append('days', filters.days);

        const endpoint = `/compliance/audit${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    // Reports API
    async getReportsAnalytics(filters = {}) {
        const params = new URLSearchParams();

        if (filters.hospital_id) params.append('hospital_id', filters.hospital_id);
        if (filters.report_type) params.append('report_type', filters.report_type);
        if (filters.timeframe) params.append('timeframe', filters.timeframe);

        const endpoint = `/reports/analytics${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    // Settings API
    async getUserSettings(userId) {
        const params = new URLSearchParams();
        if (userId) params.append('user_id', userId);

        const endpoint = `/settings/user${params.toString() ? `?${params.toString()}` : ''}`;
        return this.axiosRequest(endpoint);
    }

    async updateUserSettings(userId, settings) {
        const endpoint = '/settings/user';
        return this.axiosRequest(endpoint, {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, ...settings }),
        });
    }

    // Mock data methods for endpoints not yet implemented

    async getMockClinicalKPIs(filters = {}) {
        return {
            avgLengthOfStay: 5.2 + Math.random() * 2 - 1,
            readmissionRate: 8.7 + Math.random() * 3 - 1.5,
            mortalityRate: 2.1 + Math.random() * 1 - 0.5,
            labTurnaroundTime: 3.4 + Math.random() * 2 - 1,
            surgerySuccessRate: 94.8 + Math.random() * 3 - 1.5,
            infectionRate: 1.2 + Math.random() * 1 - 0.5,
            departments: [
                {
                    department: 'Emergency',
                    avgLOS: 4.2,
                    readmission: 6.5,
                    mortality: 1.8,
                    rating: 'A',
                },
                {
                    department: 'Surgery',
                    avgLOS: 6.8,
                    readmission: 12.3,
                    mortality: 2.9,
                    rating: 'B+',
                },
                { department: 'ICU', avgLOS: 8.5, readmission: 15.2, mortality: 8.7, rating: 'B' },
                {
                    department: 'Pediatrics',
                    avgLOS: 3.1,
                    readmission: 4.2,
                    mortality: 0.8,
                    rating: 'A+',
                },
                {
                    department: 'Cardiology',
                    avgLOS: 5.9,
                    readmission: 9.8,
                    mortality: 3.4,
                    rating: 'B+',
                },
            ],
            timestamp: new Date().toISOString(),
        };
    }

    async getMockResourceManagement(filters = {}) {
        return {
            bedResources: [
                { ward: 'ICU', total: 15, occupied: 12, available: 3, utilization: 80 },
                { ward: 'General', total: 60, occupied: 45, available: 15, utilization: 75 },
                { ward: 'Surgery', total: 40, occupied: 32, available: 8, utilization: 80 },
                { ward: 'Pediatrics', total: 25, occupied: 18, available: 7, utilization: 72 },
                { ward: 'Emergency', total: 12, occupied: 8, available: 4, utilization: 67 },
            ],
            staffRatios: [
                {
                    department: 'ICU',
                    nurses: 8,
                    patients: 12,
                    ratio: 1.5,
                    target: 2.0,
                    status: 'low',
                },
                {
                    department: 'Surgery',
                    nurses: 6,
                    patients: 32,
                    ratio: 5.3,
                    target: 4.0,
                    status: 'over',
                },
                {
                    department: 'Pediatrics',
                    nurses: 4,
                    patients: 18,
                    ratio: 4.5,
                    target: 4.0,
                    status: 'good',
                },
                {
                    department: 'General',
                    nurses: 12,
                    patients: 45,
                    ratio: 3.8,
                    target: 4.0,
                    status: 'good',
                },
            ],
            supplyInventory: [
                { item: 'N95 Masks', current: 450, minimum: 200, maximum: 800, status: 'good' },
                {
                    item: 'Surgical Gloves',
                    current: 2400,
                    minimum: 1000,
                    maximum: 5000,
                    status: 'good',
                },
                { item: 'Hand Sanitizer', current: 85, minimum: 100, maximum: 300, status: 'low' },
                { item: 'Oxygen Tanks', current: 45, minimum: 30, maximum: 80, status: 'good' },
                { item: 'IV Bags', current: 180, minimum: 150, maximum: 500, status: 'good' },
                { item: 'Syringes', current: 950, minimum: 500, maximum: 2000, status: 'good' },
            ],
            timestamp: new Date().toISOString(),
        };
    }

    async getMockAlerts(filters = {}) {
        return {
            criticalAlerts: [
                {
                    id: 1,
                    severity: 'critical',
                    title: 'ICU Capacity Alert',
                    message: 'ICU capacity approaching limit (85%)',
                    timestamp: '2 min ago',
                    priority: 1,
                },
                {
                    id: 2,
                    severity: 'warning',
                    title: 'Oxygen Supply Warning',
                    message: 'Oxygen supply low in Ward 3',
                    timestamp: '5 min ago',
                    priority: 2,
                },
                {
                    id: 3,
                    severity: 'info',
                    title: 'Equipment Maintenance',
                    message: 'Ventilator maintenance due in ICU-2',
                    timestamp: '12 min ago',
                    priority: 3,
                },
            ],
            totalCount: 3,
            timestamp: new Date().toISOString(),
        };
    }
}

// Export singleton instance
export const productionApi = new ProductionApiService();
export default productionApi;
