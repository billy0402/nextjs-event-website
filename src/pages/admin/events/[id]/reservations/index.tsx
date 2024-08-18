import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Link } from '@chakra-ui/next-js';
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

import { useEventReservationList } from '@/queries/events';

const ReservationListPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const { data: eventReservations } = useEventReservationList(id);

  return (
    <Box p={5}>
      <Flex alignItems='center' justifyContent='space-between' mb={20} mt={5}>
        <Heading as='h2' size='lg'>
          Event Reservations
        </Heading>
        <Button>
          <Link href='/admin/events'>Back to List</Link>
        </Button>
      </Flex>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>User</Th>
            </Tr>
          </Thead>
          <Tbody>
            {eventReservations?.reservations.length ? (
              eventReservations.reservations.map((reservation) => (
                <Tr key={reservation.id}>
                  <Td>{reservation?.user.name}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td textAlign='center'>No reservations</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReservationListPage;
