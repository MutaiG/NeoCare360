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
    50% { transform: scale(1.02); opacity: 0.9; }
`;

const emergency = keyframes`
    0%, 100% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7); }
    50% { box-shadow: 0 0 0 10px rgba(244, 67, 54, 0); }
`;

const slideIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const IcuContainer = styled.div`
    padding: 24px;
    background: ${(props) => (props.darkMode ? darkTheme.background : lightTheme.background)};
    color: ${(props) => (props.darkMode ? darkTheme.text : lightTheme.text)};
    min-height: 100vh;
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

export const QuickActions = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 32px;
    flex-wrap: wrap;
`;

export const ActionButton = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: ${(props) => {
        if (props.emergency) return 'var(--error-color)';
        if (props.primary) return 'var(--accent-color)';
        return 'var(--bg-surface-secondary)';
    }};
    color: ${(props) => (props.primary || props.emergency ? 'white' : 'var(--text-primary)')};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
        filter: brightness(1.1);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    ${(props) =>
        props.emergency &&
        css`
            animation: ${emergency} 2s infinite;
        `}
`;

export const CriticalAlert = styled.div`
    background: linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(244, 67, 54, 0.05));
    border: 2px solid var(--error-color);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
    animation: ${css`
        ${pulse} 2s infinite
    `};

    .alert-header {
        font-size: 18px;
        font-weight: 700;
        color: var(--error-color);
        margin-bottom: 8px;
        text-align: center;
    }

    .alert-message {
        font-size: 14px;
        color: var(--text-primary);
        text-align: center;
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

export const RiskDashboard = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 16px;
`;

export const PatientCard = styled.div`
    padding: 20px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border-left: 4px solid
        ${(props) => {
            switch (props.riskLevel) {
                case 'critical':
                    return 'var(--error-color)';
                case 'high':
                    return 'var(--warning-color)';
                case 'stable':
                    return 'var(--success-color)';
                default:
                    return 'var(--accent-color)';
            }
        }};
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .patient-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        h4 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }
    }

    .patient-details {
        display: flex;
        gap: 12px;
        margin-bottom: 8px;
        flex-wrap: wrap;

        span {
            font-size: 12px;
            color: var(--text-secondary);
            background: var(--bg-surface);
            padding: 2px 8px;
            border-radius: 4px;
        }
    }

    .diagnosis {
        font-size: 14px;
        color: var(--text-primary);
        margin-bottom: 12px;
        font-weight: 500;
    }

    .patient-status {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;

        .consciousness,
        .ventilator,
        .trend {
            font-size: 11px;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
        }

        .consciousness {
            background: var(--accent-light);
            color: var(--accent-color);
        }

        .ventilator {
            background: rgba(255, 152, 0, 0.1);
            color: var(--warning-color);
        }

        .trend {
            &.improving {
                background: rgba(76, 175, 80, 0.1);
                color: var(--success-color);
            }

            &.critical {
                background: rgba(244, 67, 54, 0.1);
                color: var(--error-color);
            }

            &.stable {
                background: var(--bg-surface);
                color: var(--text-secondary);
            }
        }
    }
`;

export const RiskLevel = styled.span`
    font-size: 10px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 4px;

    background: ${(props) => {
        switch (props.level) {
            case 'critical':
                return 'rgba(244, 67, 54, 0.1)';
            case 'high':
                return 'rgba(255, 152, 0, 0.1)';
            case 'stable':
                return 'rgba(76, 175, 80, 0.1)';
            default:
                return 'var(--accent-light)';
        }
    }};

    color: ${(props) => {
        switch (props.level) {
            case 'critical':
                return 'var(--error-color)';
            case 'high':
                return 'var(--warning-color)';
            case 'stable':
                return 'var(--success-color)';
            default:
                return 'var(--accent-color)';
        }
    }};

    border: 1px solid
        ${(props) => {
            switch (props.level) {
                case 'critical':
                    return 'var(--error-color)';
                case 'high':
                    return 'var(--warning-color)';
                case 'stable':
                    return 'var(--success-color)';
                default:
                    return 'var(--accent-color)';
            }
        }};
`;

export const PatientInfo = styled.div`
    margin-bottom: 16px;
`;

export const PatientVitals = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 8px;
`;

export const VitalSign = styled.div`
    padding: 8px;
    background: var(--bg-surface);
    border-radius: 8px;
    text-align: center;
    border: 1px solid
        ${(props) => {
            switch (props.status) {
                case 'critical':
                    return 'var(--error-color)';
                case 'warning':
                    return 'var(--warning-color)';
                default:
                    return 'var(--border-color)';
            }
        }};

    .vital-label {
        display: block;
        font-size: 10px;
        color: var(--text-secondary);
        margin-bottom: 4px;
        font-weight: 600;
    }

    .vital-value {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: ${(props) => {
            switch (props.status) {
                case 'critical':
                    return 'var(--error-color)';
                case 'warning':
                    return 'var(--warning-color)';
                default:
                    return 'var(--text-primary)';
            }
        }};
    }
`;

export const DeviceGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const DeviceCard = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border-left: 4px solid
        ${(props) => (props.status === 'high' ? 'var(--warning-color)' : 'var(--success-color)')};
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .device-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        h4 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }
    }

    .device-stats {
        margin-bottom: 12px;

        span {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }
`;

