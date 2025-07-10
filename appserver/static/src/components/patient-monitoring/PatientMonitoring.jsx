import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
    MonitoringContainer,
    DashboardTitle,
    MetricsGrid,
    MetricCard,
    MetricIcon,
    MetricContent,
    MetricValue,
    MetricLabel,
    MetricStatus,
    PanelsGrid,
    Panel,
    PanelHeader,
    PanelTitle,
    PanelContent,
    VitalsGrid,
    VitalCard,
    VitalTrend,
    PatientsList,
    PatientItem,
    PatientInfo,
    PatientVitals,
    VitalIndicator,
    AlertsGrid,
    AlertCard,
    AlertIcon,
    HeatmapContainer,
    HeatmapGrid,
    HeatmapCell,
    DiagnosisSection,
    DiagnosisCategory,
    TimelineContainer,
    TimelineItem,
    LiveFeedContainer,
    VitalsFeed,
    FeedItem,
} from './PatientMonitoringStyles';

const propTypes = {
    name: PropTypes.string,
    filters: PropTypes.object,
    darkMode: PropTypes.bool,
};

const PatientMonitoring = ({
    name = 'Patient Monitoring',
    filters = {},
    darkMode = false,
    autoRefresh = true,
}) => {
    // Extract filter context data
    const {
        healthcareMetrics = {},
        getCurrentScope = () => 'national',
        getCurrentLocationName = () => 'Kenya National',
        county = 'all',
        subcounty = 'all',
        hospital = 'all',
        dateRange = '7d',
        availableHospitals = [],
        availableCounties = [],
    } = filters;

    const currentScope = getCurrentScope();
    const locationName = getCurrentLocationName();

    // Calculate monitoring data based on current scope and healthcare metrics
    const monitoringData = useMemo(() => {
        let baseData = {};

        if (currentScope === 'hospital' && healthcareMetrics) {
            baseData = {
                patientsUnderMonitoring: healthcareMetrics.occupiedBeds || 24,
                criticalOutliers: healthcareMetrics.criticalPatients || 3,
                avgResponseTime: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 5).toFixed(1)
                    : 8.2,
                alertsCount: Math.floor((healthcareMetrics.criticalPatients || 3) * 1.5),
                totalBeds: healthcareMetrics.totalBeds || 50,
                icuPatients: healthcareMetrics.icuBeds
                    ? Math.floor(healthcareMetrics.icuBeds * 0.8)
                    : 6,
                stabilizedPatients: Math.floor((healthcareMetrics.occupiedBeds || 24) * 0.15),
            };
        } else if (currentScope === 'county' && healthcareMetrics) {
            baseData = {
                patientsUnderMonitoring: healthcareMetrics.totalOccupiedBeds || 180,
                criticalOutliers: healthcareMetrics.totalCriticalPatients || 15,
                avgResponseTime: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 4).toFixed(1)
                    : 12.5,
                alertsCount: Math.floor((healthcareMetrics.totalCriticalPatients || 15) * 1.2),
                totalBeds: healthcareMetrics.totalBeds || 450,
                icuPatients: Math.floor((healthcareMetrics.totalCriticalPatients || 15) * 0.6),
                stabilizedPatients: Math.floor((healthcareMetrics.totalOccupiedBeds || 180) * 0.12),
                totalHospitals: healthcareMetrics.totalHospitals || 8,
            };
        } else {
            // National scope
            baseData = {
                patientsUnderMonitoring: healthcareMetrics.totalOccupiedBeds || 1200,
                criticalOutliers: healthcareMetrics.totalCriticalPatients || 85,
                avgResponseTime: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 3).toFixed(1)
                    : 15.8,
                alertsCount: Math.floor((healthcareMetrics.totalCriticalPatients || 85) * 1.1),
                totalBeds: healthcareMetrics.totalBeds || 3200,
                icuPatients: Math.floor((healthcareMetrics.totalCriticalPatients || 85) * 0.7),
                stabilizedPatients: Math.floor((healthcareMetrics.totalOccupiedBeds || 1200) * 0.1),
                totalHospitals: healthcareMetrics.totalHospitals || 47,
                totalCounties: availableCounties.length || 47,
            };
        }

        return baseData;
    }, [currentScope, healthcareMetrics, availableCounties]);

    const [liveData, setLiveData] = useState(() => {
        // Generate real-time monitoring data based on scope
        const timeBasedMultiplier = dateRange === '1h' ? 0.1 : dateRange === '24h' ? 0.8 : 1.0;

        return {
            lastVitalsUpdate: '2 min ago',
            systemStatus: 'operational',
            dataLatency: currentScope === 'hospital' ? 1.2 : currentScope === 'county' ? 2.8 : 4.5,
            activeMonitors: Math.floor(
                monitoringData.patientsUnderMonitoring * timeBasedMultiplier
            ),
            recentAlerts: Math.floor(monitoringData.alertsCount * timeBasedMultiplier),
        };
    });

    const [liveVitals, setLiveVitals] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    useEffect(() => {
        // Generate initial live vitals data based on filters
        const generateVitalsData = () => {
            // Adjust patient count based on hospital filter
            let patientCount = 5;
            if (filters.hospital && filters.hospital !== 'all') {
                patientCount = filters.hospital === 'kenyatta' ? 8 : 4;
            }

            const patients = Array.from(
                { length: patientCount },
                (_, i) => `PT${String(i + 1).padStart(3, '0')}`
            );
            return patients.map((patientId) => ({
                patientId,
                heartRate: 70 + Math.floor(Math.random() * 40),
                bloodPressure: `${120 + Math.floor(Math.random() * 40)}/${
                    80 + Math.floor(Math.random() * 20)
                }`,
                oxygenSat: 95 + Math.floor(Math.random() * 5),
                temperature: 36.5 + Math.random() * 2,
                timestamp: new Date(),
                hospital: filters.hospital || 'general',
                location: filters.county || 'Nairobi',
            }));
        };

        // Listen for app-wide refresh events
        const handleRefresh = () => {
            setLiveVitals(generateVitalsData());
            setMonitoringData((prev) => ({
                ...prev,
                patientsUnderMonitoring: Math.max(
                    15,
                    prev.patientsUnderMonitoring + Math.floor(Math.random() * 6) - 3
                ),
                criticalOutliers: Math.max(
                    0,
                    Math.min(8, prev.criticalOutliers + Math.floor(Math.random() * 3) - 1)
                ),
                avgResponseTime: Math.max(
                    5,
                    Math.min(15, prev.avgResponseTime + (Math.random() - 0.5))
                ),
                alertsCount: Math.max(
                    1,
                    Math.min(12, prev.alertsCount + Math.floor(Math.random() * 3) - 1)
                ),
            }));
        };

        window.addEventListener('neocare-refresh', handleRefresh);

        setLiveVitals(generateVitalsData());

        // Simulate real-time vitals updates
        const interval = setInterval(() => {
            if (autoRefresh) {
                setLastUpdate(new Date());
                setLiveVitals((prev) =>
                    prev.map((patient) => ({
                        ...patient,
                        heartRate: Math.max(
                            50,
                            Math.min(120, patient.heartRate + Math.floor(Math.random() * 10) - 5)
                        ),
                        oxygenSat: Math.max(
                            90,
                            Math.min(100, patient.oxygenSat + Math.floor(Math.random() * 4) - 2)
                        ),
                        temperature: Math.max(
                            35.5,
                            Math.min(39, patient.temperature + (Math.random() - 0.5) * 0.5)
                        ),
                        status: ['stable', 'warning', 'critical'][Math.floor(Math.random() * 3)],
                    }))
                );
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const criticalPatients = [
        {
            id: 'PT001',
            name: 'John Doe',
            age: 45,
            room: '201',
            condition: 'Post-Surgery',
            heartRate: 75,
            bloodPressure: '130/85',
            oxygenSat: 98,
            temperature: 37.1,
            status: 'stable',
            lastUpdate: '1 min ago',
        },
        {
            id: 'PT002',
            name: 'Maria Garcia',
            age: 62,
            room: '203',
            condition: 'Cardiac Monitoring',
            heartRate: 95,
            bloodPressure: '150/90',
            oxygenSat: 94,
            temperature: 38.2,
            status: 'warning',
            lastUpdate: '30 sec ago',
        },
        {
            id: 'PT003',
            name: 'David Chen',
            age: 38,
            room: '205',
            condition: 'Respiratory',
            heartRate: 110,
            bloodPressure: '140/88',
            oxygenSat: 89,
            temperature: 39.1,
            status: 'critical',
            lastUpdate: '15 sec ago',
        },
        {
            id: 'PT004',
            name: 'Sarah Johnson',
            age: 29,
            room: '207',
            condition: 'Observation',
            heartRate: 68,
            bloodPressure: '120/80',
            oxygenSat: 99,
            temperature: 36.8,
            status: 'stable',
            lastUpdate: '2 min ago',
        },
    ];

    const clinicalAlerts = [
        {
            category: 'Cardiac',
            count: 8,
            severity: 'high',
            icon: 'HEART',
            description: 'Arrhythmia, Tachycardia',
        },
        {
            category: 'Respiratory',
            count: 5,
            severity: 'critical',
            icon: 'LUNG',
            description: 'Low SpO₂, Apnea',
        },
        {
            category: 'Temperature',
            count: 3,
            severity: 'moderate',
            icon: 'TEMP',
            description: 'Fever, Hypothermia',
        },
        {
            category: 'Blood Pressure',
            count: 4,
            severity: 'high',
            icon: 'BP',
            description: 'Hypertension, Hypotension',
        },
    ];

    const vitalsHeatmap = [
        { time: '00:00', heartRate: 72, bloodPressure: 125, oxygenSat: 98, temperature: 36.8 },
        { time: '04:00', heartRate: 68, bloodPressure: 120, oxygenSat: 97, temperature: 36.6 },
        { time: '08:00', heartRate: 75, bloodPressure: 130, oxygenSat: 98, temperature: 37.0 },
        { time: '12:00', heartRate: 80, bloodPressure: 135, oxygenSat: 96, temperature: 37.2 },
        { time: '16:00', heartRate: 78, bloodPressure: 128, oxygenSat: 97, temperature: 36.9 },
        { time: '20:00', heartRate: 74, bloodPressure: 122, oxygenSat: 98, temperature: 36.7 },
    ];

    const alertBasedDiagnoses = [
        { diagnosis: 'Cardiac Arrhythmia', alerts: 12, trend: '+3' },
        { diagnosis: 'Respiratory Distress', alerts: 8, trend: '+2' },
        { diagnosis: 'Sepsis Indicators', alerts: 5, trend: '0' },
        { diagnosis: 'Neurological Changes', alerts: 3, trend: '+1' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'critical':
                return '#e74c3c';
            case 'warning':
                return '#f39c12';
            case 'stable':
                return '#27ae60';
            default:
                return '#95a5a6';
        }
    };

    const getVitalColor = (vital, value) => {
        // Define normal ranges
        const ranges = {
            heartRate: { min: 60, max: 100 },
            oxygenSat: { min: 95, max: 100 },
            temperature: { min: 36.1, max: 37.2 },
        };

        if (!ranges[vital]) return '#3498db';

        if (value < ranges[vital].min || value > ranges[vital].max) {
            return '#e74c3c';
        }
        return '#27ae60';
    };

    return (
        <MonitoringContainer darkMode={darkMode}>
            <DashboardTitle>🫀 Patient Monitoring Dashboard</DashboardTitle>
            <MetricsGrid>
                <MetricCard>
                    <MetricIcon>🫀</MetricIcon>
                    <MetricContent>
                        <MetricValue>{monitoringData.patientsUnderMonitoring}</MetricValue>
                        <MetricLabel>Patients Under Monitoring</MetricLabel>
                        <MetricStatus status="normal">Active</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🚨</MetricIcon>
                    <MetricContent>
                        <MetricValue>{monitoringData.criticalOutliers}</MetricValue>
                        <MetricLabel>Critical Outliers</MetricLabel>
                        <MetricStatus status="critical">Immediate Attention</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>⚡</MetricIcon>
                    <MetricContent>
                        <MetricValue>{monitoringData.avgResponseTime}s</MetricValue>
                        <MetricLabel>Avg Response Time</MetricLabel>
                        <MetricStatus status="normal">Good</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🔄</MetricIcon>
                    <MetricContent>
                        <MetricValue>{monitoringData.lastVitalsUpdate}</MetricValue>
                        <MetricLabel>Last Vitals Update</MetricLabel>
                        <MetricStatus status="normal">Recent</MetricStatus>
                    </MetricContent>
                </MetricCard>
            </MetricsGrid>

            <PanelsGrid>
                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="💓">Live Vitals Feed</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <LiveFeedContainer>
                            <VitalsGrid>
                                {liveVitals.map((vital) => (
                                    <VitalCard key={vital.patientId}>
                                        <h4>Patient {vital.patientId}</h4>
                                        <VitalsFeed>
                                            <FeedItem>
                                                <span className="label">HR:</span>
                                                <span
                                                    className="value"
                                                    style={{
                                                        color: getVitalColor(
                                                            'heartRate',
                                                            vital.heartRate
                                                        ),
                                                    }}
                                                >
                                                    {vital.heartRate} bpm
                                                </span>
                                            </FeedItem>
                                            <FeedItem>
                                                <span className="label">BP:</span>
                                                <span className="value">{vital.bloodPressure}</span>
                                            </FeedItem>
                                            <FeedItem>
                                                <span className="label">SpO₂:</span>
                                                <span
                                                    className="value"
                                                    style={{
                                                        color: getVitalColor(
                                                            'oxygenSat',
                                                            vital.oxygenSat
                                                        ),
                                                    }}
                                                >
                                                    {vital.oxygenSat}%
                                                </span>
                                            </FeedItem>
                                            <FeedItem>
                                                <span className="label">Temp:</span>
                                                <span
                                                    className="value"
                                                    style={{
                                                        color: getVitalColor(
                                                            'temperature',
                                                            vital.temperature
                                                        ),
                                                    }}
                                                >
                                                    {vital.temperature.toFixed(1)}°C
                                                </span>
                                            </FeedItem>
                                        </VitalsFeed>
                                        <div className="timestamp">
                                            Updated: {vital.timestamp.toLocaleTimeString()}
                                        </div>
                                    </VitalCard>
                                ))}
                            </VitalsGrid>
                        </LiveFeedContainer>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="🚨">Clinical Alerts by Category</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <AlertsGrid>
                            {clinicalAlerts.map((alert) => (
                                <AlertCard key={alert.category} severity={alert.severity}>
                                    <AlertIcon>{alert.icon}</AlertIcon>
                                    <div className="alert-content">
                                        <h4>{alert.category}</h4>
                                        <div className="alert-count">{alert.count} alerts</div>
                                        <div className="alert-description">{alert.description}</div>
                                    </div>
                                </AlertCard>
                            ))}
                        </AlertsGrid>
                    </PanelContent>
                </Panel>

                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🛏️">Patients Under Active Monitoring</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <PatientsList>
                            {criticalPatients.map((patient) => (
                                <PatientItem key={patient.id} status={patient.status}>
                                    <PatientInfo>
                                        <h4>
                                            {patient.name} ({patient.age}y) - Room {patient.room}
                                        </h4>
                                        <p>Condition: {patient.condition}</p>
                                        <div className="last-update">
                                            Last update: {patient.lastUpdate}
                                        </div>
                                    </PatientInfo>
                                    <PatientVitals>
                                        <VitalIndicator>
                                            <span>HR:</span> {patient.heartRate} bpm
                                        </VitalIndicator>
                                        <VitalIndicator>
                                            <span>BP:</span> {patient.bloodPressure}
                                        </VitalIndicator>
                                        <VitalIndicator>
                                            <span>SpO₂:</span> {patient.oxygenSat}%
                                        </VitalIndicator>
                                        <VitalIndicator>
                                            <span>Temp:</span> {patient.temperature}°C
                                        </VitalIndicator>
                                    </PatientVitals>
                                    <div
                                        className="status-indicator"
                                        style={{ backgroundColor: getStatusColor(patient.status) }}
                                    >
                                        {patient.status.toUpperCase()}
                                    </div>
                                </PatientItem>
                            ))}
                        </PatientsList>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="🌡️">Vitals Trend Heatmap</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <HeatmapContainer>
                            <div className="heatmap-legend">
                                <span>24-Hour Vitals Trends</span>
                            </div>
                            <HeatmapGrid>
                                {vitalsHeatmap.map((data, index) => (
                                    <div key={index} className="time-slot">
                                        <div className="time-label">{data.time}</div>
                                        <HeatmapCell
                                            value={data.heartRate}
                                            type="heartRate"
                                            title={`HR: ${data.heartRate}`}
                                        />
                                        <HeatmapCell
                                            value={data.oxygenSat}
                                            type="oxygenSat"
                                            title={`SpO₂: ${data.oxygenSat}%`}
                                        />
                                        <HeatmapCell
                                            value={data.temperature}
                                            type="temperature"
                                            title={`Temp: ${data.temperature}°C`}
                                        />
                                    </div>
                                ))}
                            </HeatmapGrid>
                        </HeatmapContainer>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="🩺">Alert-Based Diagnoses</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <DiagnosisSection>
                            {alertBasedDiagnoses.map((diagnosis) => (
                                <DiagnosisCategory key={diagnosis.diagnosis}>
                                    <div className="diagnosis-info">
                                        <span className="diagnosis-name">
                                            {diagnosis.diagnosis}
                                        </span>
                                        <span className="diagnosis-alerts">
                                            {diagnosis.alerts} alerts
                                        </span>
                                    </div>
                                    <div
                                        className={`trend ${
                                            diagnosis.trend.startsWith('+')
                                                ? 'increase'
                                                : diagnosis.trend.startsWith('-')
                                                ? 'decrease'
                                                : 'stable'
                                        }`}
                                    >
                                        {diagnosis.trend === '0' ? '→' : diagnosis.trend}
                                    </div>
                                </DiagnosisCategory>
                            ))}
                        </DiagnosisSection>
                    </PanelContent>
                </Panel>
            </PanelsGrid>
        </MonitoringContainer>
    );
};

PatientMonitoring.propTypes = propTypes;

export default PatientMonitoring;
