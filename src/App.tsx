// routes
import NotistackProvider from './components/NotistackProvider';
import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
import ThemeProvider from './theme';

export default function App() {
  return (
    <ThemeProvider>
      <NotistackProvider>
        <ScrollToTop />
        <Router />
      </NotistackProvider>
    </ThemeProvider>
  );
}
