import styled, { keyframes, css } from 'styled-components';
import { variables, mixins } from '../../themes/simpleTheme';

// Theme configuration matching Overview
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
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.02); opacity: 0.9; }
`;

const heartbeat = keyframes`
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.1); }
    50% { transform: scale(1); }
    75% { transform: scale(1.05); }
`;

const glow = keyframes`
    0%, 100% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.3); }
    50% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.6); }
`;

export const MonitoringContainer = styled.div`
    padding: 24px;
    background: ${(props) => (props.darkMode ? darkTheme.background : lightTheme.background)};
    color: ${(props) => (props.darkMode ? darkTheme.text : lightTheme.text)};
    min-height: 100vh;
    transition: all 0.3s ease;
    animation: ${slideIn} 0.5s ease-out;

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
    margin: 0 0 24px 0;
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
    gap: 16px;
    padding: 24px;
    background: var(--bg-surface);
    border-radius: 16px;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, var(--accent-color), var(--success-color));
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow);
        border-color: var(--accent-color);

        &::before {
            transform: scaleX(1);
        }
    }
`;

export const MetricIcon = styled.div`
    font-size: 48px;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--accent-light), transparent);
    border-radius: 16px;
    animation: ${css`
        ${pulse} 3s infinite ease-in-out
    `};
`;

export const MetricContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const MetricValue = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
`;

export const MetricLabel = styled.div`
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
`;

export const MetricStatus = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 12px;
    color: ${(props) => {
        switch (props.status) {
            case 'critical':
                return '#ffffff';
            case 'warning':
                return '#ffffff';
            case 'normal':
                return '#ffffff';
            default:
                return 'var(--text-secondary)';
        }
    }};
    background: ${(props) => {
        switch (props.status) {
            case 'critical':
                return 'var(--error-color)';
            case 'warning':
                return 'var(--warning-color)';
            case 'normal':
                return 'var(--success-color)';
            default:
                return 'var(--bg-surface-secondary)';
        }
    }};
    align-self: flex-start;
`;

export const PanelsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    grid-column: span ${(props) => props.span || 1};
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover {
        box-shadow: var(--shadow);
        transform: translateY(-2px);
        border-color: var(--accent-color);

        &::before {
            opacity: 1;
        }
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
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
    }
`;

export const PanelTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 8px;

    &[data-icon]::before {
        content: attr(data-icon);
        font-size: 20px;
    }
`;

export const PanelContent = styled.div`
    padding: 24px;
`;

export const VitalsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
`;

export const VitalCard = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
        border-color: var(--accent-color);
    }

    h4 {
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
    }

    .timestamp {
        font-size: 12px;
        color: var(--text-secondary);
        margin-top: 12px;
        font-style: italic;
    }
`;

export const VitalTrend = styled.div`
    /* Add vital trend styling if needed */
`;

export const PatientsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const PatientItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    border-left: 4px solid
        ${(props) => {
            switch (props.status) {
                case 'critical':
                    return 'var(--error-color)';
                case 'warning':
                    return 'var(--warning-color)';
                case 'stable':
                    return 'var(--success-color)';
                default:
                    return 'var(--border-color)';
            }
        }};
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .status-indicator {
        position: absolute;
        top: 16px;
        right: 16px;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .last-update {
        font-size: 12px;
        color: var(--text-secondary);
        margin-top: 4px;
    }
`;

export const PatientInfo = styled.div`
    flex: 1;

    h4 {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
    }

    p {
        margin: 0;
        font-size: 14px;
        color: var(--text-secondary);
    }
`;

export const PatientVitals = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    min-width: 200px;
`;

export const VitalIndicator = styled.div`
    font-size: 12px;
    color: var(--text-secondary);

    span {
        font-weight: 600;
        color: var(--text-primary);
    }
`;

export const AlertsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
`;

export const AlertCard = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    border-left: 4px solid
        ${(props) => {
            switch (props.severity) {
                case 'critical':
                    return 'var(--error-color)';
                case 'high':
                    return 'var(--warning-color)';
                case 'moderate':
                    return 'var(--accent-color)';
                default:
                    return 'var(--success-color)';
            }
        }};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
    }

    .alert-content {
        h4 {
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .alert-count {
            font-size: 14px;
            font-weight: 600;
            color: var(--accent-color);
            margin-bottom: 4px;
        }

        .alert-description {
            font-size: 13px;
            color: var(--text-secondary);
        }
    }
`;

export const AlertIcon = styled.div`
    font-size: 24px;
    margin-bottom: 8px;
`;

export const HeatmapContainer = styled.div`
    .heatmap-legend {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 16px;
        text-align: center;
    }
`;

export const HeatmapGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;

    .time-slot {
        text-align: center;

        .time-label {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }
    }
`;

export const HeatmapCell = styled.div`
    width: 100%;
    height: 20px;
    border-radius: 4px;
    margin: 2px 0;
    background: ${(props) => {
        const intensity = props.value / 100;
        const baseColor =
            props.type === 'heartRate'
                ? '220, 53, 69'
                : props.type === 'oxygenSat'
                ? '40, 167, 69'
                : '255, 193, 7';
        return `rgba(${baseColor}, ${Math.min(1, Math.max(0.2, intensity))})`;
    }};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: var(--card-shadow);
    }
`;

export const DiagnosisSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const DiagnosisCategory = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;

    &:hover {
        background: var(--accent-light);
        border-color: var(--accent-color);
    }

    .diagnosis-info {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .diagnosis-name {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .diagnosis-alerts {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }

    .trend {
        font-size: 14px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 8px;

        &.increase {
            color: var(--error-color);
            background: rgba(244, 67, 54, 0.1);
        }

        &.decrease {
            color: var(--success-color);
            background: rgba(76, 175, 80, 0.1);
        }

        &.stable {
            color: var(--text-secondary);
            background: var(--bg-surface);
        }
    }
`;

export const TimelineContainer = styled.div`
    /* Add timeline styling if needed */
`;

export const TimelineItem = styled.div`
    /* Add timeline item styling if needed */
`;

export const LiveFeedContainer = styled.div`
    max-height: 400px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: var(--bg-surface-secondary);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--accent-color);
        border-radius: 3px;
    }
`;

export const VitalsFeed = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 12px;
`;

export const FeedItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;

    .label {
        font-weight: 600;
        color: var(--text-secondary);
    }

    .value {
        font-weight: 600;
        color: var(--text-primary);
    }
`;
