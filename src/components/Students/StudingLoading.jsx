import React from 'react';
import { Center } from '@chakra-ui/react';
import { Skeleto } from '../../utils/Skeleton.jsx';

const StudentLoading = () => {
  return (
    <Center py={1} align={'center'}>
      <Skeleto />
    </Center>
  );
};

export default StudentLoading;
