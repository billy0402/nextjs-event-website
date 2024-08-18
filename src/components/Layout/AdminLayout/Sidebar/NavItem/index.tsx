import { Flex, Icon } from '@chakra-ui/react';

import { Link } from '@chakra-ui/next-js';

import type { LinkItem } from '@/components/Layout/AdminLayout/Sidebar';

type Props = {
  linkItem: LinkItem;
  children?: React.ReactNode;
};

const NavItem = ({ linkItem, children }: Props) => {
  return (
    <Link
      _focus={{ boxShadow: 'none' }}
      href={`/admin/${linkItem.href}`}
      style={{ textDecoration: 'none' }}
    >
      <Flex
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        align='center'
        borderRadius='lg'
        cursor='pointer'
        mx='4'
        p='4'
        role='group'
      >
        {linkItem.icon && (
          <Icon
            _groupHover={{
              color: 'white',
            }}
            as={linkItem.icon}
            fontSize='24'
            mr='4'
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
