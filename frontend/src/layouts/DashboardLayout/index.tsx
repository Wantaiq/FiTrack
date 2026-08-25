import { Flex, Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

function DashboardLayout() {
  return (
    <Flex h='100vh' overflow='hidden'>
      <Sidebar />

      <Box flex='1' overflowY='auto' py={8} px={64}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default DashboardLayout;
