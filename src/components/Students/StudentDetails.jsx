import {
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import moment from 'moment';
import { getStudentById } from '../../store/actions/studentActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';
import { BiSolidUserDetail } from 'react-icons/bi';
import { calculateAge } from '..//../utils/calculateAge.js';
import StudentInfo from './StudentInfo.jsx';
import StudentLoading from './StudingLoading.jsx';
import StudentEloButtons from './StudentEloButtons.jsx';

const StudentDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const student = useSelector(state => state.students.student);
  const loading = useSelector(state => state.students.loading);
  const bgColor = useColorModeValue('white', 'gray.900');

  useEffect(() => {
    const fetchRepresentative = async () => {
      try {
        await dispatch(getStudentById(id));
      } catch (error) {}
    };

    fetchRepresentative();
  }, [dispatch, id]);

  if (!isAdmin || isDisabled) {
    return <AccessDenied />;
  }

  const age = calculateAge(student?.birthDate);

  const formatteBirthDate = student?.birthDate
    ? moment(student?.birthDate).format('DD/MM/YYYY')
    : '-';

  return (
    <Stack>
      <Heading mt={12} align={'center'} size="lg">
        <Stack direction="row" align="center" justify="center">
          <BiSolidUserDetail />
          <Text>Detalles del Estudiante</Text>
        </Stack>
      </Heading>
      <Center py={1} align={'center'}>
        {loading ? (
          <StudentLoading />
        ) : (
          <Stack
            borderWidth="1px"
            borderRadius="lg"
            mb={{ base: '50', md: '20' }}
            w={{ sm: '80%', md: '1140px' }}
            h={{ sm: '1340px', md: '40rem' }}
            direction={{ base: 'column', md: 'row' }}
            bg={bgColor}
            boxShadow={'1xl'}
            padding={4}
          >
            <Flex flex={1}>
              <Image
                objectFit={'cover'}
                boxSize={{ base: '500px', md: '540' }}
                src={student?.imageUrl}
                alt={student?.studentName}
              />
            </Flex>
            <StudentInfo
              student={student}
              age={age}
              formatteBirthDate={formatteBirthDate}
            />
          </Stack>
        )}
      </Center>
      <Center pl={24} pr={24}>
        {loading ? <StudentLoading /> : <StudentEloButtons student={student} />}
      </Center>
    </Stack>
  );
};

export default StudentDetails;
