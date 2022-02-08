import theme from 'styled-theming'

// Breakpoints
export const size = {
    tablet: '767px',
    mobileTablet: '1023px',
    desktop: '1024px',
}

export const device = {
    smartphone: `(max-width: ${size.tablet})`,
    tablet: `(min-width: ${size.tablet})`,
    mobileTablet: `(max-width: ${size.mobileTablet})`,
    desktop: `(min-width: ${size.desktop})`,
}

// Themes
export const themes = {
    background: theme('mode', {
        light: `rgba(244, 244, 245, 1.00)`,
        dark: `rgba(31, 31, 31, 1.00)`,
    }),
    backgroundButton: theme('mode', {
        light: `#dbdbdb`,
        dark: `#FFFFFF`,
    }),
    backgroundCard: theme('mode', {
        light: `#dbdbdb`,
        dark: `rgba(49, 49, 49, 1.00)`,
    }),
    backgroundHeader: theme('mode', {
        light: `#dbdbdb`,
        dark: `#000000`,
    }),
    backgroundYear: theme('mode', {
        light: `#ebebeb`,
        dark: `rgba(49, 49, 49, 1.00)`,
    }),
    boxShadowCard: theme('mode', {
        light: `#979797`,
        dark: `#1b1b1b`,
    }),
    buttonHover: theme('mode', {
        light: 'rgba(228, 228, 228, 0.75)',
        dark: '#c2c2c2',
    }),
    inputBorder: theme('mode', {
        light: '#dbdbdb',
        dark: 'transparent',
    }),
    footer: theme('mode', {
        light: '#888888',
        dark: '#888888',
    }),
    footerHover: theme('mode', {
        light: 'rgba(2, 156, 167, 1)',
        dark: 'rgba(2, 156, 167, 1)',
    }),
    text: theme('mode', {
        light: `#282c34`,
        dark: `rgba(244, 244, 245, 1.00)`,
    }),
}
