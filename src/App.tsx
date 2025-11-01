import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import useServiceWorker from './hooks/useServiceWorker';
import LoadingSpinner from './components/LoadingSpinner';

// Dynamic imports for code splitting
const Home = lazy(() => import('./pages/Home'));
const SkincareArticle = lazy(() => import('./pages/SkincareArticle'));
const NutritionArticle = lazy(() => import('./pages/NutritionArticle'));
const MindfulnessArticle = lazy(() => import('./pages/MindfulnessArticle'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));

function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Don't scroll if it's a POP navigation (browser back/forward button)
    if (navigationType === 'POP') {
      return;
    }

    // Handle hash scrolling
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        // Small timeout to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Scroll to top when no hash (or on regular navigation)
      // Use multiple approaches with different timing to ensure compatibility
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      // Immediate scroll
      scrollToTop();

      // Fallback scroll after event loop
      setTimeout(scrollToTop, 0);

      // Final smooth scroll for better UX
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, 50);
    }
  }, [location, navigationType]);

  return null;
}

function App() {
  const { isSupported, isRegistered } = useServiceWorker();

  useEffect(() => {
    // Listen for service worker updates
    if (isSupported && isRegistered) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATED') {
          // Show update notification to user
          const shouldUpdate = window.confirm(
            'A new version of the app is available. Would you like to update now?'
          );
          if (shouldUpdate) {
            window.location.reload();
          }
        }
      });
    }
  }, [isSupported, isRegistered]);

  return (
    <HelmetProvider>
      <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingSpinner message="Loading homepage..." size="large" />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/skincare-article"
          element={
            <Suspense fallback={<LoadingSpinner message="Loading skincare guide..." />}>
              <SkincareArticle />
            </Suspense>
          }
        />
        <Route
          path="/nutrition-article"
          element={
            <Suspense fallback={<LoadingSpinner message="Loading nutrition guide..." />}>
              <NutritionArticle />
            </Suspense>
          }
        />
          <Route
          path="/articles"
          element={
            <Suspense fallback={<LoadingSpinner message="Loading articles..." />}>
              <ArticlesPage />
            </Suspense>
          }
        />
        </Routes>
      </Router>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;
