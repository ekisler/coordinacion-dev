import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiSolidUserDetail } from 'react-icons/bi';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getRepresentativesById } from '../../store/actions/representativeActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';
import { Skeleto } from '../../utils/Skeleton.jsx';
import { calculateAge } from '../../utils/calculateAge.js';

const RepresentativeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const representative = useSelector(
    state => state.representatives.representative
  );

  const loading = useSelector(state => state.representatives.loading);
  const bgColor = useColorModeValue('gray.700', 'gray.400');
  const dataColor = useColorModeValue('gray.500', 'gray.50');
  const badgeColor = useColorModeValue('gray.100', 'gray.700')
  const backgColor = useColorModeValue('gray.50', 'gray.900')

  useEffect(() => {
    const fetchRepresentative = async () => {
      try {
        dispatch(getRepresentativesById(id));
      } catch (error) {}
    };

    fetchRepresentative();
  }, [dispatch, id]);

  if (!isAdmin || isDisabled) {
    return <AccessDenied />;
  }

  const age = calculateAge(representative?.birthDate);

  const formatteBirthDate = representative?.birthDate
    ? moment(representative?.birthDate).format('DD/MM/YYYY')
    : '-';

  const handleStudentClick = studentId => {
    navigate(`/student/${studentId}`);
  };

  return (
    <Stack>
      <Heading mt={12} align={'center'} size="lg">
        <Stack direction="row" align="center" justify="center">
          <BiSolidUserDetail />
          <Text>Detalles del Representante</Text>
        </Stack>
      </Heading>
      <Center py={12} align={'center'}>
        {loading ? (
          <Stack size="xl" mb={32} mt={24}>
            <Skeleto />
          </Stack>
        ) : (
          <Stack
            borderWidth="1px"
            borderRadius="lg"
            mb={{ base: '1050', md: '20' }}
            w={{ sm: '100%', md: '1140px' }}
            height={{ sm: '176px', md: '35rem' }}
            direction={{ base: 'column', md: 'row' }}
            bg={backgColor}
            boxShadow={'1xl'}
            padding={4}
          >
            <Flex flex={1}>
              <Image
                objectFit="cover"
                boxSize="99%"
                src={representative?.imageUrl}
                alt={representative?.representativeName}
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
                fontSize={'2xl'}
                fontFamily={'body'}
                ml={3}
              >
                {representative?.representativeName}{' '}
                {representative?.representativeLastName}
              </Heading>
              <Text
                size="xs"
                ml={3}
                mb={4}
              >
                {representative?.email}
              </Text>
              <Text
                fontWeight="bold"
                textAlign={'left'}
                mb={2}
                color={bgColor}
                px={3}
              >
                Lugar de nacimiento:{' '}
                <Text
                  as={'span'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={dataColor}
                >
                  {representative?.birthPlace}
                </Text>
              </Text>
              <Text
                fontWeight="bold"
                textAlign={'left'}
                mb={2}
                color={bgColor}
                px={3}
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
                mb={2}
                color={bgColor}
                px={3}
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
                mb={2}
                color={bgColor}
                px={3}
              >
                Género:{' '}
                <Text
                  as={'span'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={dataColor}
                >
                  {representative?.sex}
                </Text>
              </Text>
              <Text
                fontWeight="bold"
                textAlign={'left'}
                mb={2}
                color={bgColor}
                px={3}
              >
                Profesión:{' '}
                <Text
                  as={'span'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={dataColor}
                >
                  {representative?.profession}
                </Text>
              </Text>
              <Text
                fontWeight="bold"
                textAlign={'left'}
                mb={2}
                color={bgColor}
                px={3}
              >
                Dirección:{' '}
                <Text
                  as={'span'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={dataColor}
                >
                  {representative?.address}
                </Text>
              </Text>
              <Text
                fontWeight="bold"
                textAlign={'left'}
                color={bgColor}
                px={3}
              >
                Teléfono:{' '}
                <Text
                  as={'span'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={dataColor}
                >
                  {representative?.phone}
                </Text>
              </Text>
              <Stack
                align={'center'}
                justify={'center'}
                direction={'row'}
                mt={6}
              >
                <Badge
                  px={2}
                  py={1}
                  bg={badgeColor}
                  fontWeight={'400'}
                >
                  #art
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={badgeColor}
                  fontWeight={'400'}
                >
                  #photography
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={badgeColor}
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
                  _focus={{
                    bg: 'gray.200',
                  }}
                >
                  Message
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
                >
                  Follow
                </Button>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Center>

      <Stack align={'center'} mt={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          mb={{ base: '10', md: '20' }}
          height={{ sm: '190px', md: '13rem' }}
          direction={{ base: 'column', md: 'column' }}
          bg={backgColor}
          boxShadow={'2xl'}
          p={4}
        >
          <Heading size="md" mt={2} align={'center'}>
            Registrar estudiante(s)
          </Heading>
          <Text color={bgColor} fontSize="sm" mb={6} align={'center'}>
            Haciendo click en Registrar Estudiante usted podra asociar uno o más
            Estudiante a este representante.
          </Text>
          <NavLink to={`/postStudent/${representative?._id}`} align={'center'}>
            <Button colorScheme="blue" mt={4}>
              Registrar Estudiante
            </Button>
          </NavLink>
        </Stack>

        <Heading size="md" mt={4} align={'center'}>
          Estudiantes Asociados
        </Heading>
        <Flex flexWrap="wrap" align="center">
          {representative?.studentIds?.map(student => (
            <Box
              key={student?._id}
              mx={4}
              my={4}
              textAlign="center"
              p={4}
              width={'150px'}
              height={'250px'}
              border="1px solid #ccc"
              borderRadius="5px"
              onClick={() => handleStudentClick(student?._id)}
              cursor="pointer"
            >
              <Heading size={'xs'} mb={6}>
                {student?.studentName} {student?.studentLastName}
              </Heading>
              <Center>
                <Image
                  src={student?.imageUrl}
                  alt={student?.studentName}
                  boxSize="80px"
                  borderRadius="full"
                  mb={6}
                />
              </Center>
              <Text fontSize="sm" color={'gray.500'} mt={2}>
                {student?.birthPlace}
              </Text>
            </Box>
          ))}
        </Flex>
      </Stack>
    </Stack>
  );
};

export default RepresentativeDetails;
