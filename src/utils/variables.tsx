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
    backgroundHeader: theme('mode', {
        light: `#dbdbdb`,
        dark: `#000000`,
    }),
    text: theme('mode', {
        light: `#282c34`,
        dark: `rgba(244, 244, 245, 1.00)`,
    }),
}
