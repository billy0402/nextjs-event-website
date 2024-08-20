import {
  useReservationDestroy,
  useReservationList,
} from '@/queries/public/reservations';
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const ReservationListPage: NextPage = () => {
  const toast = useToast();

  const { data: reservations } = useReservationList();
  const destroyReservation = useReservationDestroy();

  useEffect(() => {
    if (!destroyReservation.isSuccess) return;
    toast({
      status: 'success',
      title: 'Reservation cancelled',
    });
  }, [destroyReservation.isSuccess, toast]);

  return (
    <Box p={6}>
      <Heading as='h2' size='lg' mb={6}>
        Reservations
      </Heading>
      {reservations?.length ? (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
          {reservations?.map((reservation) => (
            <Box key={reservation.id} p={6} borderWidth='1px' borderRadius='lg'>
              <VStack align='start' spacing={4}>
                <Heading as='h2' size='md'>
                  {reservation.event.title}
                </Heading>
                <Text>{reservation.event.description}</Text>
                <Text>
                  Date:{' '}
                  {reservation.event.startDateTime &&
                    new Date(reservation.event.startDateTime).toLocaleString(
                      'zh-TW',
                    )}{' '}
                  {' ~ '}
                  {reservation.event.endDateTime &&
                    new Date(reservation.event.endDateTime).toLocaleString(
                      'zh-TW',
                    )}
                </Text>
                {reservation.event.location && (
                  <Text>Location: {reservation.event.location}</Text>
                )}
                <Button
                  colorScheme='red'
                  onClick={() => destroyReservation.mutate(reservation.id)}
                >
                  Cancel
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No reservations</Text>
      )}
    </Box>
  );
};

export default ReservationListPage;
