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

const chartAnimation = keyframes`
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
`;

export const KpiContainer = styled.div`
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

export const MetricTrend = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 12px;
    align-self: flex-start;
    color: ${(props) => (props.positive ? '#ffffff' : '#ffffff')};
    background: ${(props) => (props.positive ? 'var(--success-color)' : 'var(--warning-color)')};
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

export const ChartContainer = styled.div`
    /* Add chart container styling if needed */
`;

export const StatsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const StatsItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
        border-color: var(--accent-color);
    }

    .metric-values {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 4px;

        .target {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }
`;

export const StatsLabel = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
`;

export const StatsValue = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: ${(props) => (props.achieving ? 'var(--success-color)' : 'var(--warning-color)')};
`;

export const TrendIndicator = styled.div`
    font-size: 16px;
    font-weight: 600;
    padding: 6px 10px;
    border-radius: 8px;
    background: ${(props) => props.color}20;
    color: ${(props) => props.color};
    min-width: 40px;
    text-align: center;
`;

export const PerformanceTable = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;

        th {
            padding: 12px 16px;
            text-align: left;
            font-weight: 600;
            color: var(--text-secondary);
            border-bottom: 2px solid var(--border-color);
            background: var(--bg-surface-secondary);
        }

        td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
            color: var(--text-primary);
        }

        tr {
            transition: all 0.3s ease;

            &:hover {
                background: var(--accent-light);
            }
        }

        .rating {
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 8px;
            background: currentColor;
            color: white !important;
        }
    }
`;

export const KpiChart = styled.div`
    /* Add KPI chart styling if needed */
`;

export const AdmissionsChart = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    margin-bottom: 16px;

    .day-stats {
        text-align: center;

        .day-label {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }

        .bars {
            display: flex;
            gap: 4px;
            justify-content: center;
            align-items: end;
            height: 100px;

            .bar-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;

                .bar-label {
                    font-size: 10px;
                    font-weight: 600;
                    color: var(--text-secondary);
                    margin-top: 4px;
                }
            }

            .admission-bar,
            .discharge-bar {
                width: 16px;
                border-radius: 2px 2px 0 0;
                transition: all 0.3s ease;
                transform-origin: bottom;
                animation: ${chartAnimation} 0.5s ease-out;

                &:hover {
                    transform: scaleY(1.1);
                }
            }

            .admission-bar {
                background: var(--accent-color);
            }

            .discharge-bar {
                background: var(--success-color);
            }
        }
    }

    .chart-legend {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 16px;

        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: var(--text-secondary);

            .legend-color {
                width: 12px;
                height: 12px;
                border-radius: 2px;

                &.admission {
                    background: var(--accent-color);
                }

                &.discharge {
                    background: var(--success-color);
                }
            }
        }
    }
`;

export const CaseFindingsPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const FindingCategory = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    border-left: 4px solid
        ${(props) => {
            switch (props.severity) {
                case 'high':
                    return 'var(--error-color)';
                case 'moderate':
                    return 'var(--warning-color)';
                case 'low':
                    return 'var(--success-color)';
                default:
                    return 'var(--border-color)';
            }
        }};
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
        border-color: var(--accent-color);
    }

    .finding-info {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .category-name {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }

        .case-count {
            font-size: 12px;
            color: var(--text-secondary);
        }
    }
`;

export const TrendChart = styled.div`
    /* Add trend chart styling if needed */
`;
