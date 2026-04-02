import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Center,
  Heading,
  HStack,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AttendancesLogic } from './AttendancesLogic.jsx';
import { Pagination } from './Pagination.jsx';
import { SkeletoAttendances } from '../../utils/Skeleton.jsx';
import AccessDenied from '../../utils/AccessDenied.jsx';
import HandleDelete from './handleDelete.jsx';
import { RxEnter } from 'react-icons/rx';
import SearchInput from '../../utils/SearchInput.jsx';
import AttendanceModal from './AttendanceModal.jsx';
import AttendanceItem from './AttendanceItem.jsx';

const Attendances = () => {
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [hasData, setHasData] = useState(false);
  const { groupedEntries, isLoading } = AttendancesLogic();
  const { handleDeleteEntri } = HandleDelete();

  useEffect(() => {
    if (Object.keys(groupedEntries).length > 0) {
      setHasData(true);
    }
  }, [groupedEntries]);

  if (!isAdmin || isDisabled) {
    return <AccessDenied />;
  }

  const handleNextPage = () => {
    setCurrentPageIndex(prevIndex => Math.min(prevIndex + 1, days.length - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPageIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const ITEMS_PER_PAGE = 1;
  const days = Object.keys(groupedEntries);
  const totalPages = Math.ceil(days.length / ITEMS_PER_PAGE);
  const startIndex = currentPageIndex * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, days.length);
  const currentDays = days.slice(startIndex, endIndex);

  if (isLoading) {
    return <SkeletoAttendances />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Stack>
      <Flex justify={'end'} mt={2} mr={2} mb={6}>
        <Text fontSize={12} mt={2.5} mr={2}>
          Buscar por Profesor
        </Text>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Flex>
      <HStack mb={4} align={'center'} justify={'center'}>
        <Heading size="lg" color={'#00ff00'}>
          <Stack mt={-8} direction="row" align="center" justify="center">
            <RxEnter />
            <Text>Entradas</Text>
          </Stack>
        </Heading>
      </HStack>

      <Stack>
        <Center>
          <Pagination
            currentPageIndex={currentPageIndex}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            totalPages={totalPages}
          />
        </Center>
        {!hasData ? (
          <Heading>No se han registrado entradas aún.</Heading>
        ) : (
          <>
            <Stack p={4}>
              {currentDays.map((day, index) => (
                <Stack key={index}>
                  <Center mb={6}>
                    <Heading size="lg" color={'#00ff00'} letterSpacing={4}>
                      Día: {day}
                    </Heading>
                  </Center>
                  <Center>
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      key={index}
                    >
                      <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                        spacing={12}
                      >
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
                              setSelectedItem={setSelectedItem}
                              setModalVisible={setModalVisible}
                            />
                          ))}
                      </SimpleGrid>
                    </Stack>
                  </Center>
                </Stack>
              ))}
            </Stack>

            <Center mb={12}>
              <Pagination
                currentPageIndex={currentPageIndex}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                totalPages={totalPages}
              />
            </Center>
          </>
        )}
      </Stack>
      <AttendanceModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedItem={selectedItem}
      />
    </Stack>
  );
};

export default Attendances;
