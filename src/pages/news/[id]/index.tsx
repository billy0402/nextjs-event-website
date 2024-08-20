import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Link } from '@chakra-ui/next-js';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

import { useNewsRetrieve } from '@/queries/public/news';

const NewsDetailPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const { data: news } = useNewsRetrieve(id);

  return (
    <Box p={6}>
      <VStack align='start' spacing={4}>
        <Heading as='h2' size='md'>
          {news?.title}
        </Heading>
        <Text>{news?.content}</Text>
        <Text>Views: {news?.views}</Text>
        {news?.fbLink && (
          <Text>
            Facebook Link:{' '}
            <Link href={news?.fbLink} target='_blank'>
              {news?.fbLink}
            </Link>
          </Text>
        )}
        <Link href='/'>
          <Button>Back to Home</Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default NewsDetailPage;
