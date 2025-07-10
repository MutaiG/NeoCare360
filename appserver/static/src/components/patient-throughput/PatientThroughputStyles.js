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

const slideIn = keyframes`
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
`;

const flowAnimation = keyframes`
    0% { transform: translateX(-10px); opacity: 0.7; }
    50% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(10px); opacity: 0.7; }
`;

export const ThroughputContainer = styled.div`
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

export const MetricTrend = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 12px;
    display: inline-block;
    background: ${(props) =>
        props.positive ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)'};
    color: ${(props) => (props.positive ? 'var(--success-color)' : 'var(--warning-color)')};
    border: 1px solid
        ${(props) => (props.positive ? 'var(--success-color)' : 'var(--warning-color)')};
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

export const ProcessFlow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    overflow-x: auto;
    padding: 8px 0;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 24px;
    }
`;

export const FlowStage = styled.div`
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    min-width: 140px;
    border: 2px solid
        ${(props) => {
            switch (props.status) {
                case 'critical':
                    return 'var(--error-color)';
                case 'warning':
                    return 'var(--warning-color)';
                default:
                    return 'var(--success-color)';
            }
        }};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
    }

    h4 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
    }
`;

export const StageMetric = styled.div`
    .current {
        font-size: 18px;
        font-weight: 700;
        color: var(--accent-color);
        margin-bottom: 8px;
    }

    .wait-time {
        font-size: 12px;
        color: var(--text-secondary);
        margin-bottom: 4px;
    }

    .utilization {
        font-size: 12px;
        color: var(--text-secondary);
        font-weight: 600;
    }
`;

export const FlowArrow = styled.div`
    font-size: 24px;
    color: var(--accent-color);
    animation: ${flowAnimation} 2s ease-in-out infinite;
    flex-shrink: 0;

    @media (max-width: 768px) {
        transform: rotate(90deg);
    }
`;

export const BottleneckAlert = styled.div`
    background: ${(props) => {
        switch (props.severity) {
            case 'high':
                return 'rgba(244, 67, 54, 0.1)';
            case 'medium':
                return 'rgba(255, 152, 0, 0.1)';
            default:
                return 'rgba(76, 175, 80, 0.1)';
        }
    }};
    border-left: 4px solid
        ${(props) => {
            switch (props.severity) {
                case 'high':
                    return 'var(--error-color)';
                case 'medium':
                    return 'var(--warning-color)';
                default:
                    return 'var(--success-color)';
            }
        }};
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    &:last-child {
        margin-bottom: 0;
    }

    .bottleneck-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        h4 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .wait-time {
            font-size: 14px;
            font-weight: 700;
            color: var(--error-color);
        }
    }

    .impact {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 8px;
    }

    .suggestion {
        font-size: 12px;
        color: var(--accent-color);
        font-weight: 600;
    }
`;

export const WaitTimeChart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    height: 200px;
    padding: 16px 0;
    gap: 8px;

    .chart-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .time-label {
        font-size: 12px;
        color: var(--text-secondary);
        font-weight: 600;
    }

    .admissions {
        font-size: 11px;
        color: var(--text-secondary);
    }
`;

export const ChartBar = styled.div`
    width: 100%;
    background: linear-gradient(180deg, var(--accent-color), var(--accent-light));
    border-radius: 4px 4px 0 0;
    height: ${(props) => props.height}px;
    min-height: 20px;
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

    .wait-time {
        font-size: 10px;
        color: white;
        font-weight: 600;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
`;

export const DischargeMetrics = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
`;

export const DischargeCard = styled.div`
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
    }

    .discharge-type {
        font-size: 12px;
        color: var(--text-secondary);
        font-weight: 600;
        margin-bottom: 8px;
    }

    .discharge-count {
        font-size: 24px;
        font-weight: 700;
        color: var(--accent-color);
        margin-bottom: 4px;
    }

    .discharge-percentage {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 8px;
    }

    .discharge-trend {
        font-size: 12px;
        font-weight: 600;
        color: var(--success-color);
    }
`;

export const PatientQueue = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const QueueItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .patient-info {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .patient-name {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .patient-id {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }

    .patient-stage {
        font-size: 12px;
        color: var(--accent-color);
        font-weight: 600;
    }

    .wait-info {
        text-align: center;

        .wait-time {
            font-size: 12px;
            color: var(--warning-color);
            font-weight: 600;
        }

        .eta {
            font-size: 11px;
            color: var(--text-secondary);
        }
    }
`;

export const PriorityIndicator = styled.div`
    font-size: 10px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
    background: ${(props) => {
        switch (props.priority) {
            case 'high':
                return 'rgba(244, 67, 54, 0.1)';
            case 'medium':
                return 'rgba(255, 152, 0, 0.1)';
            default:
                return 'rgba(76, 175, 80, 0.1)';
        }
    }};
    color: ${(props) => {
        switch (props.priority) {
            case 'high':
                return 'var(--error-color)';
            case 'medium':
                return 'var(--warning-color)';
            default:
                return 'var(--success-color)';
        }
    }};
    border: 1px solid
        ${(props) => {
            switch (props.priority) {
                case 'high':
                    return 'var(--error-color)';
                case 'medium':
                    return 'var(--warning-color)';
                default:
                    return 'var(--success-color)';
            }
        }};
`;

export const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 300px;
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

export const TimelineItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    border-left: 4px solid
        ${(props) => {
            switch (props.type) {
                case 'success':
                    return 'var(--success-color)';
                case 'warning':
                    return 'var(--warning-color)';
                case 'error':
                    return 'var(--error-color)';
                default:
                    return 'var(--accent-color)';
            }
        }};
    transition: all 0.2s ease;
    animation: ${slideIn} 0.6s ease-out;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }
`;

export const TimelineTime = styled.div`
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 600;
    min-width: 60px;
`;

export const TimelineEvent = styled.div`
    font-size: 14px;
    color: var(--text-primary);
    flex: 1;
    line-height: 1.4;
`;

// Legacy exports for compatibility
export const FlowChart = styled.div``;
export const FlowStep = styled.div``;
export const FlowMetric = styled.div``;
export const ThroughputTable = styled.div``;
