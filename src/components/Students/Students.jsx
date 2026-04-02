import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Flex, Text } from '@chakra-ui/react';
import { getStudents } from '../../store/actions/studentActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';
import ShowErrorAlert from '../../utils/ShowErrorAlert.js';
import SearchInput from '../../utils/SearchInput.jsx';
import StudentHeader from './StudentHeader.jsx';
import StudentList from './StudentList.jsx';

const Students = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const { students } = useSelector(state => state.students);
  const loading = useSelector(state => state.students.loading);
  const error = useSelector(state => state.students.error);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        await dispatch(getStudents());
      } catch (error) {
        console.error('Error al obtener los representantes:', error);
      }
    };

    fetchStudents();
  }, [dispatch]);

  if (!isAdmin || isDisabled) {
    return <AccessDenied />;
  }

  if (error) return <ShowErrorAlert error={error} />;

  const activeStudents = students?.filter(student => {
    if (student.isDisabled) return false; // Excluye estudiantes deshabilitados
    const fullName =
      `${student.studentName} ${student.studentLastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <Box p={2}>
      <Flex justify={'end'}>
        <Text fontSize={12} mt={2.5} mr={2} >
          Buscar Estudiante
        </Text>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Flex>
      <StudentHeader />
      <StudentList students={activeStudents} loading={loading} />
    </Box>
  );
};

export default Students;
