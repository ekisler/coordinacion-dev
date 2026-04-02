import React from 'react';
import { HStack, Stack, Text } from '@chakra-ui/react';
import TeacherCard from './TeacherCard.jsx';
import { SkeletoCard } from '../../utils/Skeleton.jsx';

const TeacherList = ({ teachers, loading }) => {
  if (loading) {
    return (
      <Stack size="xl" mb={24} mt={12} align={'center'}>
        <SkeletoCard />
      </Stack>
    );
  }

  if (!teachers || teachers.length === 0) {
    return <Text>No se encontraron profesores.</Text>;
  }

  return (
    <HStack wrap="wrap" spacing={18} mt={-7} align={'center'} justify="center">
      {teachers.map(teacher => (
        <TeacherCard key={teacher._id} teacher={teacher} />
      ))}
    </HStack>
  );
};

export default TeacherList;
