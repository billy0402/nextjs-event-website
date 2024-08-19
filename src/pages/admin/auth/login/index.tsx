import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Button, Center, Heading, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Role } from '@prisma/client';

import type { FieldConfig } from '@/components/Field';
import Field from '@/components/Field';
import { useAdminAuthLogin } from '@/queries/admin/auth';

const fieldConfigs: FieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: '信箱',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: '密碼',
    required: true,
  },
];

const AdminLoginPage: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const login = useAdminAuthLogin((tokenData) => {
    if (tokenData?.role !== Role.ADMIN) {
      toast({
        status: 'error',
        title: 'Permission Denied',
        description: 'Please use admin account to login',
      });
      return;
    }

    router.push('/admin');
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    login.mutate(data);
  };

  return (
    <Center
      alignItems='flex-start'
      as='form'
      flexDirection='column'
      gap={5}
      margin='auto'
      maxW='md'
      minH='100vh'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading as='h2' mb={5} size='lg'>
        管理者登入
      </Heading>
      {fieldConfigs.map((config) => (
        <Field
          key={config.name}
          config={config}
          errors={errors}
          register={register}
        />
      ))}
      <Button colorScheme='blue' mt={5} type='submit' w='100px'>
        登入
      </Button>
    </Center>
  );
};

export default AdminLoginPage;
