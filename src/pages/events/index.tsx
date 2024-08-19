import type { NextPage } from 'next';

import { Link } from '@chakra-ui/next-js';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

import { useAdminEventList } from '@/queries/admin/events';

const EventPage: NextPage = () => {
  const { data: events } = useAdminEventList();

  return (
    <Box p={6}>
      <Heading as='h1' mb={6}>
        Upcoming Events
      </Heading>
      <UnorderedList listStyleType='none' spacing={4}>
        {events?.map((event) => (
          <ListItem
            key={event.id}
            borderRadius='lg'
            borderWidth='1px'
            p={4}
            shadow='md'
          >
            <Heading as='h2' mb={2} size='md'>
              {event.title}
            </Heading>
            <Text mb={2}>{event.description}</Text>
            <Text mb={2}>
              Date: {new Date(event.date).toLocaleDateString('zh-TW')}
            </Text>
            {event.location && <Text mb={2}>Location: {event.location}</Text>}
            <Link
              color='teal.500'
              fontWeight='bold'
              href={`/events/${event.id}`}
            >
              View Details
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default EventPage;
