import { 
  Suspense, 
  useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme.mui';
import AppRoutes from './routes';

const App = () => {
  useEffect(() => {
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading .....</div>}>
        <AppRoutes />
      </Suspense>
    </ThemeProvider> 
  );
};

export default App;
