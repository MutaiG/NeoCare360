import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
    AlertsContainer,
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
    AlertsList,
    AlertItem,
    AlertIcon,
    AlertContent,
    AlertTitle,
    AlertDescription,
    AlertTime,
    SeverityBadge,
    AlertActions,
    ActionButton,
    AnomalyChart,
    AnomalyPoint,
    TrendLine,
    AlertFilters,
    FilterChip,
    PatientAlerts,
    PatientAlertCard,
    SystemAlerts,
    SystemAlertItem,
    AlertTimeline,
    TimelineEvent,
    AlertStatistics,
    StatCard,
    ResponseMetrics,
    ResponseItem,
    EscalationMatrix,
    EscalationLevel,
} from './AlertsStyles';

const propTypes = {
    name: PropTypes.string,
    filters: PropTypes.object,
    darkMode: PropTypes.bool,
};

const Alerts = ({
    name = 'Alerts Dashboard',
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

    // Initialize alerts data state
    const [alertsData, setAlertsData] = useState(() => {
        let baseData = {};

        if (currentScope === 'hospital' && healthcareMetrics) {
            const baseAlerts = Math.max(
                1,
                Math.floor((healthcareMetrics.criticalPatients || 3) * 2)
            );
            baseData = {
                totalAlerts: baseAlerts + Math.floor(Math.random() * 8),
                criticalAlerts: healthcareMetrics.criticalPatients || 3,
                warningAlerts: Math.floor(baseAlerts * 1.5),
                infoAlerts: Math.floor(baseAlerts * 0.8),
                acknowledgedAlerts: Math.floor(baseAlerts * 2.5),
                avgResponseTime: healthcareMetrics.avgWaitTime
                    ? Math.floor(healthcareMetrics.avgWaitTime / 10)
                    : 8,
                escalatedAlerts: Math.floor(baseAlerts * 0.2),
                falsePositives: Math.floor(baseAlerts * 0.15),
                systemAlerts: Math.floor(baseAlerts * 0.3),
                patientAlerts: baseAlerts,
                equipmentAlerts: Math.floor(baseAlerts * 0.6),
            };
        } else if (currentScope === 'county' && healthcareMetrics) {
            const baseAlerts = Math.max(
                5,
                Math.floor((healthcareMetrics?.totalCriticalPatients || 15) * 1.5)
            );
            baseData = {
                totalAlerts: baseAlerts + Math.floor(Math.random() * 20),
                criticalAlerts: healthcareMetrics?.totalCriticalPatients || 15,
                warningAlerts: Math.floor(baseAlerts * 1.8),
                infoAlerts: Math.floor(baseAlerts * 1.2),
                acknowledgedAlerts: Math.floor(baseAlerts * 3),
                avgResponseTime: healthcareMetrics?.avgWaitTime
                    ? Math.floor(healthcareMetrics.avgWaitTime / 8)
                    : 12,
                escalatedAlerts: Math.floor(baseAlerts * 0.25),
                falsePositives: Math.floor(baseAlerts * 0.18),
                systemAlerts: Math.floor(baseAlerts * 0.4),
                patientAlerts: baseAlerts,
                equipmentAlerts: Math.floor(baseAlerts * 0.7),
                hospitalCount: healthcareMetrics?.totalHospitals || 8,
            };
        } else {
            // National scope
            const baseAlerts = Math.max(
                20,
                Math.floor((healthcareMetrics?.totalCriticalPatients || 85) * 1.2)
            );
            baseData = {
                totalAlerts: baseAlerts + Math.floor(Math.random() * 50),
                criticalAlerts: healthcareMetrics?.totalCriticalPatients || 85,
                warningAlerts: Math.floor(baseAlerts * 2),
                infoAlerts: Math.floor(baseAlerts * 1.5),
                acknowledgedAlerts: Math.floor(baseAlerts * 3.5),
                avgResponseTime: healthcareMetrics?.avgWaitTime
                    ? Math.floor(healthcareMetrics.avgWaitTime / 6)
                    : 15,
                escalatedAlerts: Math.floor(baseAlerts * 0.3),
                falsePositives: Math.floor(baseAlerts * 0.2),
                systemAlerts: Math.floor(baseAlerts * 0.5),
                patientAlerts: baseAlerts,
                equipmentAlerts: Math.floor(baseAlerts * 0.8),
                hospitalCount: healthcareMetrics?.totalHospitals || 47,
                countyCount: availableCounties?.length || 47,
            };
        }

        return baseData;
    });

    // Update alerts data when scope or metrics change
    useEffect(() => {
        let baseData = {};

        if (currentScope === 'hospital' && healthcareMetrics) {
            const baseAlerts = Math.max(
                1,
                Math.floor((healthcareMetrics.criticalPatients || 3) * 2)
            );
            baseData = {
                totalAlerts: baseAlerts + Math.floor(Math.random() * 8),
                criticalAlerts: healthcareMetrics.criticalPatients || 3,
                warningAlerts: Math.floor(baseAlerts * 1.5),
                infoAlerts: Math.floor(baseAlerts * 0.8),
                acknowledgedAlerts: Math.floor(baseAlerts * 2.5),
                avgResponseTime: healthcareMetrics.avgWaitTime
                    ? Math.floor(healthcareMetrics.avgWaitTime / 10)
                    : 8,
                escalatedAlerts: Math.floor(baseAlerts * 0.2),
                falsePositives: Math.floor(baseAlerts * 0.15),
                systemAlerts: Math.floor(baseAlerts * 0.3),
                patientAlerts: baseAlerts,
                equipmentAlerts: Math.floor(baseAlerts * 0.6),
            };
        } else if (currentScope === 'county' && healthcareMetrics) {
            const baseAlerts = Math.max(
                5,
                Math.floor((healthcareMetrics?.totalCriticalPatients || 15) * 1.5)
            );
            baseData = {
                totalAlerts: baseAlerts + Math.floor(Math.random() * 20),
                criticalAlerts: healthcareMetrics?.totalCriticalPatients || 15,
                warningAlerts: Math.floor(baseAlerts * 1.8),
                infoAlerts: Math.floor(baseAlerts * 1.2),
                acknowledgedAlerts: Math.floor(baseAlerts * 3),
                avgResponseTime: healthcareMetrics?.avgWaitTime
                    ? Math.floor(healthcareMetrics.avgWaitTime / 8)
                    : 12,
                escalatedAlerts: Math.floor(baseAlerts * 0.25),
                falsePositives: Math.floor(baseAlerts * 0.18),
                systemAlerts: Math.floor(baseAlerts * 0.4),
                patientAlerts: baseAlerts,
                equipmentAlerts: Math.floor(baseAlerts * 0.7),
                hospitalCount: healthcareMetrics?.totalHospitals || 8,
            };
        } else {
            // National scope
            const baseAlerts = Math.max(
                20,
                Math.floor((healthcareMetrics?.totalCriticalPatients || 85) * 1.2)
            );
            baseData = {
                totalAlerts: baseAlerts + Math.floor(Math.random() * 50),
                criticalAlerts: healthcareMetrics?.totalCriticalPatients || 85,
                warningAlerts: Math.floor(baseAlerts * 2),
                infoAlerts: Math.floor(baseAlerts * 1.5),
                acknowledgedAlerts: Math.floor(baseAlerts * 3.5),
                avgResponseTime: healthcareMetrics?.avgWaitTime
                    ? Math.floor(healthcareMetrics.avgWaitTime / 6)
                    : 15,
                escalatedAlerts: Math.floor(baseAlerts * 0.3),
                falsePositives: Math.floor(baseAlerts * 0.2),
                systemAlerts: Math.floor(baseAlerts * 0.5),
                patientAlerts: baseAlerts,
                equipmentAlerts: Math.floor(baseAlerts * 0.8),
                hospitalCount: healthcareMetrics?.totalHospitals || 47,
                countyCount: availableCounties?.length || 47,
            };
        }

        setAlertsData(baseData);
    }, [currentScope, healthcareMetrics, availableCounties]);

    // Generate alert trends based on date range
    const alertTrends = useMemo(() => {
        const timeMultiplier =
            dateRange === '1h' ? 0.1 : dateRange === '24h' ? 0.3 : dateRange === '7d' ? 1.0 : 2.0;

        return {
            responseTime: (alertsData.avgResponseTime * timeMultiplier).toFixed(1),
            escalatedAlerts: Math.floor(alertsData.escalatedAlerts * timeMultiplier),
            resolvedToday: Math.floor(alertsData.acknowledgedAlerts * timeMultiplier),
            anomalyDetection:
                currentScope === 'hospital' ? 85.5 : currentScope === 'county' ? 82.1 : 78.9,
            falsePositiveRate: alertsData.falsePositives
                ? ((alertsData.falsePositives / alertsData.totalAlerts) * 100).toFixed(1)
                : 12.3,
            systemUptime: 99.2 + Math.random() * 0.7,
        };
    }, [alertsData, dateRange, currentScope]);

    const [lastUpdate, setLastUpdate] = useState(new Date());

    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            setLastUpdate(new Date());
        }, 30000);

        return () => clearInterval(interval);
    }, [autoRefresh]);

    const [lastUpdateTime, setLastUpdateTime] = useState(new Date().toLocaleTimeString());

    const [selectedSeverity, setSelectedSeverity] = useState('all');

    useEffect(() => {
        // Simulate real-time alerts updates
        const interval = setInterval(() => {
            if (autoRefresh) {
                const now = new Date();
                setLastUpdate(now);
                setLastUpdateTime(now.toLocaleTimeString());
                setAlertsData((prev) => ({
                    ...prev,
                    totalActiveAlerts: Math.max(
                        8,
                        Math.min(20, prev.totalActiveAlerts + Math.floor(Math.random() * 3) - 1)
                    ),
                    criticalAlerts: Math.max(
                        1,
                        Math.min(8, prev.criticalAlerts + Math.floor(Math.random() * 2) - 1)
                    ),
                    avgResponseTime: Math.max(
                        2,
                        Math.min(8, prev.avgResponseTime + (Math.random() - 0.5) * 0.5)
                    ),
                }));
            }
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const currentAlerts = [
        {
            id: 'ALT001',
            severity: 'critical',
            title: 'Patient Cardiac Arrest - Room 304',
            description: 'Heart rate dropped to 25 BPM, immediate intervention required',
            time: '2 min ago',
            patient: 'John Smith (PT-001)',
            department: 'ICU',
            acknowledged: false,
            escalated: true,
        },
        {
            id: 'ALT002',
            severity: 'critical',
            title: 'Oxygen Supply Failure - Ward 3',
            description: 'Central oxygen system pressure below critical threshold',
            time: '5 min ago',
            patient: null,
            department: 'General Ward',
            acknowledged: false,
            escalated: true,
        },
        {
            id: 'ALT003',
            severity: 'high',
            title: 'Medication Error Detected',
            description: 'Wrong dosage administered, patient monitoring activated',
            time: '8 min ago',
            patient: 'Sarah Johnson (PT-023)',
            department: 'Pharmacy',
            acknowledged: true,
            escalated: false,
        },
        {
            id: 'ALT004',
            severity: 'high',
            title: 'Equipment Malfunction - Ventilator',
            description: 'Ventilator VNT-007 showing irregular pressure readings',
            time: '12 min ago',
            patient: 'Michael Brown (PT-045)',
            department: 'ICU',
            acknowledged: false,
            escalated: false,
        },
    ];

    const anomalyData = [
        { time: '00:00', normal: 85, anomaly: 15, threshold: 20 },
        { time: '04:00', normal: 92, anomaly: 8, threshold: 20 },
        { time: '08:00', normal: 78, anomaly: 22, threshold: 20 },
        { time: '12:00', normal: 88, anomaly: 12, threshold: 20 },
        { time: '16:00', normal: 95, anomaly: 5, threshold: 20 },
        { time: '20:00', normal: 90, anomaly: 10, threshold: 20 },
    ];

    const systemAlerts = [
        {
            id: 'SYS001',
            type: 'Network',
            message: 'Patient monitoring network latency detected',
            severity: 'medium',
            affectedSystems: 3,
            time: '15 min ago',
        },
        {
            id: 'SYS002',
            type: 'Database',
            message: 'Electronic health record system backup completed',
            severity: 'info',
            affectedSystems: 1,
            time: '25 min ago',
        },
        {
            id: 'SYS003',
            type: 'Security',
            message: 'Failed login attempts exceeded threshold',
            severity: 'medium',
            affectedSystems: 1,
            time: '32 min ago',
        },
    ];

    const alertStatistics = [
        { category: 'Patient Safety', count: 8, percentage: 35, trend: '+2' },
        { category: 'Equipment', count: 6, percentage: 26, trend: '-1' },
        { category: 'Medication', count: 4, percentage: 17, trend: '0' },
        { category: 'System', count: 3, percentage: 13, trend: '+1' },
        { category: 'Environmental', count: 2, percentage: 9, trend: '0' },
    ];

    const responseMetrics = [
        { metric: 'Average Response Time', value: '4.2 min', target: '< 5 min', status: 'good' },
        { metric: 'Acknowledgment Rate', value: '78%', target: '> 80%', status: 'warning' },
        { metric: 'Resolution Time', value: '18.5 min', target: '< 20 min', status: 'good' },
        { metric: 'Escalation Rate', value: '12%', target: '< 15%', status: 'good' },
    ];

    const escalationLevels = [
        {
            level: 1,
            title: 'Immediate Response',
            description: 'Critical patient safety alerts',
            responseTime: '< 2 min',
            personnel: 'Bedside Nurse, Charge Nurse',
        },
        {
            level: 2,
            title: 'Urgent Response',
            description: 'High-priority equipment/system alerts',
            responseTime: '< 5 min',
            personnel: 'Department Supervisor, Technician',
        },
        {
            level: 3,
            title: 'Standard Response',
            description: 'Routine monitoring alerts',
            responseTime: '< 15 min',
            personnel: 'Primary Nurse, Support Staff',
        },
    ];

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'critical':
                return '🚨';
            case 'high':
                return '���️';
            case 'medium':
                return '🔶';
            case 'low':
                return 'ℹ️';
            default:
                return '📢';
        }
    };

    const getSystemIcon = (type) => {
        switch (type) {
            case 'Network':
                return '🌐';
            case 'Database':
                return '💾';
            case 'Security':
                return '��';
            case 'Backup':
                return '💿';
            default:
                return '⚙️';
        }
    };

    const filteredAlerts =
        selectedSeverity === 'all'
            ? currentAlerts
            : currentAlerts.filter((alert) => alert.severity === selectedSeverity);

    return (
        <AlertsContainer darkMode={darkMode}>
            <DashboardTitle>🔔 Alerts & Anomalies Dashboard</DashboardTitle>

            <MetricsGrid>
                <MetricCard>
                    <MetricIcon>🔔</MetricIcon>
                    <MetricContent>
                        <MetricValue>{alertsData.totalAlerts}</MetricValue>
                        <MetricLabel>Total Active Alerts</MetricLabel>
                        <MetricStatus status="warning">Monitoring</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🚨</MetricIcon>
                    <MetricContent>
                        <MetricValue>{alertsData.criticalAlerts}</MetricValue>
                        <MetricLabel>Critical Alerts</MetricLabel>
                        <MetricStatus status="critical">Immediate Action</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>✅</MetricIcon>
                    <MetricContent>
                        <MetricValue>{alertsData.acknowledgedAlerts}</MetricValue>
                        <MetricLabel>Acknowledged Alerts</MetricLabel>
                        <MetricStatus status="normal">Managed</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>⏱️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{alertsData.avgResponseTime} min</MetricValue>
                        <MetricLabel>Avg Response Time</MetricLabel>
                        <MetricStatus status="normal">Within Target</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🤖</MetricIcon>
                    <MetricContent>
                        <MetricValue>{alertsData.anomalyDetection}%</MetricValue>
                        <MetricLabel>Anomaly Detection Rate</MetricLabel>
                        <MetricStatus status="normal">High Accuracy</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🎯</MetricIcon>
                    <MetricContent>
                        <MetricValue>{alertsData.falsePositiveRate}%</MetricValue>
                        <MetricLabel>False Positive Rate</MetricLabel>
                        <MetricStatus status="normal">Low Rate</MetricStatus>
                    </MetricContent>
                </MetricCard>
            </MetricsGrid>

            <PanelsGrid>
                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🚨">Critical Active Alerts</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <AlertFilters>
                            {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
                                <FilterChip
                                    key={severity}
                                    active={selectedSeverity === severity}
                                    onClick={() => setSelectedSeverity(severity)}
                                >
                                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                                </FilterChip>
                            ))}
                        </AlertFilters>
                        <AlertsList>
                            {filteredAlerts.map((alert) => (
                                <AlertItem key={alert.id} severity={alert.severity}>
                                    <AlertIcon>{getSeverityIcon(alert.severity)}</AlertIcon>
                                    <AlertContent>
                                        <AlertTitle>{alert.title}</AlertTitle>
                                        <AlertDescription>{alert.description}</AlertDescription>
                                        <div className="alert-meta">
                                            {alert.patient && (
                                                <span className="patient">👤 {alert.patient}</span>
                                            )}
                                            <span className="department">
                                                🏥 {alert.department}
                                            </span>
                                            <AlertTime>{alert.time}</AlertTime>
                                        </div>
                                    </AlertContent>
                                    <div className="alert-status">
                                        <SeverityBadge severity={alert.severity}>
                                            {alert.severity.toUpperCase()}
                                        </SeverityBadge>
                                        {alert.escalated && (
                                            <span className="escalated">🔺 ESCALATED</span>
                                        )}
                                    </div>
                                    <AlertActions>
                                        {!alert.acknowledged && (
                                            <ActionButton type="acknowledge">
                                                Acknowledge
                                            </ActionButton>
                                        )}
                                        <ActionButton type="view">View Details</ActionButton>
                                    </AlertActions>
                                </AlertItem>
                            ))}
                        </AlertsList>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="📊">Anomaly Detection Trends</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <AnomalyChart>
                            {anomalyData.map((data, index) => (
                                <div key={data.time} className="chart-point">
                                    <div className="time-label">{data.time}</div>
                                    <AnomalyPoint
                                        height={data.anomaly}
                                        threshold={data.threshold}
                                        aboveThreshold={data.anomaly > data.threshold}
                                    >
                                        <span className="anomaly-value">{data.anomaly}%</span>
                                    </AnomalyPoint>
                                </div>
                            ))}
                            <TrendLine />
                        </AnomalyChart>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="⚙️">System Alerts</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <SystemAlerts>
                            {systemAlerts.map((alert) => (
                                <SystemAlertItem key={alert.id} severity={alert.severity}>
                                    <div className="system-icon">{getSystemIcon(alert.type)}</div>
                                    <div className="system-content">
                                        <div className="system-type">{alert.type}</div>
                                        <div className="system-message">{alert.message}</div>
                                        <div className="system-meta">
                                            {alert.affectedSystems} system(s) • {alert.time}
                                        </div>
                                    </div>
                                    <SeverityBadge severity={alert.severity}>
                                        {alert.severity.toUpperCase()}
                                    </SeverityBadge>
                                </SystemAlertItem>
                            ))}
                        </SystemAlerts>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="📈">Alert Statistics</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <AlertStatistics>
                            {alertStatistics.map((stat) => (
                                <StatCard key={stat.category}>
                                    <div className="stat-category">{stat.category}</div>
                                    <div className="stat-count">{stat.count}</div>
                                    <div className="stat-percentage">{stat.percentage}%</div>
                                    <div className="stat-trend">
                                        {stat.trend === '0' ? '→' : stat.trend}
                                    </div>
                                </StatCard>
                            ))}
                        </AlertStatistics>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="⏰">Response Metrics</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <ResponseMetrics>
                            {responseMetrics.map((metric) => (
                                <ResponseItem key={metric.metric} status={metric.status}>
                                    <div className="metric-label">{metric.metric}</div>
                                    <div className="metric-value">{metric.value}</div>
                                    <div className="metric-target">Target: {metric.target}</div>
                                </ResponseItem>
                            ))}
                        </ResponseMetrics>
                    </PanelContent>
                </Panel>

                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🔺">Escalation Matrix</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <EscalationMatrix>
                            {escalationLevels.map((level) => (
                                <EscalationLevel key={level.level} level={level.level}>
                                    <div className="level-header">
                                        <span className="level-number">Level {level.level}</span>
                                        <span className="response-time">{level.responseTime}</span>
                                    </div>
                                    <div className="level-title">{level.title}</div>
                                    <div className="level-description">{level.description}</div>
                                    <div className="level-personnel">👥 {level.personnel}</div>
                                </EscalationLevel>
                            ))}
                        </EscalationMatrix>
                    </PanelContent>
                </Panel>
            </PanelsGrid>
        </AlertsContainer>
    );
};

Alerts.propTypes = propTypes;

export default Alerts;
