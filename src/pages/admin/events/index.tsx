import type { NextPage } from 'next';

import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { Link } from '@chakra-ui/next-js';

import { useEventList } from '@/queries/events';

const EventListPage: NextPage = () => {
  const { data: events } = useEventList();

  return (
    <Box p={5}>
      <Flex alignItems='center' justifyContent='space-between' mb={20} mt={5}>
        <Heading as='h2' size='lg'>
          Events
        </Heading>
        <Link href='/admin/events/create'>
          <Button>Create</Button>
        </Link>
      </Flex>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Date</Th>
              <Th>Active</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events?.length ? (
              events.map((event) => (
                <Tr key={event.id}>
                  <Td>{event.title}</Td>
                  <Td>{new Date(event.date).toLocaleDateString()}</Td>
                  <Td>{event.isActive ? '是' : '否'}</Td>
                  <Td>
                    <Link href={`/admin/events/${event.id}`}>
                      <Button>Edit</Button>
                    </Link>

                    <Link href={`/admin/events/${event.id}/reservations`}>
                      <Button ml={5}>View Reservations</Button>
                    </Link>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4}>No data</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EventListPage;
