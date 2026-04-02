import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  Tooltip,
} from '@chakra-ui/react';
import {
  FaRegUser,
  FaSearch,
  FaUserCog,
  FaSortUp,
  FaSortDown,
} from 'react-icons/fa';
import { getUsersAll, updateUser } from '../../store/actions/usersActions';
import ShowErrorAlert from '../../utils/ShowErrorAlert';
import AccessDenied from '../../utils/AccessDenied';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const { usersAll, loading, error } = useSelector(state => state.users);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, disabled
  const [roleFilter] = useState('all'); // all, admin, teacher, superadmin
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const filteredColor = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    dispatch(getUsersAll());
  }, [dispatch]);

  useEffect(() => {
    setSortedUsers(usersAll);
  }, [usersAll]);

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = sortedUsers;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        u =>
          u?.lastname?.toLowerCase()?.includes(query) ||
          u?.name?.toLowerCase()?.includes(query) ||
          u?.username?.toLowerCase()?.includes(query) ||
          u?.email?.toLowerCase()?.includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(u => {
        if (statusFilter === 'active') return !u?.roles?.isDisabled;
        if (statusFilter === 'disabled') return u?.roles?.isDisabled;
        return true;
      });
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => {
        if (roleFilter === 'admin') return u?.roles?.isAdmin;
        if (roleFilter === 'teacher') return u?.roles?.isTeacher;
        if (roleFilter === 'superadmin') return u?.roles?.isSuperAdmin;
        return true;
      });
    }

    return filtered;
  }, [sortedUsers, searchQuery, statusFilter, roleFilter]);

  // Sorting logic
  const handleSort = field => {
    let direction = 'asc';
    if (sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: field, direction });

    const sorted = [...filteredUsers].sort((a, b) => {
      if (typeof a[field] === 'string') {
        return direction === 'asc'
          ? (a[field]?.localeCompare(b[field]) ?? 0)
          : (b[field]?.localeCompare(a[field]) ?? 0);
      }
      return direction === 'asc' ? a[field] - b[field] : b[field] - a[field];
    });
    setSortedUsers(sorted);
  };

  const handleCheckboxChange = async (id, role, currentStatus) => {
    const updateStatus = {
      roles: {
        ...usersAll.find(u => u._id === id)?.roles,
        [role]: !currentStatus,
      },
    };

    try {
      await dispatch(updateUser(id, updateStatus));
      dispatch(getUsersAll());
    } catch (error) {
      console.error(
        `Error al actualizar ${role} para el usuario ${id}:`,
        error
      );
    }
  };

  if (!isSuperAdmin) {
    return <AccessDenied />;
  }

  if (error) return <ShowErrorAlert error={error} />;

  // Stats
  const totalUsers = usersAll?.length || 0;
  const activeUsers = usersAll?.filter(u => !u?.roles?.isDisabled)?.length || 0;
  const adminUsers = usersAll?.filter(u => u?.roles?.isAdmin)?.length || 0;
  const teacherUsers = usersAll?.filter(u => u?.roles?.isTeacher)?.length || 0;
  const superAdminUsers =
    usersAll?.filter(u => u?.roles?.isSuperAdmin)?.length || 0;

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? (
      <FaSortUp size={12} />
    ) : (
      <FaSortDown size={12} />
    );
  };

  return (
    <Box p={{ base: 2, md: 6 }} overflowX="hidden">
      {loading && !usersAll?.length ? (
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
                <Icon as={FaRegUser} color="blue.500" boxSize={8} />
                Usuarios
              </Heading>
              <Text color={mutedColor} fontSize="sm">
                Gestión completa de usuarios del sistema
              </Text>
            </VStack>

            <HStack spacing={3} flexWrap="wrap">
              <InputGroup maxW="300px">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} color={mutedColor} />
                </InputLeftElement>
                <Input
                  placeholder="Buscar usuario..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  borderRadius="full"
                  size="sm"
                />
              </InputGroup>

              <Button
                leftIcon={<FaSortUp />}
                size="sm"
                variant="outline"
                colorScheme="blue"
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
                leftIcon={<FaUserCog />}
                size="sm"
                colorScheme="blue"
                onClick={() => navigate('/addUser')}
              >
                Nuevo Usuario
              </Button>
            </HStack>
          </Flex>

          {/* Stats Cards */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, xl: 5 }}
            spacing={3}
            mb={8}
          >
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedColor}>Total Usuarios</StatLabel>
                  <StatNumber color="blue.500" fontSize="2xl">
                    {totalUsers}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    Registrados
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedColor}>Activos</StatLabel>
                  <StatNumber color="green.500" fontSize="2xl">
                    {activeUsers}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    Con acceso
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedColor}>Administradores</StatLabel>
                  <StatNumber color="purple.500" fontSize="2xl">
                    {adminUsers}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    Con rol admin
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedColor}>Profesores</StatLabel>
                  <StatNumber color="orange.500" fontSize="2xl">
                    {teacherUsers}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    Con rol profesor
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedColor}>Super-Admins</StatLabel>
                  <StatNumber color="red.500" fontSize="2xl">
                    {superAdminUsers}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    Máximo privilegio
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
            overflow="hidden" // Esto asegura que el fondo azul no se salga de las esquinas redondeadas
            boxShadow="sm"
            w="full"
          >
            <CardBody p={0}>
              {filteredUsers?.length > 0 ? (
                <TableContainer overflowX="auto" w="100%" p={0} m={0}>
                  <Table
                    variant="simple"
                    size="sm"
                    w="100%" // Obliga a la tabla a ocupar todo el Card
                    style={{
                      tableLayout: 'auto', // Esto ayuda a mantener las columnas alineadas
                      minWidth: '100%',
                      borderCollapse: 'collapse',
                    }} // Garantiza que no se encoja menos que el card
                  >
                    <Thead bg={bgColor} display="table-header-group" w="full"> 
                      <Tr display="table-row">
                        <Th
                          fontSize="xs"
                          fontWeight="bold"
                          cursor="pointer"
                          onClick={() => handleSort('lastname')}
                          minW="200px" // Nombre y Apellido necesita espacio
                          py={4}
                          px={4} // Padding moderado
                          color={textColor}
                        >
                          <HStack spacing={2}>
                            <Text>Apellido y Nombre</Text>
                            <SortIcon column="lastname" />
                          </HStack>
                        </Th>
                        <Th
                          fontSize="sm"
                          fontWeight="semibold"
                          cursor="pointer"
                          onClick={() => handleSort('username')}
                          px={4}
                          py={4}
                          color={textColor}
                        >
                          <HStack spacing={2}>
                            <Text>User</Text>
                            <SortIcon column="username" />
                          </HStack>
                        </Th>
                        <Th
                          fontSize="sm"
                          fontWeight="semibold"
                          cursor="pointer"
                          onClick={() => handleSort('email')}
                          px={6}
                          py={4}
                          color={textColor}
                        >
                          <HStack spacing={2}>
                            <Text>Email</Text>
                            <SortIcon column="email" />
                          </HStack>
                        </Th>
                        <Th
                          fontSize="sm"
                          fontWeight="semibold"
                          px={6}
                          py={4}
                          color={textColor}
                        >
                          <HStack spacing={1}>
                            <Text>Admin</Text>
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
                            <Text>Habilitado.</Text>
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
                          <HStack spacing={1}>
                            <Text>Profesor</Text>
                          </HStack>
                        </Th>
                        <Th
                          fontSize="sm"
                          fontWeight="semibold"
                          px={6}
                          py={4}
                          color={textColor}
                        >
                          <HStack spacing={1}>
                            <Text>Super-Administrador</Text>
                          </HStack>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredUsers?.map(u => (
                        <Tr
                          key={u?._id}
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
                            color={
                              u?.roles?.isDisabled ? 'gray.400' : textColor
                            }
                          >
                            {u?.lastname || 'N/A'} {u?.name || 'N/A'}
                          </Td>

                          <Td
                            px={6}
                            py={4}
                            fontSize="sm"
                            color={
                              u?.roles?.isDisabled ? 'gray.400' : mutedColor
                            }
                          >
                            <HStack spacing={2}>
                              <Text>{u?.username || 'N/A'}</Text>
                            </HStack>
                          </Td>

                          <Td px={2} py={4} fontSize="sm">
                            <Tooltip
                              label={u?.email || 'N/A'}
                              hasArrow
                              placement="top"
                              bg="blue.600"
                              borderRadius="md"
                            >
                              <Text
                                maxW="48px" // Esto limita el ancho físico de la celda
                                isTruncated // Esto añade automáticamente los "..."
                                color={
                                  u?.roles?.isDisabled ? 'gray.400' : mutedColor
                                }
                                cursor="help" // Cambia el puntero para indicar que hay más info
                              >
                                {u?.email || 'N/A'}
                              </Text>
                            </Tooltip>
                          </Td>

                          <Td px={6} py={4}>
                            <Tooltip
                              label={
                                u?.roles?.isAdmin
                                  ? 'Quitar administrador'
                                  : 'Hacer administrador'
                              }
                              hasArrow
                            >
                              <Checkbox
                                size="sm"
                                name="isAdmin"
                                isChecked={u?.roles?.isAdmin ?? false}
                                onChange={() =>
                                  handleCheckboxChange(
                                    u._id,
                                    'isAdmin',
                                    u?.roles?.isAdmin
                                  )
                                }
                                colorScheme="purple"
                                cursor="pointer"
                                mx="auto"
                              />
                            </Tooltip>
                          </Td>
                          <Td px={6} py={4}>
                            <Tooltip
                              label={
                                u?.roles?.isDisabled
                                  ? 'Habilitar usuario'
                                  : 'Deshabilitar usuario'
                              }
                              hasArrow
                            >
                              <Checkbox
                                size="sm"
                                name="isDisabled"
                                isChecked={!u?.roles?.isDisabled ?? false}
                                onChange={() =>
                                  handleCheckboxChange(
                                    u._id,
                                    'isDisabled',
                                    u?.roles?.isDisabled
                                  )
                                }
                                colorScheme="green"
                                cursor="pointer"
                                mx="auto"
                              />
                            </Tooltip>
                          </Td>
                          <Td px={6} py={4}>
                            <Tooltip
                              label={
                                u?.roles?.isTeacher
                                  ? 'Quitar profesor'
                                  : 'Hacer profesor'
                              }
                              hasArrow
                            >
                              <Checkbox
                                size="sm"
                                name="isTeacher"
                                isChecked={u?.roles?.isTeacher ?? false}
                                onChange={() =>
                                  handleCheckboxChange(
                                    u._id,
                                    'isTeacher',
                                    u?.roles?.isTeacher
                                  )
                                }
                                colorScheme="orange"
                                cursor="pointer"
                                mx="auto"
                              />
                            </Tooltip>
                          </Td>
                          <Td px={6} py={4}>
                            <Tooltip
                              label={
                                u?.roles?.isSuperAdmin
                                  ? 'Quitar super-admin'
                                  : 'Hacer super-admin'
                              }
                              hasArrow
                            >
                              <Checkbox
                                size="sm"
                                name="isSuperAdmin"
                                isChecked={u?.roles?.isSuperAdmin ?? false}
                                onChange={() =>
                                  handleCheckboxChange(
                                    u._id,
                                    'isSuperAdmin',
                                    u?.roles?.isSuperAdmin
                                  )
                                }
                                colorScheme="red"
                                cursor="pointer"
                                mx="auto"
                              />
                            </Tooltip>
                          </Td>                         
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <VStack py={16} spacing={4}>
                  <Icon as={FaRegUser} boxSize={16} color="gray.300" />
                  <Text color={mutedColor} fontSize="lg">
                    {searchQuery ||
                    statusFilter !== 'all' ||
                    roleFilter !== 'all'
                      ? 'No se encontraron usuarios con los filtros aplicados'
                      : 'No hay usuarios registrados'}
                  </Text>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => navigate('/addUser')}
                  >
                    Crear primer usuario
                  </Button>
                </VStack>
              )}
            </CardBody>
          </Card>
        </>
      )}
    </Box>
  );
};

export default Users;
