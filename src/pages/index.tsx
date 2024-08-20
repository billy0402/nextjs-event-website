import type { NextPage } from 'next';

import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

import { useEventList } from '@/queries/public/events';
import { useNewsList } from '@/queries/public/news';

const HomePage: NextPage = () => {
  const { data: events } = useEventList();
  const { data: newsList } = useNewsList();

  return (
    <Flex p={6} flexWrap='wrap' gap={6}>
      <Box flex={1}>
        <Heading as='h2' size='lg' mb={6}>
          Upcoming Events
        </Heading>
        {events?.length ? (
          <UnorderedList listStyleType='none' spacing={4} ml={0}>
            {events?.map((event) => (
              <ListItem
                key={event.id}
                borderRadius='lg'
                borderWidth='1px'
                p={4}
                display='flex'
                flexDirection='column'
                gap={2}
                shadow='md'
              >
                <Heading as='h3' size='md'>
                  {event.title}
                </Heading>
                <Text>{event.description}</Text>
                <Text>
                  Start DateTime:{' '}
                  {new Date(event.startDateTime).toLocaleString('zh-TW')}
                </Text>
                <Text>
                  End DateTime:{' '}
                  {new Date(event.endDateTime).toLocaleString('zh-TW')}
                </Text>
                {event.location && <Text>Location: {event.location}</Text>}
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
        ) : (
          <Text>No upcoming events</Text>
        )}
      </Box>

      <Box flex={1}>
        <Heading as='h2' size='lg' mb={6}>
          News
        </Heading>
        {newsList?.length ? (
          <UnorderedList listStyleType='none' spacing={4} ml={0}>
            {newsList?.map((news) => (
              <ListItem
                key={news.id}
                borderRadius='lg'
                borderWidth='1px'
                p={4}
                display='flex'
                flexDirection='column'
                gap={2}
                shadow='md'
              >
                <Heading as='h3' size='md'>
                  {news.title}
                </Heading>
                <Text>{news.content}</Text>
                <Text>Views: {news.views}</Text>
                {news.fbLink && (
                  <Text>
                    Facebook Link:{' '}
                    <Link href={news.fbLink} target='_blank'>
                      {news.fbLink}
                    </Link>
                  </Text>
                )}
                <Link
                  color='teal.500'
                  fontWeight='bold'
                  href={`/news/${news.id}`}
                >
                  View Details
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        ) : (
          <Text>No news</Text>
        )}
      </Box>
    </Flex>
  );
};

export default HomePage;
