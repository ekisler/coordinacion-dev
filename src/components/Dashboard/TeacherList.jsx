/*import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { GiTeacher } from 'react-icons/gi';
import {
  getTeachers,
  updateTeachers,
} from '../../store/actions/teacherActions.js';
import AccessDenied from '../../utils/AccessDenied.js';
import ShowErrorAlert from '../../utils/ShowErrorAlert.js';
import { SkeletonTDashboard } from '../../utils/Skeleton.js';

const Teachers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const { teachers } = useSelector(state => state.teachers);
  const loading = useSelector(state => state.teachers.loading);
  const error = useSelector(state => state.teachers.error);
  const bgColor = useColorModeValue('blue.900', 'blue.50');
  const [sortedTeachers, setSortedTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        await dispatch(getTeachers());
      } catch (error) {
        console.error('Error al obtener los profesores:', error);
      }
    };

    fetchTeachers();
  }, [dispatch]);

  useEffect(() => {
    setSortedTeachers(teachers);
  }, [teachers]);

  const handleSort = field => {
    const sorted = [...sortedTeachers].sort((a, b) => {
      if (typeof a[field] === 'string') {
        return a[field].localeCompare(b[field]);
      }
      return a[field] - b[field];
    });
    setSortedTeachers(sorted);
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    const updateStatus = { isDisabled: !currentStatus };
    try {
      await dispatch(updateTeachers(id, updateStatus));
      await dispatch(getTeachers());
    } catch (error) {
      console.error('Error al actualizar el estado del profesor:', error);
    }
  };

  if (!isSuperAdmin) {
    return <AccessDenied />;
  }

  if (error) return <ShowErrorAlert error={error} />;

  return (
    <Box p={2}>
      {loading ? (
        <SkeletonTDashboard />
      ) : (
        <>
          <Heading size="lg" color={bgColor} textAlign="center" mb={8} mt={2}>
            <Stack direction="row" align="center" justify="center">
              <GiTeacher />
              <Text>Profesores</Text>
            </Stack>
          </Heading>
          {teachers?.length > 0 ? (
            <TableContainer>
              <Table variant="simple" size={'sm'}>
                <TableCaption>Lista de profesores</TableCaption>
                <Thead>
                  <Tr>
                    <Th
                      fontSize={'10'}
                      onClick={() => handleSort('teacherLastName')}
                      cursor="pointer"
                    >
                      Apellido
                    </Th>
                    <Th
                      fontSize={'10'}
                      onClick={() => handleSort('teacherName')}
                      cursor="pointer"
                    >
                      Nombre
                    </Th>
                    <Th
                      fontSize={'10'}
                      onClick={() => handleSort('phone')}
                      cursor="pointer"
                    >
                      Telefono
                    </Th>
                    <Th
                      fontSize={'10'}
                      onClick={() => handleSort('isDisabled')}
                      cursor="pointer"
                    >
                      Habilitado
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sortedTeachers?.map(teacher => (
                    <Tr key={teacher?._id}>
                      <Td
                        fontSize="xs"
                        color={teacher?.isDisabled ? 'gray.500' : 'inherit'}
                        opacity={teacher?.isDisabled ? 0.6 : 1}
                      >
                        {teacher?.teacherLastName}
                      </Td>
                      <Td
                        fontSize="xs"
                        color={teacher?.isDisabled ? 'gray.500' : 'inherit'}
                        opacity={teacher?.isDisabled ? 0.6 : 1}
                      >
                        {teacher?.teacherName}
                      </Td>
                      <Td
                        fontSize="xs"
                        color={teacher?.isDisabled ? 'gray.500' : 'inherit'}
                        opacity={teacher?.isDisabled ? 0.6 : 1}
                      >
                        {teacher?.phone}
                      </Td>
                      <Td>
                        <Checkbox
                          size={'sm'}
                          name="isDisabled"
                          isChecked={!teacher?.isDisabled}
                          onChange={() =>
                            handleCheckboxChange(
                              teacher._id,
                              teacher.isDisabled
                            )
                          }
                        />
                      </Td>
                      <Td>
                        <Button
                          bg={'yellow.200'}
                          color={'black'}
                          rounded={'md'}
                          as={NavLink}
                          to={`/updateTeacher/${teacher?._id}`}
                          w={50}
                          h={6}
                          size="sm"
                          fontSize="xs"
                          _hover={{
                            bg: 'yellow.100',
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                          }}
                        >
                          Editar
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Text>No se encontraron profesores.</Text>
          )}
        </>
      )}
    </Box>
  );
};

export default Teachers;
*/
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box, Button, Checkbox, Heading, Text, Table, Thead, Tbody, Tr, Th, Td,
  TableContainer, useColorModeValue, Input, InputGroup, InputLeftElement,
  Icon, Flex, HStack, VStack, SimpleGrid, Card, CardBody,
  Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Skeleton, SkeletonText,
} from '@chakra-ui/react';
import { 
  MdSearch, MdEdit, MdPerson, MdPhone, MdArrowUpward, 
  MdArrowDownward, MdFilterList 
} from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import {
  getTeachers,
  updateTeachers,
} from '../../store/actions/teacherActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';
import ShowErrorAlert from '../../utils/ShowErrorAlert.js';

const Teachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const { teachers, loading, error } = useSelector(state => state.teachers);

  const [sortedTeachers, setSortedTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Paleta de colores coherente con los otros componentes
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const filteredColor = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  useEffect(() => {
    setSortedTeachers(teachers);
  }, [teachers]);

  // Lógica de filtrado y búsqueda (Agregada para coherencia visual)
  const filteredTeachers = useMemo(() => {
    let filtered = sortedTeachers || [];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        t =>
          t?.teacherLastName?.toLowerCase()?.includes(query) ||
          t?.teacherName?.toLowerCase()?.includes(query) ||
          t?.phone?.toLowerCase()?.includes(query)
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => 
        statusFilter === 'active' ? !t?.isDisabled : t?.isDisabled
      );
    }
    return filtered;
  }, [sortedTeachers, searchQuery, statusFilter]);

  // Lógica de ordenamiento original mejorada visualmente
  const handleSort = field => {
    let direction = 'asc';
    if (sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: field, direction });

    const sorted = [...filteredTeachers].sort((a, b) => {
      const valA = a[field] ?? '';
      const valB = b[field] ?? '';
      if (typeof valA === 'string') {
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return direction === 'asc' ? valA - valB : valB - valA;
    });
    setSortedTeachers(sorted);
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    const updateStatus = { isDisabled: !currentStatus };
    try {
      await dispatch(updateTeachers(id, updateStatus));
      dispatch(getTeachers());
    } catch (error) {
      console.error('Error al actualizar el estado del profesor:', error);
    }
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? <MdArrowUpward /> : <MdArrowDownward />;
  };

  if (!isSuperAdmin) return <AccessDenied />;
  if (error) return <ShowErrorAlert error={error} />;

  // Stats
  const totalTeachers = teachers?.length || 0;
  const activeTeachers = teachers?.filter(t => !t?.isDisabled)?.length || 0;
  const disabledTeachers = totalTeachers - activeTeachers;

  return (
    <Box p={{ base: 4, md: 6 }}>
      {loading && !teachers?.length ? (
        <VStack spacing={6} align="stretch">
          <Skeleton height="60px" borderRadius="lg" />
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Skeleton height="100px" borderRadius="xl" />
            <Skeleton height="100px" borderRadius="xl" />
            <Skeleton height="100px" borderRadius="xl" />
          </SimpleGrid>
          <Card><CardBody><SkeletonText noOfLines={8} spacing="4" /></CardBody></Card>
        </VStack>
      ) : (
        <>
          {/* HEADER */}
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'stretch', md: 'center' }} mb={8} gap={4}>
            <VStack align="start" spacing={1}>
              <Heading size="lg" color={textColor} display="flex" alignItems="center" gap={3}>
                <Icon as={GiTeacher} color="teal.500" boxSize={8} />
                Profesores
              </Heading>
              <Text color={mutedColor} fontSize="sm">Panel de gestión del cuerpo docente</Text>
            </VStack>

            <HStack spacing={3} flexWrap="wrap">
              <InputGroup maxW="300px">
                <InputLeftElement pointerEvents="none"><Icon as={MdSearch} color={mutedColor} /></InputLeftElement>
                <Input 
                  placeholder="Buscar profesor..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  borderRadius="full" size="sm" bg={cardBg}
                />
              </InputGroup>

              <Button 
                leftIcon={<MdFilterList />} size="sm" variant="outline" colorScheme="teal"
                onClick={() => setStatusFilter(statusFilter === 'all' ? 'active' : statusFilter === 'active' ? 'disabled' : 'all')}
              >
                {statusFilter === 'all' ? 'Todos' : statusFilter === 'active' ? 'Activos' : 'Inactivos'}
              </Button>

              <Button leftIcon={<MdPerson />} colorScheme="teal" size="sm" onClick={() => navigate('/postTeacher')}>
                Nuevo Profesor
              </Button>
            </HStack>
          </Flex>

          {/* STATS CARDS */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
            <StatCard title="Total Profesores" count={totalTeachers} help="Plantel actual" color="teal.500" />
            <StatCard title="Activos" count={activeTeachers} help="En servicio" color="green.500" arrow="increase" />
            <StatCard title="Inactivos" count={disabledTeachers} help="Licencia/Baja" color="red.500" arrow="decrease" />
          </SimpleGrid>

          {/* TABLA DE PROFESORES */}
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="hidden" boxShadow="sm">
            <CardBody p={0}>
              {filteredTeachers?.length > 0 ? (
                <TableContainer>
                  <Table variant="simple">
                    <Thead bg={bgColor}>
                      <Tr>
                        <Th cursor="pointer" onClick={() => handleSort('teacherLastName')} color={textColor} py={4}>
                          <HStack spacing={2}><Text>Apellido</Text><SortIcon column="teacherLastName" /></HStack>
                        </Th>
                        <Th cursor="pointer" onClick={() => handleSort('teacherName')} color={textColor}>
                          <HStack spacing={2}><Text>Nombre</Text><SortIcon column="teacherName" /></HStack>
                        </Th>
                        <Th display={{ base: 'none', md: 'table-cell' }} color={textColor}>
                          <HStack spacing={2}><Icon as={MdPhone} /><Text>Teléfono</Text></HStack>
                        </Th>
                        <Th color={textColor}>Estado</Th>
                        <Th color={textColor} textAlign="center">Acciones</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredTeachers.map(teacher => (
                        <Tr key={teacher?._id} _hover={{ bg: filteredColor }} transition="0.2s">
                          <Td fontSize="sm" fontWeight="medium" color={teacher?.isDisabled ? 'gray.400' : textColor}>
                            {teacher?.teacherLastName}
                          </Td>
                          <Td fontSize="sm">
                            <HStack spacing={2}>
                              <Text color={teacher?.isDisabled ? 'gray.400' : textColor}>{teacher?.teacherName}</Text>
                            </HStack>
                          </Td>
                          <Td display={{ base: 'none', md: 'table-cell' }} fontSize="sm" color={mutedColor}>
                            {teacher?.phone || 'Sin teléfono'}
                          </Td>
                          <Td>
                            <Checkbox 
                              size="lg" colorScheme="green" isChecked={!teacher?.isDisabled} 
                              onChange={() => handleCheckboxChange(teacher._id, teacher?.isDisabled)}
                            />
                          </Td>
                          <Td textAlign="center">
                            <Button 
                              as={NavLink} to={`/updateTeacher/${teacher?._id}`} 
                              size="sm" variant="ghost" colorScheme="teal" leftIcon={<MdEdit />}
                            >
                              Editar
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <Flex direction="column" align="center" py={12}>
                  <Icon as={GiTeacher} boxSize={12} color="gray.300" mb={4} />
                  <Text color={mutedColor}>No se encontraron profesores registrados</Text>
                </Flex>
              )}
            </CardBody>
          </Card>
        </>
      )}
    </Box>
  );
};

// Componente auxiliar para las Stats
const StatCard = ({ title, count, help, color, arrow }) => (
  <Card borderWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.600')}>
    <CardBody>
      <Stat>
        <StatLabel color="gray.500">{title}</StatLabel>
        <StatNumber color={color} fontSize="2xl">{count}</StatNumber>
        <StatHelpText>
          {arrow && <StatArrow type={arrow} />}
          {help}
        </StatHelpText>
      </Stat>
    </CardBody>
  </Card>
);

export default Teachers;