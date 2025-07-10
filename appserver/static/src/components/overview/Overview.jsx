import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
    DashboardContainer,
    DashboardTitle,
    QuickActionBar,
    ActionButton,
    MetricsGrid,
    MetricCard,
    MetricIcon,
    MetricContent,
    MetricValue,
    MetricLabel,
    MetricTrend,
    TrendIcon,
    PanelsGrid,
    Panel,
    PanelHeader,
    PanelTitle,
    PanelContent,
    AlertsList,
    AlertItem,
    AlertIcon,
    AlertContent,
    AlertTime,
    AlertAction,
    ChartContainer,
    ResourceCard,
    ResourceIcon,
    ResourceDetails,
    ResourceUsage,
    UsageBar,
    ProgressFill,
    StatsCard,
    StatItem,
    StatValue,
    StatLabel,
    ActivityList,
    ActivityItem,
    ActivityTime,
    BedOccupancyGrid,
    WardCard,
    WardName,
    OccupancyBar,
    OccupancyLabel,
} from './OverviewStyles';

const propTypes = {
    name: PropTypes.string,
    darkMode: PropTypes.bool,
    autoRefresh: PropTypes.bool,
    filters: PropTypes.object,
};

const Overview = ({ name = 'NeoCare360', darkMode = false, autoRefresh = true, filters = {} }) => {
    // Extract filter context data
    const {
        healthcareMetrics = {},
        getCurrentScope = () => 'national',
        getCurrentLocationName = () => 'Kenya National',
        county = 'all',
        subcounty = 'all',
        hospital = 'all',
        availableHospitals = [],
        availableCounties = [],
    } = filters;

    const currentScope = getCurrentScope();
    const locationName = getCurrentLocationName();

    // Generate dashboard data based on current metrics and scope
    const dashboardData = useMemo(() => {
        if (currentScope === 'hospital' && healthcareMetrics && healthcareMetrics.hospitalId) {
            // Single hospital view
            return {
                totalAdmissions24h: healthcareMetrics.admissions24h || 0,
                totalBeds: healthcareMetrics.totalBeds || 0,
                occupiedBeds: healthcareMetrics.occupiedBeds || 0,
                bedOccupancyRate: healthcareMetrics.occupancyRate || 0,
                emergencyVisits: healthcareMetrics.emergencyVisits24h || 0,
                criticalPatients: healthcareMetrics.criticalPatients || 0,
                avgWaitTime: healthcareMetrics.avgWaitTime || 0,
                staffOnDuty: healthcareMetrics.staffOnDuty || 0,
                patientSatisfaction: healthcareMetrics.patientSatisfaction || 0,
                icuBeds: healthcareMetrics.icuBeds || 0,
                availableBeds: healthcareMetrics.availableBeds || 0,
                discharges24h: healthcareMetrics.discharges24h || 0,
            };
        } else if (currentScope === 'county' && healthcareMetrics && healthcareMetrics.countyId) {
            // County aggregated view
            return {
                totalAdmissions24h: healthcareMetrics.totalAdmissions24h || 0,
                totalBeds: healthcareMetrics.totalBeds || 0,
                occupiedBeds: healthcareMetrics.totalOccupiedBeds || 0,
                bedOccupancyRate: healthcareMetrics.avgOccupancyRate || 0,
                emergencyVisits: healthcareMetrics.totalEmergencyVisits24h || 0,
                criticalPatients: healthcareMetrics.totalCriticalPatients || 0,
                avgWaitTime: healthcareMetrics.avgWaitTime || 0,
                staffOnDuty: healthcareMetrics.totalStaffOnDuty || 0,
                patientSatisfaction: healthcareMetrics.avgPatientSatisfaction || 0,
                totalHospitals: healthcareMetrics.totalHospitals || 0,
                availableBeds:
                    healthcareMetrics.totalBeds - healthcareMetrics.totalOccupiedBeds || 0,
                discharges24h: healthcareMetrics.totalDischarges24h || 0,
            };
        } else {
            // National view
            return {
                totalAdmissions24h: healthcareMetrics.totalAdmissions24h || 0,
                totalBeds: healthcareMetrics.totalBeds || 0,
                occupiedBeds: healthcareMetrics.totalOccupiedBeds || 0,
                bedOccupancyRate: healthcareMetrics.avgOccupancyRate || 0,
                emergencyVisits: healthcareMetrics.totalEmergencyVisits24h || 0,
                criticalPatients: healthcareMetrics.totalCriticalPatients || 0,
                avgWaitTime: healthcareMetrics.avgWaitTime || 0,
                staffOnDuty: healthcareMetrics.totalStaffOnDuty || 0,
                patientSatisfaction: healthcareMetrics.avgPatientSatisfaction || 0,
                totalHospitals: healthcareMetrics.totalHospitals || 0,
                totalCounties: availableCounties.length || 0,
                availableBeds:
                    healthcareMetrics.totalBeds - healthcareMetrics.totalOccupiedBeds || 0,
                discharges24h: healthcareMetrics.totalDischarges24h || 0,
            };
        }
    }, [healthcareMetrics, currentScope, availableCounties]);

    // Generate realistic alerts based on current scope and data
    const alerts = useMemo(() => {
        const alertsList = [];

        if (dashboardData.bedOccupancyRate > 85) {
            alertsList.push({
                id: 1,
                severity: 'critical',
                text: `Bed occupancy critical at ${dashboardData.bedOccupancyRate}%`,
                time: '2 min ago',
                department: currentScope === 'hospital' ? 'Administration' : 'County Health',
                action: 'Review patient discharge protocols',
            });
        }

        if (dashboardData.avgWaitTime > 60) {
            alertsList.push({
                id: 2,
                severity: 'warning',
                text: `Emergency wait time elevated (${dashboardData.avgWaitTime} min)`,
                time: '5 min ago',
                department: 'Emergency Department',
                action: 'Deploy additional staff',
            });
        }

        if (dashboardData.criticalPatients > 10 && currentScope === 'hospital') {
            alertsList.push({
                id: 3,
                severity: 'warning',
                text: `High number of critical patients (${dashboardData.criticalPatients})`,
                time: '8 min ago',
                department: 'ICU',
                action: 'Monitor ICU capacity',
            });
        }

        // Default alerts if none triggered
        if (alertsList.length === 0) {
            alertsList.push({
                id: 1,
                severity: 'info',
                text: 'All systems operational',
                time: '10 min ago',
                department: 'System Monitor',
                action: 'Continue monitoring',
            });
        }

        return alertsList;
    }, [dashboardData, locationName, currentScope]);

    // Generate recent activity based on scope
    const recentActivity = useMemo(() => {
        const activities = [];

        if (currentScope === 'hospital') {
            activities.push(
                {
                    id: 1,
                    action: 'Patient admitted to ICU',
                    time: '5 min ago',
                    user: 'Dr. Sarah Mwangi',
                    type: 'admission',
                },
                {
                    id: 2,
                    action: 'Lab results processed',
                    time: '12 min ago',
                    user: 'Lab Tech James',
                    type: 'lab',
                }
            );
        } else {
            activities.push(
                {
                    id: 1,
                    action: `${dashboardData.totalAdmissions24h} admissions processed`,
                    time: '1 hour ago',
                    user: 'System Update',
                    type: 'summary',
                },
                {
                    id: 2,
                    action: 'Bed occupancy updated',
                    time: '30 min ago',
                    user: 'Data Sync',
                    type: 'update',
                }
            );
        }

        return activities;
    }, [currentScope, locationName, dashboardData]);

    // Resource usage data based on current scope
    const resourceUsage = useMemo(() => {
        const resources = [];

        if (currentScope === 'hospital') {
            resources.push(
                {
                    resource: 'Hospital Beds',
                    used: dashboardData.occupiedBeds,
                    total: dashboardData.totalBeds,
                    status: dashboardData.bedOccupancyRate > 85 ? 'warning' : 'normal',
                    icon: '🛏️',
                },
                {
                    resource: 'ICU Beds',
                    used: dashboardData.icuBeds ? Math.floor(dashboardData.icuBeds * 0.7) : 0,
                    total: dashboardData.icuBeds,
                    status: 'normal',
                    icon: '🏥',
                },
                {
                    resource: 'Staff on Duty',
                    used: dashboardData.staffOnDuty,
                    total: Math.floor(dashboardData.staffOnDuty * 1.2),
                    status: 'normal',
                    icon: '👨‍⚕️',
                }
            );
        } else {
            resources.push(
                {
                    resource: 'Total Beds',
                    used: dashboardData.occupiedBeds,
                    total: dashboardData.totalBeds,
                    status: dashboardData.bedOccupancyRate > 80 ? 'warning' : 'normal',
                    icon: '🛏️',
                },
                {
                    resource: 'Active Hospitals',
                    used: dashboardData.totalHospitals,
                    total: dashboardData.totalHospitals,
                    status: 'normal',
                    icon: '🏥',
                },
                {
                    resource: 'Healthcare Staff',
                    used: dashboardData.staffOnDuty,
                    total: Math.floor(dashboardData.staffOnDuty * 1.1),
                    status: 'normal',
                    icon: '👨‍⚕️',
                }
            );
        }

        return resources;
    }, [currentScope, dashboardData]);

    // Event handlers
    const handleDownloadReport = (type) => {
        const reportData = {
            type,
            scope: currentScope,
            data: dashboardData,
            timestamp: new Date().toISOString(),
        };

        const blob = new Blob([JSON.stringify(reportData, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-report-${currentScope}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        console.log(`Downloading ${type} report...`);
    };

    const handleAlertAction = (alertId, action) => {
        console.log(`Alert ${alertId}: ${action}`);
        alert(`Action taken: ${action}`);
    };

    return (
        <DashboardContainer darkMode={darkMode}>
            <DashboardTitle>🏥 Healthcare Dashboard Overview</DashboardTitle>

            <QuickActionBar>
                <ActionButton onClick={() => handleDownloadReport('overview')} primary>
                    📊 Generate Report
                </ActionButton>
                <ActionButton onClick={() => handleDownloadReport('summary')}>
                    📋 Export Summary
                </ActionButton>
                {currentScope === 'hospital' && (
                    <ActionButton onClick={() => alert('Emergency protocols activated!')}>
                        🚨 Emergency Protocol
                    </ActionButton>
                )}
                <ActionButton onClick={() => alert('Optimization analysis started!')}>
                    🔄 Optimize Resources
                </ActionButton>
            </QuickActionBar>

            <MetricsGrid>
                <MetricCard>
                    <MetricIcon>🏥</MetricIcon>
                    <MetricContent>
                        <MetricValue>{dashboardData.totalAdmissions24h}</MetricValue>
                        <MetricLabel>24h Admissions</MetricLabel>
                        <MetricTrend positive>
                            <TrendIcon>↗️</TrendIcon>+{Math.floor(Math.random() * 15) + 5}% vs
                            yesterday
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🛏️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{dashboardData.bedOccupancyRate}%</MetricValue>
                        <MetricLabel>Bed Occupancy</MetricLabel>
                        <MetricTrend negative={dashboardData.bedOccupancyRate > 85}>
                            <TrendIcon>
                                {dashboardData.bedOccupancyRate > 85 ? '⚠️' : '→'}
                            </TrendIcon>
                            {dashboardData.bedOccupancyRate > 85 ? 'High' : 'Stable'}
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🚨</MetricIcon>
                    <MetricContent>
                        <MetricValue>{dashboardData.criticalPatients}</MetricValue>
                        <MetricLabel>Critical Patients</MetricLabel>
                        <MetricTrend negative={dashboardData.criticalPatients > 10}>
                            <TrendIcon>
                                {dashboardData.criticalPatients > 10 ? '⚠️' : '📉'}
                            </TrendIcon>
                            {dashboardData.criticalPatients > 10 ? 'Elevated' : 'Normal'}
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>⏱️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{dashboardData.avgWaitTime}min</MetricValue>
                        <MetricLabel>Avg Wait Time</MetricLabel>
                        <MetricTrend positive={dashboardData.avgWaitTime < 45}>
                            <TrendIcon>{dashboardData.avgWaitTime < 45 ? '✅' : '⏰'}</TrendIcon>
                            {dashboardData.avgWaitTime < 45 ? 'Good' : 'Monitor'}
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>😊</MetricIcon>
                    <MetricContent>
                        <MetricValue>{dashboardData.patientSatisfaction}%</MetricValue>
                        <MetricLabel>Patient Satisfaction</MetricLabel>
                        <MetricTrend positive>
                            <TrendIcon>⭐</TrendIcon>
                            {dashboardData.patientSatisfaction > 90 ? 'Excellent' : 'Good'}
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>📊</MetricIcon>
                    <MetricContent>
                        <MetricValue>
                            {currentScope === 'national'
                                ? dashboardData.totalCounties
                                : dashboardData.totalHospitals || 1}
                        </MetricValue>
                        <MetricLabel>
                            {currentScope === 'national'
                                ? 'Counties'
                                : currentScope === 'county'
                                ? 'Hospitals'
                                : 'Hospital'}
                        </MetricLabel>
                        <MetricTrend positive>
                            <TrendIcon>🏥</TrendIcon>
                            Active
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>
            </MetricsGrid>

            <PanelsGrid>
                {/* Alerts Panel */}
                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🚨">
                            {currentScope === 'hospital' ? 'Hospital' : 'Regional'} Alerts
                        </PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <AlertsList>
                            {alerts.map((alert) => (
                                <AlertItem key={alert.id} severity={alert.severity}>
                                    <AlertIcon>
                                        {alert.severity === 'critical'
                                            ? '🔴'
                                            : alert.severity === 'warning'
                                            ? '🟡'
                                            : '🔵'}
                                    </AlertIcon>
                                    <AlertContent>
                                        <div className="alert-text">{alert.text}</div>
                                        <div className="alert-department">{alert.department}</div>
                                    </AlertContent>
                                    <AlertTime>{alert.time}</AlertTime>
                                    <AlertAction
                                        onClick={() => handleAlertAction(alert.id, alert.action)}
                                    >
                                        🔧
                                    </AlertAction>
                                </AlertItem>
                            ))}
                        </AlertsList>
                    </PanelContent>
                </Panel>

                {/* Resource Usage Panel */}
                <Panel span={1}>
                    <PanelHeader>
                        <PanelTitle data-icon="📦">Resource Usage</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        {resourceUsage.map((resource, index) => (
                            <ResourceCard key={index} status={resource.status}>
                                <ResourceIcon>{resource.icon}</ResourceIcon>
                                <ResourceDetails>
                                    <h4>{resource.resource}</h4>
                                    <span className="usage-count">
                                        {resource.used.toLocaleString()}/
                                        {resource.total.toLocaleString()}
                                    </span>
                                </ResourceDetails>
                                <ResourceUsage>
                                    <UsageBar>
                                        <ProgressFill
                                            width={
                                                resource.total > 0
                                                    ? (resource.used / resource.total) * 100
                                                    : 0
                                            }
                                            color={
                                                resource.status === 'warning'
                                                    ? '#ff9800'
                                                    : '#4caf50'
                                            }
                                        />
                                    </UsageBar>
                                    <span className="percentage">
                                        {resource.total > 0
                                            ? Math.round((resource.used / resource.total) * 100)
                                            : 0}
                                        %
                                    </span>
                                </ResourceUsage>
                            </ResourceCard>
                        ))}
                    </PanelContent>
                </Panel>

                {/* Recent Activity Panel */}
                <Panel span={1}>
                    <PanelHeader>
                        <PanelTitle data-icon="📋">Recent Activity</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <ActivityList>
                            {recentActivity.map((activity) => (
                                <ActivityItem key={activity.id} type={activity.type}>
                                    <div className="activity-content">
                                        <div className="activity-action">{activity.action}</div>
                                        <div className="activity-user">{activity.user}</div>
                                    </div>
                                    <ActivityTime>{activity.time}</ActivityTime>
                                </ActivityItem>
                            ))}
                        </ActivityList>
                    </PanelContent>
                </Panel>
            </PanelsGrid>
        </DashboardContainer>
    );
};

Overview.propTypes = propTypes;

export default Overview;
