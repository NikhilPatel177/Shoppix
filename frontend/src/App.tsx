import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster position='top-center'/>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
