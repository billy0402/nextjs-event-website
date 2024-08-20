import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Button, Center, Flex, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import type { FieldConfig } from '@/components/Field';
import Field from '@/components/Field';
import { useAuthLogin } from '@/queries/public/auth';
import { Link } from '@chakra-ui/next-js';

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

const LoginPage: NextPage = () => {
  const router = useRouter();
  const login = useAuthLogin(() => router.push('/'));

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
        登入
      </Heading>
      {fieldConfigs.map((config) => (
        <Field
          key={config.name}
          config={config}
          errors={errors}
          register={register}
        />
      ))}
      <Flex mt={5} alignItems='center' gap={5}>
        <Button colorScheme='blue' type='submit' w='100px'>
          登入
        </Button>
        <Link href='/'>回到首頁</Link>
      </Flex>
    </Center>
  );
};

export default LoginPage;
