import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
    ThroughputContainer,
    DashboardTitle,
    MetricsGrid,
    MetricCard,
    MetricIcon,
    MetricContent,
    MetricValue,
    MetricLabel,
    MetricTrend,
    PanelsGrid,
    Panel,
    PanelHeader,
    PanelTitle,
    PanelContent,
    FlowChart,
    FlowStep,
    FlowArrow,
    FlowMetric,
    TimelineContainer,
    TimelineItem,
    TimelineTime,
    TimelineEvent,
    BottleneckAlert,
    ThroughputTable,
    WaitTimeChart,
    ChartBar,
    DischargeMetrics,
    DischargeCard,
    ProcessFlow,
    FlowStage,
    StageMetric,
    PatientQueue,
    QueueItem,
    PriorityIndicator,
} from './PatientThroughputStyles';

const propTypes = {
    name: PropTypes.string,
    filters: PropTypes.object,
    darkMode: PropTypes.bool,
};

const PatientThroughput = ({
    name = 'Patient Throughput',
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

    // Initialize throughput data state
    const [throughputData, setThroughputData] = useState(() => {
        // Calculate initial data based on real healthcare metrics
        let baseData = {};

        if (currentScope === 'hospital' && healthcareMetrics) {
            baseData = {
                dailyAdmissions: healthcareMetrics.admissions24h || 42,
                dailyDischarges: healthcareMetrics.discharges24h || 38,
                avgLengthOfStay: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 15).toFixed(1)
                    : 4.2,
                bedTurnoverRate: healthcareMetrics.occupancyRate
                    ? (healthcareMetrics.occupancyRate / 50).toFixed(1)
                    : 1.8,
                emergencyWaitTime: healthcareMetrics.avgWaitTime || 25,
                admissionRate: healthcareMetrics.occupancyRate || 87.5,
                dischargeRate:
                    ((healthcareMetrics.discharges24h || 38) /
                        (healthcareMetrics.admissions24h || 42)) *
                    100,
                totalPatients: healthcareMetrics.occupiedBeds || 129,
                icuAdmissions: Math.floor((healthcareMetrics.criticalPatients || 8) * 0.6),
                transfersOut: Math.floor((healthcareMetrics.discharges24h || 38) * 0.15),
            };
        } else if (currentScope === 'county' && healthcareMetrics) {
            baseData = {
                dailyAdmissions: healthcareMetrics.totalAdmissions24h || 320,
                dailyDischarges: healthcareMetrics.totalDischarges24h || 295,
                avgLengthOfStay: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 12).toFixed(1)
                    : 4.8,
                bedTurnoverRate: healthcareMetrics.avgOccupancyRate
                    ? (healthcareMetrics.avgOccupancyRate / 55).toFixed(1)
                    : 1.5,
                emergencyWaitTime: healthcareMetrics.avgWaitTime || 35,
                admissionRate: healthcareMetrics.avgOccupancyRate || 82.1,
                dischargeRate:
                    ((healthcareMetrics.totalDischarges24h || 295) /
                        (healthcareMetrics.totalAdmissions24h || 320)) *
                    100,
                totalPatients: healthcareMetrics.totalOccupiedBeds || 960,
                totalHospitals: healthcareMetrics.totalHospitals || 8,
                icuAdmissions: Math.floor((healthcareMetrics.totalCriticalPatients || 45) * 0.4),
                transfersOut: Math.floor((healthcareMetrics.totalDischarges24h || 295) * 0.12),
            };
        } else {
            // National scope
            baseData = {
                dailyAdmissions: healthcareMetrics?.totalAdmissions24h || 2100,
                dailyDischarges: healthcareMetrics?.totalDischarges24h || 1950,
                avgLengthOfStay: healthcareMetrics?.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 10).toFixed(1)
                    : 5.2,
                bedTurnoverRate: healthcareMetrics?.avgOccupancyRate
                    ? (healthcareMetrics.avgOccupancyRate / 60).toFixed(1)
                    : 1.3,
                emergencyWaitTime: healthcareMetrics?.avgWaitTime || 45,
                admissionRate: healthcareMetrics?.avgOccupancyRate || 78.3,
                dischargeRate:
                    ((healthcareMetrics?.totalDischarges24h || 1950) /
                        (healthcareMetrics?.totalAdmissions24h || 2100)) *
                    100,
                totalPatients: healthcareMetrics?.totalOccupiedBeds || 6800,
                totalHospitals: healthcareMetrics?.totalHospitals || 47,
                totalCounties: availableCounties?.length || 47,
                icuAdmissions: Math.floor((healthcareMetrics?.totalCriticalPatients || 340) * 0.3),
                transfersOut: Math.floor((healthcareMetrics?.totalDischarges24h || 1950) * 0.08),
            };
        }

        return baseData;
    });

    // Update throughput data when scope or metrics change
    useEffect(() => {
        let baseData = {};

        if (currentScope === 'hospital' && healthcareMetrics) {
            baseData = {
                dailyAdmissions: healthcareMetrics.admissions24h || 42,
                dailyDischarges: healthcareMetrics.discharges24h || 38,
                avgLengthOfStay: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 15).toFixed(1)
                    : 4.2,
                bedTurnoverRate: healthcareMetrics.occupancyRate
                    ? (healthcareMetrics.occupancyRate / 50).toFixed(1)
                    : 1.8,
                emergencyWaitTime: healthcareMetrics.avgWaitTime || 25,
                admissionRate: healthcareMetrics.occupancyRate || 87.5,
                dischargeRate:
                    ((healthcareMetrics.discharges24h || 38) /
                        (healthcareMetrics.admissions24h || 42)) *
                    100,
                totalPatients: healthcareMetrics.occupiedBeds || 129,
                icuAdmissions: Math.floor((healthcareMetrics.criticalPatients || 8) * 0.6),
                transfersOut: Math.floor((healthcareMetrics.discharges24h || 38) * 0.15),
            };
        } else if (currentScope === 'county' && healthcareMetrics) {
            baseData = {
                dailyAdmissions: healthcareMetrics.totalAdmissions24h || 320,
                dailyDischarges: healthcareMetrics.totalDischarges24h || 295,
                avgLengthOfStay: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 12).toFixed(1)
                    : 4.8,
                bedTurnoverRate: healthcareMetrics.avgOccupancyRate
                    ? (healthcareMetrics.avgOccupancyRate / 55).toFixed(1)
                    : 1.5,
                emergencyWaitTime: healthcareMetrics.avgWaitTime || 35,
                admissionRate: healthcareMetrics.avgOccupancyRate || 82.1,
                dischargeRate:
                    ((healthcareMetrics.totalDischarges24h || 295) /
                        (healthcareMetrics.totalAdmissions24h || 320)) *
                    100,
                totalPatients: healthcareMetrics.totalOccupiedBeds || 960,
                totalHospitals: healthcareMetrics.totalHospitals || 8,
                icuAdmissions: Math.floor((healthcareMetrics.totalCriticalPatients || 45) * 0.4),
                transfersOut: Math.floor((healthcareMetrics.totalDischarges24h || 295) * 0.12),
            };
        } else {
            // National scope
            baseData = {
                dailyAdmissions: healthcareMetrics?.totalAdmissions24h || 2100,
                dailyDischarges: healthcareMetrics?.totalDischarges24h || 1950,
                avgLengthOfStay: healthcareMetrics?.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 10).toFixed(1)
                    : 5.2,
                bedTurnoverRate: healthcareMetrics?.avgOccupancyRate
                    ? (healthcareMetrics.avgOccupancyRate / 60).toFixed(1)
                    : 1.3,
                emergencyWaitTime: healthcareMetrics?.avgWaitTime || 45,
                admissionRate: healthcareMetrics?.avgOccupancyRate || 78.3,
                dischargeRate:
                    ((healthcareMetrics?.totalDischarges24h || 1950) /
                        (healthcareMetrics?.totalAdmissions24h || 2100)) *
                    100,
                totalPatients: healthcareMetrics?.totalOccupiedBeds || 6800,
                totalHospitals: healthcareMetrics?.totalHospitals || 47,
                totalCounties: availableCounties?.length || 47,
                icuAdmissions: Math.floor((healthcareMetrics?.totalCriticalPatients || 340) * 0.3),
                transfersOut: Math.floor((healthcareMetrics?.totalDischarges24h || 1950) * 0.08),
            };
        }

        setThroughputData(baseData);
    }, [currentScope, healthcareMetrics, availableCounties]);

    const [lastUpdate, setLastUpdate] = useState(new Date());

    // Generate additional calculated metrics
    const performanceMetrics = useMemo(() => {
        return {
            efficiency:
                currentScope === 'hospital' ? 92.3 : currentScope === 'county' ? 88.7 : 85.2,
            bedTurnoverTime:
                currentScope === 'hospital' ? 3.2 : currentScope === 'county' ? 3.8 : 4.5,
            peakHours: '10:00-14:00',
            bottlenecks: throughputData.emergencyWaitTime > 30 ? 'Emergency Dept' : 'None',
            optimization: throughputData.admissionRate > 85 ? 'Good' : 'Needs Attention',
        };
    }, [currentScope, throughputData]);

    const [lastUpdateTime, setLastUpdateTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        // Simulate real-time throughput updates
        const interval = setInterval(() => {
            if (autoRefresh) {
                const now = new Date();
                setLastUpdate(now);
                setLastUpdateTime(now.toLocaleTimeString());
                setThroughputData((prev) => ({
                    ...prev,
                    dailyAdmissions: Math.max(
                        35,
                        Math.min(50, prev.dailyAdmissions + Math.floor(Math.random() * 3) - 1)
                    ),
                    dailyDischarges: Math.max(
                        30,
                        Math.min(45, prev.dailyDischarges + Math.floor(Math.random() * 3) - 1)
                    ),
                    avgLengthOfStay: Math.max(
                        3.5,
                        Math.min(5.5, prev.avgLengthOfStay + (Math.random() - 0.5) * 0.3)
                    ),
                }));
            }
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const patientFlow = [
        { stage: 'Registration', current: 23, capacity: 30, waitTime: 8, status: 'good' },
        { stage: 'Triage', current: 18, capacity: 20, waitTime: 15, status: 'warning' },
        { stage: 'Assessment', current: 32, capacity: 25, waitTime: 35, status: 'critical' },
        { stage: 'Treatment', current: 45, capacity: 60, waitTime: 22, status: 'good' },
        { stage: 'Discharge', current: 12, capacity: 15, waitTime: 18, status: 'good' },
    ];

    const waitTimeData = [
        { time: '06:00', waitTime: 15, admissions: 8 },
        { time: '08:00', waitTime: 25, admissions: 18 },
        { time: '10:00', waitTime: 45, admissions: 32 },
        { time: '12:00', waitTime: 52, admissions: 38 },
        { time: '14:00', waitTime: 48, admissions: 35 },
        { time: '16:00', waitTime: 38, admissions: 28 },
        { time: '18:00', waitTime: 25, admissions: 22 },
        { time: '20:00', waitTime: 18, admissions: 15 },
    ];

    const dischargeMetrics = [
        { type: 'Scheduled', count: 34, percentage: 68, trend: '+5%' },
        { type: 'Early', count: 8, percentage: 16, trend: '+2%' },
        { type: 'Delayed', count: 6, percentage: 12, trend: '-3%' },
        { type: 'AMA', count: 2, percentage: 4, trend: '0%' },
    ];

    const bottlenecks = [
        {
            id: 1,
            location: 'Emergency Triage',
            severity: 'high',
            waitTime: '45 min',
            impact: 'Critical path delay',
            suggestion: 'Add 2 more triage nurses',
        },
        {
            id: 2,
            location: 'Radiology',
            severity: 'medium',
            waitTime: '28 min',
            impact: 'Diagnostic delays',
            suggestion: 'Extend imaging hours',
        },
        {
            id: 3,
            location: 'Pharmacy',
            severity: 'low',
            waitTime: '12 min',
            impact: 'Discharge delays',
            suggestion: 'Optimize medication prep',
        },
    ];

    const patientQueue = [
        {
            id: 'PT001',
            name: 'John D.',
            stage: 'Assessment',
            waitTime: 45,
            priority: 'high',
            eta: '15 min',
        },
        {
            id: 'PT002',
            name: 'Mary S.',
            stage: 'Triage',
            waitTime: 23,
            priority: 'medium',
            eta: '8 min',
        },
        {
            id: 'PT003',
            name: 'David W.',
            stage: 'Treatment',
            waitTime: 12,
            priority: 'low',
            eta: '25 min',
        },
        {
            id: 'PT004',
            name: 'Sarah L.',
            stage: 'Discharge',
            waitTime: 8,
            priority: 'low',
            eta: '5 min',
        },
    ];

    const recentEvents = [
        { time: '14:35', event: 'Bed 204 available - ICU discharge completed', type: 'success' },
        { time: '14:28', event: 'Bottleneck detected in Emergency Triage', type: 'warning' },
        { time: '14:15', event: 'Peak admission period started', type: 'info' },
        { time: '14:02', event: 'Discharge processing time improved by 15%', type: 'success' },
        { time: '13:45', event: 'New patient admitted to Surgery ward', type: 'info' },
    ];

    return (
        <ThroughputContainer darkMode={darkMode}>
            <DashboardTitle>🚑 Patient Throughput Dashboard</DashboardTitle>

            <MetricsGrid>
                <MetricCard>
                    <MetricIcon>🏥</MetricIcon>
                    <MetricContent>
                        <MetricValue>{throughputData.avgLengthOfStay} days</MetricValue>
                        <MetricLabel>Average Length of Stay</MetricLabel>
                        <MetricTrend positive={throughputData.avgLengthOfStay < 5}>
                            Target: &lt;5 days
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>📈</MetricIcon>
                    <MetricContent>
                        <MetricValue>{throughputData.admissionRate.toFixed(1)}%</MetricValue>
                        <MetricLabel>Admission Rate Efficiency</MetricLabel>
                        <MetricTrend positive={throughputData.admissionRate > 80}>
                            Optimal performance
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>📉</MetricIcon>
                    <MetricContent>
                        <MetricValue>{throughputData.dischargeRate.toFixed(1)}%</MetricValue>
                        <MetricLabel>Discharge Rate Efficiency</MetricLabel>
                        <MetricTrend positive={throughputData.dischargeRate > 80}>
                            Smooth processing
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🔄</MetricIcon>
                    <MetricContent>
                        <MetricValue>{throughputData.bedTurnoverTime} hrs</MetricValue>
                        <MetricLabel>Bed Turnover Time</MetricLabel>
                        <MetricTrend positive={throughputData.bedTurnoverTime < 4}>
                            Efficient turnover
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>⏱️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{throughputData.avgWaitTime} min</MetricValue>
                        <MetricLabel>Average Wait Time</MetricLabel>
                        <MetricTrend positive={throughputData.avgWaitTime < 30}>
                            {throughputData.avgWaitTime < 30 ? 'Good' : 'Needs improvement'}
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🕐</MetricIcon>
                    <MetricContent>
                        <MetricValue>{throughputData.peakHours}</MetricValue>
                        <MetricLabel>Peak Hours</MetricLabel>
                        <MetricTrend positive>Current peak period</MetricTrend>
                    </MetricContent>
                </MetricCard>
            </MetricsGrid>

            <PanelsGrid>
                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🔄">Real-Time Patient Flow</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <ProcessFlow>
                            {patientFlow.map((step, index) => (
                                <React.Fragment key={step.stage}>
                                    <FlowStage status={step.status}>
                                        <h4>{step.stage}</h4>
                                        <StageMetric>
                                            <div className="current">
                                                {step.current}/{step.capacity}
                                            </div>
                                            <div className="wait-time">
                                                {step.waitTime} min wait
                                            </div>
                                            <div className="utilization">
                                                {Math.round((step.current / step.capacity) * 100)}%
                                                used
                                            </div>
                                        </StageMetric>
                                    </FlowStage>
                                    {index < patientFlow.length - 1 && <FlowArrow>→</FlowArrow>}
                                </React.Fragment>
                            ))}
                        </ProcessFlow>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="⚠️">Current Bottlenecks</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        {bottlenecks.map((bottleneck) => (
                            <BottleneckAlert key={bottleneck.id} severity={bottleneck.severity}>
                                <div className="bottleneck-header">
                                    <h4>{bottleneck.location}</h4>
                                    <span className="wait-time">{bottleneck.waitTime}</span>
                                </div>
                                <div className="impact">{bottleneck.impact}</div>
                                <div className="suggestion">💡 {bottleneck.suggestion}</div>
                            </BottleneckAlert>
                        ))}
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="📊">Wait Times by Hour</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <WaitTimeChart>
                            {waitTimeData.map((data) => (
                                <div key={data.time} className="chart-item">
                                    <div className="time-label">{data.time}</div>
                                    <ChartBar height={(data.waitTime / 60) * 100}>
                                        <span className="wait-time">{data.waitTime}m</span>
                                    </ChartBar>
                                    <div className="admissions">{data.admissions} admits</div>
                                </div>
                            ))}
                        </WaitTimeChart>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="🚪">Discharge Analysis</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <DischargeMetrics>
                            {dischargeMetrics.map((metric) => (
                                <DischargeCard key={metric.type}>
                                    <div className="discharge-type">{metric.type}</div>
                                    <div className="discharge-count">{metric.count}</div>
                                    <div className="discharge-percentage">{metric.percentage}%</div>
                                    <div className="discharge-trend">{metric.trend}</div>
                                </DischargeCard>
                            ))}
                        </DischargeMetrics>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="👥">Patient Queue Status</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <PatientQueue>
                            {patientQueue.map((patient) => (
                                <QueueItem key={patient.id}>
                                    <div className="patient-info">
                                        <span className="patient-name">{patient.name}</span>
                                        <span className="patient-id">{patient.id}</span>
                                    </div>
                                    <div className="patient-stage">{patient.stage}</div>
                                    <div className="wait-info">
                                        <div className="wait-time">{patient.waitTime}m waited</div>
                                        <div className="eta">ETA: {patient.eta}</div>
                                    </div>
                                    <PriorityIndicator priority={patient.priority}>
                                        {patient.priority.toUpperCase()}
                                    </PriorityIndicator>
                                </QueueItem>
                            ))}
                        </PatientQueue>
                    </PanelContent>
                </Panel>

                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="📝">Recent Throughput Events</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <TimelineContainer>
                            {recentEvents.map((event, index) => (
                                <TimelineItem key={index} type={event.type}>
                                    <TimelineTime>{event.time}</TimelineTime>
                                    <TimelineEvent>{event.event}</TimelineEvent>
                                </TimelineItem>
                            ))}
                        </TimelineContainer>
                    </PanelContent>
                </Panel>
            </PanelsGrid>
        </ThroughputContainer>
    );
};

PatientThroughput.propTypes = propTypes;

export default PatientThroughput;
