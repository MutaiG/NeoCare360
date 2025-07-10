import styled, { keyframes, css } from 'styled-components';
import { variables, mixins } from '../../themes/simpleTheme';

// Healthcare Theme Configuration - Matching Main Dashboard
const lightTheme = {
    // Healthcare-focused color palette - Blue theme to match main dashboard
    primary: '#1976D2', // Trust blue (matches main dashboard)
    secondary: '#42A5F5', // Lighter blue
    accent: '#1565C0', // Darker blue accent

    background: '#f8f9fa', // Matches main dashboard background
    surface: '#ffffff', // White surface
    surfaceSecondary: '#f1f3f4', // Light gray (matches main dashboard)
    surfaceElevated: '#ffffff',

    text: '#202124', // Matches main dashboard text
    textSecondary: '#5f6368', // Matches main dashboard secondary text
    textMuted: '#9aa0a6',

    // Healthcare status colors
    success: '#4CAF50', // Healthy/stable
    warning: '#FF9800', // Attention needed
    error: '#F44336', // Critical/emergency
    info: '#2196F3', // Information

    // Healthcare vitals colors
    heartRate: '#E91E63', // Pink for heart rate
    oxygenLevel: '#1976D2', // Blue for oxygen (matches primary)
    temperature: '#FF5722', // Orange for temperature
    bloodPressure: '#9C27B0', // Purple for blood pressure

    border: '#dadce0', // Matches main dashboard border
    borderFocus: '#1976D2', // Blue focus (matches primary)
    shadow: '0 2px 10px rgba(0,0,0,0.1)', // Matches main dashboard shadow
    cardShadow: '0 1px 3px rgba(0,0,0,0.12)', // Matches main dashboard card shadow
};

const darkTheme = {
    // Healthcare-focused dark theme - Matching Main Dashboard
    primary: '#42A5F5', // Lighter blue (matches main dashboard)
    secondary: '#90CAF9', // Even lighter blue
    accent: '#1976D2', // Blue accent

    background: '#0f1419', // Matches main dashboard dark background
    surface: '#1a1d23', // Matches main dashboard dark surface
    surfaceSecondary: '#242832', // Matches main dashboard
    surfaceElevated: '#1a1d23',

    text: '#e8eaed', // Matches main dashboard dark text
    textSecondary: '#9aa0a6', // Matches main dashboard dark secondary text
    textMuted: '#5f6368',

    // Healthcare status colors (dark mode adjusted)
    success: '#66BB6A', // Healthy/stable
    warning: '#FFB74D', // Attention needed
    error: '#EF5350', // Critical/emergency
    info: '#42A5F5', // Information

    // Healthcare vitals colors (dark mode adjusted)
    heartRate: '#F06292', // Pink for heart rate
    oxygenLevel: '#42A5F5', // Blue for oxygen (matches primary)
    temperature: '#FF7043', // Orange for temperature
    bloodPressure: '#BA68C8', // Purple for blood pressure

    border: '#3c4043', // Matches main dashboard dark border
    borderFocus: '#42A5F5', // Blue focus (matches primary)
    shadow: '0 2px 10px rgba(0,0,0,0.3)', // Matches main dashboard dark shadow
    cardShadow: '0 1px 3px rgba(0,0,0,0.24)', // Matches main dashboard dark card shadow
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

const pulseGlow = keyframes`
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 10px rgba(25, 118, 210, 0.3);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 25px rgba(25, 118, 210, 0.6);
    }
`;

const breathe = keyframes`
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
`;

export const SettingsContainer = styled.div`
    padding: 24px;
    background: ${(props) => (props.darkMode ? darkTheme.background : lightTheme.background)};
    min-height: 100vh;
    color: ${(props) => (props.darkMode ? darkTheme.text : lightTheme.text)};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    /* Healthcare theme CSS variables */
    --color-primary: ${(props) => (props.darkMode ? darkTheme.primary : lightTheme.primary)};
    --color-secondary: ${(props) => (props.darkMode ? darkTheme.secondary : lightTheme.secondary)};
    --color-accent: ${(props) => (props.darkMode ? darkTheme.accent : lightTheme.accent)};

    --bg-primary: ${(props) => (props.darkMode ? darkTheme.background : lightTheme.background)};
    --bg-surface: ${(props) => (props.darkMode ? darkTheme.surface : lightTheme.surface)};
    --bg-surface-secondary: ${(props) =>
        props.darkMode ? darkTheme.surfaceSecondary : lightTheme.surfaceSecondary};
    --bg-surface-elevated: ${(props) =>
        props.darkMode ? darkTheme.surfaceElevated : lightTheme.surfaceElevated};

    --text-primary: ${(props) => (props.darkMode ? darkTheme.text : lightTheme.text)};
    --text-secondary: ${(props) =>
        props.darkMode ? darkTheme.textSecondary : lightTheme.textSecondary};
    --text-muted: ${(props) => (props.darkMode ? darkTheme.textMuted : lightTheme.textMuted)};

    --border-color: ${(props) => (props.darkMode ? darkTheme.border : lightTheme.border)};
    --border-focus: ${(props) => (props.darkMode ? darkTheme.borderFocus : lightTheme.borderFocus)};

    --status-success: ${(props) => (props.darkMode ? darkTheme.success : lightTheme.success)};
    --status-warning: ${(props) => (props.darkMode ? darkTheme.warning : lightTheme.warning)};
    --status-error: ${(props) => (props.darkMode ? darkTheme.error : lightTheme.error)};
    --status-info: ${(props) => (props.darkMode ? darkTheme.info : lightTheme.info)};

    --vital-heart-rate: ${(props) => (props.darkMode ? darkTheme.heartRate : lightTheme.heartRate)};
    --vital-oxygen: ${(props) => (props.darkMode ? darkTheme.oxygenLevel : lightTheme.oxygenLevel)};
    --vital-temperature: ${(props) =>
        props.darkMode ? darkTheme.temperature : lightTheme.temperature};
    --vital-bp: ${(props) => (props.darkMode ? darkTheme.bloodPressure : lightTheme.bloodPressure)};

    --shadow: ${(props) => (props.darkMode ? darkTheme.shadow : lightTheme.shadow)};
    --card-shadow: ${(props) => (props.darkMode ? darkTheme.cardShadow : lightTheme.cardShadow)};

    /* Enhanced healthcare styling */
    font-family: 'Inter', 'Segoe UI', 'Roboto', system-ui, sans-serif;
    line-height: 1.5;

    /* Smooth animations for better UX */
    * {
        transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

export const DashboardTitle = styled.h1`
    margin: 0 0 32px 0;
    font-size: 32px;
    font-weight: 800;
    color: var(--text-primary);
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 60px;
        height: 4px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        border-radius: 2px;
    }
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

