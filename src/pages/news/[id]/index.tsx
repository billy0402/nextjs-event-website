import type { GetServerSideProps, NextPage } from 'next';

import { Link } from '@chakra-ui/next-js';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

import prisma from '@/db';
import { NewsOut, NewsOutSchema } from '@/schema/news';

type Props = {
  news: NewsOut;
};

const NewsDetailPage: NextPage<Props> = ({ news }) => {
  return (
    <Box p={6}>
      <VStack align='start' spacing={4}>
        <Heading as='h2' size='md'>
          {news?.title}
        </Heading>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {news.image && <img src={news.image} alt={news.title} />}
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

export const getServerSideProps = (async (context) => {
  const { id } = context.query as { id: string };

  const news = await prisma.news.findUnique({ where: { id } });
  const newsOut = NewsOutSchema.parse(news);
  const newsJson = JSON.parse(JSON.stringify(newsOut));

  return { props: { news: newsJson } };
}) satisfies GetServerSideProps<Props>;
