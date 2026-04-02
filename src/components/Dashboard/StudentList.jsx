import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box, Button, Checkbox, Heading, Text, Table, Thead, Tbody, Tr, Th, Td,
  TableContainer, useColorModeValue, Input, InputGroup, InputLeftElement,
  Icon, Flex, HStack, VStack, SimpleGrid, Card, CardBody,
  Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Skeleton, SkeletonText

} from '@chakra-ui/react';
import {
  MdSearch, MdEdit, MdPerson, MdSchool, MdArrowUpward, 
  MdArrowDownward, MdFilterList, MdGroups
} from 'react-icons/md';

// Asumiendo que estas son tus rutas de acciones para estudiantes
import {
  getStudents,
  updateStudents,
} from '../../store/actions/studentActions';
import ShowErrorAlert from '../../utils/ShowErrorAlert';
import AccessDenied from '../../utils/AccessDenied';

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Selectores de Redux
  const { user } = useSelector(state => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const { students, loading, error } = useSelector(state => state.students);

  const [sortedStudents, setSortedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Colores del tema (Identidad visual replicada)
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const filteredColor = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    setSortedStudents(students);
  }, [students]);

  // Lógica de filtrado
  const filteredStudents = useMemo(() => {
    let filtered = sortedStudents;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        student =>
          student?.studentLastName?.toLowerCase()?.includes(query) ||
          student?.studentName?.toLowerCase()?.includes(query) ||
          student?.dni?.toLowerCase()?.includes(query)
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(student => {
        if (statusFilter === 'active') return !student?.isDisabled;
        if (statusFilter === 'disabled') return student?.isDisabled;
        return true;
      });
    }
    return filtered;
  }, [sortedStudents, searchQuery, statusFilter]);

  // Lógica de ordenamiento
  const handleSort = field => {
    let direction = 'asc';
    if (sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: field, direction });

    const sorted = [...filteredStudents].sort((a, b) => {
      const valA = a[field] ?? '';
      const valB = b[field] ?? '';
      if (typeof valA === 'string') {
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return direction === 'asc' ? valA - valB : valB - valA;
    });
    setSortedStudents(sorted);
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    const updateData = { isDisabled: !currentStatus };
    try {
      await dispatch(updateStudents(id, updateData));
      dispatch(getStudents());
    } catch (err) {
      console.error(`Error al actualizar estudiante ${id}:`, err);
    }
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? <MdArrowUpward /> : <MdArrowDownward />;
  };

  if (!isSuperAdmin) return <AccessDenied />;
  if (error) return <ShowErrorAlert error={error} />;

  // Estadísticas para los Cards
  const totalStudents = students?.length || 0;
  const activeStudents = students?.filter(s => !s?.isDisabled)?.length || 0;
  const disabledStudents = totalStudents - activeStudents;

  return (
    <Box p={{ base: 4, md: 6 }}>
      {loading && !students?.length ? (
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
                <Icon as={MdSchool} color="teal.500" boxSize={8} />
                Estudiantes
              </Heading>
              <Text color={mutedColor} fontSize="sm">Listado general de alumnos matriculados</Text>
            </VStack>

            <HStack spacing={3} flexWrap="wrap">
              <InputGroup maxW="300px">
                <InputLeftElement pointerEvents="none"><Icon as={MdSearch} color={mutedColor} /></InputLeftElement>
                <Input 
                  placeholder="Buscar estudiante..." 
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

              <Button leftIcon={<MdPerson />} colorScheme="teal" size="sm" onClick={() => navigate('/postStudentOnly')}>
                Nuevo Estudiante
              </Button>
            </HStack>
          </Flex>

          {/* STATS CARDS */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
            <StatCard title="Total Alumnos" count={totalStudents} help="Inscritos" color="teal.500" />
            <StatCard title="Activos" count={activeStudents} help="Con acceso" color="green.500" arrow="increase" />
            <StatCard title="Inactivos" count={disabledStudents} help="Retirados/Suspendidos" color="red.500" arrow="decrease" />
          </SimpleGrid>

          {/* TABLA DE ESTUDIANTES */}
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="hidden" boxShadow="sm">
            <CardBody p={0}>
              {filteredStudents?.length > 0 ? (
                <TableContainer>
                  <Table variant="simple">
                    <Thead bg={bgColor}>
                      <Tr>
                        <Th cursor="pointer" onClick={() => handleSort('lastName')} color={textColor} py={4}>
                          <HStack spacing={2}><Text>Apellido</Text><SortIcon column="lastName" /></HStack>
                        </Th>
                        <Th cursor="pointer" onClick={() => handleSort('firstName')} color={textColor}>
                          <HStack spacing={2}><Text>Nombre</Text><SortIcon column="firstName" /></HStack>
                        </Th>
                        <Th color={textColor}>Estado</Th>
                        <Th color={textColor} textAlign="center">Acciones</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredStudents.map(student => (
                        <Tr key={student?._id} _hover={{ bg: filteredColor }} transition="0.2s">
                          <Td fontSize="sm" fontWeight="medium" color={student?.isDisabled ? 'gray.400' : textColor}>
                            {student?.studentLastName}
                          </Td>
                          <Td fontSize="sm">
                            
                            <HStack spacing={2}>
                              <Text color={student?.isDisabled ? 'gray.400' : textColor}>{student?.studentName}</Text>
                            </HStack>
                          </Td>
                          <Td>
                            <Checkbox 
                              size="lg" colorScheme="green" isChecked={!student?.isDisabled} 
                              onChange={() => handleCheckboxChange(student._id, student?.isDisabled)}
                            />
                          </Td>
                          <Td textAlign="center">
                            <Button 
                              as={NavLink} to={`/updateStudent/${student?._id}`} 
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
                  <Icon as={MdGroups} boxSize={12} color="gray.300" mb={4} />
                  <Text color={mutedColor}>No se encontraron estudiantes registrados</Text>
                </Flex>
              )}
            </CardBody>
          </Card>
        </>
      )}
    </Box>
  );
};

// Componente auxiliar para las Stats (Igual al de Representatives)
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

export default StudentList;