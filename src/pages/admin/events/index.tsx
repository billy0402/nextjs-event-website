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
        <Button>
          <Link href='/admin/events/create'>Create</Link>
        </Button>
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
                    <Button>
                      <Link href={`/admin/events/${event.id}`}>Edit</Link>
                    </Button>
                    <Button ml={5}>
                      <Link href={`/admin/events/${event.id}/reservations`}>
                        View Reservations
                      </Link>
                    </Button>
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
