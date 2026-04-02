import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Spinner,
  Center,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Button,
  VStack,
  HStack,
  Badge,
  Container,
} from '@chakra-ui/react';
import {
  AiOutlineControl,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineBook,
  AiOutlineFileText,
  AiOutlineBarChart,
  AiOutlineSafety,
  AiOutlineAudit,
  AiOutlineHome,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { MdOutlineFamilyRestroom } from 'react-icons/md';
import { useSelector } from 'react-redux';
import RepresentativeList from './RepresentativeList';
import StudentList from './StudentList';
import TeacherList from './TeacherList';
import SideBar from './SideBar';
import UserList from './UserList';
import AccessDenied from '../../utils/AccessDenied';
import NotFound from '../../utils/NotFound';
import AttendanceLists from './AttendanceLists';
import StatisticsList from './StatisticsList';
import AdminList from './AdminList';
import AuditsLog from './AuditsLog';

// Componente DashboardCard
const DashboardCard = ({ icon: Icon, title, description, path, color }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  const colorSchemes = {
    blue: {
      bg: 'blue.50',
      border: 'blue.200',
      icon: 'blue.500',
      hover: 'blue.100',
    },
    green: {
      bg: 'green.50',
      border: 'green.200',
      icon: 'green.500',
      hover: 'green.100',
    },
    purple: {
      bg: 'purple.50',
      border: 'purple.200',
      icon: 'purple.500',
      hover: 'purple.100',
    },
    teal: {
      bg: 'teal.50',
      border: 'teal.200',
      icon: 'teal.500',
      hover: 'teal.100',
    },
    orange: {
      bg: 'orange.50',
      border: 'orange.200',
      icon: 'orange.500',
      hover: 'orange.100',
    },
    cyan: {
      bg: 'cyan.50',
      border: 'cyan.200',
      icon: 'cyan.500',
      hover: 'cyan.100',
    },
    red: { bg: 'red.50', border: 'red.200', icon: 'red.500', hover: 'red.100' },
    yellow: {
      bg: 'yellow.50',
      border: 'yellow.200',
      icon: 'yellow.500',
      hover: 'yellow.100',
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;

  return (
    <Card
      bg={scheme.bg}
      borderWidth="2px"
      borderColor={scheme.border}
      borderRadius="xl"
      cursor="pointer"
      onClick={() => navigate(path)}
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-6px)',
        boxShadow: 'xl',
        bg: scheme.hover,
        borderColor: color + '.400',
      }}
      position="relative"
      overflow="hidden"
    >
      <CardBody p={6}>
        <VStack align="start" spacing={4}>
          <HStack justify="space-between" w="full">
            <VStack align="start" spacing={2}>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                {title}
              </Text>
              <Text fontSize="md" color="gray.700" noOfLines={2}>
                {description}
              </Text>
            </VStack>
            <Icon as={Icon} boxSize={10} color={scheme.icon} />
          </HStack>
          <HStack mt={2}>
            <Button
              size="sm"
              colorScheme={color}
              variant="outline"
              rightIcon={<AiOutlineArrowRight />}
              onClick={e => {
                e.stopPropagation();
                navigate(path);
              }}
            >
              Acceder
            </Button>
            {isActive && (
              <Badge
                colorScheme={color}
                variant="solid"
                px={2}
                py={1}
                borderRadius="full"
              >
                Activo
              </Badge>
            )}
          </HStack>
        </VStack>
      </CardBody>
      {/* Decorative element */}
      <Box
        position="absolute"
        top={0}
        right={0}
        w="20px"
        h="20px"
        bg={color + '.400'}
        opacity={0.2}
        borderBottomLeftRadius="full"
      />
    </Card>
  );
};

