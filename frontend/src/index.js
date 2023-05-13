import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material';
import { AppProvider } from './contexts/AppContext';

let theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 15,
  },
  palette: {
    primary: {
      light: "#7234D5",
      main: "#9567E0",
    },
    secondary: {
      main: "#D0BBF2",
    },
    background: {
      default: "#F3EEFC"
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#F3EEFC"
        }
      }
    }
  }
});

// good color #ddeded - kinda green

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppProvider>
          <App className={App}/>
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
