import { css } from 'styled-components';

// Simple theme variables to replace @splunk/themes
export const variables = {
    // Font sizes
    fontSizeXXLarge: '24px',
    fontSizeLarge: '18px',
    fontSizeDefault: '14px',
    fontSizeSmall: '12px',

    // Font family
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

    // Spacing
    spacingXXLarge: '32px',
    spacingLarge: '24px',
    spacingMedium: '16px',
    spacing: '8px',

    // Border
    borderRadius: '4px',

    // Colors
    colors: {
        primary: '#1976d2',
        secondary: '#424242',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3',
    },
};

export const mixins = {
    clearfix: () => css`
        &::after {
            content: '';
            display: table;
            clear: both;
        }
    `,
    ellipsis: () => css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `,
    reset: (type = 'block') => css`
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        ${type === 'inline' ? 'display: inline;' : 'display: block;'}
    `,
};
