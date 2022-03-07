// routes
import { ProgressBarStyle } from './components/LoadingScreen';
import NotistackProvider from './components/NotistackProvider';
// components
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
import ThemeProvider from './theme';

export default function App() {
  return (
    <ThemeProvider>
      <RtlLayout>
        <NotistackProvider>
          <ProgressBarStyle />
          <ScrollToTop />
          <Router />
        </NotistackProvider>
      </RtlLayout>
    </ThemeProvider>
  );
}
