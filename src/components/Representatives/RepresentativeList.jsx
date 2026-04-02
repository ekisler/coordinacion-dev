import React from 'react';
import { HStack, Stack, Text } from '@chakra-ui/react';
import RepresentativeCard from './RepresentativeCard.jsx';
import { SkeletoCard } from '../../utils/Skeleton.jsx';

const RepresentativeList = ({ representatives, loading }) => {
  if (loading) {
    return (
      <Stack size="xl" mb={24} mt={12} align={'center'}>
        <SkeletoCard />
      </Stack>
    );
  }

  if (!representatives || representatives.length === 0) {
    return <Text>No se encontraron representantes.</Text>;
  }

  return (
    <HStack wrap="wrap" spacing={18} mt={-7} align={'center'} justify="center">
      {representatives.map(representative => (
        <RepresentativeCard
          key={representative._id}
          representative={representative}
        />
      ))}
    </HStack>
  );
};

export default RepresentativeList;
