import routes from '@/app/router/routes';
import type { AppRouteObject } from '@/app/router/types';
import { useMe } from '@/features/auth/hooks/useMe';
import { Box, VStack, HStack, Text, Avatar, Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router';

type NavItem = {
  path: string;
  label: string;
};

function getNavItems(routes: AppRouteObject[]): NavItem[] {
  return routes.flatMap((route) => {
    const items = route.handle?.nav
      ? [
          {
            path: route.path ?? '/',
            label: route.handle.nav.label,
          },
        ]
      : [];

    const children = route.children ? getNavItems(route.children) : [];

    return [...items, ...children];
  });
}

function Sidebar() {
  const { data: user } = useMe();
  const dashboardRoutes = getNavItems(routes);

  return (
    <Flex
      direction="column"
      h="100vh"
      w="260px"
      borderRightWidth="1px"
      bg="bg.panel"
      p={4}
    >
      <Box mb={8}>
        <Text fontSize="xl" fontWeight="bold">
          FitTrack
        </Text>
      </Box>

      <VStack flex="1" align="stretch" gap={1} overflowY="auto">
        {dashboardRoutes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            {({ isActive }) => (
              <HStack
                px={3}
                py={2}
                borderRadius="md"
                bg={isActive ? 'blue.500' : 'transparent'}
                color={isActive ? 'white' : 'inherit'}
                _hover={{
                  bg: isActive ? 'blue.600' : 'gray.100',
                }}
              >
                <Text>{route.label}</Text>
              </HStack>
            )}
          </NavLink>
        ))}
      </VStack>

      <Box mt="auto" pt={4} borderTopWidth="1px">
        <HStack>
          <Avatar.Root size="sm">
            <Avatar.Fallback name={user?.username} />
          </Avatar.Root>

          <Box>
            <Text fontSize="sm" fontWeight="medium">
              {user?.username}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
}

export default Sidebar;
