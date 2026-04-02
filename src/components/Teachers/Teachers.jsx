import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Flex } from '@chakra-ui/react';
import { getTeachers } from '../../store/actions/teacherActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';
import ShowErrorAlert from '../../utils/ShowErrorAlert.js';
import SearchInput from '../../utils/SearchInput.jsx';
import TeacherList from './TeacherList.jsx';
import TeacherHeader from './TeacherHeader.jsx';

const Teachers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const { teachers, loading, error } = useSelector(state => state.teachers);
  const [searchTerm, setSearchTerm] = useState('');

  const activeTeachers = teachers?.filter(teacher => {
    const isUserDisabled = teacher?.userId?.roles?.isDisabled;
    const isTeacherDirectlyDisabled = teacher?.isDisabled;

    if (isUserDisabled || isTeacherDirectlyDisabled) return false;
    const fullName =
      `${teacher?.teacherName} ${teacher?.teacherLastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        await dispatch(getTeachers());
      } catch (error) {
        console.error('Error al obtener los representantes:', error);
      }
    };

    fetchTeachers();
  }, [dispatch]);

  if (!isAdmin || isDisabled) {
    return <AccessDenied />;
  }

  if (error) return <ShowErrorAlert error={error} />;

  return (
    <Box p={2}>
      <Flex justify={'end'}>
        <Text mt={2.5} mr={2} fontSize={12}>
          Buscar Profesor
        </Text>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Flex>
      <TeacherHeader />
      <TeacherList teachers={activeTeachers} loading={loading} />
    </Box>
  );
};

export default Teachers;
