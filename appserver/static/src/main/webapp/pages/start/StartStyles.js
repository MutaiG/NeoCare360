import styled, { createGlobalStyle } from 'styled-components';
import { variables, mixins } from '../../../../themes/simpleTheme';

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: ${variables.fontFamily};
        overflow: hidden;
    }
`;

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

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: ${(props) => (props.darkMode ? darkTheme.background : lightTheme.background)};
    color: ${(props) => (props.darkMode ? darkTheme.text : lightTheme.text)};
    transition: all 0.3s ease;

    /* Apply theme to all child components */
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
    --shadow: ${(props) => (props.darkMode ? darkTheme.shadow : lightTheme.shadow)};
    --card-shadow: ${(props) => (props.darkMode ? darkTheme.cardShadow : lightTheme.cardShadow)};
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    padding: 16px 24px;
    background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-height: 64px;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    }
`;

export const SidebarToggle = styled.button`
    background: var(--accent-light);
    border: 1px solid var(--accent-color);
    color: var(--accent-color);
    font-size: 16px;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;

    &:hover {
        background: var(--accent-color);
        color: var(--bg-surface);
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const HeaderTitle = styled.h1`
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    flex: 1;
    background: linear-gradient(45deg, #ffffff, #e3f2fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
        gap: 16px;
    }

    .location-indicator {
        font-size: 12px;
        font-weight: 500;
        color: var(--accent-color);
        background: var(--accent-light);
        padding: 4px 8px;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;

        /* Reset text gradient for location indicator */
        -webkit-text-fill-color: var(--accent-color);
        background: var(--accent-light);
    }
`;

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    .status-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        color: white;

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;

            &.active {
                background: #4caf50;
                animation: pulse 2s infinite;
            }

            &.inactive {
                background: #f44336;
            }
        }
    }

    .refresh-toggle {
        padding: 8px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        color: white;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;

        &:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
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

export const ThemeToggle = styled.button`
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 120px;
    justify-content: center;

    &:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const MainContent = styled.main`
    display: flex;
    flex: 1;
    overflow: hidden;
`;

export const Sidebar = styled.nav`
    width: ${(props) => (props.collapsed ? '70px' : '280px')};
    background: var(--bg-surface);
    border-right: 1px solid var(--border-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
    box-shadow: var(--shadow);
    z-index: 100;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        background: linear-gradient(180deg, var(--accent-light), transparent, var(--accent-light));
    }

    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: var(--accent-color);
    }
`;

export const SidebarHeader = styled.div`
    padding: ${(props) => (props.collapsed ? '12px 16px' : '16px 20px')};
    border-bottom: 1px solid var(--border-color);
    background: linear-gradient(135deg, var(--accent-light), transparent);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.collapsed ? 'center' : 'space-between')};
    min-height: 64px;
    box-shadow: 0 2px 4px rgba(25, 118, 210, 0.1);

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 20px;
        right: 20px;
        height: 2px;
        background: linear-gradient(90deg, var(--accent-color), transparent);
        border-radius: 1px;
    }
`;

export const SidebarTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--accent-color);
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.5px;

    &::before {
        content: '';
        width: 2px;
        height: 20px;
        background: linear-gradient(180deg, var(--accent-color), transparent);
        border-radius: 1px;
    }
`;

export const NavigationList = styled.ul`
    list-style: none;
    padding: 8px 0;
    margin: 0;
    pointer-events: auto;
`;

export const NavigationItem = styled.li`
    display: flex;
    align-items: center;
    padding: 12px 20px;
    cursor: pointer !important;
    transition: all 0.2s ease;
    position: relative;
    margin: 2px 8px;
    border-radius: 8px;
    pointer-events: auto !important;
    user-select: none;

    &,
    &:hover,
    &:focus,
    &:active {
        cursor: pointer !important;
    }

    background: ${(props) => (props.active ? 'var(--accent-light)' : 'transparent')};
    color: ${(props) => (props.active ? 'var(--accent-color)' : 'var(--text-primary)')};

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: ${(props) => (props.active ? '24px' : '0')};
        background: var(--accent-color);
        border-radius: 0 3px 3px 0;
        transition: height 0.2s ease;
        pointer-events: none;
    }

    &:hover {
        background: var(--accent-light);
        color: var(--accent-color);
        transform: translateX(4px);

        &::before {
            height: 24px;
        }
    }

    &:active {
        transform: translateX(2px);
    }
