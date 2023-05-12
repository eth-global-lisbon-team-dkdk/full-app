import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material';
import { AppProvider } from './contexts/AppContext';

let theme = createTheme({
  typography: {
    fontFamily: ['Raleway', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: "#7B1EA2",
    },
    secondary: {
      main: "#FFFFFF",
    },
    background: {
      default: "#fdf9ff"
    }
  },
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
