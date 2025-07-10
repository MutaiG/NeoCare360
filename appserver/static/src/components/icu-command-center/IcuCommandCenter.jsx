import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
    IcuContainer,
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
    RiskDashboard,
    RiskLevel,
    PatientCard,
    PatientInfo,
    PatientVitals,
    VitalSign,
    DeviceGrid,
    DeviceCard,
    DeviceStatus,
    AlertsList,
    AlertItem,
    AlertSeverity,
    StayAnalytics,
    StayBar,
    DiagnosisPanel,
    DiagnosisItem,
    QuickActions,
    ActionButton,
    CriticalAlert,
    VitalChart,
    VitalPoint,
    DeviceUtilization,
    UtilizationBar,
    PatientTimeline,
    TimelineEvent,
    ICUMap,
    BedStatus,
    EmergencyProtocol,
    ProtocolStep,
} from './IcuCommandCenterStyles';

const propTypes = {
    name: PropTypes.string,
    filters: PropTypes.object,
    darkMode: PropTypes.bool,
};

const IcuCommandCenter = ({
    name = 'ICU Command Center',
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

    // Calculate ICU data based on scope and healthcare metrics
    const icuData = useMemo(() => {
        let baseData = {};

        if (currentScope === 'hospital' && healthcareMetrics) {
            const icuCapacity = healthcareMetrics.icuBeds || 15;
            const criticalCount = healthcareMetrics.criticalPatients || 5;
            baseData = {
                totalBeds: icuCapacity,
                occupiedBeds: Math.min(criticalCount, icuCapacity),
                availableBeds: Math.max(0, icuCapacity - criticalCount),
                occupancyRate: Math.round((criticalCount / icuCapacity) * 100),
                criticalPatients: criticalCount,
                stabilPatients: Math.max(0, icuCapacity - criticalCount - 2),
                ventilatorsPressure: 18.5 + Math.random() * 2,
                activeAlerts: Math.max(1, Math.floor(criticalCount * 0.4)),
                averageStay: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 12).toFixed(1)
                    : 4.2,
                avgResponseTime: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 15).toFixed(1)
                    : 3.8,
                mortalityRate: (criticalCount / 50).toFixed(1),
                recoveryRate: 90 - criticalCount * 0.5,
                emergencyCapacity: Math.floor(icuCapacity * 0.2),
            };
        } else if (currentScope === 'county' && healthcareMetrics) {
            const totalCritical = healthcareMetrics.totalCriticalPatients || 35;
            const estimatedICUBeds = (healthcareMetrics.totalHospitals || 8) * 12;
            baseData = {
                totalBeds: estimatedICUBeds,
                occupiedBeds: Math.min(totalCritical, estimatedICUBeds),
                availableBeds: Math.max(0, estimatedICUBeds - totalCritical),
                occupancyRate: Math.round((totalCritical / estimatedICUBeds) * 100),
                criticalPatients: totalCritical,
                stabilPatients: Math.max(0, estimatedICUBeds - totalCritical - 5),
                ventilatorsPressure: 18.0 + Math.random() * 3,
                activeAlerts: Math.max(2, Math.floor(totalCritical * 0.3)),
                averageStay: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 10).toFixed(1)
                    : 4.8,
                avgResponseTime: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 12).toFixed(1)
                    : 4.5,
                mortalityRate: (totalCritical / 200).toFixed(1),
                recoveryRate: 87 - totalCritical * 0.1,
                totalHospitals: healthcareMetrics.totalHospitals || 8,
                emergencyCapacity: Math.floor(estimatedICUBeds * 0.15),
            };
        } else {
            // National scope
            const totalCritical = healthcareMetrics.totalCriticalPatients || 240;
            const estimatedICUBeds = (healthcareMetrics.totalHospitals || 47) * 10;
            baseData = {
                totalBeds: estimatedICUBeds,
                occupiedBeds: Math.min(totalCritical, estimatedICUBeds),
                availableBeds: Math.max(0, estimatedICUBeds - totalCritical),
                occupancyRate: Math.round((totalCritical / estimatedICUBeds) * 100),
                criticalPatients: totalCritical,
                stabilPatients: Math.max(0, estimatedICUBeds - totalCritical - 20),
                ventilatorsPressure: 17.5 + Math.random() * 4,
                activeAlerts: Math.max(5, Math.floor(totalCritical * 0.25)),
                averageStay: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 8).toFixed(1)
                    : 5.2,
                avgResponseTime: healthcareMetrics.avgWaitTime
                    ? (healthcareMetrics.avgWaitTime / 10).toFixed(1)
                    : 5.8,
                mortalityRate: (totalCritical / 800).toFixed(1),
                recoveryRate: 84 - totalCritical * 0.05,
                totalHospitals: healthcareMetrics.totalHospitals || 47,
                totalCounties: availableCounties.length || 47,
                emergencyCapacity: Math.floor(estimatedICUBeds * 0.12),
            };
        }

        return baseData;
    }, [currentScope, healthcareMetrics, availableCounties]);

    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date().toLocaleTimeString());
    const [emergencyActive, setEmergencyActive] = useState(false);

    useEffect(() => {
        // Listen for app-wide refresh events
        const handleRefresh = () => {
            if (autoRefresh) {
                const now = new Date();
                setLastUpdate(now);
                setLastUpdateTime(now.toLocaleTimeString());
            }
            // Note: icuData is computed from useMemo, not state, so no dynamic updates needed
        };

        window.addEventListener('neocare-refresh', handleRefresh);

        // Simulate real-time data updates
        const interval = setInterval(() => {
            if (autoRefresh) {
                handleRefresh();
            }
        }, 10000);

        return () => {
            window.removeEventListener('neocare-refresh', handleRefresh);
            clearInterval(interval);
        };
    }, []);

    const icuPatients = [
        {
            id: 'ICU001',
            name: 'John Smith',
            age: 67,
            diagnosis: 'Respiratory Failure',
            riskLevel: 'critical',
            heartRate: 95,
            bloodPressure: '140/90',
            oxygenSat: 92,
            temperature: 38.2,
            bedNumber: 'ICU-01',
            daysInICU: 3,
            ventilator: true,
            consciousness: 'Sedated',
            trend: 'improving',
        },
        {
            id: 'ICU002',
            name: 'Mary Johnson',
            age: 54,
            diagnosis: 'Post-Surgical Recovery',
            riskLevel: 'stable',
            heartRate: 78,
            bloodPressure: '125/82',
            oxygenSat: 98,
            temperature: 36.8,
            bedNumber: 'ICU-03',
            daysInICU: 1,
            ventilator: false,
            consciousness: 'Alert',
            trend: 'stable',
        },
        {
            id: 'ICU003',
            name: 'Robert Wilson',
            age: 72,
            diagnosis: 'Cardiac Emergency',
            riskLevel: 'critical',
            heartRate: 110,
            bloodPressure: '160/95',
            oxygenSat: 94,
            temperature: 37.5,
            bedNumber: 'ICU-05',
            daysInICU: 2,
            ventilator: false,
            consciousness: 'Drowsy',
            trend: 'critical',
        },
        {
            id: 'ICU004',
            name: 'Sarah Davis',
            age: 45,
            diagnosis: 'Sepsis',
            riskLevel: 'high',
            heartRate: 102,
            bloodPressure: '110/70',
            oxygenSat: 96,
            temperature: 39.1,
            bedNumber: 'ICU-07',
            daysInICU: 4,
            ventilator: true,
            consciousness: 'Sedated',
            trend: 'monitoring',
        },
        {
            id: 'ICU005',
            name: 'Michael Brown',
            age: 63,
            diagnosis: 'Stroke Recovery',
            riskLevel: 'stable',
            heartRate: 85,
            bloodPressure: '130/85',
            oxygenSat: 97,
            temperature: 37.0,
            bedNumber: 'ICU-09',
            daysInICU: 6,
            ventilator: false,
            consciousness: 'Alert',
            trend: 'improving',
        },
    ];

    const deviceUtilization = [
        { device: 'Ventilators', total: 15, inUse: 8, status: 'normal', utilization: 53 },
        { device: 'Heart Monitors', total: 15, inUse: 12, status: 'high', utilization: 80 },
        { device: 'Defibrillators', total: 8, inUse: 3, status: 'normal', utilization: 38 },
        { device: 'Infusion Pumps', total: 25, inUse: 20, status: 'high', utilization: 80 },
        { device: 'Oxygen Concentrators', total: 12, inUse: 9, status: 'normal', utilization: 75 },
        { device: 'Dialysis Machines', total: 6, inUse: 4, status: 'normal', utilization: 67 },
    ];

    const icuAlerts = [
        {
            id: 'ALERT001',
            severity: 'critical',
            message: 'Patient ICU-01: Oxygen saturation dropping below 90%',
            time: '2 min ago',
            patient: 'John Smith',
            action: 'Increase oxygen flow, notify physician immediately',
            acknowledged: false,
        },
        {
            id: 'ALERT002',
            severity: 'high',
            message: 'Ventilator malfunction detected in ICU-05',
            time: '5 min ago',
            patient: 'Robert Wilson',
            action: 'Switch to backup ventilator, technical team notified',
            acknowledged: false,
        },
        {
            id: 'ALERT003',
            severity: 'medium',
            message: 'Heart rate irregularity - ICU-07',
            time: '8 min ago',
            patient: 'Sarah Davis',
            action: 'Monitor closely, consider EKG',
            acknowledged: true,
        },
        {
            id: 'ALERT004',
            severity: 'low',
            message: 'Medication due for ICU-03',
            time: '12 min ago',
            patient: 'Mary Johnson',
            action: 'Administer scheduled medication',
            acknowledged: true,
        },
    ];

    const stayAnalytics = [
        { range: '1-2 days', count: 3, percentage: 25 },
        { range: '3-5 days', count: 5, percentage: 42 },
        { range: '6-10 days', count: 3, percentage: 25 },
        { range: '10+ days', count: 1, percentage: 8 },
    ];

    const diagnosisFindings = [
        { diagnosis: 'Respiratory Failure', count: 3, severity: 'critical', trend: '+1' },
        { diagnosis: 'Post-Surgical Recovery', count: 2, severity: 'stable', trend: '0' },
        { diagnosis: 'Cardiac Emergency', count: 2, severity: 'critical', trend: '+1' },
        { diagnosis: 'Sepsis', count: 1, severity: 'high', trend: '0' },
        { diagnosis: 'Neurological', count: 1, severity: 'stable', trend: '-1' },
        { diagnosis: 'Trauma', count: 1, severity: 'high', trend: '0' },
    ];

    const emergencyProtocols = [
        { step: 1, action: 'Assess patient airway, breathing, circulation', time: '0-1 min' },
        { step: 2, action: 'Notify ICU physician and respiratory team', time: '1-2 min' },
        { step: 3, action: 'Prepare emergency medications and equipment', time: '2-3 min' },
        { step: 4, action: 'Document all interventions and vital signs', time: 'Ongoing' },
    ];

    const handleEmergencyActivation = () => {
        setEmergencyActive(true);
        alert(
            '🚨 ICU EMERGENCY PROTOCOL ACTIVATED!\n\nAll ICU staff have been notified.\nEmergency response team en route.\nCode Blue announcement initiated.'
        );

        // Auto-deactivate after 5 minutes (demo purposes)
        setTimeout(() => {
            setEmergencyActive(false);
        }, 300000);
    };

    const handlePatientDownload = () => {
        const patientData = {
            generatedAt: new Date().toISOString(),
            icuMetrics: icuData,
            patients: icuPatients,
            deviceUtilization: deviceUtilization,
            activeAlerts: icuAlerts.filter((alert) => !alert.acknowledged),
            summary: 'ICU Command Center patient status report',
        };

        const csvContent = [
            ['ICU Command Center Patient Report'],
            ['Generated', new Date().toLocaleString()],
            [''],
            ['ICU METRICS'],
            ['Metric', 'Value'],
            ['Available Beds', `${icuData.availableBeds}/${icuData.totalBeds}`],
            ['Occupancy Rate', `${icuData.occupancyRate}%`],
            ['Critical Patients', icuData.criticalPatients],
            ['Average Response Time', `${icuData.avgResponseTime} minutes`],
            [''],
            ['PATIENT DETAILS'],
            [
                'Patient ID',
                'Name',
                'Age',
                'Diagnosis',
                'Risk Level',
                'Days in ICU',
                'Bed',
                'Ventilator',
            ],
            ...icuPatients.map((p) => [
                p.id,
                p.name,
                p.age,
                p.diagnosis,
                p.riskLevel,
                p.daysInICU,
                p.bedNumber,
                p.ventilator ? 'Yes' : 'No',
            ]),
            [''],
            ['ACTIVE ALERTS'],
            ['Severity', 'Message', 'Patient', 'Time'],
            ...icuAlerts
                .filter((a) => !a.acknowledged)
                .map((a) => [a.severity, a.message, a.patient, a.time]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `icu_patient_report_${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);

        alert(
            '✅ ICU Patient Report downloaded successfully!\n\nFile saved to your Downloads folder.'
        );
    };

    const getRiskColor = (riskLevel) => {
        switch (riskLevel) {
            case 'critical':
                return '#f44336';
            case 'high':
                return '#ff9800';
            case 'stable':
                return '#4caf50';
            default:
                return '#2196f3';
        }
    };

    return (
        <IcuContainer darkMode={darkMode}>
            <DashboardTitle>🚨 ICU Command Center - Critical Care Monitoring</DashboardTitle>

            {emergencyActive && (
                <CriticalAlert>
                    <div className="alert-header">🚨 EMERGENCY PROTOCOL ACTIVE 🚨</div>
                    <div className="alert-message">
                        All ICU emergency procedures are in effect. Emergency response team
                        notified.
                    </div>
                </CriticalAlert>
            )}

            <QuickActions>
                <ActionButton
                    onClick={handleEmergencyActivation}
                    emergency
                    disabled={emergencyActive}
                >
                    {emergencyActive ? '🚨 EMERGENCY ACTIVE' : '🚨 Emergency Protocol'}
                </ActionButton>
                <ActionButton onClick={handlePatientDownload} primary>
                    📋 Patient Report
                </ActionButton>
                <ActionButton onClick={() => alert('Bed management interface opened!')}>
                    🛏️ Bed Management
                </ActionButton>
                <ActionButton onClick={() => alert('Staff communication system activated!')}>
                    📞 Alert Staff
                </ActionButton>
            </QuickActions>

            <MetricsGrid>
                <MetricCard>
                    <MetricIcon>🛏️</MetricIcon>
                    <MetricContent>
                        <MetricValue>
                            {icuData.availableBeds}/{icuData.totalBeds}
                        </MetricValue>
                        <MetricLabel>Available ICU Beds</MetricLabel>
                        <MetricStatus status={icuData.availableBeds < 3 ? 'critical' : 'normal'}>
                            {icuData.availableBeds < 3 ? 'Critical' : 'Normal'}
                        </MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>📊</MetricIcon>
                    <MetricContent>
                        <MetricValue>{icuData.occupancyRate}%</MetricValue>
                        <MetricLabel>ICU Occupancy Rate</MetricLabel>
                        <MetricStatus status={icuData.occupancyRate > 90 ? 'critical' : 'normal'}>
                            {icuData.occupancyRate > 90 ? 'High' : 'Normal'}
                        </MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🫁</MetricIcon>
                    <MetricContent>
                        <MetricValue>{icuData.ventilatorsPressure}</MetricValue>
                        <MetricLabel>Ventilator Pressure (cmH2O)</MetricLabel>
                        <MetricStatus status="normal">Optimal</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>⚠️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{icuData.activeAlerts}</MetricValue>
                        <MetricLabel>Active Critical Alerts</MetricLabel>
                        <MetricStatus status={icuData.activeAlerts > 3 ? 'critical' : 'normal'}>
                            {icuData.activeAlerts > 3 ? 'High Alert' : 'Monitored'}
                        </MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>⏱️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{icuData.avgResponseTime}m</MetricValue>
                        <MetricLabel>Avg Response Time</MetricLabel>
                        <MetricStatus status={icuData.avgResponseTime > 5 ? 'warning' : 'normal'}>
                            {icuData.avgResponseTime > 5 ? 'Slow' : 'Fast'}
                        </MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>💔</MetricIcon>
                    <MetricContent>
                        <MetricValue>{icuData.criticalPatients}</MetricValue>
                        <MetricLabel>Critical Patients</MetricLabel>
                        <MetricStatus status={icuData.criticalPatients > 6 ? 'critical' : 'normal'}>
                            {icuData.criticalPatients > 6 ? 'High Risk' : 'Monitoring'}
                        </MetricStatus>
                    </MetricContent>
                </MetricCard>
            </MetricsGrid>

            <PanelsGrid>
                {/* ICU Patient Risk Dashboard */}
                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="⚠️">ICU Patient Risk Dashboard</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <RiskDashboard>
                            {icuPatients.map((patient) => (
                                <PatientCard key={patient.id} riskLevel={patient.riskLevel}>
                                    <PatientInfo>
                                        <div className="patient-header">
                                            <h4>{patient.name}</h4>
                                            <RiskLevel level={patient.riskLevel}>
                                                {patient.riskLevel === 'critical'
                                                    ? '🚨'
                                                    : patient.riskLevel === 'high'
                                                    ? '⚠️'
                                                    : patient.riskLevel === 'stable'
                                                    ? '✅'
                                                    : '🔵'}
                                                {patient.riskLevel.toUpperCase()}
                                            </RiskLevel>
                                        </div>
                                        <div className="patient-details">
                                            <span>Age: {patient.age}</span>
                                            <span>Bed: {patient.bedNumber}</span>
                                            <span>Day {patient.daysInICU} in ICU</span>
                                        </div>
                                        <p className="diagnosis">{patient.diagnosis}</p>
                                        <div className="patient-status">
                                            <span className="consciousness">
                                                {patient.consciousness}
                                            </span>
                                            {patient.ventilator && (
                                                <span className="ventilator">🫁 Ventilated</span>
                                            )}
                                            <span className={`trend ${patient.trend}`}>
                                                {patient.trend === 'improving'
                                                    ? '📈'
                                                    : patient.trend === 'critical'
                                                    ? '📉'
                                                    : '➖'}{' '}
                                                {patient.trend}
                                            </span>
                                        </div>
                                    </PatientInfo>
                                    <PatientVitals>
                                        <VitalSign
                                            status={patient.heartRate > 100 ? 'warning' : 'normal'}
                                        >
                                            <span className="vital-label">HR</span>
                                            <span className="vital-value">{patient.heartRate}</span>
                                        </VitalSign>
                                        <VitalSign
                                            status={patient.oxygenSat < 95 ? 'critical' : 'normal'}
                                        >
                                            <span className="vital-label">SpO2</span>
                                            <span className="vital-value">
                                                {patient.oxygenSat}%
                                            </span>
                                        </VitalSign>
                                        <VitalSign
                                            status={patient.temperature > 38 ? 'warning' : 'normal'}
                                        >
                                            <span className="vital-label">Temp</span>
                                            <span className="vital-value">
                                                {patient.temperature}°C
                                            </span>
                                        </VitalSign>
                                        <VitalSign status="normal">
                                            <span className="vital-label">BP</span>
                                            <span className="vital-value">
                                                {patient.bloodPressure}
                                            </span>
                                        </VitalSign>
                                    </PatientVitals>
                                </PatientCard>
                            ))}
                        </RiskDashboard>
                    </PanelContent>
                </Panel>

                {/* Device Utilization Dashboard */}
                <Panel span={1}>
                    <PanelHeader>
                        <PanelTitle data-icon="��️">Device Utilization Dashboard</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <DeviceGrid>
                            {deviceUtilization.map((device, index) => (
                                <DeviceCard key={index} status={device.status}>
                                    <div className="device-header">
                                        <h4>{device.device}</h4>
                                        <DeviceStatus status={device.status}>
                                            {device.status === 'high' ? '🔴' : '🟢'}
                                            {device.utilization}%
                                        </DeviceStatus>
                                    </div>
                                    <div className="device-stats">
                                        <span>
                                            {device.inUse}/{device.total} in use
                                        </span>
                                    </div>
                                    <DeviceUtilization>
                                        <UtilizationBar>
                                            <div
                                                className="utilization-fill"
                                                style={{
                                                    width: `${device.utilization}%`,
                                                    background:
                                                        device.status === 'high'
                                                            ? '#ff9800'
                                                            : '#4caf50',
                                                }}
                                            />
                                        </UtilizationBar>
                                    </DeviceUtilization>
                                </DeviceCard>
                            ))}
                        </DeviceGrid>
                    </PanelContent>
                </Panel>

                {/* ICU Stay Duration Analytics */}
                <Panel span={1}>
                    <PanelHeader>
                        <PanelTitle data-icon="📊">ICU Stay Duration Analytics</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <StayAnalytics>
                            {stayAnalytics.map((stay, index) => (
                                <div key={index} className="stay-item">
                                    <div className="stay-info">
                                        <span className="stay-range">{stay.range}</span>
                                        <span className="stay-count">{stay.count} patients</span>
                                    </div>
                                    <StayBar>
                                        <div
                                            className="stay-fill"
                                            style={{ width: `${stay.percentage}%` }}
                                        />
                                    </StayBar>
                                    <span className="stay-percentage">{stay.percentage}%</span>
                                </div>
                            ))}
                        </StayAnalytics>

                        <div className="analytics-summary">
                            <p>
                                <strong>Average Stay:</strong> {icuData.averageStay} days
                            </p>
                            <p>
                                <strong>Recovery Rate:</strong> {icuData.recoveryRate}%
                            </p>
                            <p>
                                <strong>Mortality Rate:</strong> {icuData.mortalityRate}%
                            </p>
                        </div>
                    </PanelContent>
                </Panel>

                {/* Real-Time ICU Alerts */}
                <Panel span={1}>
                    <PanelHeader>
                        <PanelTitle data-icon="🚨">Real-Time ICU Alerts</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <AlertsList>
                            {icuAlerts.map((alert) => (
                                <AlertItem
                                    key={alert.id}
                                    severity={alert.severity}
                                    acknowledged={alert.acknowledged}
                                >
                                    <AlertSeverity severity={alert.severity}>
                                        {alert.severity === 'critical'
                                            ? '🚨'
                                            : alert.severity === 'high'
                                            ? '⚠️'
                                            : alert.severity === 'medium'
                                            ? '🟡'
                                            : 'ℹ️'}
                                    </AlertSeverity>
                                    <div className="alert-content">
                                        <div className="alert-message">{alert.message}</div>
                                        <div className="alert-meta">
                                            <span className="patient">
                                                Patient: {alert.patient}
                                            </span>
                                            <span className="time">{alert.time}</span>
                                        </div>
                                        <div className="alert-action">{alert.action}</div>
                                        {alert.acknowledged && (
                                            <div className="acknowledged">✅ Acknowledged</div>
                                        )}
                                    </div>
                                </AlertItem>
                            ))}
                        </AlertsList>
                    </PanelContent>
                </Panel>

                {/* ICU Case Findings & Diagnoses */}
                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🩺">ICU Case Findings & Diagnoses</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <DiagnosisPanel>
                            {diagnosisFindings.map((finding, index) => (
                                <DiagnosisItem key={index} severity={finding.severity}>
                                    <div className="diagnosis-header">
                                        <h4>{finding.diagnosis}</h4>
                                        <div className="diagnosis-stats">
                                            <span className="count">{finding.count} cases</span>
                                            <span
                                                className={`trend ${
                                                    finding.trend.includes('+')
                                                        ? 'increasing'
                                                        : finding.trend.includes('-')
                                                        ? 'decreasing'
                                                        : 'stable'
                                                }`}
                                            >
                                                {finding.trend.includes('+')
                                                    ? '📈'
                                                    : finding.trend.includes('-')
                                                    ? '📉'
                                                    : '➖'}{' '}
                                                {finding.trend}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="severity-indicator">
                                        Severity:{' '}
                                        <span className={`severity ${finding.severity}`}>
                                            {finding.severity.toUpperCase()}
                                        </span>
                                    </div>
                                </DiagnosisItem>
                            ))}
                        </DiagnosisPanel>
                    </PanelContent>
                </Panel>

                {/* Emergency Protocols */}
                <Panel span={1}>
                    <PanelHeader>
                        <PanelTitle data-icon="📋">Emergency Protocols</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <EmergencyProtocol>
                            {emergencyProtocols.map((protocol, index) => (
                                <ProtocolStep key={index} active={emergencyActive && index === 0}>
                                    <div className="step-number">{protocol.step}</div>
                                    <div className="step-content">
                                        <div className="step-action">{protocol.action}</div>
                                        <div className="step-time">Timeline: {protocol.time}</div>
                                    </div>
                                </ProtocolStep>
                            ))}
                        </EmergencyProtocol>

                        {emergencyActive && (
                            <div className="protocol-status">
                                <p>
                                    🚨 <strong>EMERGENCY ACTIVE</strong>
                                </p>
                                <p>All protocols initiated. Staff notified.</p>
                            </div>
                        )}
                    </PanelContent>
                </Panel>
            </PanelsGrid>
        </IcuContainer>
    );
};

IcuCommandCenter.propTypes = propTypes;

export default IcuCommandCenter;
