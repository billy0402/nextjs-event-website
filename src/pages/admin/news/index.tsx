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
  useToast,
} from '@chakra-ui/react';

import { Link } from '@chakra-ui/next-js';

import { useNewsDestroy, useNewsList } from '@/queries/news';
import { useEffect } from 'react';

const NewsListPage: NextPage = () => {
  const toast = useToast();
  const { data: newsList } = useNewsList();
  const deleteNews = useNewsDestroy();

  useEffect(() => {
    if (!deleteNews.isSuccess) return;
    toast({
      status: 'success',
      title: '刪除成功',
    });
  }, [deleteNews.isSuccess, toast]);

  return (
    <Box p={5}>
      <Flex alignItems='center' justifyContent='space-between' mb={20} mt={5}>
        <Heading as='h2' size='lg'>
          News
        </Heading>
        <Link href='/admin/news/create'>
          <Button>Create</Button>
        </Link>
      </Flex>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Views</Th>
              <Th>Published At</Th>
              <Th>Active</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {newsList?.length ? (
              newsList.map((news) => (
                <Tr key={news.id}>
                  <Td>{news.title}</Td>
                  <Td>{news.views}</Td>
                  <Td>{new Date(news.publishedAt).toLocaleDateString()}</Td>
                  <Td>{news.isActive ? '是' : '否'}</Td>
                  <Td>
                    <Link href={`/admin/news/${news.id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button ml={5} onClick={() => deleteNews.mutate(news.id)}>
                      Delete
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

export default NewsListPage;
