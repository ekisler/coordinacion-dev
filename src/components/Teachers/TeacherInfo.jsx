import React from 'react';
import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const TeacherInfo = ({
  teacher,
  age,
  formatteBirthDate,
  openAttendanceModal,
  openModal,
}) => {
  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      mb={{ base: '1050', md: '20' }}
      w={{ sm: '100%', md: '1140px' }}
      height={{ sm: '176px', md: '35rem' }}
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'1xl'}
      padding={4}
    >
      <Flex flex={1}>
        <Image
          objectFit="cover"
          boxSize="99%"
          src={teacher?.imageUrl}
          alt={teacher?.teacherName}
        />
      </Flex>
      <Stack
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="left"
        p={1}
        pt={2}
      >
        <Heading
          color={useColorModeValue('gray.700', 'gray.400')}
          fontSize={'2xl'}
          fontFamily={'body'}
          ml={3}
        >
          {teacher?.teacherName} {teacher?.teacherLastName}
        </Heading>
        <Text
          color={useColorModeValue('gray.700', 'gray.50')}
          size="xs"
          ml={3}
          mb={4}
        >
          {teacher?.email}
        </Text>
        <Text
          fontWeight="bold"
          textAlign={'left'}
          mb={2}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          Lugar de nacimiento:{' '}
          <Text
            as={'span'}
            fontSize={16}
            fontWeight={'bold'}
            color={useColorModeValue('gray.500', 'gray.50')}
          >
            {teacher?.birthPlace}
          </Text>
        </Text>
        <Text
          fontWeight="bold"
          textAlign={'left'}
          mb={2}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          Fecha de nacimiento:{' '}
          <Text
            as={'span'}
            fontSize={16}
            fontWeight={'bold'}
            color={useColorModeValue('gray.500', 'gray.50')}
          >
            {formatteBirthDate}
          </Text>
        </Text>
        <Text
          fontWeight="bold"
          textAlign={'left'}
          mb={2}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          Edad:{' '}
          <Text
            as={'span'}
            fontSize={16}
            fontWeight={'bold'}
            color={useColorModeValue('gray.500', 'gray.50')}
          >
            {age} años
          </Text>
        </Text>
        <Text
          fontWeight="bold"
          textAlign={'left'}
          mb={2}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          Género:{' '}
          <Text
            as={'span'}
            fontSize={16}
            fontWeight={'bold'}
            color={useColorModeValue('gray.500', 'gray.50')}
          >
            {teacher?.sex}
          </Text>
        </Text>
        <Text
          fontWeight="bold"
          textAlign={'left'}
          mb={2}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          Profesión:{' '}
          <Text
            as={'span'}
            fontSize={16}
            fontWeight={'bold'}
            color={useColorModeValue('gray.500', 'gray.50')}
          >
            {teacher?.profession}
          </Text>
        </Text>
        <Text
          fontWeight="bold"
          textAlign={'left'}
          mb={2}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          Dirección:{' '}
          <Text
            as={'span'}
            fontSize={16}
            fontWeight={'bold'}
            color={useColorModeValue('gray.500', 'gray.50')}
          >
            {teacher?.address}
          </Text>
        </Text>
        <Text
          fontWeight="bold"
          textAlign={'left'}
          mb={2}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          Teléfono:{' '}
          <Text
            as={'span'}
            fontSize={16}
            fontWeight={'bold'}
            color={useColorModeValue('gray.500', 'gray.50')}
          >
            {teacher?.phone}
          </Text>
        </Text>
        <Text
          fontWeight="bold"
          textAlign={'left'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          Curriculum:{' '}
          <Link
            href={teacher?.curriculumUrl}
            target="_blank"
            rel="noopener noreferrer"
            fontSize={14}
            fontWeight={'bold'}
            color={useColorModeValue('gray.500', 'gray.50')}
          >
            "Ver CV aquí"
          </Link>
        </Text>
        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            #art
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            #photography
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            #music
          </Badge>
        </Stack>
        <Stack
          width={'100%'}
          mt={'2rem'}
          direction={'row'}
          padding={2}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
            onClick={openAttendanceModal}
          >
            Ver listas de asistencia
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
            onClick={openModal}
          >
            Ver Planificación
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TeacherInfo;
