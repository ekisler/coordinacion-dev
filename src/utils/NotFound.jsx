import React from 'react';
import { Box, Flex, Text, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import { IoMdAlert } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const buttonBg = useColorModeValue('blue.500', 'blue.400');
  const buttonHover = useColorModeValue('blue.600', 'blue.500');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="70vh"
      bg={bgColor}
      p={8}
      borderRadius="lg"
      mx="auto"
      maxW="container.md"
    >
      <IoMdAlert size="4em" color="#E53E3E" mb={6} />
      <Heading as="h1" size="2xl" color="#E53E3E" mb={4} textAlign="center">
        404 - Página No Encontrada
      </Heading>
      <Text fontSize="lg" color={textColor} mb={8} textAlign="center">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </Text>
      <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
        <Button
          colorScheme="blue"
          bg={buttonBg}
          _hover={{ bg: buttonHover }}
          onClick={handleGoBack}
        >
          Volver Atrás
        </Button>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={handleGoHome}
        >
          Ir al Inicio
        </Button>
      </Flex>
    </Flex>
  );
};

export default NotFound;
