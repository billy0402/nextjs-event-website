import { useRouter } from 'next/router';

import { Link } from '@chakra-ui/next-js';
import {
  Avatar,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';

import { removeToken } from '@/helpers/token';
import { useAuthMe } from '@/queries/public/auth';
import { AiOutlineUser } from 'react-icons/ai';
import { IoBagHandleSharp } from 'react-icons/io5';

const Navbar = () => {
  const router = useRouter();
  const { data: meData } = useAuthMe();

  const logout = () => {
    removeToken();
    router.push('/auth/login');
  };

  return (
    <Flex
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderBottom='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      px={4}
      py={2}
      h={20}
      alignItems='center'
      justifyContent='space-between'
    >
      <Link href='/'>
        <Heading as='h1'>Logo</Heading>
      </Link>
      <HStack spacing='16px'>
        <Menu>
          <MenuButton
            as={Button}
            cursor='pointer'
            minW={0}
            rounded='full'
            variant='link'
          >
            <Avatar
              name={meData?.name}
              icon={<AiOutlineUser fontSize='1.5rem' />}
            />
          </MenuButton>
          {meData ? (
            <MenuList>
              <MenuItem>
                <Link href='/reservations' w='100%'>
                  Reservations
                </Link>
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          ) : (
            <MenuList>
              <MenuItem>
                <Link href='/auth/login' w='100%'>
                  Login
                </Link>
              </MenuItem>
            </MenuList>
          )}
        </Menu>
        <Link href='/cart'>
          <Center
            w='48px'
            h='48px'
            borderRadius='50%'
            bgColor='blue.300'
            color='white'
          >
            <IoBagHandleSharp fontSize='1.4rem' />
          </Center>
        </Link>
      </HStack>
    </Flex>
  );
};

export default Navbar;
