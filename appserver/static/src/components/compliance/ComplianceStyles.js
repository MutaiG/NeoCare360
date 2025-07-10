import styled, { keyframes, css } from 'styled-components';
import { variables, mixins } from '../../themes/simpleTheme';

// Theme configuration
const lightTheme = {
    background: '#f8f9fa',
    surface: '#ffffff',
    surfaceSecondary: '#f1f3f4',
    text: '#202124',
    textSecondary: '#5f6368',
    border: '#dadce0',
    accent: '#1976d2',
    accentLight: '#e3f2fd',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    shadow: '0 2px 10px rgba(0,0,0,0.1)',
    cardShadow: '0 1px 3px rgba(0,0,0,0.12)',
};

const darkTheme = {
    background: '#0f1419',
    surface: '#1a1d23',
    surfaceSecondary: '#242832',
    text: '#e8eaed',
    textSecondary: '#9aa0a6',
    border: '#3c4043',
    accent: '#42a5f5',
    accentLight: 'rgba(66, 165, 245, 0.12)',
    success: '#66bb6a',
    warning: '#ffb74d',
    error: '#ef5350',
    shadow: '0 2px 10px rgba(0,0,0,0.3)',
    cardShadow: '0 1px 3px rgba(0,0,0,0.24)',
};

const slideIn = keyframes`
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
`;

const scoreAnimation = keyframes`
    from { stroke-dasharray: 0 251; }
    to { stroke-dasharray: ${(props) => (props.score / 100) * 251} 251; }
`;

export const ComplianceContainer = styled.div`
    padding: 24px;
    background: ${(props) => (props.darkMode ? darkTheme.background : lightTheme.background)};
    min-height: 100vh;
    color: ${(props) => (props.darkMode ? darkTheme.text : lightTheme.text)};
    transition: all 0.3s ease;

    --bg-primary: ${(props) => (props.darkMode ? darkTheme.background : lightTheme.background)};
    --bg-surface: ${(props) => (props.darkMode ? darkTheme.surface : lightTheme.surface)};
    --bg-surface-secondary: ${(props) =>
        props.darkMode ? darkTheme.surfaceSecondary : lightTheme.surfaceSecondary};
    --text-primary: ${(props) => (props.darkMode ? darkTheme.text : lightTheme.text)};
    --text-secondary: ${(props) =>
        props.darkMode ? darkTheme.textSecondary : lightTheme.textSecondary};
    --border-color: ${(props) => (props.darkMode ? darkTheme.border : lightTheme.border)};
    --accent-color: ${(props) => (props.darkMode ? darkTheme.accent : lightTheme.accent)};
    --accent-light: ${(props) => (props.darkMode ? darkTheme.accentLight : lightTheme.accentLight)};
    --success-color: ${(props) => (props.darkMode ? darkTheme.success : lightTheme.success)};
    --warning-color: ${(props) => (props.darkMode ? darkTheme.warning : lightTheme.warning)};
    --error-color: ${(props) => (props.darkMode ? darkTheme.error : lightTheme.error)};
    --shadow: ${(props) => (props.darkMode ? darkTheme.shadow : lightTheme.shadow)};
    --card-shadow: ${(props) => (props.darkMode ? darkTheme.cardShadow : lightTheme.cardShadow)};
`;

export const DashboardTitle = styled.h1`
    margin: 0 0 32px 0;
    font-size: 32px;
    font-weight: 800;
    color: var(--text-primary);
    background: linear-gradient(135deg, var(--accent-color), var(--text-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 80px;
        height: 4px;
        background: linear-gradient(90deg, var(--accent-color), transparent);
        border-radius: 2px;
    }
`;

