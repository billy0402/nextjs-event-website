import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from '@/components/Layout';
import LoadingOverlay from '@/components/LoadingOverlay';
import { queryClient } from '@/queries/client';
import theme from '@/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <LoadingOverlay />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
