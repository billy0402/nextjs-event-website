import type { NextPage } from 'next';

import { Center, Heading } from '@chakra-ui/react';

const AdminHomePage: NextPage = () => {
  return (
    <Center minH='calc(100vh - 64px)'>
      <Heading as='h2'>AdminHomePage</Heading>
    </Center>
  );
};

export default AdminHomePage;