export const SettingsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

export const SettingsSection = styled.div`
    background: var(--bg-surface);
    border-radius: 16px;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
    overflow: hidden;
    grid-column: ${(props) => (props.span ? `span ${props.span}` : 'span 1')};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: ${css`
        ${slideIn} 0.6s ease-out
    `};
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow);
        border-color: var(--border-focus);

        &::before {
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        grid-column: span 1;
    }
`;

export const SectionHeader = styled.div`
    padding: 20px 24px 16px;
    background: linear-gradient(
        135deg,
        ${(props) => (props.darkMode ? 'rgba(102, 187, 106, 0.08)' : 'rgba(46, 125, 50, 0.05)')},
        transparent
    );
    border-bottom: 1px solid var(--border-color);
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 24px;
        right: 24px;
        height: 2px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent), transparent);
        border-radius: 1px;
    }
`;

export const SectionTitle = styled.h3`
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

export const SectionContent = styled.div`
    padding: 24px;
`;

export const SettingGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const SettingItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }
`;

export const SettingLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    flex: 1;
`;

export const SettingControl = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 56px;
    height: 32px;
    cursor: pointer;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
`;

export const ToggleSlider = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-surface-secondary);
    border: 2px solid var(--border-color);
    border-radius: 32px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

    &::before {
        content: '';
        position: absolute;
        height: 22px;
        width: 22px;
        left: 3px;
        bottom: 3px;
        background: var(--text-secondary);
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    ${ToggleSwitch} input:checked + & {
        background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
        border-color: var(--color-primary);
        box-shadow: 0 0 12px rgba(46, 125, 50, 0.4);
    }

    ${ToggleSwitch} input:checked + &::before {
        transform: translateX(24px);
        background: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    ${ToggleSwitch}:hover & {
        border-color: var(--border-focus);
        transform: scale(1.02);
    }

    ${ToggleSwitch} input:checked:hover + & {
        box-shadow: 0 0 16px rgba(46, 125, 50, 0.6);
    }
`;

export const SelectInput = styled.select`
    padding: 10px 14px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    background: var(--bg-surface-elevated);
    color: var(--text-primary);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: 160px;

    &:focus {
        outline: none;
        border-color: var(--border-focus);
        box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.2);
    }

    &:hover {
        border-color: var(--border-focus);
        transform: translateY(-1px);
    }

    option {
        background: var(--bg-surface);
        color: var(--text-primary);
        padding: 8px 12px;
    }
`;

export const TextInput = styled.input`
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-surface);
    color: var(--text-primary);
    font-size: 14px;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px var(--accent-light);
    }
`;

export const ColorPicker = styled.input`
    width: 40px;
    height: 40px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
    background: none;

    &::-webkit-color-swatch {
        border-radius: 6px;
        border: none;
    }
