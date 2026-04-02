import React from 'react';
import { Stack, SimpleGrid, Center, Heading } from '@chakra-ui/react';
import AttendanceItem from './AttendanceItem';

const AttendanceList = ({
  groupedEntries,
  searchTerm,
  currentDays,
  handleDeleteEntri,
  isSuperAdmin,
  setSelectedItem,
  setModalVisible,
}) => {
  return (
    <Stack p={4}>
      {currentDays.map((day, index) => (
        <Stack key={index}>
          <Center mb={6}>
            <Heading size="lg" color={'#00ff00'} letterSpacing={4}>
              Día: {day}
            </Heading>
          </Center>
          <Center>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={12}>
              {groupedEntries[day]
                .filter(
                  item =>
                    !searchTerm ||
                    item.username
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map(item => (
                  <AttendanceItem
                    key={item.id}
                    item={item}
                    handleDeleteEntri={handleDeleteEntri}
                    isSuperAdmin={isSuperAdmin}
                    setSelectedItem={setSelectedItem} // Pasar setSelectedItem
                    setModalVisible={setModalVisible} // Pasar setModalVisible
                  />
                ))}
            </SimpleGrid>
          </Center>
        </Stack>
      ))}
    </Stack>
  );
};

export default AttendanceList;