`;

export const NavigationIcon = styled.span`
    font-size: 20px;
    margin-right: 12px;
    min-width: 32px;
    width: 32px;
    height: 32px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all 0.2s ease;
    pointer-events: none;
    background: ${(props) =>
        props.active ? 'var(--accent-color)' : 'var(--bg-surface-secondary)'};

    ${NavigationItem}:hover & {
        background: var(--accent-color);
        transform: scale(1.1);
        box-shadow: var(--card-shadow);
    }
`;

export const NavigationLabel = styled.span`
    font-size: 14px;
    font-weight: 500;
    flex: 1;
    pointer-events: none;
`;

export const ContentArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    background: ${(props) =>
        props.theme?.darkMode ? darkTheme.background : lightTheme.background};
    color: ${(props) => (props.theme?.darkMode ? darkTheme.text : lightTheme.text)};

    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: var(--accent-color);
    }

    /* Ensure all child components inherit theme variables */
    --bg-primary: ${(props) =>
        props.theme?.darkMode ? darkTheme.background : lightTheme.background};
    --bg-surface: ${(props) => (props.theme?.darkMode ? darkTheme.surface : lightTheme.surface)};
    --bg-surface-secondary: ${(props) =>
        props.theme?.darkMode ? darkTheme.surfaceSecondary : lightTheme.surfaceSecondary};
    --text-primary: ${(props) => (props.theme?.darkMode ? darkTheme.text : lightTheme.text)};
    --text-secondary: ${(props) =>
        props.theme?.darkMode ? darkTheme.textSecondary : lightTheme.textSecondary};
    --border-color: ${(props) => (props.theme?.darkMode ? darkTheme.border : lightTheme.border)};
    --accent-color: ${(props) => (props.theme?.darkMode ? darkTheme.accent : lightTheme.accent)};
    --accent-light: ${(props) =>
        props.theme?.darkMode ? darkTheme.accentLight : lightTheme.accentLight};
    --shadow: ${(props) => (props.theme?.darkMode ? darkTheme.shadow : lightTheme.shadow)};
    --card-shadow: ${(props) =>
        props.theme?.darkMode ? darkTheme.cardShadow : lightTheme.cardShadow};
`;

export const FilterBar = styled.div`
    display: flex;
    gap: 20px;
    padding: 16px 24px;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border-color);
    align-items: center;
    box-shadow: var(--card-shadow);
    position: relative;
    flex-wrap: wrap;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 24px;
        right: 24px;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--accent-light), transparent);
    }

    .filter-group {
        display: flex;
        align-items: center;
        gap: 12px;

        label {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            white-space: nowrap;
        }
    }

    .filter-actions {
        display: flex;
        gap: 12px;
        margin-left: auto;

        .filter-reset,
        .filter-export {
            padding: 8px 16px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            background: var(--bg-surface-secondary);
            color: var(--text-primary);
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
                transform: translateY(-1px);
                box-shadow: var(--card-shadow);
                border-color: var(--accent-color);
            }
        }

        .filter-export {
            background: var(--accent-light);
            color: var(--accent-color);
            border-color: var(--accent-color);
        }
    }

    .scope-indicator {
        margin-left: auto;

        label {
            font-size: 11px;
            opacity: 0.8;
        }

        .scope-badge {
            background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            cursor: help;
            transition: all 0.2s ease;

            &:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
            }
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;

        .filter-group {
            width: 100%;
            justify-content: space-between;
        }

        .filter-actions {
            width: 100%;
            margin-left: 0;
            justify-content: center;
        }
    }
`;

export const FilterSelect = styled.select`
    padding: 10px 16px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-surface-secondary);
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 500;
    min-width: 180px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px var(--accent-light);
        background: var(--bg-surface);
    }

    &:hover {
        border-color: var(--accent-color);
        background: var(--bg-surface);
    }

    option {
        background: var(--bg-surface);
        color: var(--text-primary);
        padding: 8px;
    }
`;

// Legacy styles for existing components
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
