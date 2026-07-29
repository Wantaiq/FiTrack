import { Flex, Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

function DashboardLayout() {
  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar />

      <Box flex="1" overflowY="auto" p={6}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default DashboardLayout;
