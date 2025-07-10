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

const pulse = keyframes`
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.02); opacity: 0.9; }
`;

const glow = keyframes`
    0%, 100% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.3); }
    50% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.6); }
`;

export const DashboardContainer = styled.div`
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
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

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

    .scope-indicator {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        gap: 8px;

        /* Reset gradient text for scope indicator */
        -webkit-text-fill-color: var(--text-secondary);
        background: none;

        .scope-badge {
            background: var(--accent-color);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
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
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: ${(props) =>
        props.primary ? 'var(--accent-color)' : 'var(--bg-surface-secondary)'};
    color: ${(props) => (props.primary ? 'white' : 'var(--text-primary)')};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
        filter: brightness(1.1);
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

export const MetricTrend = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 12px;
    display: inline-block;

    ${(props) => {
        if (props.positive) {
            return css`
                background: rgba(76, 175, 80, 0.1);
                color: var(--success-color);
                border: 1px solid var(--success-color);
            `;
        } else if (props.negative) {
            return css`
                background: rgba(244, 67, 54, 0.1);
                color: var(--error-color);
                border: 1px solid var(--error-color);
            `;
        } else {
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

export const WardOccupancyCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    margin-bottom: 12px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .ward-info {
        flex: 1;

        h4 {
            margin: 0 0 4px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .bed-count {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }

    .occupancy-visual {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 120px;
    }
`;

export const OccupancyBar = styled.div`
    width: 60px;
    height: 8px;
    background: var(--bg-surface);
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--border-color);
`;

export const OccupancyLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;

    .percentage {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
    }

    .trend {
        font-size: 10px;
        font-weight: 600;

        &.positive {
            color: var(--success-color);
        }

        &.negative {
            color: var(--error-color);
        }
    }
`;

export const AlertsContainer = styled.div`
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
                case 'warning':
                    return 'var(--warning-color)';
                default:
                    return 'var(--accent-color)';
            }
        }};
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }

    .alert-content {
        flex: 1;
    }

    .alert-meta {
        display: flex;
        justify-content: space-between;
        margin: 8px 0;
        font-size: 12px;

        .department {
            color: var(--accent-color);
            font-weight: 600;
        }
    }

    .alert-action {
        font-size: 12px;
        color: var(--text-secondary);
        font-style: italic;
        margin-top: 4px;
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

export const AlertText = styled.p`
    margin: 0;
    font-size: 14px;
    color: var(--text-primary);
    line-height: 1.4;
    font-weight: 500;
`;

export const AlertTime = styled.span`
    color: var(--text-secondary);
`;

export const ResourceCard = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    margin-bottom: 12px;
    border-left: 4px solid
        ${(props) => (props.status === 'warning' ? 'var(--warning-color)' : 'var(--success-color)')};
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }
`;

export const ResourceIcon = styled.div`
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

export const ResourceDetails = styled.div`
    flex: 1;

    h4 {
        margin: 0 0 4px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
    }

    .usage-count {
        font-size: 12px;
        color: var(--text-secondary);
    }
`;

export const ResourceUsage = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    .percentage {
        font-size: 12px;
        font-weight: 600;
        color: var(--text-primary);
        min-width: 35px;
        text-align: right;
    }
`;

export const UsageBar = styled.div`
    width: 60px;
    height: 6px;
    background: var(--bg-surface);
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid var(--border-color);
`;

export const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background: var(--bg-surface);
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    margin: 8px 0;
`;

export const ProgressFill = styled.div`
    height: 100%;
    width: ${(props) => props.width}%;
    background: ${(props) => props.color || 'var(--accent-color)'};
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
        background: rgba(255, 255, 255, 0.3);
        animation: ${css`
            ${glow} 2s infinite
        `};
    }
`;

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const TableRow = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 60px;
    gap: 16px;
    align-items: center;
    padding: 12px 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }
`;

export const TableCell = styled.div`
    .diagnosis-name {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 2px;
    }

    .diagnosis-count {
        font-size: 12px;
        color: var(--text-secondary);
    }

    .percentage {
        font-size: 12px;
        color: var(--text-secondary);
        margin-left: 8px;
    }

    .trend {
        font-size: 12px;
        font-weight: 600;

        &.positive {
            color: var(--success-color);
        }

        &.negative {
            color: var(--error-color);
        }
    }
