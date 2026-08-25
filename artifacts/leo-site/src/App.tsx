import { type ReactNode, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@workspace/leo-software/components/ui/toaster';
import SiteLayout from '@/layouts/SiteLayout';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));

const queryClient = new QueryClient();

function PageFallback() {
  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center"
      style={{ backgroundColor: '#1C1917' }}
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: '#F59E0B', borderTopColor: 'transparent' }}
      />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <SiteLayout>
        <Suspense fallback={<PageFallback />}>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/pricing" component={PricingPage} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </SiteLayout>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
