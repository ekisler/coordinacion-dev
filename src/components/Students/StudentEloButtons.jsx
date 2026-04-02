import React from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';

const StudentEloButtons = ({ student }) => {
  return (
    <Stack
      w={{ sm: '100%', md: '540px' }}
      direction={{ base: 'column', md: 'row' }}
      padding={1}
      justify={'center'}
      align={'center'}
      flex={1}
      p={1}
      pt={2}
      mb={12}
    >
      <Button
        p={{ base: '3', md: '6' }}
        flex={1}
        fontSize={'xs'}
        color={'gray.100'}
        bg={'gray.400'}
        sx={{
          '&:hover': {
            bg: 'gray.400',
          },
        }}
        whiteSpace={'normal'}
      >
        Standard: <Text as="span" fontSize="lg" fontWeight="bold">{student?.standard_elo}</Text>
      </Button>
      <Button
        p={{ base: '2', md: '6' }}
        flex={1}
        fontSize={'sm'}
        color={'gray.100'}
        bg={'#e46464'}
        sx={{
          '&:hover': {
            bg: '#e46464',
          },
        }}
        whiteSpace={'normal'}
      >
        Rápido: <Text as="span" fontSize="lg" fontWeight="bold">{student?.rapid_elo}</Text>
      </Button>
      <Button
        p={{ base: '2', md: '6' }}
        flex={1}
        fontSize={'sm'}
        color={'gray.100'}
        bg={'#4c64ac'}
        sx={{
          '&:hover': {
            bg: '#4c64ac',
          },
        }}
        whiteSpace={'normal'}
      >
        Blitz: <Text as="span" fontSize="lg" fontWeight="bold">{student?.blitz_elo}</Text>
      </Button>
    </Stack>
  );
};

export default StudentEloButtons;