// AttendanceItem.jsx
import React from 'react';
import { Stack, Text, Button, Heading } from '@chakra-ui/react';
import { formatDate } from '../../utils/dateUtils.js';

const AttendanceItem = ({
  item,
  handleDeleteEntri,
  isSuperAdmin,
  setSelectedItem,
  setModalVisible,
}) => {
  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      mb={12}
      w={280}
      h={300}
      direction={'column'}
      boxShadow="0 0 15px rgba(0, 255, 0, 1)"
      padding={4}
      borderColor="limegreen"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: '0 0 75px rgba(0, 255, 0, 1)',
        borderColor: 'limegreen',
        borderWidth: '2px',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {isSuperAdmin && (
        <Text
          style={{
            display: 'flex',
            justifyContent: 'right',
            color: 'red',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          title="Borrar"
          onClick={() => handleDeleteEntri(item.id)}
        >
          (X)
        </Text>
      )}
      <Heading
        fontSize={'16'}
        fontWeight={600}
        fontFamily={'body'}
        align={'center'}
      >
        <Text fontSize={'sm'} color={'#00ff00'} mb={4}>
          Entrada
        </Text>
      </Heading>
      <Text>Usuario: {item?.username}</Text>
      <Text>
        Profesor(a): {item?.lastname} {item?.name}
      </Text>
      <Text>Fecha: {formatDate(item?.date).split('\n')[0]}</Text>
      <Text mb={4}>Hora: {formatDate(item?.date).split('\n')[1]}</Text>
      <Button
        onClick={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}
        bg={'#00ff00'}
        color={'gray.500'}
      >
        Ver el mapa aquí
      </Button>
    </Stack>
  );
};

export default AttendanceItem;
