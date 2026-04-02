import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
  Tooltip,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  HStack,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import {
  MdOutlineFamilyRestroom,
  MdSearch,
  MdEdit,
  MdPerson,
  MdEmail,
  MdPhone,
  MdArrowUpward,
  MdArrowDownward,
  MdFilterList,
} from 'react-icons/md';
import {
  getRepresentative,
  updateRepresentatives,
} from '../../store/actions/representativeActions';
import ShowErrorAlert from '../../utils/ShowErrorAlert';
import AccessDenied from '../../utils/AccessDenied';

const RepresentativeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const { representatives, loading, error } = useSelector(
    state => state.representatives
  );
  const [sortedRepresentatives, setSortedRepresentatives] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, disabled
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const { isOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const filteredColor = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');

  useEffect(() => {
    dispatch(getRepresentative());
  }, [dispatch]);

  useEffect(() => {
    setSortedRepresentatives(representatives);
  }, [representatives]);

  // Filter and search logic
  const filteredRepresentatives = useMemo(() => {
    let filtered = sortedRepresentatives;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        rep =>
          rep?.representativeLastName?.toLowerCase()?.includes(query) ||
          rep?.representativeName?.toLowerCase()?.includes(query) ||
          rep?.email?.toLowerCase()?.includes(query) ||
          rep?.phone?.toLowerCase()?.includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(rep => {
        if (statusFilter === 'active') return !rep?.isDisabled;
        if (statusFilter === 'disabled') return rep?.isDisabled;
        return true;
      });
    }

    return filtered;
  }, [sortedRepresentatives, searchQuery, statusFilter]);

  // Sorting logic
  const handleSort = field => {
    let direction = 'asc';
    if (sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: field, direction });

    const sorted = [...filteredRepresentatives].sort((a, b) => {
      if (typeof a[field] === 'string') {
        return direction === 'asc'
          ? (a[field]?.localeCompare(b[field]) ?? 0)
          : (b[field]?.localeCompare(a[field]) ?? 0);
      }
      return direction === 'asc' ? a[field] - b[field] : b[field] - a[field];
    });
    setSortedRepresentatives(sorted);
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    const updateStatus = { isDisabled: !currentStatus };
    try {
      await dispatch(updateRepresentatives(id, updateStatus));
      dispatch(getRepresentative());
    } catch (error) {
      console.error(`Error al actualizar representante ${id}:`, error);
    }
  };

  if (!isSuperAdmin) {
    return <AccessDenied />;
  }

  if (error) return <ShowErrorAlert error={error} />;

  // Stats
  const totalReps = representatives?.length || 0;
  const activeReps =
    representatives?.filter(rep => !rep?.isDisabled)?.length || 0;
  const disabledReps = totalReps - activeReps;

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? (
      <MdArrowUpward />
    ) : (
      <MdArrowDownward />
    );
  };

  return (
    <Box p={{ base: 4, md: 6 }}>
      {loading && !representatives?.length ? (
        <VStack spacing={6} align="stretch">
          <Skeleton height="60px" borderRadius="lg" />
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <SkeletonText mt="4" noOfLines={6} spacing="4" />
            </CardBody>
          </Card>
        </VStack>
      ) : (
        <>
          {/* Header */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'stretch', md: 'center' }}
            mb={8}
            gap={4}
          >
            <VStack align="start" spacing={1}>
              <Heading
                size="lg"
                color={textColor}
                display="flex"
                alignItems="center"
                gap={3}
              >
                <Icon
                  as={MdOutlineFamilyRestroom}
                  color="teal.500"
                  boxSize={8}
                />
                Representantes
              </Heading>
              <Text color={mutedColor} fontSize="sm">
                Gestión completa de representantes familiares
              </Text>
            </VStack>

            <HStack spacing={3} flexWrap="wrap">
              <InputGroup maxW="300px">
                <InputLeftElement pointerEvents="none">
                  <Icon as={MdSearch} color={mutedColor} />
                </InputLeftElement>
                <Input
                  placeholder="Buscar representante..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  borderRadius="full"
                  size="sm"
                />
              </InputGroup>

              <Button
                leftIcon={<MdFilterList />}
                size="sm"
                variant="outline"
                colorScheme="teal"
                onClick={() =>
                  setStatusFilter(
                    statusFilter === 'all'
                      ? 'active'
                      : statusFilter === 'active'
                        ? 'disabled'
                        : 'all'
                  )
                }
              >
                {statusFilter === 'all'
                  ? 'Todos'
                  : statusFilter === 'active'
                    ? 'Activos'
                    : 'Inactivos'}
              </Button>

              <Button
                leftIcon={<MdOutlineFamilyRestroom />}
                colorScheme="teal"
                size="sm"
                onClick={() => navigate('/postRepresentative')}
              >
                Nuevo Representante
              </Button>
            </HStack>
          </Flex>

          {/* Stats Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedColor}>Total Representantes</StatLabel>
                  <StatNumber color="teal.500" fontSize="2xl">
                    {totalReps}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    Registrados en el sistema
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedColor}>Activos</StatLabel>
                  <StatNumber color="green.500" fontSize="2xl">
                    {activeReps}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    Con acceso habilitado
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedColor}>Inactivos</StatLabel>
                  <StatNumber color="red.500" fontSize="2xl">
                    {disabledReps}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    Temporalmente bloqueados
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Table */}
          <Card
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="sm"
          >
            <CardBody p={0}>
              {filteredRepresentatives?.length > 0 ? (
                <TableContainer>
                  <Table variant="simple" size="md">
                    <Thead bg={bgColor}>
                      <Tr>
                        <Th
                          fontSize="sm"
                          fontWeight="semibold"
                          cursor="pointer"
                          onClick={() => handleSort('representativeLastName')}
                          px={6}
                          py={4}
                          color={textColor}
                        >
                          <HStack spacing={2}>
                            <Text>Apellido</Text>
                            <SortIcon column="representativeLastName" />
                          </HStack>
                        </Th>
                        <Th
                          fontSize="sm"
                          fontWeight="semibold"
                          cursor="pointer"
                          onClick={() => handleSort('representativeName')}
                          px={6}
                          py={4}
                          color={textColor}
                        >
                          <HStack spacing={2}>
                            <Text>Nombre</Text>
                            <SortIcon column="representativeName" />
                          </HStack>
                        </Th>
                        <Th
                          display={{ base: 'none', md: 'table-cell' }}
                          fontSize="sm"
                          fontWeight="semibold"
                          cursor="pointer"
                          onClick={() => handleSort('email')}
                          px={6}
                          py={4}
                          color={textColor}
                        >
                          <HStack spacing={2}>
                            <Icon as={MdEmail} />
                            <Text>Email</Text>
                            <SortIcon column="email" />
                          </HStack>
                        </Th>
                        <Th
                          display={{ base: 'none', md: 'table-cell' }}
                          fontSize="sm"
                          fontWeight="semibold"
                          cursor="pointer"
                          onClick={() => handleSort('phone')}
                          px={6}
                          py={4}
                          color={textColor}
                        >
                          <HStack spacing={2}>
                            <Icon as={MdPhone} />
                            <Text>Teléfono</Text>
                            <SortIcon column="phone" />
                          </HStack>
                        </Th>
                        <Th
                          fontSize="sm"
                          fontWeight="semibold"
                          cursor="pointer"
                          onClick={() => handleSort('isDisabled')}
                          px={6}
                          py={4}
                          color={textColor}
                        >
                          <HStack spacing={2}>
                            <Text>Estado</Text>
                            <SortIcon column="isDisabled" />
                          </HStack>
                        </Th>
                        <Th
                          fontSize="sm"
                          fontWeight="semibold"
                          px={6}
                          py={4}
                          color={textColor}
                        >
                          Acciones
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredRepresentatives?.map(rep => (
                        <Tr
                          key={rep?._id}
                          _hover={{
                            bg: filteredColor,
                          }}
                          transition="background 0.2s"
                        >
                          <Td
                            px={6}
                            py={4}
                            fontSize="sm"
                            fontWeight="medium"
                            color={rep?.isDisabled ? 'gray.400' : textColor}
                          >
                            {rep?.representativeLastName || 'N/A'}
                          </Td>
                          <Td
                            px={6}
                            py={4}
                            fontSize="sm"
                            fontWeight="medium"
                            color={rep?.isDisabled ? 'gray.400' : textColor}
                          >
                            <HStack spacing={2}>
                              <Icon as={MdPerson} color="teal.400" />
                              <Text>{rep?.representativeName || 'N/A'}</Text>
                            </HStack>
                          </Td>
                          <Td
                            display={{ base: 'none', md: 'table-cell' }}
                            px={6}
                            py={4}
                            fontSize="sm"
                            color={rep?.isDisabled ? 'gray.400' : mutedColor}
                          >
                            {rep?.email || 'N/A'}
                          </Td>
                          <Td
                            display={{ base: 'none', md: 'table-cell' }}
                            px={6}
                            py={4}
                            fontSize="sm"
                            color={rep?.isDisabled ? 'gray.400' : mutedColor}
                          >
                            {rep?.phone || 'N/A'}
                          </Td>
                          <Td px={6} py={4}>
                            <Tooltip
                              label={
                                rep?.isDisabled
                                  ? 'Habilitar representante'
                                  : 'Deshabilitar representante'
                              }
                              hasArrow
                            >
                              <Checkbox
                                size="lg"
                                name="isDisabled"
                                isChecked={!rep?.isDisabled ?? false}
                                onChange={() =>
                                  handleCheckboxChange(rep._id, rep?.isDisabled)
                                }
                                colorScheme="green"
                                cursor="pointer"
                              />
                            </Tooltip>
                          </Td>
                          <Td px={6} py={4}>
                            <HStack spacing={2}>
                              <Tooltip label="Editar representante" hasArrow>
                                <Button
                                  as={NavLink}
                                  to={`/updateRepresentative/${rep?._id}`}
                                  size="sm"
                                  colorScheme="teal"
                                  variant="ghost"
                                  leftIcon={<MdEdit />}
                                  _hover={{ bg: 'teal.50' }}
                                >
                                  Editar
                                </Button>
                              </Tooltip>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <VStack py={16} spacing={4}>
                  <Icon
                    as={MdOutlineFamilyRestroom}
                    boxSize={16}
                    color="gray.300"
                  />
                  <Text color={mutedColor} fontSize="lg">
                    {searchQuery || statusFilter !== 'all'
                      ? 'No se encontraron representantes con los filtros aplicados'
                      : 'No hay representantes registrados'}
                  </Text>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => navigate('/addRepresentative')}
                  >
                    Crear primer representante
                  </Button>
                </VStack>
              )}
            </CardBody>
          </Card>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={undefined}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent borderRadius="xl">
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Eliminar Representante
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button onClick={onClose} variant="outline">
                    Cancelar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}
    </Box>
  );
};

export default RepresentativeList;
