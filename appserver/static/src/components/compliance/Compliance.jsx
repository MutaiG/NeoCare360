import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
    ComplianceContainer,
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
    ComplianceScore,
    ScoreRing,
    ScoreValue,
    AuditFindings,
    FindingItem,
    FindingSeverity,
    StaffTraining,
    TrainingItem,
    ProgressBar,
    AuditTrail,
    TrailItem,
    PolicyViolations,
    ViolationCard,
    RegulatoryDeadlines,
    DeadlineItem,
    ComplianceMetrics,
    MetricBar,
    RiskAssessment,
    RiskCategory,
    DocumentationAudit,
    DocStatus,
} from './ComplianceStyles';

const propTypes = {
    name: PropTypes.string,
    filters: PropTypes.object,
    darkMode: PropTypes.bool,
};

const Compliance = ({
    name = 'Compliance Dashboard',
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

    // Calculate compliance data based on scope and healthcare metrics
    const complianceData = useMemo(() => {
        let baseData = {};

        if (currentScope === 'hospital' && healthcareMetrics) {
            const satisfactionScore = healthcareMetrics.patientSatisfaction || 75;
            const qualityBase = Math.min(95, satisfactionScore + 15);
            baseData = {
                overallScore: qualityBase,
                hipaaCompliance: Math.min(98, qualityBase + 8),
                policyAdherence: Math.min(95, qualityBase - 2),
                staffTrainingRate: Math.min(92, qualityBase + 2),
                auditFindings: Math.max(1, Math.floor((100 - qualityBase) / 5)),
                criticalViolations: Math.max(0, Math.floor((100 - qualityBase) / 15)),
                infectionControl: Math.min(97, qualityBase + 5),
                medicationSafety: Math.min(96, qualityBase + 3),
                documentationAccuracy: Math.min(94, qualityBase - 1),
                emergencyProtocols: Math.min(93, qualityBase - 3),
                staffCertifications: Math.min(90, qualityBase - 5),
                lastAuditDate: '2024-01-15',
                nextAuditDue: '2024-04-15',
            };
        } else if (currentScope === 'county' && healthcareMetrics) {
            const avgSatisfaction = healthcareMetrics.avgPatientSatisfaction || 72;
            const qualityBase = Math.min(92, avgSatisfaction + 12);
            const hospitalCount = healthcareMetrics.totalHospitals || 8;
            baseData = {
                overallScore: qualityBase,
                hipaaCompliance: Math.min(95, qualityBase + 6),
                policyAdherence: Math.min(92, qualityBase - 3),
                staffTrainingRate: Math.min(89, qualityBase - 1),
                auditFindings: Math.max(2, Math.floor((100 - qualityBase) / 4) * hospitalCount),
                criticalViolations: Math.max(
                    0,
                    Math.floor((100 - qualityBase) / 12) * hospitalCount
                ),
                infectionControl: Math.min(95, qualityBase + 3),
                medicationSafety: Math.min(93, qualityBase + 1),
                documentationAccuracy: Math.min(91, qualityBase - 2),
                emergencyProtocols: Math.min(90, qualityBase - 4),
                staffCertifications: Math.min(87, qualityBase - 6),
                totalHospitals: hospitalCount,
                compliantHospitals: Math.floor(hospitalCount * (qualityBase / 100)),
                lastAuditDate: '2024-01-10',
                nextAuditDue: '2024-04-10',
            };
        } else {
            // National scope
            const avgSatisfaction = healthcareMetrics.avgPatientSatisfaction || 70;
            const qualityBase = Math.min(90, avgSatisfaction + 10);
            const hospitalCount = healthcareMetrics.totalHospitals || 47;
            const countyCount = availableCounties.length || 47;
            baseData = {
                overallScore: qualityBase,
                hipaaCompliance: Math.min(93, qualityBase + 5),
                policyAdherence: Math.min(89, qualityBase - 4),
                staffTrainingRate: Math.min(86, qualityBase - 2),
                auditFindings: Math.max(5, Math.floor((100 - qualityBase) / 3) * countyCount),
                criticalViolations: Math.max(1, Math.floor((100 - qualityBase) / 10) * countyCount),
                infectionControl: Math.min(92, qualityBase + 2),
                medicationSafety: Math.min(90, qualityBase),
                documentationAccuracy: Math.min(88, qualityBase - 3),
                emergencyProtocols: Math.min(87, qualityBase - 5),
                staffCertifications: Math.min(84, qualityBase - 7),
                totalHospitals: hospitalCount,
                totalCounties: countyCount,
                compliantHospitals: Math.floor(hospitalCount * (qualityBase / 100)),
                compliantCounties: Math.floor(countyCount * ((qualityBase + 5) / 100)),
                lastAuditDate: '2024-01-01',
                nextAuditDue: '2024-04-01',
            };
        }

        return baseData;
    }, [currentScope, healthcareMetrics, availableCounties]);

    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        // Simulate real-time compliance updates
        const interval = setInterval(() => {
            if (autoRefresh) {
                const now = new Date();
                setLastUpdate(now);
                setLastUpdateTime(now.toLocaleTimeString());
                setComplianceData((prev) => ({
                    ...prev,
                    overallCompliance: Math.max(
                        90,
                        Math.min(98, prev.overallCompliance + (Math.random() - 0.5) * 1)
                    ),
                    handHygiene: Math.max(
                        93,
                        Math.min(99, prev.handHygiene + (Math.random() - 0.5) * 0.8)
                    ),
                    medicationSafety: Math.max(
                        88,
                        Math.min(96, prev.medicationSafety + (Math.random() - 0.5) * 1.2)
                    ),
                }));
            }
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const auditFindings = [
        {
            id: 'AUD001',
            category: 'HIPAA Compliance',
            finding: 'Unauthorized access to patient records',
            severity: 'critical',
            department: 'Emergency Department',
            dateFound: '2024-01-15',
            status: 'open',
            daysOpen: 3,
        },
        {
            id: 'AUD002',
            category: 'Medication Safety',
            finding: 'Incomplete medication reconciliation documentation',
            severity: 'high',
            department: 'Pharmacy',
            dateFound: '2024-01-12',
            status: 'in-progress',
            daysOpen: 6,
        },
        {
            id: 'AUD003',
            category: 'Fire Safety',
            finding: 'Emergency exit partially obstructed',
            severity: 'medium',
            department: 'Surgery',
            dateFound: '2024-01-10',
            status: 'resolved',
            daysOpen: 0,
        },
        {
            id: 'AUD004',
            category: 'Documentation',
            finding: 'Missing physician signatures on orders',
            severity: 'medium',
            department: 'ICU',
            dateFound: '2024-01-08',
            status: 'open',
            daysOpen: 10,
        },
    ];

    const staffTraining = [
        {
            department: 'Emergency Department',
            total: 45,
            completed: 42,
            percentage: 93.3,
            overdue: 3,
            status: 'good',
        },
        {
            department: 'ICU',
            total: 32,
            completed: 28,
            percentage: 87.5,
            overdue: 4,
            status: 'warning',
        },
        {
            department: 'Surgery',
            total: 38,
            completed: 35,
            percentage: 92.1,
            overdue: 3,
            status: 'good',
        },
        {
            department: 'Pharmacy',
            total: 15,
            completed: 12,
            percentage: 80.0,
            overdue: 3,
            status: 'warning',
        },
        {
            department: 'Laboratory',
            total: 22,
            completed: 21,
            percentage: 95.5,
            overdue: 1,
            status: 'excellent',
        },
    ];

    const auditTrail = [
        {
            id: 'AT001',
            timestamp: '2024-01-17 14:35:22',
            user: 'Dr. Smith',
            action: 'Accessed patient record',
            resource: 'Patient ID: PT-001234',
            ipAddress: 'xxx.xxx.x.xxx',
            department: 'Emergency',
            risk: 'low',
        },
        {
            id: 'AT002',
            timestamp: '2024-01-17 14:28:15',
            user: 'Nurse Johnson',
            action: 'Modified medication order',
            resource: 'Order ID: MED-567890',
            ipAddress: 'xxx.xxx.x.xxx',
            department: 'ICU',
            risk: 'medium',
        },
        {
            id: 'AT003',
            timestamp: '2024-01-17 14:15:08',
            user: 'Admin User',
            action: 'Exported patient data',
            resource: 'Report: Monthly Statistics',
            ipAddress: 'xxx.xxx.x.xxx',
            department: 'Administration',
            risk: 'high',
        },
    ];

    const policyViolations = [
        {
            id: 'PV001',
            policy: 'Password Security Policy',
            violation: 'Password not changed in 90+ days',
            affectedUsers: 8,
            department: 'Multiple',
            severity: 'medium',
            trend: '+2',
        },
        {
            id: 'PV002',
            policy: 'Clean Desk Policy',
            violation: 'Patient information left unattended',
            affectedUsers: 3,
            department: 'Emergency',
            severity: 'high',
            trend: '-1',
        },
        {
            id: 'PV003',
            policy: 'Data Backup Policy',
            violation: 'Local data storage on personal devices',
            affectedUsers: 5,
            department: 'Surgery',
            severity: 'critical',
            trend: '0',
        },
    ];

    const regulatoryDeadlines = [
        {
            id: 'RD001',
            regulation: 'CMS Quality Reporting',
            deadline: '2024-01-31',
            daysRemaining: 14,
            status: 'on-track',
            completion: 75,
            responsible: 'Quality Department',
        },
        {
            id: 'RD002',
            regulation: 'Joint Commission Survey',
            deadline: '2024-02-15',
            daysRemaining: 29,
            status: 'behind',
            completion: 45,
            responsible: 'Administration',
        },
        {
            id: 'RD003',
            regulation: 'OSHA Safety Training',
            deadline: '2024-01-25',
            daysRemaining: 8,
            status: 'critical',
            completion: 30,
            responsible: 'HR Department',
        },
    ];

    const complianceMetrics = [
        { metric: 'HIPAA Compliance', score: 94.2, target: 95, status: 'warning' },
        { metric: 'Joint Commission Standards', score: 89.8, target: 90, status: 'warning' },
        { metric: 'CMS Quality Measures', score: 92.5, target: 85, status: 'excellent' },
        { metric: 'OSHA Safety Standards', score: 87.1, target: 90, status: 'behind' },
        { metric: 'State Regulations', score: 91.3, target: 88, status: 'good' },
    ];

    const riskCategories = [
        {
            category: 'Data Security',
            riskLevel: 'medium',
            score: 75,
            vulnerabilities: 8,
            recommendations: 'Implement 2FA, update encryption',
        },
        {
            category: 'Patient Safety',
            riskLevel: 'low',
            score: 92,
            vulnerabilities: 2,
            recommendations: 'Continue current protocols',
        },
        {
            category: 'Financial Compliance',
            riskLevel: 'high',
            score: 68,
            vulnerabilities: 12,
            recommendations: 'Review billing procedures, audit coding',
        },
        {
            category: 'Environmental Safety',
            riskLevel: 'low',
            score: 88,
            vulnerabilities: 3,
            recommendations: 'Update emergency procedures',
        },
    ];

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'critical':
                return '🚨';
            case 'high':
                return '⚠️';
            case 'medium':
                return '🔶';
            default:
                return 'ℹ️';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'excellent':
                return 'var(--success-color)';
            case 'good':
                return 'var(--success-color)';
            case 'warning':
                return 'var(--warning-color)';
            case 'behind':
            case 'critical':
                return 'var(--error-color)';
            default:
                return 'var(--text-secondary)';
        }
    };

    return (
        <ComplianceContainer darkMode={darkMode}>
            <DashboardTitle>🔍 Compliance & Audit Dashboard</DashboardTitle>

            <MetricsGrid>
                <MetricCard>
                    <MetricIcon>🛡️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{complianceData.overallScore.toFixed(1)}%</MetricValue>
                        <MetricLabel>Overall Compliance Score</MetricLabel>
                        <MetricStatus status="good">Good Standing</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🔒</MetricIcon>
                    <MetricContent>
                        <MetricValue>{complianceData.hipaaCompliance.toFixed(1)}%</MetricValue>
                        <MetricLabel>HIPAA Compliance</MetricLabel>
                        <MetricStatus status="normal">Compliant</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>📋</MetricIcon>
                    <MetricContent>
                        <MetricValue>{complianceData.policyAdherence.toFixed(1)}%</MetricValue>
                        <MetricLabel>Policy Adherence</MetricLabel>
                        <MetricStatus status="warning">Needs Attention</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>���</MetricIcon>
                    <MetricContent>
                        <MetricValue>{complianceData.staffTrainingRate.toFixed(1)}%</MetricValue>
                        <MetricLabel>Staff Training Completion</MetricLabel>
                        <MetricStatus status="normal">On Track</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>🔍</MetricIcon>
                    <MetricContent>
                        <MetricValue>{complianceData.auditFindings}</MetricValue>
                        <MetricLabel>Open Audit Findings</MetricLabel>
                        <MetricStatus status="warning">Action Required</MetricStatus>
                    </MetricContent>
                </MetricCard>

                <MetricCard>
                    <MetricIcon>⚠️</MetricIcon>
                    <MetricContent>
                        <MetricValue>{complianceData.criticalViolations}</MetricValue>
                        <MetricLabel>Critical Violations</MetricLabel>
                        <MetricStatus status="critical">Immediate Action</MetricStatus>
                    </MetricContent>
                </MetricCard>
            </MetricsGrid>

            <PanelsGrid>
                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="📊">Compliance Score Overview</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <ComplianceScore>
                            <ScoreRing score={complianceData.overallScore}>
                                <ScoreValue>{complianceData.overallScore.toFixed(1)}%</ScoreValue>
                            </ScoreRing>
                            <div className="score-details">
                                <div className="score-label">Overall Compliance</div>
                                <div className="score-status">Good Standing</div>
                                <div className="score-improvement">+2.1% this month</div>
                            </div>
                        </ComplianceScore>
                    </PanelContent>
                </Panel>

                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🔍">Recent Audit Findings</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <AuditFindings>
                            {auditFindings.map((finding) => (
                                <FindingItem key={finding.id} severity={finding.severity}>
                                    <div className="finding-header">
                                        <FindingSeverity severity={finding.severity}>
                                            {getSeverityIcon(finding.severity)}{' '}
                                            {finding.severity.toUpperCase()}
                                        </FindingSeverity>
                                        <span className="days-open">
                                            {finding.daysOpen} days open
                                        </span>
                                    </div>
                                    <div className="finding-title">{finding.finding}</div>
                                    <div className="finding-meta">
                                        <span className="category">{finding.category}</span>
                                        <span className="department">📍 {finding.department}</span>
                                        <span className="date">📅 {finding.dateFound}</span>
                                    </div>
                                    <div className={`finding-status ${finding.status}`}>
                                        {finding.status.replace('-', ' ').toUpperCase()}
                                    </div>
                                </FindingItem>
                            ))}
                        </AuditFindings>
                    </PanelContent>
                </Panel>

                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="🎓">Staff Training Status</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <StaffTraining>
                            {staffTraining.map((training) => (
                                <TrainingItem key={training.department} status={training.status}>
                                    <div className="training-header">
                                        <span className="department">{training.department}</span>
                                        <span className="percentage">
                                            {training.percentage.toFixed(1)}%
                                        </span>
                                    </div>
                                    <ProgressBar
                                        percentage={training.percentage}
                                        status={training.status}
                                    >
                                        <div className="progress-fill" />
                                    </ProgressBar>
                                    <div className="training-details">
                                        <span className="completed">
                                            {training.completed}/{training.total} completed
                                        </span>
                                        <span className="overdue">{training.overdue} overdue</span>
                                    </div>
                                </TrainingItem>
                            ))}
                        </StaffTraining>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="📋">Compliance Metrics</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <ComplianceMetrics>
                            {complianceMetrics.map((metric) => (
                                <div key={metric.metric} className="metric-item">
                                    <div className="metric-label">{metric.metric}</div>
                                    <div className="metric-values">
                                        <span className="score">{metric.score.toFixed(1)}%</span>
                                        <span className="target">Target: {metric.target}%</span>
                                    </div>
                                    <MetricBar
                                        percentage={(metric.score / 100) * 100}
                                        status={metric.status}
                                    />
                                </div>
                            ))}
                        </ComplianceMetrics>
                    </PanelContent>
                </Panel>

                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="📝">Recent Audit Trail</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <AuditTrail>
                            {auditTrail.map((trail) => (
                                <TrailItem key={trail.id} risk={trail.risk}>
                                    <div className="trail-time">{trail.timestamp}</div>
                                    <div className="trail-content">
                                        <div className="trail-action">
                                            <strong>{trail.user}</strong> {trail.action}
                                        </div>
                                        <div className="trail-resource">{trail.resource}</div>
                                        <div className="trail-meta">
                                            🏥 {trail.department} • 🌐 {trail.ipAddress}
                                        </div>
                                    </div>
                                    <div className={`risk-level ${trail.risk}`}>
                                        {trail.risk.toUpperCase()} RISK
                                    </div>
                                </TrailItem>
                            ))}
                        </AuditTrail>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="⚠️">Policy Violations</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <PolicyViolations>
                            {policyViolations.map((violation) => (
                                <ViolationCard key={violation.id} severity={violation.severity}>
                                    <div className="violation-header">
                                        <span className="policy-name">{violation.policy}</span>
                                        <span className="trend">
                                            {violation.trend === '0' ? '→' : violation.trend}
                                        </span>
                                    </div>
                                    <div className="violation-description">
                                        {violation.violation}
                                    </div>
                                    <div className="violation-stats">
                                        <span className="affected">
                                            👥 {violation.affectedUsers} affected
                                        </span>
                                        <span className="department">
                                            🏥 {violation.department}
                                        </span>
                                    </div>
                                </ViolationCard>
                            ))}
                        </PolicyViolations>
                    </PanelContent>
                </Panel>

                <Panel span={2}>
                    <PanelHeader>
                        <PanelTitle data-icon="📅">Regulatory Deadlines</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <RegulatoryDeadlines>
                            {regulatoryDeadlines.map((deadline) => (
                                <DeadlineItem key={deadline.id} status={deadline.status}>
                                    <div className="deadline-header">
                                        <span className="regulation">{deadline.regulation}</span>
                                        <span className="days-remaining">
                                            {deadline.daysRemaining} days left
                                        </span>
                                    </div>
                                    <div className="deadline-progress">
                                        <ProgressBar
                                            percentage={deadline.completion}
                                            status={deadline.status}
                                        >
                                            <div className="progress-fill" />
                                        </ProgressBar>
                                        <span className="completion">
                                            {deadline.completion}% complete
                                        </span>
                                    </div>
                                    <div className="deadline-meta">
                                        <span className="deadline-date">
                                            📅 Due: {deadline.deadline}
                                        </span>
                                        <span className="responsible">
                                            👤 {deadline.responsible}
                                        </span>
                                    </div>
                                </DeadlineItem>
                            ))}
                        </RegulatoryDeadlines>
                    </PanelContent>
                </Panel>

                <Panel>
                    <PanelHeader>
                        <PanelTitle data-icon="🎯">Risk Assessment</PanelTitle>
                    </PanelHeader>
                    <PanelContent>
                        <RiskAssessment>
                            {riskCategories.map((risk) => (
                                <RiskCategory key={risk.category} riskLevel={risk.riskLevel}>
                                    <div className="risk-header">
                                        <span className="category">{risk.category}</span>
                                        <span className="risk-score">{risk.score}%</span>
                                    </div>
                                    <div className="risk-details">
                                        <div className="vulnerabilities">
                                            🔍 {risk.vulnerabilities} vulnerabilities
                                        </div>
                                        <div className="recommendations">
                                            💡 {risk.recommendations}
                                        </div>
                                    </div>
                                </RiskCategory>
                            ))}
                        </RiskAssessment>
                    </PanelContent>
                </Panel>
            </PanelsGrid>
        </ComplianceContainer>
    );
};

Compliance.propTypes = propTypes;

export default Compliance;
