import React from 'react';
import { HStack, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { GiTeacher } from 'react-icons/gi';

const TeacherHeader = () => {
  const bgColor = useColorModeValue('blue.900', 'blue.50');

  return (
    <HStack mb={6} align={'center'} justify={'center'}>
      <Heading size={{ base: "md", md: "lg", lg: "lg" }} color={bgColor}>
        <Stack direction="row" align="center" justify="center" mt={4}>
          <GiTeacher />
          <Text>Profesores</Text>
        </Stack>
      </Heading>
    </HStack>
  );
};

export default TeacherHeader;