`;

export const StatsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
`;

export const StatsItem = styled.div`
    padding: 20px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
    }

    .kpi-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .target {
            font-size: 10px;
            color: var(--text-secondary);
            background: var(--bg-surface);
            padding: 2px 6px;
            border-radius: 4px;
        }
    }

    .kpi-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .trend {
            font-size: 12px;
            font-weight: 600;

            &.positive {
                color: var(--success-color);
            }

            &.negative {
                color: var(--error-color);
            }
        }
    }
`;

export const StatsValue = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: var(--accent-color);
`;

export const StatsLabel = styled.div`
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
`;

export const TrendChart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    height: 200px;
    padding: 16px 0;
    position: relative;
    margin-bottom: 20px;

    .trend-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        flex: 1;
    }

    .trend-bars {
        display: flex;
        gap: 2px;
        align-items: end;
        height: 150px;
    }

    .time-label {
        font-size: 10px;
        color: var(--text-secondary);
        font-weight: 600;
        transform: rotate(-45deg);
    }

    + .chart-legend {
        display: flex;
        justify-content: center;
        gap: 20px;
        font-size: 12px;
        color: var(--text-secondary);

        span {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .legend-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }
    }
`;

export const TrendPoint = styled.div`
    width: 6px;
    background: ${(props) => props.color};
    border-radius: 3px 3px 0 0;
    height: ${(props) => Math.max(4, props.height)}px;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scaleY(1.1);
        filter: brightness(1.1);
    }
`;

// Legacy exports for compatibility
export const ChartContainer = styled.div`
    height: 200px;
    display: flex;
    align-items: end;
    gap: 4px;
    padding: 16px 0;
`;

export const ChartBar = styled.div`
    flex: 1;
    background: var(--accent-color);
    border-radius: 4px 4px 0 0;
    height: ${(props) => props.height || 20}%;
    transition: all 0.3s ease;

    &:hover {
        filter: brightness(1.1);
        transform: scaleY(1.05);
    }
`;

export const ChartLabel = styled.div`
    font-size: 10px;
    color: var(--text-secondary);
    text-align: center;
    margin-top: 8px;
`;

export const MapContainer = styled.div`
    height: 300px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    font-style: italic;
`;

export const HeatmapCell = styled.div`
    aspect-ratio: 1;
    background: ${(props) => props.color || 'var(--bg-surface-secondary)'};
    border-radius: 2px;
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
    color: var(--text-primary);
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: var(--card-shadow);
    }
`;

// Missing components for Overview component
export const TrendIcon = styled.span`
    margin-right: 4px;
    font-size: 12px;
`;

export const AlertsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const AlertIcon = styled.div`
    font-size: 16px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const AlertContent = styled.div`
    flex: 1;

    .alert-text {
        font-size: 14px;
        color: var(--text-primary);
        margin-bottom: 4px;
        font-weight: 500;
    }

    .alert-department {
        font-size: 12px;
        color: var(--text-secondary);
    }
`;

export const AlertAction = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
        background: var(--bg-surface-secondary);
    }
`;

export const ActivityList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ActivityItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 12px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;

    .activity-content {
        flex: 1;
    }

    .activity-action {
        font-size: 14px;
        color: var(--text-primary);
        font-weight: 500;
        margin-bottom: 2px;
    }

    .activity-user {
        font-size: 12px;
        color: var(--text-secondary);
    }
`;

export const ActivityTime = styled.span`
    font-size: 12px;
    color: var(--text-secondary);
    white-space: nowrap;
`;

export const BedOccupancyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
`;

export const WardCard = styled.div`
    background: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 16px;
    transition: all 0.2s ease;

    &:hover {
        box-shadow: var(--card-shadow);
        transform: translateY(-2px);
    }
`;

export const WardName = styled.h3`
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
`;

export const StatsCard = styled.div`
    background: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const StatItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StatValue = styled.span`
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
`;

export const StatLabel = styled.span`
    font-size: 14px;
    color: var(--text-secondary);
`;
