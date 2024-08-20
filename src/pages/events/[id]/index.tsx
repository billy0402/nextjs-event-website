import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Link } from '@chakra-ui/next-js';
import {
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { useEventRetrieve } from '@/queries/public/events';
import { useReservationCreate } from '@/queries/public/reservations';
import { useEffect } from 'react';

const EventDetailPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const { id } = router.query as { id: string };

  const { data: event } = useEventRetrieve(id);
  const reservationCreate = useReservationCreate();

  useEffect(() => {
    if (!reservationCreate.isSuccess) return;
    toast({
      status: 'success',
      title: 'Reservation created',
    });
  }, [reservationCreate.isSuccess, toast]);

  return (
    <VStack
      align='start'
      spacing={4}
      borderWidth='1px'
      m={6}
      borderRadius={6}
      p={4}
    >
      <Heading as='h2' size='md'>
        {event?.title}
      </Heading>
      <Text>{event?.description}</Text>
      <Text>
        Date:{' '}
        {event?.startDateTime &&
          new Date(event.startDateTime).toLocaleString('zh-TW')}{' '}
        {' ~ '}
        {event?.endDateTime &&
          new Date(event.endDateTime).toLocaleString('zh-TW')}
      </Text>
      {event?.location && <Text>Location: {event?.location}</Text>}

      <Flex gap={4}>
        <Button
          colorScheme='teal'
          onClick={() => reservationCreate.mutate({ eventId: id })}
        >
          Reservation
        </Button>
        <Link href='/'>
          <Button>Back to Home</Button>
        </Link>
      </Flex>
    </VStack>
  );
};

export default EventDetailPage;
