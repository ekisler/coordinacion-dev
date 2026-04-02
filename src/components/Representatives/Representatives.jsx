import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import { getRepresentative } from '../../store/actions/representativeActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';
import ShowErrorAlert from '../../utils/ShowErrorAlert.js';
import SearchInput from '../../utils/SearchInput.jsx';
import RepresentativeHeader from './RepresentativeHeader.jsx';
import RepresentativeList from './RepresentativeList.jsx';

const Representatives = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const { representatives, error, loading } = useSelector(
    state => state.representatives
  );
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        await dispatch(getRepresentative());
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : error?.response?.data?.message ||
              'Error al cargar los representantes';
        toast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchRepresentatives();
  }, [dispatch, toast]);

  if (!isAdmin || isDisabled) {
    return <AccessDenied />;
  }

  if (error) return <ShowErrorAlert error={error} />;

  const activeRepresentatives = representatives?.filter(representative => {
    if (representative.isDisabled) return false;

    const fullName =
      `${representative?.representativeName} ${representative?.representativeLastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <Box p={2}>
      <Flex justify={'end'}>
        <Text fontSize={12} mt={2.5} mr={2}>
          Buscar Representante
        </Text>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Flex>
      <RepresentativeHeader />
      <RepresentativeList
        representatives={activeRepresentatives}
        loading={loading}
      />
    </Box>
  );
};

export default Representatives;
