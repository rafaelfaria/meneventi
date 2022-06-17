/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

declare module '@mui/material/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    menu: true;
    menuTitle: true;
    title: true;
    breadcrumbs: true;
  }
}

export default function themeTypography(theme:any, isDark: boolean) {
    return {
      fontFamily: [
       'Muli', 'sans-serif'
      ].join(','),

      menu: {
        fontFamily: 'Muli, sans-serif',
        fontSize: 14,
        fontWeight: 400,
        color: 'black'
      },
      menuTitle: {
        color: '#969696',
        fontWeight: 600,
        fontSize: '.85rem',
        textTransform: 'uppercase',
        marginTop: '10px',
        padding: '8px 16px',
        display: 'block'
      },
      title: {
        color: '#FFFFFF',
        fontSize: '1.5rem',
        lineHeight: '1.5rem'
      },

      breadcrumbs: {
        color: '#ffb62e',
        fontWeight: 800
      },
    };
}
