import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
    ResourceContainer,
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
    ResourceGrid,
    ResourceCard,
    ResourceHeader,
    ResourceBar,
    ResourceStats,
    StaffGrid,
    StaffCard,
    StaffInfo,
    RatioIndicator,
    SupplyGrid,
    SupplyItem,
    SupplyLevel,
    DevicesList,
    DeviceItem,
    DeviceStatus,
    DowntimeLog,
    LogEntry,
    DiagnosisLinkPanel,
    LinkCategory,
} from './ResourceManagementStyles';

const propTypes = {
    name: PropTypes.string,
    filters: PropTypes.object,
    darkMode: PropTypes.bool,
};

const ResourceManagement = ({
    name = 'Resource Management',
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

    // Calculate resource data based on actual healthcare metrics and scope
    const resourceData = useMemo(() => {
        let baseData = {};

        if (currentScope === 'hospital' && healthcareMetrics) {
            baseData = {
                totalBeds: healthcareMetrics.totalBeds || 170,
                occupiedBeds: healthcareMetrics.occupiedBeds || 129,
                availableBeds:
                    (healthcareMetrics.totalBeds || 170) - (healthcareMetrics.occupiedBeds || 129),
                icuBeds: healthcareMetrics.icuBeds || 12,
                occupancyRate: healthcareMetrics.occupancyRate || 76,
                criticalCare: healthcareMetrics.criticalPatients || 8,
                staffOnDuty: healthcareMetrics.staffOnDuty || 45,
                oxygenSupplyDays: 12 + Math.floor(Math.random() * 6),
                nursePatientRatio:
                    (healthcareMetrics.staffOnDuty / (healthcareMetrics.occupiedBeds || 129)) * 3,
                deviceUtilization: 75 + Math.floor(Math.random() * 10),
                emergencyCapacity: Math.floor((healthcareMetrics.totalBeds || 170) * 0.15),
                medicineStock: 85 + Math.floor(Math.random() * 10),
            };
        } else if (currentScope === 'county' && healthcareMetrics) {
            baseData = {
                totalBeds: healthcareMetrics.totalBeds || 1200,
                occupiedBeds: healthcareMetrics.totalOccupiedBeds || 960,
                availableBeds:
                    (healthcareMetrics.totalBeds || 1200) -
                    (healthcareMetrics.totalOccupiedBeds || 960),
                totalHospitals: healthcareMetrics.totalHospitals || 8,
                occupancyRate: healthcareMetrics.avgOccupancyRate || 80,
                criticalCare: healthcareMetrics.totalCriticalPatients || 45,
                staffOnDuty: healthcareMetrics.totalStaffOnDuty || 320,
                oxygenSupplyDays: 15 + Math.floor(Math.random() * 8),
                nursePatientRatio:
                    (healthcareMetrics.totalStaffOnDuty /
                        (healthcareMetrics.totalOccupiedBeds || 960)) *
                    3,
                deviceUtilization: 72 + Math.floor(Math.random() * 8),
                emergencyCapacity: Math.floor((healthcareMetrics.totalBeds || 1200) * 0.12),
                medicineStock: 82 + Math.floor(Math.random() * 12),
                ambulances: (healthcareMetrics.totalHospitals || 8) * 2,
            };
        } else {
            // National scope
            baseData = {
                totalBeds: healthcareMetrics.totalBeds || 8500,
                occupiedBeds: healthcareMetrics.totalOccupiedBeds || 6800,
                availableBeds:
                    (healthcareMetrics.totalBeds || 8500) -
                    (healthcareMetrics.totalOccupiedBeds || 6800),
                totalHospitals: healthcareMetrics.totalHospitals || 47,
                totalCounties: availableCounties.length || 47,
                occupancyRate: healthcareMetrics.avgOccupancyRate || 80,
                criticalCare: healthcareMetrics.totalCriticalPatients || 340,
                staffOnDuty: healthcareMetrics.totalStaffOnDuty || 2100,
                oxygenSupplyDays: 18 + Math.floor(Math.random() * 10),
                nursePatientRatio:
                    (healthcareMetrics.totalStaffOnDuty /
                        (healthcareMetrics.totalOccupiedBeds || 6800)) *
                    3,
                deviceUtilization: 70 + Math.floor(Math.random() * 8),
                emergencyCapacity: Math.floor((healthcareMetrics.totalBeds || 8500) * 0.1),
                medicineStock: 78 + Math.floor(Math.random() * 15),
                ambulances: (healthcareMetrics.totalHospitals || 47) * 3,
                helicopters: Math.floor((availableCounties.length || 47) / 5),
            };
        }

        return baseData;
    }, [currentScope, healthcareMetrics, availableCounties]);

    // Calculate resource utilization trends based on date range
    const utilizationTrends = useMemo(() => {
        const multiplier =
            dateRange === '1h' ? 0.1 : dateRange === '24h' ? 0.5 : dateRange === '7d' ? 1.0 : 1.5;

        return {
            bedUtilizationTrend: (resourceData.occupancyRate * multiplier).toFixed(1),
            staffEfficiency: (
                (resourceData.staffOnDuty / resourceData.occupiedBeds) *
                100 *
                multiplier
            ).toFixed(1),
            equipmentUsage: (resourceData.deviceUtilization * multiplier).toFixed(1),
            supplyChainStatus: resourceData.medicineStock > 85 ? 'optimal' : 'monitor',
            emergencyReadiness: resourceData.emergencyCapacity > 20 ? 'ready' : 'limited',
            resourceAllocation:
                currentScope === 'hospital'
                    ? 'local'
                    : currentScope === 'county'
                    ? 'regional'
                    : 'national',
        };
    }, [resourceData, dateRange, currentScope]);

    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        // Simulate real-time resource updates
        const interval = setInterval(() => {
            if (autoRefresh) {
                const now = new Date();
                setLastUpdate(now);
                setLastUpdateTime(now.toLocaleTimeString());
                // Resource data is now calculated dynamically via useMemo based on filters
            }
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const bedResources = [
        { ward: 'ICU', total: 15, occupied: 12, available: 3, utilization: 80 },
        { ward: 'General Medicine', total: 60, occupied: 45, available: 15, utilization: 75 },
        { ward: 'Surgery', total: 40, occupied: 32, available: 8, utilization: 80 },
        { ward: 'Pediatrics', total: 25, occupied: 18, available: 7, utilization: 72 },
        { ward: 'Emergency', total: 20, occupied: 16, available: 4, utilization: 80 },
        { ward: 'Maternity', total: 30, occupied: 22, available: 8, utilization: 73 },
    ];

    const staffRatios = [
        { department: 'ICU', nurses: 8, patients: 12, ratio: 1.5, target: 2.0, status: 'low' },
        {
            department: 'Emergency',
            nurses: 6,
            patients: 16,
            ratio: 2.7,
            target: 3.0,
            status: 'good',
        },
        { department: 'Surgery', nurses: 5, patients: 32, ratio: 6.4, target: 5.0, status: 'over' },
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
    ];

    const supplyInventory = [
        { item: 'N95 Masks', current: 450, minimum: 200, maximum: 800, status: 'good' },
        { item: 'Surgical Gloves', current: 2400, minimum: 1000, maximum: 5000, status: 'good' },
        { item: 'Hand Sanitizer', current: 85, minimum: 100, maximum: 300, status: 'low' },
        { item: 'Oxygen Tanks', current: 45, minimum: 30, maximum: 80, status: 'good' },
        { item: 'IV Bags', current: 180, minimum: 150, maximum: 500, status: 'good' },
        { item: 'Syringes', current: 950, minimum: 500, maximum: 2000, status: 'good' },
    ];

    const deviceUtilization = [
        { device: 'Ventilators', total: 15, active: 8, maintenance: 1, available: 6 },
        { device: 'Cardiac Monitors', total: 25, active: 20, maintenance: 2, available: 3 },
        { device: 'Infusion Pumps', total: 30, active: 22, maintenance: 1, available: 7 },
        { device: 'Defibrillators', total: 12, active: 8, maintenance: 0, available: 4 },
        { device: 'X-Ray Machines', total: 4, active: 3, maintenance: 1, available: 0 },
        { device: 'CT Scanners', total: 2, active: 2, maintenance: 0, available: 0 },
    ];

    const downtimeEvents = [
        {
            id: 1,
            device: 'CT Scanner #2',
            issue: 'Calibration error',
            startTime: '14:30',
            duration: '2h 15m',
            status: 'resolved',
        },
        {
            id: 2,
            device: 'Ventilator #7',
            issue: 'Filter replacement',
            startTime: '09:45',
            duration: '45m',
            status: 'resolved',
        },
        {
            id: 3,
            device: 'Infusion Pump #12',
            issue: 'Software update',
            startTime: '16:20',
            duration: '1h 30m',
            status: 'ongoing',
        },
    ];

    const resourceLinkedDiagnoses = [
        { diagnosis: 'Respiratory Failure', resource: 'Oxygen', cases: 8, dependency: 'high' },
        {
            diagnosis: 'Cardiac Monitoring',
            resource: 'Cardiac Monitors',
            cases: 12,
            dependency: 'high',
        },
        { diagnosis: 'Post-Surgical Care', resource: 'ICU Beds', cases: 6, dependency: 'medium' },
        { diagnosis: 'Emergency Trauma', resource: 'Emergency Beds', cases: 9, dependency: 'high' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'low':
                return '#e74c3c';
            case 'good':
                return '#27ae60';
            case 'over':
                return '#f39c12';
            default:
                return '#95a5a6';
        }
    };

    const getSupplyColor = (status) => {
        switch (status) {
            case 'low':
                return '#e74c3c';
            case 'good':
                return '#27ae60';
            case 'high':
                return '#3498db';
            default:
                return '#95a5a6';
        }
    };

    return (
        <ResourceContainer darkMode={darkMode}>
            <DashboardTitle>📦 Resource Management Dashboard</DashboardTitle>

            <MetricsGrid>
                <MetricCard>
                    <MetricIcon>🛏️</MetricIcon>
                    <MetricContent>
                        <MetricValue>
                            {resourceData.occupiedBeds}/{resourceData.totalBeds}
                        </MetricValue>
                        <MetricLabel>Total Bed Utilization</MetricLabel>
                        <MetricStatus
                            status={
                                resourceData.occupiedBeds / resourceData.totalBeds > 0.85
                                    ? 'critical'
                                    : 'normal'
                            }
                        >
                            {((resourceData.occupiedBeds / resourceData.totalBeds) * 100).toFixed(
                                1
                            )}
                            % Occupied
                        </MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>👩‍⚕️</MetricIcon>
                    <MetricContent>
                        <MetricValue>1:{resourceData.nursePatientRatio.toFixed(1)}</MetricValue>
                        <MetricLabel>Average Nurse-Patient Ratio</MetricLabel>
                        <MetricStatus
                            status={resourceData.nursePatientRatio < 2 ? 'warning' : 'normal'}
                        >
                            {resourceData.nursePatientRatio < 2 ? 'Understaffed' : 'Adequate'}
                        </MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🫁</MetricIcon>
                    <MetricContent>
                        <MetricValue>{resourceData.oxygenSupplyDays.toFixed(0)} days</MetricValue>
                        <MetricLabel>Oxygen Supply Forecast</MetricLabel>
                        <MetricStatus
                            status={resourceData.oxygenSupplyDays < 10 ? 'warning' : 'normal'}
                        >
                            {resourceData.oxygenSupplyDays < 10 ? 'Reorder Soon' : 'Sufficient'}
                        </MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>⚙️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{resourceData.deviceUtilization.toFixed(1)}%</MetricValue>
                        <MetricLabel>Device Utilization Rate</MetricLabel>
                        <MetricStatus status="normal">Optimal Range</MetricStatus>
                    </MetricContent>
                </MetricCard>
            </MetricsGrid>

            <PanelsGrid>
                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🏥">Available vs Occupied Beds by Ward</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <ResourceGrid>
                            {bedResources.map((bed) => (
                                <ResourceCard key={bed.ward}>
                                    <ResourceHeader>
                                        <h4>{bed.ward}</h4>
                                        <span className="utilization">{bed.utilization}%</span>
                                    </ResourceHeader>
                                    <ResourceStats>
                                        <div>
                                            <span className="label">Total:</span>
                                            <span className="value">{bed.total}</span>
                                        </div>
                                        <div>
                                            <span className="label">Occupied:</span>
                                            <span className="value occupied">{bed.occupied}</span>
                                        </div>
                                        <div>
                                            <span className="label">Available:</span>
                                            <span className="value available">{bed.available}</span>
                                        </div>
                                    </ResourceStats>
                                    <ResourceBar>
                                        <div
                                            className="occupied-bar"
                                            style={{ width: `${bed.utilization}%` }}
                                        />
                                    </ResourceBar>
                                </ResourceCard>
                            ))}
                        </ResourceGrid>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="👩‍⚕️">Nurse-Patient Ratios</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <StaffGrid>
                            {staffRatios.map((staff) => (
                                <StaffCard key={staff.department} status={staff.status}>
                                    <StaffInfo>
                                        <h4>{staff.department}</h4>
                                        <div className="staff-details">
                                            <span>{staff.nurses} nurses</span>
                                            <span>{staff.patients} patients</span>
                                        </div>
                                    </StaffInfo>
                                    <RatioIndicator status={staff.status}>
                                        <div className="ratio">1:{staff.ratio.toFixed(1)}</div>
                                        <div className="target">Target: 1:{staff.target}</div>
                                    </RatioIndicator>
                                </StaffCard>
                            ))}
                        </StaffGrid>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="🧤">PPE & Supply Stock Status</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <SupplyGrid>
                            {supplyInventory.map((supply) => (
                                <SupplyItem key={supply.item} status={supply.status}>
                                    <div className="supply-header">
                                        <span className="item-name">{supply.item}</span>
                                        <SupplyLevel status={supply.status}>
                                            {supply.status.toUpperCase()}
                                        </SupplyLevel>
                                    </div>
                                    <div className="supply-details">
                                        <div className="current">Current: {supply.current}</div>
                                        <div className="range">
                                            Min: {supply.minimum} | Max: {supply.maximum}
                                        </div>
                                    </div>
                                    <div className="supply-bar">
                                        <div
                                            className="level-bar"
                                            style={{
                                                width: `${
                                                    (supply.current / supply.maximum) * 100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </SupplyItem>
                            ))}
                        </SupplyGrid>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="⚙️">Device Utilization Overview</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <DevicesList>
                            {deviceUtilization.map((device) => (
                                <DeviceItem key={device.device}>
                                    <div className="device-info">
                                        <h4>{device.device}</h4>
                                        <div className="device-counts">
                                            <span className="total">Total: {device.total}</span>
                                        </div>
                                    </div>
                                    <div className="device-status">
                                        <DeviceStatus status="active">
                                            Active: {device.active}
                                        </DeviceStatus>
                                        <DeviceStatus status="maintenance">
                                            Maintenance: {device.maintenance}
                                        </DeviceStatus>
                                        <DeviceStatus status="available">
                                            Available: {device.available}
                                        </DeviceStatus>
                                    </div>
                                </DeviceItem>
                            ))}
                        </DevicesList>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="🔧">Equipment Downtime Logs</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <DowntimeLog>
                            {downtimeEvents.map((event) => (
                                <LogEntry key={event.id} status={event.status}>
                                    <div className="event-header">
                                        <span className="device">{event.device}</span>
                                        <span className="time">{event.startTime}</span>
                                    </div>
                                    <div className="event-details">
                                        <div className="issue">{event.issue}</div>
                                        <div className="duration">
                                            Duration: {event.duration} •{' '}
                                            <span className="status">{event.status}</span>
                                        </div>
                                    </div>
                                </LogEntry>
                            ))}
                        </DowntimeLog>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="🔗">Resource-Linked Diagnoses</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <DiagnosisLinkPanel>
                            {resourceLinkedDiagnoses.map((link) => (
                                <LinkCategory key={link.diagnosis} dependency={link.dependency}>
                                    <div className="link-info">
                                        <span className="diagnosis">{link.diagnosis}</span>
                                        <span className="resource">→ {link.resource}</span>
                                    </div>
                                    <div className="link-stats">
                                        <span className="cases">{link.cases} cases</span>
                                        <span className={`dependency ${link.dependency}`}>
                                            {link.dependency} dependency
                                        </span>
                                    </div>
                                </LinkCategory>
                            ))}
                        </DiagnosisLinkPanel>
                    </PanelContent>
                </Panel>
            </PanelsGrid>
        </ResourceContainer>
    );
};

ResourceManagement.propTypes = propTypes;

export default ResourceManagement;
