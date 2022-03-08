// routes
import NotistackProvider from './components/NotistackProvider';
import ScrollToTop from './components/ScrollToTop';
import ThemeColorPresets from './components/ThemeColorPresets';
import Router from './routes';
import ThemeProvider from './theme';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <NotistackProvider>
          <ScrollToTop />
          <Router />
        </NotistackProvider>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