`;

export const SliderInput = styled.input`
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: var(--border-color);
    outline: none;
    appearance: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--accent-color);
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--accent-color);
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`;

export const ActionButton = styled.button`
    padding: ${(props) => (props.small ? '8px 16px' : '12px 24px')};
    border-radius: 10px;
    border: 1px solid ${(props) => (props.primary ? 'var(--color-primary)' : 'var(--border-color)')};
    background: ${(props) =>
        props.primary
            ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
            : 'var(--bg-surface-elevated)'};
    color: ${(props) => (props.primary ? 'white' : 'var(--text-primary)')};
    font-size: ${(props) => (props.small ? '13px' : '14px')};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow);
        border-color: ${(props) =>
            props.primary ? 'var(--color-primary)' : 'var(--border-focus)'};

        &::before {
            left: 100%;
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

export const SaveButton = styled(ActionButton)`
    background: linear-gradient(135deg, var(--status-success), var(--color-primary));
    color: white;
    border: 1px solid var(--status-success);
    font-size: 16px;
    padding: 14px 28px;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);

    &:hover {
        box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
        transform: translateY(-3px);
    }
`;

export const ProfileCard = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: var(--card-shadow);
    }
`;

export const ProfileAvatar = styled.div`
    font-size: 48px;
    width: 80px;
    height: 80px;
    background: var(--accent-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 3px solid var(--accent-color);
`;

export const ProfileInfo = styled.div`
    flex: 1;

    h3 {
        margin: 0 0 8px 0;
        font-size: 20px;
        font-weight: 700;
        color: var(--text-primary);
    }

    p {
        margin: 0 0 4px 0;
        font-size: 14px;
        color: var(--text-secondary);
    }

    button {
        margin-top: 12px;
    }
`;

export const SystemStatus = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
`;

export const StatusItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    border-left: 4px solid
        ${(props) => {
            switch (props.status) {
                case 'excellent':
                    return 'var(--success-color)';
                case 'warning':
                    return 'var(--warning-color)';
                case 'critical':
                    return 'var(--error-color)';
                default:
                    return 'var(--accent-color)';
            }
        }};
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }
`;

export const StatusIcon = styled.div`
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

export const StatusLabel = styled.div`
    font-size: 14px;
    color: var(--text-secondary);
    flex: 1;
`;

export const StatusValue = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);

    .status-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        animation: pulse 2s infinite;

        &.active {
            background: var(--success-color, #4caf50);
        }

        &.inactive {
            background: var(--warning-color, #ff9800);
        }
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;

// Live Status Monitor Styles
export const LiveStatusPanel = styled.div`
    .live-status-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24px;
        margin-bottom: 24px;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }

    .main-status-card {
        background: var(--bg-surface-secondary);
        border-radius: 16px;
        padding: 24px;
        border: 2px solid var(--border-color);
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--accent-color), var(--success-color));
        }
    }

    .status-header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 24px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border-color);
    }

    .status-icon-large {
        font-size: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .pulse-indicator {
        display: inline-block;
        animation: pulse-glow 2s infinite;

        &.active {
            animation: pulse-glow 1.5s infinite;
        }

        &.inactive {
            opacity: 0.5;
            animation: none;
        }
    }

    @keyframes pulse-glow {
        0%,
        100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.8;
        }
    }

    .status-info {
        flex: 1;
    }

    .status-title {
        margin: 0 0 8px 0;
        font-size: 24px;
        font-weight: 700;
        color: var(--text-primary);
    }

    .status-description {
        margin: 0;
        font-size: 14px;
        color: var(--text-secondary);
    }

    .status-controls {
        display: flex;
        gap: 12px;
    }

    .status-toggle {
        padding: 12px 24px;
        border-radius: 8px;
        border: none;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &.active {
            background: var(--warning-color);
            color: white;

            &:hover {
                background: #f57c00;
                transform: translateY(-2px);
            }
        }

        &.inactive {
            background: var(--success-color);
            color: white;

            &:hover {
                background: #388e3c;
                transform: translateY(-2px);
            }
        }
    }

    .status-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }

    .metric-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 16px;
        background: var(--bg-surface);
        border-radius: 8px;
        border-left: 4px solid var(--accent-color);
    }

    .metric-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .metric-value {
        font-size: 18px;
        font-weight: 700;
        color: var(--text-primary);
    }

    .status-activities {
        background: var(--bg-surface-secondary);
        border-radius: 16px;
        padding: 20px;

        h4 {
            margin: 0 0 16px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }
    }

    .activity-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .activity-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: var(--bg-surface);
        border-radius: 8px;
        transition: all 0.2s ease;

        &:hover {
            transform: translateX(4px);
        }

        &.active .activity-dot {
            background: var(--success-color);
            animation: pulse 2s infinite;
        }

        &.inactive .activity-dot {
            background: var(--warning-color);
            animation: none;
        }
    }

    .activity-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .activity-name {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
    }

    .activity-status {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 4px;
        color: var(--text-primary);
        background: var(--bg-surface-secondary);
    }
`;

export const PreferenceCard = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    margin-bottom: 16px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }
`;

export const PreferenceIcon = styled.div`
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

export const PreferenceContent = styled.div`
    flex: 1;

    span {
        font-size: 12px;
        color: var(--text-secondary);
        margin-top: 8px;
        display: block;
    }
`;

export const PreferenceTitle = styled.h4`
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
`;

export const PreferenceDescription = styled.p`
    margin: 0 0 12px 0;
    font-size: 14px;
    color: var(--text-secondary);
`;

export const SecurityCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const SecurityItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }
`;

export const SecurityIcon = styled.div`
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

