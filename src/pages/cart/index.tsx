import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useControllableState,
  VStack,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const cart = [
  {
    id: 1,
    productId: 1,
    productTitle: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 100,
    quantity: 4,
    image:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
      rate: 4,
      count: 300,
    },
  },
  {
    id: 2,
    productId: 2,
    productTitle: 'Mens Cotton Jacket',
    price: 100,
    quantity: 4,
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: {
      rate: 4,
      count: 300,
    },
  },
  {
    id: 3,
    productId: 3,
    productTitle: 'White Gold Plated Princess',
    price: 100,
    quantity: 4,
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    rating: {
      rate: 4,
      count: 300,
    },
  },
];

const CountBlock = ({ quantity }: { quantity: number }) => {
  const [value, setValue] = useControllableState({ defaultValue: quantity });
  return (
    <Box border='1px solid' borderColor='gray.200' borderRadius='8px'>
      <Button onClick={() => setValue(value - 1)}>-</Button>
      <Box as='span' w='200px' mx='24px'>
        {value}
      </Box>
      <Button onClick={() => setValue(value + 1)}>+</Button>
    </Box>
  );
};

const CartPage = () => {
  return (
    <>
      <Box as='header'></Box>
      <Container as='main' maxW='container.lg' padding='40px 0'>
        <HStack spacing={4} align='flex-start'>
          <VStack spacing={4} align='stretch' flex='1'>
            {cart.map((item) => (
              <Flex
                key={item.id}
                border='hsla(0, 0%, 50%, 0.2) solid 1px'
                p='20px'
              >
                <Center overflow='hidden' mr='20px'>
                  <Image src={item.image} alt={item.productTitle} w='100px' />
                </Center>

                <VStack spacing={2} align='flex-start'>
                  <Heading as='h3' size='md'>
                    {item.productTitle}
                  </Heading>
                  <Box flex={1}>
                    <HStack spacing={2}>
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          color={index < item.rating.rate ? '#d3c834' : 'gray'}
                        />
                      ))}
                      <Text>({item.rating.count})</Text>
                    </HStack>
                  </Box>

                  <HStack spacing={2} align='stretch'>
                    <Center
                      border='solid 1px hsla(0, 0%, 50%, 0.2)'
                      borderRadius='8px'
                      p='8px 16px'
                    >
                      $ {item.price}
                    </Center>
                    <CountBlock quantity={item.quantity} />
                    <Center
                      border='solid 1px hsla(0, 0%, 50%, 0.2)'
                      borderRadius='8px'
                      p='8px 16px'
                    >
                      $ {item.price * item.quantity}
                    </Center>
                    <Button colorScheme='red'>Remove</Button>
                  </HStack>
                </VStack>
              </Flex>
            ))}
          </VStack>
          <Box border='1px solid' borderColor='gray.200' w='300px' p='20px'>
            <VStack spacing={4} align='stretch'>
              <Heading as='h3' size='md'>
                Cart Summary
              </Heading>
              <HStack justify='space-between'>
                <Text>Subtotal</Text>
                <Text>
                  ${' '}
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  )}
                </Text>
              </HStack>
              <HStack justify='space-between'>
                <Text>Shipping</Text>
                <Text>$ 0</Text>
              </HStack>
              <HStack justify='space-between'>
                <Text>Total</Text>
                <Text>
                  ${' '}
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  )}
                </Text>
              </HStack>
              <Button w='100%' colorScheme='blue'>
                Checkout
              </Button>
            </VStack>
          </Box>
        </HStack>
      </Container>
    </>
  );
};

export default CartPage;