const HomeDashboard = () => {
  const { user, loading } = useSelector(state => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const cardBg = useColorModeValue('white', 'gray.800');

  if (loading) {
    return (
      <Center h="100vh" bg={bgColor}>
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Center>
    );
  }

  if (!isSuperAdmin) {
    return <AccessDenied />;
  }

  const stats = [
    { label: 'Usuarios', value: 'Total', color: 'blue', icon: AiOutlineUser },
    {
      label: 'Estudiantes',
      value: 'Activos',
      color: 'green',
      icon: AiOutlineTeam,
    },
    {
      label: 'Profesores',
      value: 'Registrados',
      color: 'purple',
      icon: AiOutlineBook,
    },
    { label: 'Listas', value: 'Hoy', color: 'orange', icon: AiOutlineFileText },
  ];

  const menuItems = [
    {
      icon: AiOutlineUser,
      title: 'Usuarios',
      description: 'Gestionar usuarios del sistema',
      path: '/dashboard/users',
      color: 'blue',
    },
    {
      icon: AiOutlineTeam,
      title: 'Estudiantes',
      description: 'Administrar información de estudiantes',
      path: '/dashboard/students',
      color: 'green',
    },
    {
      icon: AiOutlineBook,
      title: 'Profesores',
      description: 'Control de profesores y materias',
      path: '/dashboard/teachers',
      color: 'purple',
    },
    {
      icon: MdOutlineFamilyRestroom,
      title: 'Representantes',
      description: 'Gestión de representantes familiares',
      path: '/dashboard/representatives',
      color: 'teal',
    },
    {
      icon: AiOutlineFileText,
      title: 'Listas de Asistencia',
      description: 'Generar y revisar asistencias',
      path: '/dashboard/lists',
      color: 'orange',
    },
    {
      icon: AiOutlineBarChart,
      title: 'Estadísticas',
      description: 'Reportes y análisis de datos',
      path: '/dashboard/stats',
      color: 'cyan',
    },
    {
      icon: AiOutlineSafety,
      title: 'Administración',
      description: 'Configuración del sistema',
      path: '/dashboard/admin',
      color: 'red',
    },
    {
      icon: AiOutlineAudit,
      title: 'Registros de Auditoría',
      description: 'Historial de actividades del sistema',
      path: '/dashboard/audits',
      color: 'yellow',
    },
  ];

  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      bg={bgColor}
      minH="100vh"
    >
      <SideBar />
      <Box flex="1" p={{ base: 4, md: 6, lg: 8 }}>
        <Container maxW="container.xl">
          <Routes>
            <Route
              index
              element={
                <Box>
                  {/* Header Section */}
                  <Box
                    bgGradient="linear(to-r, blue.400, blue.600)"
                    borderRadius="2xl"
                    p={{ base: 6, md: 8 }}
                    mb={8}
                    color="white"
                    boxShadow="xl"
                    position="relative"
                    overflow="hidden"
                  >
                    <Box
                      position="absolute"
                      top={-10}
                      right={-10}
                      w="100px"
                      h="100px"
                      bg="white"
                      opacity={0.1}
                      borderRadius="full"
                    />
                    <Stack
                      direction={{ base: 'column', md: 'row' }}
                      align={{ base: 'center', md: 'center' }}
                      justify="space-between"
                      spacing={6}
                    >
                      <HStack spacing={4}>
                        <Icon
                          as={AiOutlineControl}
                          boxSize={{ base: 10, md: 14 }}
                        />
                        <Box>
                          <Heading
                            size={{ base: 'lg', md: 'xl' }}
                            fontWeight="bold"
                          >
                            Panel de Control
                          </Heading>
                          <Text
                            fontSize={{ base: 'sm', md: 'md' }}
                            opacity={0.9}
                            mt={1}
                          >
                            Bienvenido, {user?.name || 'Administrador'}
                          </Text>
                        </Box>
                      </HStack>
                      <Badge
                        colorScheme="whiteAlpha"
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontSize="sm"
                      >
                        {new Date().toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Badge>
                    </Stack>
                  </Box>

                  {/* Quick Stats */}
                  <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
                    spacing={4}
                    mb={10}
                  >
                    {stats.map((stat, index) => (
                      <Card
                        key={index}
                        bg={cardBg}
                        borderWidth="1px"
                        borderColor={`${stat.color}.200`}
                        borderRadius="xl"
                        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                        transition="all 0.3s ease"
                        p={5}
                      >
                        <CardBody p={0}>
                          <HStack justify="space-between" align="center">
                            <VStack align="start" spacing={2}>
                              <Text
                                fontSize="sm"
                                color="gray.500"
                                fontWeight="medium"
                              >
                                {stat.label}
                              </Text>
                              <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color={`${stat.color}.600`}
                              >
                                {stat.value}
                              </Text>
                            </VStack>
                            <Icon
                              as={stat.icon}
                              boxSize={8}
                              color={`${stat.color}.500`}
                            />
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>

                  {/* Main Dashboard Cards */}
                  <Heading
                    size="md"
                    mb={6}
                    color={textColor}
                    fontWeight="semibold"
                  >
                    Acciones Rápidas
                  </Heading>
                  <SimpleGrid
                    columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
                    spacing={6}
                    mb={8}
                  >
                    {menuItems.map((item, index) => (
                      <DashboardCard
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        path={item.path}
                        color={item.color}
                      />
                    ))}
                  </SimpleGrid>

                  {/* Welcome Message */}
                  <Card
                    bg="blue.50"
                    borderRadius="xl"
                    p={6}
                    mt={8}
                    borderColor="blue.200"
                  >
                    <CardBody>
                      <Stack
                        direction="row"
                        align="center"
                        justify="center"
                        spacing={4}
                      >
                        <Icon
                          as={AiOutlineHome}
                          color="blue.500"
                          boxSize={10}
                        />
                        <Text
                          fontSize="lg"
                          color="blue.800"
                          textAlign="center"
                          fontWeight="medium"
                        >
                          Selecciona una tarjeta para acceder a la funcionalidad
                          deseada
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Box>
              }
            />
            <Route path="representatives" element={<RepresentativeList />} />
            <Route path="students" element={<StudentList />} />
            <Route path="teachers" element={<TeacherList />} />
            <Route path="users" element={<UserList />} />
            <Route path="lists" element={<AttendanceLists />} />
            <Route path="stats" element={<StatisticsList />} />
            <Route path="audits" element={<AuditsLog />} />
            <Route path="admin" element={<AdminList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
    </Flex>
  );
};

export default HomeDashboard;
