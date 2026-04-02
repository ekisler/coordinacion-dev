import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Center,
  Heading,
  HStack,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { RxExit } from 'react-icons/rx';
import { ExitsLogic } from './ExitsLogic.jsx';
import { Pagination } from '../Attendances/Pagination.jsx';
import { SkeletoAttendances } from '../../utils/Skeleton.jsx';
import AccessDenied from '../../utils/AccessDenied.jsx';
import ExitItem from './ExitItem.jsx';
import HandleDelete from '../Attendances/handleDelete.jsx';
import SearchInput from '../../utils/SearchInput.jsx';
import ExitModal from './ExitModal.jsx';

const Exits = () => {
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const isDisabled = user?.roles.isDisabled;
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [hasData, setHasData] = useState(false);
  const { groupedExits, isLoading } = ExitsLogic();
  const { handleDeleteExit } = HandleDelete();

  useEffect(() => {
    if (Object.keys(groupedExits).length > 0) {
      setHasData(true);
    }
  }, [groupedExits]);

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
  const days = Object.keys(groupedExits);
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
        <Heading size="lg" color={'#ff0000'}>
          <Stack mt={-8} direction="row" align="center" justify="center">
            <Text>Salidas</Text>
            <RxExit />
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
          <Heading>No se han registrado salidas aún.</Heading>
        ) : (
          <>
            <Stack p={4}>
              {currentDays.map((day, index) => (
                <Stack key={index}>
                  <Center mb={6}>
                    <Heading size="lg" color={'#ff0000'} letterSpacing={4}>
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
                        {groupedExits[day]
                          .filter(
                            item =>
                              !searchTerm ||
                              item.username
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                          )
                          .map(item => (
                            <ExitItem
                              key={item.id}
                              item={item}
                              handleDeleteExit={handleDeleteExit}
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
      <ExitModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedItem={selectedItem}
      />
    </Stack>
  );
};

export default Exits;
