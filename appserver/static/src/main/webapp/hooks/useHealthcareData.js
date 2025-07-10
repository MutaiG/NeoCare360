/**
 * Custom React Hooks for Healthcare Data Management
 * Provides data fetching, caching, and real-time updates for NeoCare360
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import apiService from '../services/apiService';

/**
 * Overview Dashboard Data Hook
 */
export const useOverviewData = (filters = {}) => {
    const [data, setData] = useState({
        admissionStats: null,
        bedOccupancy: null,
        edMetrics: null,
        labMetrics: null,
        alerts: null,
        patientDistribution: null,
        loading: true,
        error: null,
    });

    const fetchOverviewData = useCallback(async () => {
        try {
            setData((prev) => ({ ...prev, loading: true, error: null }));

            // Fetch all overview data in parallel
            const [
                admissionStats,
                bedOccupancy,
                edMetrics,
                labMetrics,
                alerts,
                patientDistribution,
            ] = await Promise.all([
                apiService.overviewAPI.getAdmissionStats(),
                apiService.overviewAPI.getBedOccupancy(),
                apiService.overviewAPI.getEDMetrics(),
                apiService.overviewAPI.getLabMetrics(),
                apiService.overviewAPI.getCriticalAlerts(),
                apiService.overviewAPI.getPatientDistribution(),
            ]);

            setData({
                admissionStats,
                bedOccupancy,
                edMetrics,
                labMetrics,
                alerts,
                patientDistribution,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error('Overview data fetch error:', error);
            setData((prev) => ({
                ...prev,
                loading: false,
                error: 'Failed to load dashboard data',
            }));
        }
    }, []);

    useEffect(() => {
        fetchOverviewData();

        // Set up periodic refresh for real-time updates
        const interval = setInterval(fetchOverviewData, 30000); // Every 30 seconds

        return () => clearInterval(interval);
    }, [fetchOverviewData, filters]);

    return {
        ...data,
        refresh: fetchOverviewData,
    };
};

/**
 * Patient Monitoring Data Hook
 */
export const usePatientMonitoringData = (filters = {}) => {
    const [data, setData] = useState({
        liveVitals: [],
        monitoredPatients: [],
        clinicalAlerts: [],
        vitalsTrends: [],
        alertDiagnoses: [],
        loading: true,
        error: null,
    });

    const fetchPatientData = useCallback(async () => {
        try {
            setData((prev) => ({ ...prev, loading: true, error: null }));

            const [liveVitals, monitoredPatients, clinicalAlerts, vitalsTrends, alertDiagnoses] =
                await Promise.all([
                    apiService.patientMonitoringAPI.getLiveVitals(),
                    apiService.patientMonitoringAPI.getMonitoredPatients(),
                    apiService.patientMonitoringAPI.getClinicalAlerts(),
                    apiService.patientMonitoringAPI.getVitalsTrends(),
                    apiService.patientMonitoringAPI.getAlertDiagnoses(),
                ]);

            setData({
                liveVitals,
                monitoredPatients,
                clinicalAlerts,
                vitalsTrends,
                alertDiagnoses,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error('Patient monitoring data fetch error:', error);
            setData((prev) => ({
                ...prev,
                loading: false,
                error: 'Failed to load patient monitoring data',
            }));
        }
    }, []);

    useEffect(() => {
        fetchPatientData();

        // More frequent updates for patient monitoring (every 10 seconds)
        const interval = setInterval(fetchPatientData, 10000);

        return () => clearInterval(interval);
    }, [fetchPatientData, filters]);

    return {
        ...data,
        refresh: fetchPatientData,
    };
};

/**
 * ICU Command Center Data Hook
 */
export const useICUData = (filters = {}) => {
    const [data, setData] = useState({
        capacity: null,
        patients: [],
        devices: [],
        alerts: [],
        stayAnalytics: [],
        diagnoses: [],
        loading: true,
        error: null,
    });

    const fetchICUData = useCallback(async () => {
        try {
            setData((prev) => ({ ...prev, loading: true, error: null }));

            const [capacity, patients, devices, alerts, stayAnalytics, diagnoses] =
                await Promise.all([
                    apiService.icuAPI.getICUCapacity(),
                    apiService.icuAPI.getICUPatients(),
                    apiService.icuAPI.getDeviceUtilization(),
                    apiService.icuAPI.getICUAlerts(),
                    apiService.icuAPI.getStayAnalytics(),
                    apiService.icuAPI.getICUDiagnoses(),
                ]);

            setData({
                capacity,
                patients,
                devices,
                alerts,
                stayAnalytics,
                diagnoses,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error('ICU data fetch error:', error);
            setData((prev) => ({
                ...prev,
                loading: false,
                error: 'Failed to load ICU data',
            }));
        }
    }, []);

    useEffect(() => {
        fetchICUData();

        // Critical ICU data updates every 15 seconds
        const interval = setInterval(fetchICUData, 15000);

        return () => clearInterval(interval);
    }, [fetchICUData, filters]);

    return {
        ...data,
        refresh: fetchICUData,
    };
};

/**
 * Clinical KPIs Data Hook
 */
export const useClinicalKPIData = (filters = {}) => {
    const [data, setData] = useState({
        kpiMetrics: null,
        departmentPerformance: [],
        caseFindingsTrends: [],
        qualityMetrics: [],
        admissionTrends: [],
        loading: true,
        error: null,
    });

    const fetchKPIData = useCallback(async () => {
        try {
            setData((prev) => ({ ...prev, loading: true, error: null }));

            const [
                kpiMetrics,
                departmentPerformance,
                caseFindingsTrends,
                qualityMetrics,
                admissionTrends,
            ] = await Promise.all([
                apiService.clinicalKPIAPI.getKPIMetrics(),
                apiService.clinicalKPIAPI.getDepartmentPerformance(),
                apiService.clinicalKPIAPI.getCaseFindingsTrends(),
                apiService.clinicalKPIAPI.getQualityMetrics(),
                apiService.clinicalKPIAPI.getAdmissionTrends(),
            ]);

            setData({
                kpiMetrics,
                departmentPerformance,
                caseFindingsTrends,
                qualityMetrics,
                admissionTrends,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error('Clinical KPI data fetch error:', error);
            setData((prev) => ({
                ...prev,
                loading: false,
                error: 'Failed to load clinical KPI data',
            }));
        }
    }, []);

    useEffect(() => {
        fetchKPIData();

        // KPI data updates every 5 minutes
        const interval = setInterval(fetchKPIData, 300000);

        return () => clearInterval(interval);
    }, [fetchKPIData, filters]);

    return {
        ...data,
        refresh: fetchKPIData,
    };
};

/**
 * Resource Management Data Hook
 */
export const useResourceData = (filters = {}) => {
    const [data, setData] = useState({
        bedResources: [],
        staffRatios: [],
        supplyInventory: [],
        deviceResources: [],
        downtimeLogs: [],
        resourceDiagnoses: [],
        loading: true,
        error: null,
    });

    const fetchResourceData = useCallback(async () => {
        try {
            setData((prev) => ({ ...prev, loading: true, error: null }));

            const [
                bedResources,
                staffRatios,
                supplyInventory,
                deviceResources,
                downtimeLogs,
                resourceDiagnoses,
            ] = await Promise.all([
                apiService.resourceAPI.getBedResources(),
                apiService.resourceAPI.getStaffRatios(),
                apiService.resourceAPI.getSupplyInventory(),
                apiService.resourceAPI.getDeviceResources(),
                apiService.resourceAPI.getDowntimeLogs(),
                apiService.resourceAPI.getResourceDiagnoses(),
            ]);

            setData({
                bedResources,
                staffRatios,
                supplyInventory,
                deviceResources,
                downtimeLogs,
                resourceDiagnoses,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error('Resource data fetch error:', error);
            setData((prev) => ({
                ...prev,
                loading: false,
                error: 'Failed to load resource data',
            }));
        }
    }, []);

    useEffect(() => {
        fetchResourceData();

        // Resource data updates every 2 minutes
        const interval = setInterval(fetchResourceData, 120000);

        return () => clearInterval(interval);
    }, [fetchResourceData, filters]);

    return {
        ...data,
        refresh: fetchResourceData,
    };
};

/**
 * Real-time WebSocket Hook
 */
export const useRealTimeUpdates = (onUpdate) => {
    const socketRef = useRef(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const handleMessage = (data) => {
            if (onUpdate && typeof onUpdate === 'function') {
                onUpdate(data);
            }
        };

        const handleError = (error) => {
            console.error('WebSocket error:', error);
            setConnected(false);
        };

        // Connect to real-time stream
        socketRef.current = apiService.realtimeAPI.connectLiveStream(handleMessage, handleError);

        socketRef.current.onopen = () => setConnected(true);
        socketRef.current.onclose = () => setConnected(false);

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [onUpdate]);

    return { connected };
};

/**
 * Generic Data Fetcher Hook with Caching
 */
export const useApiData = (
    apiCall,
    dependencies = [],
    cacheKey = null,
    refreshInterval = 60000
) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Check cache first
            if (cacheKey) {
                const cachedData = apiService.cacheAPI.getCachedData(cacheKey);
                if (cachedData) {
                    setData(cachedData);
                    setLoading(false);
                    return;
                }
            }

            const result = await apiCall();

            // Cache the result
            if (cacheKey) {
                apiService.cacheAPI.cacheData(cacheKey, result);
            }

            setData(result);
            setLoading(false);
        } catch (err) {
            console.error('API call failed:', err);
            setError(err.message);
            setLoading(false);
        }
    }, [apiCall, cacheKey]);

    useEffect(() => {
        fetchData();

        if (refreshInterval > 0) {
            const interval = setInterval(fetchData, refreshInterval);
            return () => clearInterval(interval);
        }
    }, [...dependencies, fetchData]);

    return {
        data,
        loading,
        error,
        refresh: fetchData,
    };
};
