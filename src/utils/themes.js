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

export const cartoonTheme = createTheme({
  palette: {
    primary: {
      main: '#FF4081', // Bright pink
    },
    background: {
      default: '#FFF9C4', // Light yellow background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50', // Dark blue-grey
      secondary: '#E91E63', // Pink
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#FF4081',
          color: '#FFFFFF',
          borderRadius: '25px',
          border: '3px solid #FFF',
          fontFamily: 'Fredoka One, cursive',
          fontSize: '1.1rem',
          boxShadow: '0 4px 0 #E91E63',
          transform: 'translateY(-2px)',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: '#E91E63',
            transform: 'translateY(0)',
            boxShadow: '0 2px 0 #C2185B',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          border: '3px solid #FF4081',
          boxShadow: '8px 8px 0 rgba(233, 30, 99, 0.2)',
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF4081 !important',
          '& .MuiTableCell-root': {
            color: '#FFFFFF',
            fontFamily: 'Fredoka One, cursive',
            fontSize: '1.1rem'
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#FFB4D9',
          fontSize: '1rem',
          fontFamily: 'Nunito, sans-serif'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          fontFamily: 'Nunito, sans-serif'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Nunito, sans-serif',
          fontSize: '1rem'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    h4: {
      fontFamily: 'Fredoka One, cursive',
      color: '#FF4081',
      textShadow: '2px 2px 0 #FFB4D9',
    },
    h6: {
      fontFamily: 'Fredoka One, cursive',
      color: '#FF4081',
    },
    body1: {
      fontSize: '1rem',
      color: '#2C3E50',
    }
  }
});

export const dachshundTheme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Saddle brown
    },
    background: {
      default: '#FFF5E6', // Warm cream
      paper: '#FFFFFF',
    },
    text: {
      primary: '#5C3317', // Darker brown
      secondary: '#8B4513', // Saddle brown
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
          color: '#FFF5E6',
          borderRadius: '30px 30px 15px 15px', // Elongated like a dachshund
          padding: '8px 24px',
          fontFamily: '"Quicksand", sans-serif',
          fontWeight: 600,
          border: '2px solid #5C3317',
          '&:hover': {
            background: 'linear-gradient(45deg, #A0522D 30%, #8B4513 90%)',
            boxShadow: '0 3px 5px 2px rgba(139, 69, 19, .3)',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          border: '2px solid #DEB887', // Burlywood
          boxShadow: '0 4px 8px rgba(139, 69, 19, 0.2)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '5px',
            backgroundColor: '#8B4513',
            borderRadius: '10px',
            opacity: 0.5
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#DEB887 !important', // Burlywood
          '& .MuiTableCell-root': {
            color: '#5C3317',
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 700
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#DEB887',
          color: '#5C3317',
          fontFamily: '"Quicksand", sans-serif'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: '"Quicksand", sans-serif',
          '&:before': {
            borderColor: '#8B4513',
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Quicksand", sans-serif',
          color: '#8B4513',
          '&.Mui-focused': {
            color: '#8B4513',
          }
        }
      }
    }
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    h4: {
      color: '#5C3317',
      fontWeight: 700,
      letterSpacing: '1px',
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-8px',
        left: '0',
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, #DEB887, transparent)',
      }
    },
    h6: {
      color: '#8B4513',
      fontWeight: 600
    },
    body1: {
      color: '#5C3317',
      fontSize: '1rem',
    }
  }
});

export const samuraiTheme = createTheme({
  palette: {
    primary: {
      main: '#BC002D', // Traditional Japanese red
    },
    background: {
      default: '#F7F3E9', // Rice paper color
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D2D2D', // Deep charcoal
      secondary: '#BC002D', // Traditional red
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(to bottom, #BC002D, #8C0020)',
          color: '#FFFFFF',
          borderRadius: '2px',
          padding: '8px 24px',
          fontFamily: '"Noto Sans JP", sans-serif',
          fontWeight: 500,
          border: '1px solid #8C0020',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent 48%, #BC002D 49%, #BC002D 51%, transparent 52%)',
            opacity: 0,
            transition: 'opacity 0.3s',
          },
          '&:hover': {
            background: 'linear-gradient(to bottom, #D4003A, #BC002D)',
            '&::before': {
              opacity: 0.2,
            }
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
          border: '1px solid #E5E1D8',
          boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.1)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 8,
            left: 8,
            right: -8,
            bottom: -8,
            background: 'repeating-linear-gradient(45deg, #E5E1D8 0, #E5E1D8 1px, transparent 1px, transparent 4px)',
            zIndex: -1,
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#2D2D2D !important',
          '& .MuiTableCell-root': {
            color: '#FFFFFF',
            fontFamily: '"Noto Sans JP", sans-serif',
            fontWeight: 500,
            borderBottom: '2px solid #BC002D'
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#E5E1D8',
          fontFamily: '"Noto Sans JP", sans-serif',
          '&:not(:last-child)': {
            borderRight: '1px solid #E5E1D8'
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans JP", sans-serif',
          '&:before': {
            borderColor: '#BC002D',
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans JP", sans-serif',
          color: '#2D2D2D',
          '&.Mui-focused': {
            color: '#BC002D',
          }
        }
      }
    }
  },
  typography: {
    fontFamily: '"Noto Sans JP", sans-serif',
    h4: {
      color: '#2D2D2D',
      fontWeight: 700,
      letterSpacing: '2px',
      position: 'relative',
      paddingBottom: '16px',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: `linear-gradient(90deg, 
          #BC002D 0%, #BC002D 40%, 
          transparent 40%, transparent 60%,
          #BC002D 60%, #BC002D 100%
        )`
      }
    },
    h6: {
      color: '#2D2D2D',
      fontWeight: 600,
      letterSpacing: '1px'
    },
    body1: {
      color: '#2D2D2D',
      fontSize: '1rem',
      lineHeight: 1.8
    }
  }
});

export const birthdayTheme = createTheme({
  palette: {
    primary: {
      main: '#FF69B4', // Hot pink
    },
    background: {
      default: '#FFF0F5', // Lavender blush
      paper: '#FFFFFF',
    },
    text: {
      primary: '#FF1493', // Deep pink
      secondary: '#FF69B4', // Hot pink
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
          color: '#FFFFFF',
          borderRadius: '20px',
          padding: '8px 24px',
          fontFamily: '"Comic Sans MS", cursive',
          fontWeight: 600,
          border: '2px solid #FF1493',
          '&:hover': {
            background: 'linear-gradient(45deg, #FFB6C1 30%, #FF69B4 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          border: '2px solid #FFB6C1',
          boxShadow: '0 4px 8px rgba(255, 105, 180, 0.2)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '5px',
            backgroundColor: '#FF69B4',
            borderRadius: '10px',
            opacity: 0.5
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFB6C1 !important',
          '& .MuiTableCell-root': {
            color: '#FF1493',
            fontFamily: '"Comic Sans MS", cursive',
            fontWeight: 700
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#FFB6C1',
          color: '#FF1493',
          fontFamily: '"Comic Sans MS", cursive'
        }
      }
    }
  },
  typography: {
    fontFamily: '"Comic Sans MS", cursive',
    h4: {
      color: '#FF1493',
      fontWeight: 700,
      letterSpacing: '1px',
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-8px',
        left: '0',
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, #FFB6C1, transparent)',
      }
    },
    h6: {
      color: '#FF69B4',
      fontWeight: 600
    },
    body1: {
      color: '#FF1493',
      fontSize: '1rem',
    }
  }
}); 