export const LiveIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    background: ${(props) => (props.paused ? 'rgba(255, 152, 0, 0.1)' : 'rgba(25, 118, 210, 0.1)')};
    padding: 8px 16px;
    border-radius: 20px;
    box-shadow: var(--card-shadow);
    border: 1px solid
        ${(props) => (props.paused ? 'rgba(255, 152, 0, 0.2)' : 'rgba(25, 118, 210, 0.2)')};

    .dot {
        width: 8px;
        height: 8px;
        background: ${(props) => (props.paused ? 'var(--warning-color)' : 'var(--success-color)')};
        border-radius: 50%;
        animation: ${(props) =>
            props.paused
                ? 'none'
                : css`
                      ${pulse} 2s infinite
                  `};
    }
`;

export const MetricsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 32px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

export const MetricCard = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: var(--bg-surface);
    border-radius: 16px;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    animation: ${slideIn} 0.6s ease-out;

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow);
        border-color: var(--accent-color);
    }
`;

export const MetricIcon = styled.div`
    font-size: 40px;
    width: 64px;
    height: 64px;
    background: var(--accent-light);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        inset: -2px;
        background: linear-gradient(45deg, var(--accent-color), transparent, var(--accent-color));
        border-radius: 18px;
        z-index: -1;
        opacity: 0.3;
    }
`;

export const MetricContent = styled.div`
    flex: 1;
`;

export const MetricValue = styled.div`
    font-size: 32px;
    font-weight: 800;
    color: var(--accent-color);
    line-height: 1.2;
    margin-bottom: 4px;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

export const MetricLabel = styled.div`
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 8px;
    font-weight: 500;
    line-height: 1.4;
`;

export const MetricStatus = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 12px;
    display: inline-block;

    ${(props) => {
        switch (props.status) {
            case 'critical':
                return `
                    background: rgba(244, 67, 54, 0.1);
                    color: var(--error-color);
                    border: 1px solid var(--error-color);
                `;
            case 'warning':
                return `
                    background: rgba(255, 152, 0, 0.1);
                    color: var(--warning-color);
                    border: 1px solid var(--warning-color);
                `;
            case 'good':
            case 'normal':
                return `
                    background: rgba(76, 175, 80, 0.1);
                    color: var(--success-color);
                    border: 1px solid var(--success-color);
                `;
            default:
                return `
                    background: var(--bg-surface-secondary);
                    color: var(--text-secondary);
                    border: 1px solid var(--border-color);
                `;
        }
    }}
`;

export const PanelsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 24px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

export const Panel = styled.div`
    background: var(--bg-surface);
    border-radius: 16px;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
    overflow: hidden;
    grid-column: ${(props) => (props.span ? `span ${props.span}` : 'span 1')};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow);
    }

    @media (max-width: 768px) {
        grid-column: span 1;
    }
`;

export const PanelHeader = styled.div`
    padding: 20px 24px 16px;
    background: linear-gradient(135deg, var(--accent-light), transparent);
    border-bottom: 1px solid var(--border-color);
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 24px;
        right: 24px;
        height: 2px;
        background: linear-gradient(90deg, var(--accent-color), transparent);
        border-radius: 1px;
    }
`;

