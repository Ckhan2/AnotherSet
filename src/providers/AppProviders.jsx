import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../utils/queryClient';

export const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools - only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};