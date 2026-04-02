import React from 'react';
import {
  HStack,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { PiStudentBold } from 'react-icons/pi';

const StudentHeader = () => {
  const bgColor = useColorModeValue('blue.900', 'blue.50');

  return (
    <HStack mb={1} align={'center'} justify={'center'}>
      <Heading size={{ base: 'md', md: 'lg', lg: 'lg' }} color={bgColor}>
        <Stack direction="row" align="center" justify="center" mt={4} mb={6}>
          <PiStudentBold />
          <Text>Estudiantes</Text>
        </Stack>
      </Heading>
    </HStack>
  );
};

export default StudentHeader;