export const PanelTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 12px;

    &::before {
        content: attr(data-icon);
        font-size: 20px;
        width: 32px;
        height: 32px;
        background: var(--accent-light);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const PanelContent = styled.div`
    padding: 24px;
`;

export const ComplianceScore = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    .score-details {
        flex: 1;

        .score-label {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
        }

        .score-status {
            font-size: 14px;
            color: var(--success-color);
            font-weight: 600;
            margin-bottom: 4px;
        }

        .score-improvement {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }
`;

export const ScoreRing = styled.div`
    position: relative;
    width: 120px;
    height: 120px;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: conic-gradient(
            var(--success-color) 0deg ${(props) => (props.score / 100) * 360}deg,
            var(--bg-surface-secondary) ${(props) => (props.score / 100) * 360}deg 360deg
        );
        padding: 8px;
        mask: radial-gradient(circle, transparent 40px, black 40px);
    }
`;

export const ScoreValue = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    color: var(--accent-color);
`;

export const AuditFindings = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 400px;
    overflow-y: auto;
`;

export const FindingItem = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border-left: 4px solid
        ${(props) => {
            switch (props.severity) {
                case 'critical':
                    return 'var(--error-color)';
                case 'high':
                    return 'var(--warning-color)';
                case 'medium':
                    return 'var(--accent-color)';
                default:
                    return 'var(--success-color)';
            }
        }};
    transition: all 0.2s ease;
    animation: ${slideIn} 0.6s ease-out;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .finding-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .days-open {
            font-size: 12px;
            color: var(--text-secondary);
            font-weight: 600;
        }
    }

    .finding-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 12px;
        line-height: 1.4;
    }

    .finding-meta {
        display: flex;
        gap: 16px;
        margin-bottom: 8px;
        flex-wrap: wrap;

        span {
            font-size: 12px;
            color: var(--text-secondary);
        }

        .category {
            font-weight: 600;
            color: var(--accent-color);
        }
    }

    .finding-status {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 8px;
        display: inline-block;

        &.open {
            background: rgba(244, 67, 54, 0.1);
            color: var(--error-color);
        }

        &.in-progress {
            background: rgba(255, 152, 0, 0.1);
            color: var(--warning-color);
        }

        &.resolved {
            background: rgba(76, 175, 80, 0.1);
            color: var(--success-color);
        }
    }
`;

export const FindingSeverity = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: ${(props) => {
        switch (props.severity) {
            case 'critical':
                return 'rgba(244, 67, 54, 0.1)';
            case 'high':
                return 'rgba(255, 152, 0, 0.1)';
            case 'medium':
                return 'rgba(33, 150, 243, 0.1)';
            default:
                return 'rgba(76, 175, 80, 0.1)';
        }
    }};
    color: ${(props) => {
        switch (props.severity) {
            case 'critical':
                return 'var(--error-color)';
            case 'high':
                return 'var(--warning-color)';
            case 'medium':
                return 'var(--accent-color)';
            default:
                return 'var(--success-color)';
        }
    }};
`;

export const StaffTraining = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const TrainingItem = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
    }

    .training-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .department {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .percentage {
            font-size: 18px;
            font-weight: 700;
            color: var(--accent-color);
        }
    }

    .training-details {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;

        .completed {
            font-size: 12px;
            color: var(--text-secondary);
        }

        .overdue {
            font-size: 12px;
            color: var(--error-color);
            font-weight: 600;
        }
    }
`;

export const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background: var(--bg-surface);
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    .progress-fill {
        height: 100%;
        width: ${(props) => props.percentage}%;
        background: ${(props) => {
            switch (props.status) {
                case 'excellent':
                    return 'linear-gradient(90deg, var(--success-color), #66bb6a)';
                case 'good':
                    return 'linear-gradient(90deg, var(--success-color), var(--accent-color))';
                case 'warning':
                    return 'linear-gradient(90deg, var(--warning-color), #ffb74d)';
                case 'critical':
                case 'behind':
                    return 'linear-gradient(90deg, var(--error-color), #ef5350)';
                default:
                    return 'var(--accent-color)';
            }
        }};
        border-radius: 4px;
        transition: width 0.5s ease;
    }
`;

export const AuditTrail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 400px;
    overflow-y: auto;
`;

export const TrailItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 12px 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    border-left: 4px solid
        ${(props) => {
            switch (props.risk) {
                case 'high':
                    return 'var(--error-color)';
                case 'medium':
                    return 'var(--warning-color)';
                default:
                    return 'var(--success-color)';
            }
        }};
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .trail-time {
        font-size: 11px;
        color: var(--text-secondary);
        min-width: 120px;
        font-family: monospace;
    }

    .trail-content {
        flex: 1;

        .trail-action {
            font-size: 14px;
            color: var(--text-primary);
            margin-bottom: 4px;
        }

        .trail-resource {
            font-size: 12px;
            color: var(--accent-color);
            margin-bottom: 4px;
        }

        .trail-meta {
            font-size: 11px;
            color: var(--text-secondary);
        }
    }

    .risk-level {
        font-size: 10px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 8px;

        &.high {
            background: rgba(244, 67, 54, 0.1);
            color: var(--error-color);
        }

        &.medium {
            background: rgba(255, 152, 0, 0.1);
            color: var(--warning-color);
        }

        &.low {
            background: rgba(76, 175, 80, 0.1);
            color: var(--success-color);
        }
    }
`;

export const PolicyViolations = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ViolationCard = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border-left: 4px solid
        ${(props) => {
            switch (props.severity) {
                case 'critical':
                    return 'var(--error-color)';
                case 'high':
                    return 'var(--warning-color)';
                default:
                    return 'var(--accent-color)';
            }
        }};
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
    }

    .violation-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .policy-name {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .trend {
            font-size: 12px;
            font-weight: 600;
            color: var(--accent-color);
        }
    }

    .violation-description {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 12px;
        line-height: 1.4;
    }

    .violation-stats {
        display: flex;
        gap: 16px;

        span {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }
`;

export const RegulatoryDeadlines = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const DeadlineItem = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border-left: 4px solid
        ${(props) => {
            switch (props.status) {
                case 'critical':
                    return 'var(--error-color)';
                case 'behind':
                    return 'var(--warning-color)';
                default:
                    return 'var(--success-color)';
            }
        }};
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
    }

    .deadline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .regulation {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .days-remaining {
            font-size: 12px;
            font-weight: 600;
            color: ${(props) => {
                switch (props.status) {
                    case 'critical':
                        return 'var(--error-color)';
                    case 'behind':
                        return 'var(--warning-color)';
                    default:
                        return 'var(--success-color)';
                }
            }};
        }
    }

    .deadline-progress {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;

        .completion {
            font-size: 12px;
            color: var(--text-secondary);
            min-width: 80px;
        }
    }

    .deadline-meta {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;

        span {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }
`;

export const ComplianceMetrics = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    .metric-item {
        .metric-label {
            font-size: 14px;
            color: var(--text-primary);
            font-weight: 600;
            margin-bottom: 8px;
        }

        .metric-values {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;

            .score {
                font-size: 16px;
                font-weight: 700;
                color: var(--accent-color);
            }

            .target {
                font-size: 12px;
                color: var(--text-secondary);
            }
        }
    }
`;

export const MetricBar = styled.div`
    width: 100%;
    height: 6px;
    background: var(--bg-surface);
    border-radius: 3px;
    overflow: hidden;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: ${(props) => props.percentage}%;
        background: ${(props) => {
            switch (props.status) {
                case 'excellent':
                    return 'var(--success-color)';
                case 'good':
                    return 'var(--accent-color)';
                case 'warning':
                    return 'var(--warning-color)';
                case 'behind':
                    return 'var(--error-color)';
                default:
                    return 'var(--accent-color)';
            }
        }};
        border-radius: 3px;
        transition: width 0.5s ease;
    }
`;

export const RiskAssessment = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const RiskCategory = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border-left: 4px solid
        ${(props) => {
            switch (props.riskLevel) {
                case 'high':
                    return 'var(--error-color)';
                case 'medium':
                    return 'var(--warning-color)';
                default:
                    return 'var(--success-color)';
            }
        }};
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
    }

    .risk-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .category {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .risk-score {
            font-size: 18px;
            font-weight: 700;
            color: ${(props) => {
                switch (props.riskLevel) {
                    case 'high':
                        return 'var(--error-color)';
                    case 'medium':
                        return 'var(--warning-color)';
                    default:
                        return 'var(--success-color)';
                }
            }};
        }
    }

    .risk-details {
        .vulnerabilities {
            font-size: 12px;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }

        .recommendations {
            font-size: 12px;
            color: var(--accent-color);
            font-weight: 500;
        }
    }
`;

// Legacy exports for compatibility
export const DocumentationAudit = styled.div``;
export const DocStatus = styled.div``;
