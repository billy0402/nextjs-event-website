import { useEffect } from 'react';

import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Link } from '@chakra-ui/next-js';
import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import type { FieldConfig } from '@/components/Field';
import Field from '@/components/Field';
import {
  useAdminNewsCreate,
  useAdminNewsRetrieve,
  useAdminNewsUpdate,
} from '@/queries/admin/news';

const fieldConfigs: FieldConfig[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
  },
  {
    name: 'content',
    label: 'Content',
    type: 'textarea',
    required: true,
  },
  {
    name: 'image',
    label: 'Image url',
    type: 'url',
    required: false,
  },
  {
    name: 'fbLink',
    label: 'Facebook Link',
    type: 'url',
    required: false,
  },
  {
    name: 'publishedAt',
    label: 'Date',
    type: 'date',
    required: true,
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'select',
    required: false,
    defaultValue: true,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
  },
];

const NewsEditPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const { id } = router.query as { id: string };
  const isCreate = id === 'create';

  const { data: news } = useAdminNewsRetrieve(id);
  const createNews = useAdminNewsCreate();
  const updateNews = useAdminNewsUpdate(id);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const formatDate = {
      ...data,
      publishedAt: new Date(data.publishedAt).toISOString(),
    };
    if (isCreate) {
      createNews.mutate(formatDate);
    } else {
      updateNews.mutate(formatDate);
    }
  };

  useEffect(() => {
    if (!news) return;
    reset({
      ...news,
      id: undefined,
      publishedAt: news.publishedAt.toString().split('T')[0],
    });
  }, [news, reset]);

  useEffect(() => {
    if (!createNews.isSuccess) return;
    toast({
      status: 'success',
      title: '新增成功',
    });
  }, [createNews.isSuccess, toast]);

  useEffect(() => {
    if (!updateNews.isSuccess) return;
    toast({
      status: 'success',
      title: '修改成功',
    });
  }, [updateNews.isSuccess, toast]);

  return (
    <Box p={5}>
      <Flex alignItems='center' justifyContent='space-between' mb={20} mt={5}>
        <Heading as='h2' size='lg'>
          News
        </Heading>
        <Link href='/admin/news'>
          <Button>Back to List</Button>
        </Link>
      </Flex>
      <Flex
        as='form'
        flexDirection='column'
        alignItems='flex-start'
        gap={5}
        onSubmit={handleSubmit(onSubmit)}
      >
        {fieldConfigs.map((config) => (
          <Field
            key={config.name}
            config={config}
            errors={errors}
            register={register}
          />
        ))}
        <Button colorScheme='blue' mt={5} type='submit'>
          {isCreate ? 'Create' : 'Update'}
        </Button>
      </Flex>
    </Box>
  );
};

export default NewsEditPage;
