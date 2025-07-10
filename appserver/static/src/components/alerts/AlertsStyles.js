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

const pulse = keyframes`
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
`;

const blink = keyframes`
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.3; }
`;

const slideIn = keyframes`
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
`;

const criticalAlert = keyframes`
    0%, 100% { background-color: rgba(244, 67, 54, 0.1); border-color: #f44336; }
    50% { background-color: rgba(244, 67, 54, 0.2); border-color: #e53935; }
`;

export const AlertsContainer = styled.div`
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
    animation: ${css`
        ${slideIn} 0.6s ease-out
    `};

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
                return css`
                    background: rgba(244, 67, 54, 0.1);
                    color: var(--error-color);
                    border: 1px solid var(--error-color);
                    animation: ${blink} 2s infinite;
                `;
            case 'warning':
                return css`
                    background: rgba(255, 152, 0, 0.1);
                    color: var(--warning-color);
                    border: 1px solid var(--warning-color);
                `;
            case 'normal':
                return css`
                    background: rgba(76, 175, 80, 0.1);
                    color: var(--success-color);
                    border: 1px solid var(--success-color);
                `;
            default:
                return css`
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

export const AlertFilters = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

export const FilterChip = styled.button`
    padding: 6px 12px;
    border-radius: 16px;
    border: 1px solid var(--border-color);
    background: ${(props) =>
        props.active ? 'var(--accent-color)' : 'var(--bg-surface-secondary)'};
    color: ${(props) => (props.active ? 'white' : 'var(--text-secondary)')};
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: var(--card-shadow);
    }
`;

export const AlertsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 400px;
    overflow-y: auto;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: var(--bg-surface-secondary);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: var(--accent-color);
    }
`;

export const AlertItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
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
    animation: ${css`
        ${slideIn} 0.6s ease-out
    `};

    ${(props) =>
        props.severity === 'critical' &&
        css`
            animation: ${criticalAlert} 2s ease-in-out infinite;
        `}

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .alert-meta {
        display: flex;
        gap: 12px;
        margin-top: 8px;
        flex-wrap: wrap;

        .patient,
        .department {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }

    .alert-status {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-end;

        .escalated {
            font-size: 10px;
            color: var(--error-color);
            font-weight: 600;
        }
    }
`;

export const AlertIcon = styled.div`
    font-size: 24px;
    width: 40px;
    height: 40px;
    background: var(--accent-light);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const AlertContent = styled.div`
    flex: 1;
`;

export const AlertTitle = styled.h4`
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.3;
`;

export const AlertDescription = styled.p`
    margin: 0 0 8px 0;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.4;
`;

export const AlertTime = styled.span`
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 500;
`;

export const SeverityBadge = styled.span`
    font-size: 10px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
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
    border: 1px solid
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
`;

export const AlertActions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const ActionButton = styled.button`
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    background: ${(props) =>
        props.type === 'acknowledge' ? 'var(--success-color)' : 'var(--accent-color)'};
    color: white;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        transform: translateY(-1px);
        box-shadow: var(--card-shadow);
        filter: brightness(1.1);
    }
`;

export const AnomalyChart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    height: 200px;
    padding: 16px 0;
    position: relative;

    .chart-point {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        flex: 1;
    }

    .time-label {
        font-size: 12px;
        color: var(--text-secondary);
        font-weight: 600;
    }
`;

export const AnomalyPoint = styled.div`
    width: 100%;
    background: ${(props) =>
        props.aboveThreshold
            ? 'linear-gradient(180deg, var(--error-color), rgba(244, 67, 54, 0.3))'
            : 'linear-gradient(180deg, var(--success-color), rgba(76, 175, 80, 0.3))'};
    border-radius: 4px 4px 0 0;
    height: ${(props) => Math.max(20, (props.height / 30) * 100)}px;
    position: relative;
    transition: all 0.3s ease;
    display: flex;
    align-items: end;
    justify-content: center;
    padding-bottom: 4px;

    &:hover {
        transform: scaleY(1.1);
        filter: brightness(1.1);
    }

    .anomaly-value {
        font-size: 10px;
        color: white;
        font-weight: 600;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
`;

export const TrendLine = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-color), transparent, var(--accent-color));
    opacity: 0.5;
`;

export const SystemAlerts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const SystemAlertItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .system-icon {
        font-size: 20px;
        width: 32px;
        height: 32px;
        background: var(--accent-light);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .system-content {
        flex: 1;
    }

    .system-type {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 4px;
    }

    .system-message {
        font-size: 13px;
        color: var(--text-secondary);
        margin-bottom: 4px;
    }

    .system-meta {
        font-size: 11px;
        color: var(--text-secondary);
    }
`;

export const AlertStatistics = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const StatCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .stat-category {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
        flex: 1;
    }

    .stat-count {
        font-size: 16px;
        font-weight: 700;
        color: var(--accent-color);
        margin: 0 12px;
    }

    .stat-percentage {
        font-size: 12px;
        color: var(--text-secondary);
        margin: 0 12px;
    }

    .stat-trend {
        font-size: 12px;
        font-weight: 600;
        color: var(--success-color);
    }
`;

export const ResponseMetrics = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ResponseItem = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    border-left: 4px solid
        ${(props) => {
            switch (props.status) {
                case 'warning':
                    return 'var(--warning-color)';
                case 'critical':
                    return 'var(--error-color)';
                default:
                    return 'var(--success-color)';
            }
        }};
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .metric-label {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 8px;
    }

    .metric-value {
        font-size: 20px;
        font-weight: 700;
        color: var(--accent-color);
        margin-bottom: 4px;
    }

    .metric-target {
        font-size: 12px;
        color: var(--text-secondary);
    }
`;

export const EscalationMatrix = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const EscalationLevel = styled.div`
    padding: 20px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border-left: 6px solid
        ${(props) => {
            switch (props.level) {
                case 1:
                    return 'var(--error-color)';
                case 2:
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

    .level-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .level-number {
            font-size: 14px;
            font-weight: 700;
            color: var(--accent-color);
        }

        .response-time {
            font-size: 12px;
            font-weight: 600;
            color: var(--error-color);
        }
    }

    .level-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 8px;
    }

    .level-description {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 12px;
    }

    .level-personnel {
        font-size: 12px;
        color: var(--accent-color);
        font-weight: 600;
    }
`;

// Legacy exports for compatibility
export const PatientAlerts = styled.div``;
export const PatientAlertCard = styled.div``;
export const AlertTimeline = styled.div``;
export const TimelineEvent = styled.div``;
