export default function componentStyleOverrides(theme: any, isDark: boolean) {

    return {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            width: '100%',
            height: '100%',
            WebkitOverflowScrolling: 'touch'
          },
          body: {
            width: '100%',
            height: '100%',
            background: isDark ? "#1a1c26" : '#FFFFFF'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
            root: {
                background: isDark ? "#17181f" : '#FFFFFF',
            },
        }
      },
      MuiAlert: {
        styleOverrides: {
          // standardInfo: ...,
          // standardSuccess: ... #235a2b,
          standardWarning: {
            color: '#663c00',
            backgroundColor: '#fff4e5',
            '& .MuiAlert-icon': {
              color: '#ff9800',
            },
          },
          standardError: {
            color: '#5f2120',
            backgroundColor: '#fdeded',
            '& .MuiAlert-icon': {
              color: '#ef5350',
            },
          },
        }
      },
      // MuiGrid: {
      //   styleOverrides: {
      //     container: {
      //       maxWidth: '1200px',
      //     }
      //   }
      // },
      MuiFilledInput: {
        styleOverrides: {
            root: {
                background: isDark ? "#282a34" : '#eaeff5',
                '.Mui-disabled': {
                  background: isDark ? '#282b38' : '#f6f7f8',
                  '-webkit-text-fill-color': isDark ? '#404040' : 'rgba(255, 255, 255, 0.5)'
                },
                ':hover': {
                  background: isDark ? '#282b38' : '#e4edf7',
                  '&:not(.Mui-disabled):before': {
                    borderBottom: isDark ? '1px solid #464769' : '1px solid rgb(29 107 200)'
                  }
                },
                ':before': {
                  borderBottom: isDark ? '1px solid #3f4150' : '1px solid #d0d4d8'
                }

            },
        }
      }

    };
}
