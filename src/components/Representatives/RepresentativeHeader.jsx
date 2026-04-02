import React from 'react';
import { Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { MdOutlineFamilyRestroom } from 'react-icons/md';

const RepresentativeHeader = () => {
  const bgColor = useColorModeValue('blue.900', 'blue.50');

  return (
    <HStack mb={6} align={'center'} justify={'center'}>
      <Heading size={{ base: 'md', md: 'lg', lg: 'lg' }} color={bgColor}>
        <Stack direction="row" align="center" justify="center" mt={4}>
          <MdOutlineFamilyRestroom />
          <Text>Representantes</Text>
        </Stack>
      </Heading>
    </HStack>
  );
};
export default RepresentativeHeader;
