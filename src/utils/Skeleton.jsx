import {
  Box,
  Center,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

export const Skeleto = () => {
  return (
    <Center>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        mb={{ base: '50', md: '20' }}
        w={{ sm: '80%', md: '1140px' }}
        h={{ sm: '1340px', md: '40rem' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'1xl'}
        padding={4}
        direction={{ base: 'column', md: 'row' }}
      >
        <Skeleton objectFit={'cover'} h={500} w="50%" mb={2} align={'left'} />
        <Flex direction={'column'} spacing={'4'} flex={1} ml={4}>
          {' '}
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="left"
            p={1}
            pt={2}
          >
            <Center pb={6}>
              {' '}
              <Skeleton h={10} w={250} />
            </Center>
            <SkeletonText
              mt="4"
              noOfLines={6}
              spacing="6"
              skeletonHeight="4"
              ml={3}
              mb={4}
            />
            <Center pt={6}>
              {' '}
              <Skeleton h={100} w={100} />
            </Center>
          </Stack>
        </Flex>
      </Stack>
    </Center>
  );
};

export const SkeletoFide = () => {
  return (
    <Center>
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
        <Skeleton w={300} h={30} p={{ base: '2', md: '6' }} />
        <Skeleton w={300} h={30} p={{ base: '2', md: '6' }} />
        <Skeleton w={300} h={30} p={{ base: '2', md: '6' }} />
      </Stack>
    </Center>
  );
};

export const SkeletoCard = () => {
  return (
    <Center py={12}>
      <Stack
        maxW={'270px'}
        w={'300px'}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        mr={24}
      >
        <Skeleton w={300} h={'110px'} p={{ base: '2', md: '6' }} />
        <Flex justify={'center'} mt={-12}>
          <SkeletonCircle size={95} />
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Skeleton w={130} h={4} mb={3} />
            <Skeleton w={100} h={2} />
          </Stack>
          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Skeleton w={19} h={5} mt={3} />
              <Skeleton w={16} h={2} mt={2} />
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Skeleton w={19} h={5} mt={3} />
              <Skeleton w={16} h={2} mt={2} />
            </Stack>
          </Stack>
          <Stack spacing={0} align={'center'}>
            <Skeleton w={'full'} h={10} mt={8} />
          </Stack>
        </Box>
      </Stack>
      <Stack
        maxW={'270px'}
        w={'300px'}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        mr={24}
      >
        <Skeleton w={300} h={'110px'} p={{ base: '2', md: '6' }} />
        <Flex justify={'center'} mt={-12}>
          <SkeletonCircle size={95} />
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Skeleton w={130} h={4} mb={3} />
            <Skeleton w={100} h={2} />
          </Stack>
          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Skeleton w={19} h={5} mt={3} />
              <Skeleton w={16} h={2} mt={2} />
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Skeleton w={19} h={5} mt={3} />
              <Skeleton w={16} h={2} mt={2} />
            </Stack>
          </Stack>
          <Stack spacing={0} align={'center'}>
            <Skeleton w={'full'} h={10} mt={8} />
          </Stack>
        </Box>
      </Stack>
      <Stack
        maxW={'270px'}
        w={'300px'}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Skeleton w={300} h={'110px'} p={{ base: '2', md: '6' }} />
        <Flex justify={'center'} mt={-12}>
          <SkeletonCircle size={95} />
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Skeleton w={130} h={4} mb={3} />
            <Skeleton w={100} h={2} />
          </Stack>
          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Skeleton w={19} h={5} mt={3} />
              <Skeleton w={16} h={2} mt={2} />
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Skeleton w={19} h={5} mt={3} />
              <Skeleton w={16} h={2} mt={2} />
            </Stack>
          </Stack>
          <Stack spacing={0} align={'center'}>
            <Skeleton w={'full'} h={10} mt={8} />
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
};

export const SkeletoAttendances = () => {
  return (
    <Center>
      <Stack>
        <Stack align={'center'} mt={48}>
          <Skeleton w={200} h={8} ml={8} />
          <Skeleton w={40} h={4} ml={8} mb={6} mt={6} />
          <Skeleton w={250} h={8} ml={8} />
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} ml={8} gap={8}>
          <Stack
            borderWidth="1px"
            borderRadius="lg"
            w={230}
            h={280}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            mt={10}
            mb={4}
          >
            <Stack align={'end'} mr={4}>
              <SkeletonCircle size={5} mb={1} mt={4} />
            </Stack>

            <Stack align={'center'}>
              <Skeleton w={20} h={4} />
            </Stack>

            <Stack>
              <SkeletonText spacing={6} w={150} h={200} mt={7} mb={14} ml={8} />
              <Stack align={'center'} mt={-40}>
                <Skeleton w={200} h={9} mt={0} />
              </Stack>
            </Stack>
          </Stack>

          <Stack
            borderWidth="1px"
            borderRadius="lg"
            w={230}
            h={280}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            mt={10}
            mb={4}
          >
            <Stack align={'end'} mr={4}>
              <SkeletonCircle size={5} mb={1} mt={4} />
            </Stack>

            <Stack align={'center'}>
              <Skeleton w={20} h={4} />
            </Stack>

            <Stack>
              <SkeletonText spacing={6} w={150} h={200} mt={7} mb={14} ml={8} />
              <Stack align={'center'} mt={-40}>
                <Skeleton w={200} h={9} />
              </Stack>
            </Stack>
          </Stack>

          <Stack
            borderWidth="1px"
            borderRadius="lg"
            w={230}
            h={280}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            mt={10}
            mb={24}
          >
            <Stack align={'end'} mr={4}>
              <SkeletonCircle size={5} mb={1} mt={4} />
            </Stack>

            <Stack align={'center'}>
              <Skeleton w={20} h={4} />
            </Stack>

            <Stack>
              <SkeletonText spacing={6} w={150} h={200} mt={7} mb={14} ml={8} />
              <Stack align={'center'} mt={-40}>
                <Skeleton w={200} h={9} />
              </Stack>
            </Stack>
          </Stack>
          <Stack
            borderWidth="1px"
            borderRadius="lg"
            w={230}
            h={280}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            mt={10}
            mb={24}
          >
            <Stack align={'end'} mr={4}>
              <SkeletonCircle size={5} mb={1} mt={4} />
            </Stack>

            <Stack align={'center'}>
              <Skeleton w={20} h={4} />
            </Stack>

            <Stack>
              <SkeletonText spacing={6} w={150} h={200} mt={7} mb={14} ml={8} />
              <Stack align={'center'} mt={-40}>
                <Skeleton w={200} h={9} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
};

export const SkeletonTDashboard = () => {
  return (
    <Center>
      <Stack
      mt={-78}
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '1140px' }}
        h={{ sm: '1340px', md: '40rem' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={1}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex direction={'column'} spacing={'4'} flex={1} ml={4}>
          {' '}
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="left"
            p={1}
          >
            <Center>
              {' '}
              <Skeleton w={530} h={8} mb={3} />
            </Center>

            <Center pb={6}>
              {' '}
              <Skeleton w={330} h={4} mb={3} />
            </Center>
            <SkeletonText
              mt="4"
              noOfLines={6}
              spacing="6"
              skeletonHeight="4"
              ml={3}
              mb={4}
            />
          </Stack>
        </Flex>
      </Stack>
    </Center>
  );
};
