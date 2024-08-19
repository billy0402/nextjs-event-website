import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

import { useAdminEventRetrieve } from '@/queries/admin/events';

const EventDetailPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const { data: event } = useAdminEventRetrieve(id);

  return (
    <Box p={6}>
      <VStack align='start' spacing={4}>
        <Heading as='h1'>{event?.title}</Heading>
        <Text fontSize='lg'>{event?.description}</Text>
        <Text fontWeight='bold'>
          Date:
          {event?.date && new Date(event.date).toLocaleDateString('zh-TW')}
        </Text>
        {event?.location && (
          <Text fontWeight='bold'>Location: {event?.location}</Text>
        )}
        <Button colorScheme='teal' onClick={() => router.back()}>
          Back to Events
        </Button>
      </VStack>
    </Box>
  );
};

export default EventDetailPage;
