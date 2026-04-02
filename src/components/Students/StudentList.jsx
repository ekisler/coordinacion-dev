import React from 'react';
import { HStack, Stack, Text } from '@chakra-ui/react';
import StudentCard from './StudentCard.jsx';
import { SkeletoCard } from '../../utils/Skeleton.jsx';

const StudentList = ({ students, loading }) => {
  if (loading) {
    return (
      <Stack size="xl" mb={24} mt={12} align={'center'}>
        <SkeletoCard />
      </Stack>
    );
  }

  if (!students || students.length === 0) {
    return <Text>No se encontraron estudiantes.</Text>;
  }

  return (
    <HStack wrap="wrap" spacing={18} mt={-7} align={'center'} justify="center">
      {students.map(student => (
        <StudentCard key={student._id} student={student} />
      ))}
    </HStack>
  );
};

export default StudentList;