export const SecurityDetails = styled.div`
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
    }
`;

export const BackupCard = styled.div`
    .backup-controls {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
        flex-wrap: wrap;
    }

    .backup-history {
        h4 {
            margin: 0 0 16px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }
    }
`;

export const BackupItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: var(--bg-surface-secondary);
    border-radius: 8px;
    margin-bottom: 12px;
    border-left: 4px solid
        ${(props) => {
            switch (props.status) {
                case 'completed':
                    return 'var(--success-color)';
                case 'failed':
                    return 'var(--error-color)';
                case 'in-progress':
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
`;

export const BackupInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    .backup-date {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
    }

    .backup-type {
        font-size: 12px;
        color: var(--text-secondary);
    }

    .backup-size {
        font-size: 12px;
        color: var(--accent-color);
        font-weight: 600;
    }
`;

export const BackupActions = styled.div`
    display: flex;
    gap: 8px;
`;

export const IntegrationCard = styled.div`
    background: var(--bg-surface-secondary);
    border-radius: 12px;
    padding: 20px;
`;

export const IntegrationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const IntegrationItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: var(--bg-surface);
    border-radius: 8px;
    transition: all 0.2s ease;

    .integration-info {
        h4 {
            margin: 0 0 4px 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }

        p {
            margin: 0;
            font-size: 12px;
            color: var(--text-secondary);
        }
    }

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--card-shadow);
    }
`;

export const IntegrationStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ConnectionBadge = styled.span`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 4px;

    background: ${(props) => {
        switch (props.status) {
            case 'connected':
                return 'rgba(76, 175, 80, 0.1)';
            case 'pending':
                return 'rgba(255, 152, 0, 0.1)';
            case 'disconnected':
                return 'rgba(244, 67, 54, 0.1)';
            default:
                return 'var(--bg-surface-secondary)';
        }
    }};

    color: ${(props) => {
        switch (props.status) {
            case 'connected':
                return 'var(--success-color)';
            case 'pending':
                return 'var(--warning-color)';
            case 'disconnected':
                return 'var(--error-color)';
            default:
                return 'var(--text-secondary)';
        }
    }};

    border: 1px solid
        ${(props) => {
            switch (props.status) {
                case 'connected':
                    return 'var(--success-color)';
                case 'pending':
                    return 'var(--warning-color)';
                case 'disconnected':
                    return 'var(--error-color)';
                default:
                    return 'var(--border-color)';
            }
        }};
`;

export const NotificationSettings = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const NotificationItem = styled.div`
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

export const NotificationIcon = styled.div`
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

export const NotificationContent = styled.div`
    flex: 1;

    h4 {
        margin: 0 0 4px 0;
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

export const NotificationToggle = styled.div`
    display: flex;
    align-items: center;
`;

// Legacy exports for compatibility
export const StyledContainer = styled.div`
    ${mixins.reset('inline')};
    display: block;
    font-size: ${variables.fontSizeLarge};
    line-height: 200%;
    margin: ${variables.spacingXXLarge} ${variables.spacingXXLarge};
    padding: ${variables.spacingLarge};
    background: var(--bg-surface);
    color: var(--text-primary);
    border-radius: 12px;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: var(--shadow);
        transform: translateY(-2px);
    }
`;

export const StyledGreeting = styled.div`
    font-weight: bold;
    color: var(--accent-color);
    font-size: ${variables.fontSizeXXLarge};
    margin-bottom: ${variables.spacingLarge};
    background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

// System Information Styles
export const SystemInfo = styled.div`
    .system-info {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: var(--bg-surface-secondary);
        border-radius: 8px;
        border-left: 4px solid var(--accent-color);
    }

    .label {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-secondary);
    }

    .value {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
    }

    .status-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        animation: pulse 2s infinite;

        &.active {
            background: var(--success-color);
        }

        &.inactive {
            background: var(--warning-color);
        }
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;
