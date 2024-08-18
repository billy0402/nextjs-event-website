import { useEffect } from 'react';

import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Link } from '@chakra-ui/next-js';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import type { FieldConfig } from '@/components/Field';
import Field from '@/components/Field';
import {
  useEventCreate,
  useEventRetrieve,
  useEventUpdate,
} from '@/queries/events';

const fieldConfigs: FieldConfig[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    required: true,
  },
  {
    name: 'location',
    label: 'Location',
    type: 'text',
    required: false,
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'select',
    required: false,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
  },
];

const EventEditPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query as { id: string };
  const isCreate = id === 'create';

  const { data: event } = useEventRetrieve(id);
  const createEvent = useEventCreate();
  const updateEvent = useEventUpdate(id);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const formatDate = {
      ...data,
      date: new Date(data.date).toISOString(),
      id: undefined,
    };
    if (isCreate) {
      createEvent.mutate(formatDate);
    } else {
      updateEvent.mutate(formatDate);
    }
  };

  useEffect(() => {
    if (!event) return;
    reset({
      ...event,
      date: event.date.toString().split('T')[0],
    });
  }, [event, reset]);

  return (
    <Box p={5}>
      <Flex alignItems='center' justifyContent='space-between' mb={20} mt={5}>
        <Heading as='h2' size='lg'>
          Events
        </Heading>
        <Link href='/admin/events'>
          <Button>Back to List</Button>
        </Link>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </Box>
  );
};

export default EventEditPage;
