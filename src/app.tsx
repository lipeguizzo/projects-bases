import { ThemeProvider } from '@emotion/react';
import { theme } from './infra/theme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { SWRConfig, SWRConfiguration } from 'swr';
import { Router } from './infra/router/route';
import { AuthProvider } from './modules/auth/contexts/auth-context';
import { AbilityProvider } from './modules/auth/contexts/ability-context';
import { formatErrorForNotification } from './shared/utils/error';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const swrConfiguration: SWRConfiguration = {
    refreshInterval: 0,
    errorRetryCount: 0,
    dedupingInterval: 0,
    errorRetryInterval: 0,
    focusThrottleInterval: 0,
    shouldRetryOnError: false,
    onError(error) {
      toast.error(formatErrorForNotification(error));
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <SWRConfig value={swrConfiguration}>
        <BrowserRouter>
          <CssBaseline enableColorScheme />
          <AuthProvider>
            <AbilityProvider>
              <Router />
              <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
              />
            </AbilityProvider>
          </AuthProvider>
        </BrowserRouter>
      </SWRConfig>
    </ThemeProvider>
  );
}
