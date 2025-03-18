import { createTheme } from '@mui/material';

export const modernTheme = createTheme({
  // Default clean theme
  palette: {
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(0, 0, 0, 0.12)',
        }
      }
    }
  }
});

export const geocitiesTheme = createTheme({
  palette: {
    primary: {
      main: '#FF00FF', // Hot pink
    },
    background: {
      default: '#000000',
      paper: '#000033', // Dark blue background
    },
    text: {
      primary: '#00FF00', // Neon green text
      secondary: '#FFFF00', // Yellow text
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(45deg, #FF00FF 30%, #00FFFF 90%)',
          color: '#FFFFFF',
          border: '2px solid #FFFF00',
          fontFamily: '"Comic Sans MS", cursive',
          '&:hover': {
            background: 'linear-gradient(45deg, #00FFFF 30%, #FF00FF 90%)',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'url("/stars.gif")',
          border: '3px solid #FF00FF',
          boxShadow: '0 0 10px #00FFFF',
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF00FF !important',
          '& .MuiTableCell-root': {
            color: '#FFFFFF',
          }
        }
      }
    }
  },
  typography: {
    fontFamily: '"Comic Sans MS", cursive',
    h4: {
      color: '#00FFFF',
      textShadow: '2px 2px #FF00FF',
    },
    h6: {
      color: '#FFFF00',
      textShadow: '1px 1px #FF00FF',
    }
  }
});

export const hackerTheme = createTheme({
  palette: {
    primary: {
      main: '#00FF00', // Matrix green
    },
    background: {
      default: '#000000',
      paper: '#001100', // Dark green background
    },
    text: {
      primary: '#00FF00', // Matrix green text
      secondary: '#00CC00', // Slightly darker green
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#003300',
          color: '#00FF00',
          border: '1px solid #00FF00',
          fontFamily: '"Courier New", monospace',
          '&:hover': {
            backgroundColor: '#004400',
            boxShadow: '0 0 10px #00FF00',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #00FF00',
          boxShadow: '0 0 10px #003300',
          backgroundImage: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.1,
            pointerEvents: 'none',
            backgroundImage: 'url("/matrix.gif")', // You'll need to add this gif
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#003300 !important',
          '& .MuiTableCell-root': {
            color: '#00FF00',
            fontFamily: '"Courier New", monospace',
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#00FF00',
          color: '#00FF00',
          fontFamily: '"Courier New", monospace',
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: '#00FF00',
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#00FF00',
          '&.Mui-focused': {
            color: '#00FF00',
          }
        }
      }
    }
  },
  typography: {
    fontFamily: '"Courier New", monospace',
    h4: {
      color: '#00FF00',
      textShadow: '0 0 10px #00FF00',
    },
    h6: {
      color: '#00FF00',
      textShadow: '0 0 5px #00FF00',
    },
    body1: {
      fontFamily: '"Courier New", monospace',
    }
  }
});

export const momaTheme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Pure black
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F8F8', // Very light grey
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          borderRadius: 0,
          padding: '12px 24px',
          fontWeight: 300,
          letterSpacing: '2px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#333333',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: 'none',
          boxShadow: 'none',
          backgroundColor: '#F8F8F8',
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF !important',
          '& .MuiTableCell-root': {
            color: '#000000',
            fontWeight: 300,
            borderBottom: '2px solid #000000',
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#EEEEEE',
          padding: '16px 24px',
          fontWeight: 300,
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&:before': {
            borderColor: '#000000',
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 300,
          letterSpacing: '1px',
        }
      }
    }
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 300,
      letterSpacing: '4px',
      textTransform: 'uppercase',
    },
    h6: {
      fontWeight: 300,
      letterSpacing: '2px',
    },
    body1: {
      fontWeight: 300,
      letterSpacing: '0.5px',
    }
  }
}); 