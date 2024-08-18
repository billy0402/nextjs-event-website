import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { MdHome, MdLocalActivity, MdNewspaper } from 'react-icons/md';

import NavItem from './NavItem';

export type LinkItem = {
  name: string;
  icon: IconType;
  href: string;
};

const LinkItems: LinkItem[] = [
  { name: 'Home', icon: MdHome, href: '' },
  { name: 'Event', icon: MdLocalActivity, href: 'events' },
  { name: 'News', icon: MdNewspaper, href: 'news' },
];

const Sidebar = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      h='full'
      pos='fixed'
      transition='500ms ease'
      w={{ base: 'full', md: 60 }}
    >
      <Flex alignItems='center' h='20' justifyContent='space-between' mx='8'>
        <Heading
          as='h1'
          fontFamily='monospace'
          fontSize='2xl'
          fontWeight='bold'
        >
          Logo
        </Heading>
      </Flex>
      {LinkItems.map((item) => (
        <NavItem key={item.name} linkItem={item}>
          {item.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default Sidebar;
