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
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const glow = keyframes`
    0%, 100% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.3); }
    50% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.6); }
`;

const pulse = keyframes`
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
`;

export const ReportsContainer = styled.div`
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

export const QuickActionBar = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 32px;
    flex-wrap: wrap;
`;

export const ActionButton = styled.button`
    padding: ${(props) => (props.small ? '6px 12px' : '10px 20px')};
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: ${(props) =>
        props.primary ? 'var(--accent-color)' : 'var(--bg-surface-secondary)'};
    color: ${(props) => (props.primary ? 'white' : 'var(--text-primary)')};
    font-size: ${(props) => (props.small ? '12px' : '14px')};
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
            case 'warning':
                return css`
                    background: rgba(255, 152, 0, 0.1);
                    color: var(--warning-color);
                    border: 1px solid var(--warning-color);
                `;
            case 'error':
                return css`
                    background: rgba(244, 67, 54, 0.1);
                    color: var(--error-color);
                    border: 1px solid var(--error-color);
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

export const RecentReports = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
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

export const ReportItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }
`;

export const ReportInfo = styled.div`
    flex: 1;

    .report-header {
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
    }

    .report-meta {
        display: flex;
        gap: 16px;
        margin-bottom: 8px;

        .type {
            font-size: 12px;
            font-weight: 600;
            color: var(--accent-color);
            background: var(--accent-light);
            padding: 2px 8px;
            border-radius: 4px;
        }

        .generated-by,
        .date {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }

    .report-details {
        display: flex;
        gap: 16px;

        .size,
        .format,
        .downloads {
            font-size: 11px;
            color: var(--text-secondary);
        }

        .downloads {
            color: var(--accent-color);
            font-weight: 600;
        }
    }
`;

export const DownloadButton = styled.button`
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid var(--accent-color);
    background: var(--accent-color);
    color: white;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
        filter: brightness(1.1);
    }

    &:disabled {
        background: var(--bg-surface-secondary);
        color: var(--text-secondary);
        border-color: var(--border-color);
        cursor: not-allowed;
        transform: none;
        filter: none;
    }
`;

export const ScheduledReports = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ScheduleCard = styled.div`
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border-left: 4px solid
        ${(props) => (props.enabled ? 'var(--success-color)' : 'var(--error-color)')};
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .schedule-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        h4 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .status {
            font-size: 12px;

            &.enabled {
                color: var(--success-color);
            }

            &.disabled {
                color: var(--error-color);
            }
        }
    }

    .schedule-details {
        p {
            margin: 0 0 4px 0;
            font-size: 12px;
            color: var(--text-secondary);

            strong {
                color: var(--text-primary);
            }
        }
    }
`;

export const TemplateGallery = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
`;

export const TemplateCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    transition: all 0.2s ease;
    border: 1px solid var(--border-color);

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--card-shadow);
        border-color: var(--accent-color);
    }

    .template-icon {
        font-size: 32px;
        text-align: center;
        margin-bottom: 16px;
    }

    .template-content {
        flex: 1;

        h4 {
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }

        p {
            margin: 0 0 12px 0;
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.4;
        }

        .template-meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;

            .category {
                font-size: 12px;
                font-weight: 600;
                color: var(--accent-color);
                background: var(--accent-light);
                padding: 2px 8px;
                border-radius: 4px;
            }

            .time {
                font-size: 12px;
                color: var(--text-secondary);
            }
        }

        .template-fields {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 16px;

            .field {
                font-size: 10px;
                color: var(--text-secondary);
                background: var(--bg-surface);
                padding: 2px 6px;
                border-radius: 4px;
                border: 1px solid var(--border-color);
            }
        }
    }
`;

export const ExportHistory = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ExportItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    margin-bottom: 8px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .export-info {
        flex: 1;

        h5 {
            margin: 0 0 4px 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .export-meta {
            display: flex;
            gap: 12px;
            margin-bottom: 4px;

            .date,
            .size {
                font-size: 12px;
                color: var(--text-secondary);
            }
        }

        .downloads {
            font-size: 11px;
            color: var(--accent-color);
            font-weight: 600;
        }
    }
`;

export const StatusBadge = styled.span`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 4px;

    background: ${(props) => {
        switch (props.status) {
            case 'completed':
                return 'rgba(76, 175, 80, 0.1)';
            case 'processing':
                return 'rgba(255, 152, 0, 0.1)';
            case 'failed':
                return 'rgba(244, 67, 54, 0.1)';
            default:
                return 'var(--bg-surface-secondary)';
        }
    }};

    color: ${(props) => {
        switch (props.status) {
            case 'completed':
                return 'var(--success-color)';
            case 'processing':
                return 'var(--warning-color)';
            case 'failed':
                return 'var(--error-color)';
            default:
                return 'var(--text-secondary)';
        }
    }};

    border: 1px solid
        ${(props) => {
            switch (props.status) {
                case 'completed':
                    return 'var(--success-color)';
                case 'processing':
                    return 'var(--warning-color)';
                case 'failed':
                    return 'var(--error-color)';
                default:
                    return 'var(--border-color)';
            }
        }};
`;

export const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background: var(--bg-surface-secondary);
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    margin: 12px 0;
`;

export const ProgressFill = styled.div`
    height: 100%;
    width: ${(props) => props.width}%;
    background: linear-gradient(90deg, var(--accent-color), var(--success-color));
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
        animation: ${css`
            ${glow} 2s infinite
        `};
    }
`;

// Legacy exports for compatibility
export const ReportBuilder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const BuilderStep = styled.div`
    padding: 20px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
`;

export const ReportMetrics = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
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
        width: ${(props) => Math.min(100, props.percentage)}%;
        background: var(--accent-color);
        border-radius: 3px;
        transition: width 0.3s ease;
    }
`;
