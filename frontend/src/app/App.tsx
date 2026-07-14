import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query-client';
import { RouterProvider } from 'react-router';
import router from './router';
import { ChakraProvider } from '@chakra-ui/react';
import config from './chakra-system';

function App() {
  return (
    <ChakraProvider value={config}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
