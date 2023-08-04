import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    dark: {
      blockBackground: 'rgba(22, 30, 38, 1)',
      background: 'rgba(16, 22, 29, 1)',
      backgroundGradient: 
      'linear-gradient(90deg, #0C1016 0%, #161E26 49.97%, #0C1016 100%)',
      backgroundGradientMain: 'linear-gradient(90deg, #0B0F14 0%, #141C23 49.97%, #0B0F14 100%)'
    },
    blue: {
      background: 'rgba(19, 161, 232, 1)',
      backgroundNav: 'rgba(17, 34, 51, 1)',
      active: 'rgba(19, 161, 232, 1)',
      border: 'rgba(38, 75, 113, 1)'
    },
    white: {
      color: 'rgba(255, 255, 255, 1)',      
    },
    scroll: {
      thumb: 'rgba(38, 75, 113, 1)'
    },
    error: {
      main: '#F44343'
    }
  },
  width: {
    container: {
      desktop: '90%'
    }
  },
  typography: {
    allVariants: {
      color: 'rgba(60, 81, 99, 1)',
      fontFamily: 'Roboto'
    },
    regular : {
      fontWeight: 400,
      lineHeight: '13px',
      fontSize: '11px',
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'Roboto'
    },
    popup : {
      fontWeight: 400,
      lineHeight: '12px',
      fontSize: '12px',
      color: 'rgba(67, 100, 132, 1)',
      fontFamily: 'Roboto'
    },
    regular2 : {
      fontWeight: 400,
      lineHeight: '16px',
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'Roboto'
    },
    bold: {
      fontWeight: 700,
      lineHeight: '25px',
      fontSize: '25px',
      fontFamily: 'Roboto',
      color: 'rgba(19, 161, 232, 1)'
    },
    light: {
      fontWeight: 700,
      fontSize: '13px',
      lineHeight: '15px',
      color: 'rgba(178, 178, 178, 1)'
    },
    lightBlue: {
      fontWeight: 700,
      fontSize: '13px',
      lineHeight: '19px',
      color: 'rgba(19, 161, 232, 1)',
      textDecoration: 'underline'
    },
    title: {
      fontWeight: 700,
      lineHeight: '20px',
      fontSize: '20px',
      fontFamily: 'Roboto',
      color: 'rgba(255, 255, 255, 1)',
      textTransform: 'uppercase'
    },
    title2: {
      fontWeight: 700,
      lineHeight: '16px',
      fontSize: '16px',
      fontFamily: 'Roboto',
      color: 'rgba(255, 255, 255, 1)',
      textTransform: 'uppercase'
    },
    shentoxMD: {
      fontFamily: 'shentox-trial-smbd-4, sans-serif',
      fontSize: '25px',
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 1)'
    }
  },
  position: {
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }, 
    centerCol: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  button: {
    background: 'rgba(19, 161, 232, 1)',
    width: '100%',
    height: '43px',
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 1)',
    textTransform: 'none',
    sponsored: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(38, 75, 113, 1)',
      borderRadius: '13px',      
      width: '80px',
      height: '20px', 
      color: 'rgba(255, 255, 255, 1)',
      fontSize: '11px',
      fontWeight: 700,
      padding: '1px, 8px, 0px, 8px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(34, 48, 62, 1)',
      height: '40px',
      borderRadius: '8px',
      color: 'rgba(109, 151, 181, 1)',
      textTransform: 'none',
      '&:hover': {
         background: 'rgba(19, 161, 232, 1)', 
         color: 'rgba(255, 255, 255, 1)',
      }
    },
    calendar: {
      color: 'rgba(19, 161, 232, 1)',
      cursor: 'pointer',
      marginLeft: '5px',
      '&:hover': {
         background: 'rgba(19, 161, 232, 1)', 
         color: 'rgba(255, 255, 255, 1)',
      }
    },
    back: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'spase-between',
      background: 'transparent',
      border: '1px solid rgba(67, 100, 132, 1)',
      padding: '8px, 16px, 8px, 12px',
      color: 'rgba(67, 100, 132, 1)',
      textDecoration:'none',
      textTransform: 'none',      
      '&:hover': {
        background: 'transparent',
        border: '1px solid rgba(38, 75, 113, 1)',        
      }
    }
  },
  input : {
    background: 'transparent',
    marginBottom: '15px',
    height: '56px',
  }
});
