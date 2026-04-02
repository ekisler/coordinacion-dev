import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { IoIosWarning } from 'react-icons/io';
const AccessDenied = () => {
  const bgColor = useColorModeValue('red.600', 'red.500');
  return (
    <Box
      display="flex"
      flexDirection={'column'}
      fontSize="3xl"
      alignItems="center"
      justifyContent="center"
      height="70vh"
      color={bgColor}
      fontWeight="bold"
    >
      <Text>¡No tienes acceso a este panel!</Text>
      <Flex mt={4}>
        <IoIosWarning size="3em" />
      </Flex>
    </Box>
  );
};

export default AccessDenied;
