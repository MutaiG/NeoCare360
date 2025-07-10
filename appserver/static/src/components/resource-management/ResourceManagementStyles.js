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

const progressFill = keyframes`
    from { width: 0%; }
    to { width: var(--target-width); }
`;

const glow = keyframes`
    0%, 100% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.3); }
    50% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.6); }
`;

export const ResourceContainer = styled.div`
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

export const ResourceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
`;

export const ResourceCard = styled.div`
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
        border-color: var(--accent-color);
    }

    .utilization {
        font-size: 14px;
        font-weight: 600;
        color: var(--accent-color);
    }
`;

export const ResourceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: linear-gradient(135deg, var(--accent-light), transparent);
    border-bottom: 1px solid var(--border-color);

    h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
    }
`;

export const ResourceBar = styled.div`
    height: 8px;
    background: var(--bg-surface);
    border-radius: 4px;
    overflow: hidden;
    margin: 0 16px 16px;
    position: relative;

    .occupied-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--accent-color), var(--warning-color));
        border-radius: 4px;
        transition: width 0.5s ease;
        animation: ${progressFill} 0.8s ease-out;
    }
`;

export const ResourceStats = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 16px 16px;
    font-size: 13px;

    div {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .label {
            color: var(--text-secondary);
            font-weight: 500;
        }

        .value {
            font-weight: 600;
            color: var(--text-primary);

            &.occupied {
                color: var(--warning-color);
            }

            &.available {
                color: var(--success-color);
            }
        }
    }
`;

export const StaffGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const StaffCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    border-left: 4px solid
        ${(props) => {
            switch (props.status) {
                case 'low':
                    return 'var(--error-color)';
                case 'good':
                    return 'var(--success-color)';
                case 'over':
                    return 'var(--warning-color)';
                default:
                    return 'var(--border-color)';
            }
        }};
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }
`;

export const StaffInfo = styled.div`
    h4 {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
    }

    .staff-details {
        display: flex;
        gap: 16px;
        font-size: 13px;
        color: var(--text-secondary);

        span {
            font-weight: 500;
        }
    }
`;

export const RatioIndicator = styled.div`
    text-align: right;

    .ratio {
        font-size: 20px;
        font-weight: 700;
        color: ${(props) => {
            switch (props.status) {
                case 'low':
                    return 'var(--error-color)';
                case 'good':
                    return 'var(--success-color)';
                case 'over':
                    return 'var(--warning-color)';
                default:
                    return 'var(--text-primary)';
            }
        }};
    }

    .target {
        font-size: 12px;
        color: var(--text-secondary);
        margin-top: 4px;
    }
`;

export const SupplyGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const SupplyItem = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    border-left: 4px solid
        ${(props) => {
            switch (props.status) {
                case 'low':
                    return 'var(--error-color)';
                case 'good':
                    return 'var(--success-color)';
                case 'high':
                    return 'var(--accent-color)';
                default:
                    return 'var(--border-color)';
            }
        }};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
    }

    .supply-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .item-name {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }
    }

    .supply-details {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: var(--text-secondary);
        margin-bottom: 8px;

        .current {
            font-weight: 600;
            color: var(--text-primary);
        }
    }

    .supply-bar {
        height: 6px;
        background: var(--bg-surface);
        border-radius: 3px;
        overflow: hidden;

        .level-bar {
            height: 100%;
            background: ${(props) => {
                switch (props.status) {
                    case 'low':
                        return 'var(--error-color)';
                    case 'good':
                        return 'var(--success-color)';
                    case 'high':
                        return 'var(--accent-color)';
                    default:
                        return 'var(--border-color)';
                }
            }};
            border-radius: 3px;
            transition: width 0.5s ease;
            animation: ${progressFill} 0.8s ease-out;
        }
    }
`;

export const SupplyLevel = styled.div`
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
    color: ${(props) => {
        switch (props.status) {
            case 'low':
                return '#ffffff';
            case 'good':
                return '#ffffff';
            case 'high':
                return '#ffffff';
            default:
                return 'var(--text-secondary)';
        }
    }};
    background: ${(props) => {
        switch (props.status) {
            case 'low':
                return 'var(--error-color)';
            case 'good':
                return 'var(--success-color)';
            case 'high':
                return 'var(--accent-color)';
            default:
                return 'var(--bg-surface-secondary)';
        }
    }};
`;

export const DevicesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const DeviceItem = styled.div`
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

    .device-info {
        margin-bottom: 12px;

        h4 {
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .device-counts {
            font-size: 13px;
            color: var(--text-secondary);

            .total {
                font-weight: 600;
            }
        }
    }

    .device-status {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }
`;

export const DeviceStatus = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 6px 10px;
    border-radius: 8px;
    color: ${(props) => {
        switch (props.status) {
            case 'active':
                return '#ffffff';
            case 'maintenance':
                return '#ffffff';
            case 'available':
                return '#ffffff';
            default:
                return 'var(--text-secondary)';
        }
    }};
    background: ${(props) => {
        switch (props.status) {
            case 'active':
                return 'var(--success-color)';
            case 'maintenance':
                return 'var(--warning-color)';
            case 'available':
                return 'var(--accent-color)';
            default:
                return 'var(--bg-surface-secondary)';
        }
    }};
`;

export const DowntimeLog = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 300px;
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

export const LogEntry = styled.div`
    padding: 12px 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
    border-left: 4px solid
        ${(props) =>
            props.status === 'resolved' ? 'var(--success-color)' : 'var(--warning-color)'};
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .event-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        .device {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .time {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }

    .event-details {
        font-size: 13px;

        .issue {
            color: var(--text-primary);
            margin-bottom: 4px;
        }

        .duration {
            color: var(--text-secondary);

            .status {
                font-weight: 600;
                color: ${(props) =>
                    props.status === 'resolved' ? 'var(--success-color)' : 'var(--warning-color)'};
            }
        }
    }
`;

export const DiagnosisLinkPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const LinkCategory = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    border-left: 4px solid
        ${(props) => {
            switch (props.dependency) {
                case 'high':
                    return 'var(--error-color)';
                case 'medium':
                    return 'var(--warning-color)';
                case 'low':
                    return 'var(--success-color)';
                default:
                    return 'var(--border-color)';
            }
        }};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
        border-color: var(--accent-color);
    }

    .link-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 8px;

        .diagnosis {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .resource {
            font-size: 13px;
            color: var(--text-secondary);
        }
    }

    .link-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;

        .cases {
            font-weight: 600;
            color: var(--accent-color);
        }

        .dependency {
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 8px;

            &.high {
                color: var(--error-color);
                background: rgba(244, 67, 54, 0.1);
            }

            &.medium {
                color: var(--warning-color);
                background: rgba(255, 152, 0, 0.1);
            }

            &.low {
                color: var(--success-color);
                background: rgba(76, 175, 80, 0.1);
            }
        }
    }
`;
