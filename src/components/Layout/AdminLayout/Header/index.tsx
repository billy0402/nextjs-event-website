import { useRouter } from 'next/router';

import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';

import { removeToken } from '@/helpers/token';
import { useAuthMe } from '@/queries/auth';

const Navbar = () => {
  const router = useRouter();
  const { data: meData } = useAuthMe();

  const logout = () => {
    removeToken();
    router.push('/admin/auth/login');
  };

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderBottom='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      px={4}
      py={2}
    >
      <Flex alignItems='center' h={16} justifyContent='flex-end'>
        <Menu>
          <MenuButton
            as={Button}
            cursor='pointer'
            minW={0}
            rounded='full'
            variant='link'
          >
            <Avatar name={meData?.name} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navbar;
