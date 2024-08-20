import { Box, useColorModeValue } from '@chakra-ui/react';

import useAuth from '@/hooks/useAdminAuth';

import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  useAuth();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} minH='100vh'>
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }}>
        <Header />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
