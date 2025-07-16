import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';
import { useAuthStore } from './shared/strore/useAuthStore';
import apiInstance from './shared/lib/apiInstance';

function App() {
  const queryClient = new QueryClient();
  const { setUser, clearAuth } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      setIsRefreshing(true);
      try {
        const res = await apiInstance.post(
          '/auth/refresh-token',
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data?.accessToken;
        if (newAccessToken) {
          useAuthStore.getState().setToken(newAccessToken);
        }

        const meRes = await apiInstance.get('/auth/me');
        setUser(meRes.data.data);
      } catch {
        clearAuth();
      } finally {
        setIsRefreshing(false);
      }
    };

    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isRefreshing) return <h1>loading...</h1>;

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