export const DeviceStatus = styled.span`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 4px;

    background: ${(props) =>
        props.status === 'high' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(76, 175, 80, 0.1)'};
    color: ${(props) =>
        props.status === 'high' ? 'var(--warning-color)' : 'var(--success-color)'};
    border: 1px solid
        ${(props) => (props.status === 'high' ? 'var(--warning-color)' : 'var(--success-color)')};
`;

export const DeviceUtilization = styled.div`
    margin-top: 12px;
`;

export const UtilizationBar = styled.div`
    width: 100%;
    height: 8px;
    background: var(--bg-surface);
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--border-color);

    .utilization-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.3s ease;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 2px;
            background: rgba(255, 255, 255, 0.5);
        }
    }
`;

export const AlertsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
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
        background: var(--border-color);
        border-radius: 3px;
    }
`;

export const AlertItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
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
    opacity: ${(props) => (props.acknowledged ? 0.6 : 1)};
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .alert-content {
        flex: 1;
    }

    .alert-message {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: 8px;
    }

    .alert-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 12px;

        .patient {
            color: var(--accent-color);
            font-weight: 600;
        }

        .time {
            color: var(--text-secondary);
        }
    }

    .alert-action {
        font-size: 12px;
        color: var(--text-secondary);
        font-style: italic;
        margin-bottom: 4px;
    }

    .acknowledged {
        font-size: 11px;
        color: var(--success-color);
        font-weight: 600;
    }
`;

export const AlertSeverity = styled.div`
    font-size: 20px;
    width: 32px;
    height: 32px;
    background: var(--accent-light);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const StayAnalytics = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    .stay-item {
        display: flex;
        align-items: center;
        gap: 12px;

        .stay-info {
            min-width: 120px;

            .stay-range {
                display: block;
                font-size: 14px;
                font-weight: 600;
                color: var(--text-primary);
            }

            .stay-count {
                display: block;
                font-size: 12px;
                color: var(--text-secondary);
            }
        }

        .stay-percentage {
            font-size: 12px;
            font-weight: 600;
            color: var(--accent-color);
            min-width: 35px;
            text-align: right;
        }
    }

    .analytics-summary {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid var(--border-color);

        p {
            margin: 0 0 8px 0;
            font-size: 14px;

            strong {
                color: var(--text-primary);
            }
        }
    }
`;

export const StayBar = styled.div`
    flex: 1;
    height: 8px;
    background: var(--bg-surface);
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--border-color);

    .stay-fill {
        height: 100%;
        background: var(--accent-color);
        border-radius: 3px;
        transition: width 0.3s ease;
    }
`;

export const DiagnosisPanel = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
`;

export const DiagnosisItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    margin-bottom: 12px;
    border-left: 4px solid
        ${(props) => {
            switch (props.severity) {
                case 'critical':
                    return 'var(--error-color)';
                case 'high':
                    return 'var(--warning-color)';
                case 'stable':
                    return 'var(--success-color)';
                default:
                    return 'var(--accent-color)';
            }
        }};
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .diagnosis-header {
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

        .diagnosis-stats {
            display: flex;
            gap: 12px;
            align-items: center;

            .count {
                font-size: 14px;
                font-weight: 600;
                color: var(--accent-color);
            }

            .trend {
                font-size: 12px;
                font-weight: 600;

                &.increasing {
                    color: var(--error-color);
                }

                &.decreasing {
                    color: var(--success-color);
                }

                &.stable {
                    color: var(--text-secondary);
                }
            }
        }
    }

    .severity-indicator {
        font-size: 12px;
        color: var(--text-secondary);

        .severity {
            font-weight: 600;

            &.critical {
                color: var(--error-color);
            }

            &.high {
                color: var(--warning-color);
            }

            &.stable {
                color: var(--success-color);
            }
        }
    }
`;

export const EmergencyProtocol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    .protocol-status {
        margin-top: 20px;
        padding: 16px;
        background: rgba(244, 67, 54, 0.1);
        border-radius: 8px;
        border: 1px solid var(--error-color);
        text-align: center;

        p {
            margin: 0 0 8px 0;
            color: var(--error-color);
            font-weight: 600;

            &:last-child {
                margin: 0;
                font-weight: normal;
            }
        }
    }
`;

export const ProtocolStep = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px;
    background: ${(props) =>
        props.active ? 'rgba(244, 67, 54, 0.1)' : 'var(--bg-surface-secondary)'};
    border-radius: 12px;
    border-left: 4px solid
        ${(props) => (props.active ? 'var(--error-color)' : 'var(--accent-color)')};
    transition: all 0.2s ease;

    .step-number {
        width: 32px;
        height: 32px;
        background: ${(props) => (props.active ? 'var(--error-color)' : 'var(--accent-color)')};
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        flex-shrink: 0;
    }

    .step-content {
        flex: 1;

        .step-action {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 4px;
        }

        .step-time {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }

    ${(props) =>
        props.active &&
        css`
            animation: ${pulse} 2s infinite;
        `}
`;

// Legacy exports for compatibility
export const VitalChart = styled.div``;
export const VitalPoint = styled.div``;
export const PatientTimeline = styled.div``;
export const TimelineEvent = styled.div``;
export const ICUMap = styled.div``;
export const BedStatus = styled.div``;
