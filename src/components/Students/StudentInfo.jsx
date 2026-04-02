// StudentInfo.jsx
import {
  Image,
  Text,
  Stack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import logoFide from '../../assets/logoFide.png';

const StudentInfo = ({ student, age, formatteBirthDate }) => {
  const bgColor = useColorModeValue('gray.700', 'gray.400');
    const dataColor = useColorModeValue('gray.500', 'gray.50');

  return (
    <Stack
      flex={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="left"
      p={1}
      pt={2}
    >
      <Heading fontSize={'2xl'} fontFamily={'body'} ml={3}>
        {student?.studentName} {student?.studentLastName}
      </Heading>
      <Text color={'gray.500'} size="xs" ml={3}>
        {student?.email}
      </Text>
      <Text color={'gray.500'} size="xs" ml={3} mb={4}>
        {student?.grade} Grado || Sección: "{student?.section}" || Turno:{' '}
        {student?.schedule}
      </Text>
      <Text
        fontWeight="bold"
        textAlign={'left'}
        mb={1}
        color={bgColor}
        px={1}
      >
        Fecha de nacimiento:{' '}
        <Text
          as={'span'}
          fontSize={16}
          fontWeight={'bold'}
          color={dataColor}
        >
          {formatteBirthDate}
        </Text>
      </Text>
      <Text
        fontWeight="bold"
        textAlign={'left'}
        mb={1}
        color={bgColor}
        px={1}
      >
        Lugar de nacimiento:{' '}
        <Text
          as={'span'}
          fontSize={16}
          fontWeight={'bold'}
          color={dataColor}
        >
          {student?.birthPlace}
        </Text>
      </Text>
      <Text
        fontWeight="bold"
        textAlign={'left'}
        mb={1}
        color={bgColor}
        px={1}
      >
        Edad:{' '}
        <Text
          as={'span'}
          fontSize={16}
          fontWeight={'bold'}
          color={dataColor}
        >
          {age} años
        </Text>
      </Text>
      <Text
        fontWeight="bold"
        textAlign={'left'}
        mb={1}
        color={bgColor}
        px={1}
      >
        Género:{' '}
        <Text
          as={'span'}
          fontSize={16}
          fontWeight={'bold'}
          color={dataColor}
        >
          {student?.sex}
        </Text>
      </Text>
      <Text
        fontWeight="bold"
        textAlign={'left'}
        mb={1}
        color={bgColor}
        px={1}
      >
        Dirección:{' '}
        <Text
          as={'span'}
          fontSize={16}
          fontWeight={'bold'}
          color={dataColor}
        >
          {student?.address}
        </Text>
      </Text>
      <Text
        fontWeight="bold"
        textAlign={'left'}
        mb={1}
        color={bgColor}
        px={1}
      >
        Teléfono:{' '}
        <Text
          as={'span'}
          fontSize={16}
          fontWeight={'bold'}
          color={dataColor}
        >
          {student?.phone}
        </Text>
      </Text>
      <Text
        fontWeight="bold"
        textAlign={'left'}
        mb={1}
        color={bgColor}
        px={1}
      >
        Tallas:{' '}
        <Text
          as={'span'}
          fontSize={16}
          fontWeight={'bold'}
          color={dataColor} 
        >
          {student?.size}
        </Text>
      </Text>
      <Text
        fontWeight="bold"
        textAlign={'left'}
        color={bgColor}
        px={1}
      >
        ID FIDE:{' '}
        <Text
          as={'span'}
          fontSize={16}
          fontWeight={'bold'}
          color={dataColor}
        >
          {student?.fide_num}
        </Text>
      </Text>
      <Heading fontSize={'2xl'} fontFamily={'body'} ml={3} mt={'12'}>
        <Image
          src={logoFide}
          alt="Logo FIDE"
          boxSize="64px"
          objectFit="contain"
        />
        Elo FIDE
      </Heading>
    </Stack>
  );
};

export default StudentInfo;
