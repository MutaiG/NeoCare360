import React from 'react';
import PropTypes from 'prop-types';

// Import the custom hook for data fetching
import { useOverviewData } from '../../neocare-360/src/main/webapp/hooks/useHealthcareData';

import {
    DashboardContainer,
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
    ChartContainer,
    TableContainer,
    AlertsContainer,
    AlertItem,
    AlertSeverity,
    AlertText,
    MapContainer,
    StatsList,
    StatsItem,
    StatsValue,
    StatsLabel,
    ProgressBar,
    LoadingSpinner,
    ErrorMessage,
} from './OverviewStyles';

const propTypes = {
    name: PropTypes.string,
    filters: PropTypes.object,
    darkMode: PropTypes.bool,
};

const OverviewWithAPI = ({ name = 'NeoCare360', filters = {}, darkMode = false }) => {
    // Use the custom hook to fetch real data
    const {
        admissionStats,
        bedOccupancy,
        edMetrics,
        labMetrics,
        alerts,
        patientDistribution,
        loading,
        error,
        refresh,
    } = useOverviewData(filters);

    // Loading state
    if (loading) {
        return (
            <DashboardContainer darkMode={darkMode}>
                <DashboardTitle>
                    {name} {filters.county !== 'all' ? `- ${filters.county}` : ''}
                </DashboardTitle>
                <LoadingSpinner>
                    <div className="spinner">🔄</div>
                    <p>Loading healthcare data...</p>
                </LoadingSpinner>
            </DashboardContainer>
        );
    }

    // Error state
    if (error) {
        return (
            <DashboardContainer darkMode={darkMode}>
                <DashboardTitle>
                    {name} {filters.county !== 'all' ? `- ${filters.county}` : ''}
                </DashboardTitle>
                <ErrorMessage>
                    <div className="error-icon">⚠️</div>
                    <h3>Unable to Load Dashboard Data</h3>
                    <p>{error}</p>
                    <button onClick={refresh} className="retry-button">
                        Try Again
                    </button>
                </ErrorMessage>
            </DashboardContainer>
        );
    }

    return (
        <DashboardContainer darkMode={darkMode}>
            <DashboardTitle>
                {name} {filters.county !== 'all' ? `- ${filters.county}` : ''}
            </DashboardTitle>

            <MetricsGrid>
                <MetricCard>
                    <MetricIcon>🏥</MetricIcon>
                    <MetricContent>
                        <MetricValue>{admissionStats?.admissions24h || 0}</MetricValue>
                        <MetricLabel>Admissions (24h)</MetricLabel>
                        <MetricTrend positive={admissionStats?.trend24h > 0}>
                            {admissionStats?.trend24h > 0 ? '+' : ''}
                            {admissionStats?.trend24h || 0} from yesterday
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🛏️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{bedOccupancy?.overallRate?.toFixed(1) || 0}%</MetricValue>
                        <MetricLabel>Bed Occupancy Rate</MetricLabel>
                        <MetricTrend positive={bedOccupancy?.overallRate < 85}>
                            {bedOccupancy?.overallRate < 85
                                ? 'Within capacity'
                                : 'High utilization'}
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🚨</MetricIcon>
                    <MetricContent>
                        <MetricValue>{edMetrics?.currentLoad || 0}</MetricValue>
                        <MetricLabel>ICU Load</MetricLabel>
                        <MetricTrend positive={edMetrics?.currentLoad < 15}>
                            {edMetrics?.currentLoad < 15 ? 'Normal load' : 'High load'}
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>⏱️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{edMetrics?.avgWaitTime || 0} min</MetricValue>
                        <MetricLabel>ED Wait Time</MetricLabel>
                        <MetricTrend positive={edMetrics?.avgWaitTime < 30}>
                            Target: &lt;30 min
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🧪</MetricIcon>
                    <MetricContent>
                        <MetricValue>{labMetrics?.testsToday || 0}</MetricValue>
                        <MetricLabel>Lab Tests (Today)</MetricLabel>
                        <MetricTrend positive={labMetrics?.avgTurnaroundTime < 4}>
                            Avg turnaround: {labMetrics?.avgTurnaroundTime || 0}h
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>📊</MetricIcon>
                    <MetricContent>
                        <MetricValue>{admissionStats?.caseFindingsToday || 0}</MetricValue>
                        <MetricLabel>Case Findings</MetricLabel>
                        <MetricTrend positive>
                            +{admissionStats?.caseFindingsTrend || 0} since morning
                        </MetricTrend>
                    </MetricContent>
                </MetricCard>
            </MetricsGrid>

            <PanelsGrid>
                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🛏️">Bed Occupancy by Ward</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <TableContainer>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ward</th>
                                        <th>Occupied</th>
                                        <th>Total</th>
                                        <th>Rate</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bedOccupancy?.wardData?.map((ward) => (
                                        <tr key={ward.wardName}>
                                            <td>🏥 {ward.wardName}</td>
                                            <td>{ward.occupied}</td>
                                            <td>{ward.total}</td>
                                            <td>
                                                <span
                                                    className={
                                                        ward.occupancyRate > 85
                                                            ? 'high'
                                                            : ward.occupancyRate > 70
                                                            ? 'medium'
                                                            : 'low'
                                                    }
                                                >
                                                    {ward.occupancyRate?.toFixed(1)}%
                                                </span>
                                            </td>
                                            <td>
                                                <ProgressBar percentage={ward.occupancyRate} />
                                            </td>
                                        </tr>
                                    )) || (
                                        <tr>
                                            <td colSpan="5">No ward data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </TableContainer>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="🧪">Top Lab Tests</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <StatsList>
                            {labMetrics?.topTests?.map((test) => (
                                <StatsItem key={test.testType}>
                                    <StatsLabel data-icon={test.icon || '🧪'}>
                                        {test.testType}
                                    </StatsLabel>
                                    <StatsValue>{test.count}</StatsValue>
                                </StatsItem>
                            )) || <p>No lab test data available</p>}
                        </StatsList>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="🗺️">Patient Distribution</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <StatsList>
                            {patientDistribution?.regions?.map((region) => (
                                <StatsItem key={region.regionName}>
                                    <StatsLabel data-icon="📍">{region.regionName}</StatsLabel>
                                    <StatsValue>
                                        {region.patientCount} ({region.percentage?.toFixed(1)}%)
                                    </StatsValue>
                                </StatsItem>
                            )) || <p>No distribution data available</p>}
                        </StatsList>
                    </PanelContent>
                </Panel>

                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🚨">
                            Active Critical Alerts ({alerts?.criticalAlerts?.length || 0})
                        </PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <AlertsContainer>
                            {alerts?.criticalAlerts?.map((alert) => (
                                <AlertItem key={alert.id} severity={alert.severity}>
                                    <AlertSeverity severity={alert.severity}>
                                        {alert.severity.toUpperCase()}
                                    </AlertSeverity>
                                    <AlertText>
                                        <strong>{alert.title}</strong>
                                        <p>{alert.message}</p>
                                        <small>🕒 {alert.timestamp}</small>
                                    </AlertText>
                                </AlertItem>
                            )) || <p>No critical alerts at this time</p>}
                        </AlertsContainer>
                    </PanelContent>
                </Panel>
            </PanelsGrid>
        </DashboardContainer>
    );
};

OverviewWithAPI.propTypes = propTypes;

export default OverviewWithAPI;
