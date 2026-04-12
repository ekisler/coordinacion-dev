import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import {
  MdSearch,
  MdEdit,
  MdPerson,
  MdPhone,
  MdArrowUpward,
  MdArrowDownward,
  MdFilterList,
} from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import {
  getTeachers,
  updateTeachers,
} from "../../store/actions/teacherActions.js";
import AccessDenied from "../../utils/AccessDenied.jsx";
import ShowErrorAlert from "../../utils/ShowErrorAlert.js";


  const SortIcon = ({ column, sortConfig }) => {
    if (!sortConfig || sortConfig.key !== column) return null;
    return sortConfig.direction === "asc" ? (
      <MdArrowUpward />
    ) : (
      <MdArrowDownward />
    );
  };


const Teachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const { teachers, loading, error } = useSelector((state) => state.teachers);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Paleta de colores coherente con los otros componentes
  const bgColor = useColorModeValue("blue.50", "blue.900");
  const filteredColor = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const mutedColor = useColorModeValue("gray.500", "gray.400");

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  // 1. Limpiamos la base: Solo los que son realmente profesores
  const teachersOnly = useMemo(() => {
    return teachers?.filter((t) => t?.userId?.roles?.isTeacher !== false) || [];
  }, [teachers]);

  // 2. Aplicamos Búsqueda, Filtro de Estado y ORDENAMIENTO en un solo paso
  const filteredAndSortedTeachers = useMemo(() => {
    // Empezamos con la lista de profesores reales
    let result = [...teachersOnly];

    // --- FILTRO POR BÚSQUEDA ---
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t?.teacherLastName?.toLowerCase()?.includes(query) ||
          t?.teacherName?.toLowerCase()?.includes(query) ||
          t?.phone?.toLowerCase()?.includes(query),
      );
    }

    // --- FILTRO POR ESTADO (Activo/Inactivo) ---
    if (statusFilter !== "all") {
      result = result.filter((t) =>
        statusFilter === "active" ? !t?.isDisabled : t?.isDisabled,
      );
    }

    // --- LÓGICA DE ORDENAMIENTO (Sort) ---
    if (sortConfig.key) {
      result.sort((a, b) => {
        // Obtenemos el valor de la propiedad, manejando nulos
        const valA = a[sortConfig.key] ?? "";
        const valB = b[sortConfig.key] ?? "";

        if (typeof valA === "string") {
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [teachersOnly, searchQuery, statusFilter, sortConfig]);

  // 3. Los contadores ahora son precisos
  const totalTeachers = teachersOnly.length;
  const activeTeachersCount = teachersOnly.filter((t) => !t?.isDisabled).length;
  const disabledTeachersCount = totalTeachers - activeTeachersCount;

  // Lógica de ordenamiento original mejorada visualmente
  const handleSort = (field) => {
    let direction = "asc";
    if (sortConfig.key === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: field, direction });
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    const updateStatus = { isDisabled: !currentStatus };
    try {
      await dispatch(updateTeachers(id, updateStatus));
      dispatch(getTeachers());
    } catch (error) {
      console.error("Error al actualizar el estado del profesor:", error);
    }
  };

  if (!isSuperAdmin) return <AccessDenied />;
  if (error) return <ShowErrorAlert error={error} />;

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
          <Card>
            <CardBody>
              <SkeletonText noOfLines={8} spacing="4" />
            </CardBody>
          </Card>
        </VStack>
      ) : (
        <>
          {/* HEADER */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "stretch", md: "center" }}
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
                <Icon as={GiTeacher} color="teal.500" boxSize={8} />
                Profesores
              </Heading>
              <Text color={mutedColor} fontSize="sm">
                Panel de gestión del cuerpo docente
              </Text>
            </VStack>

            <HStack spacing={3} flexWrap="wrap">
              <InputGroup maxW="300px">
                <InputLeftElement pointerEvents="none">
                  <Icon as={MdSearch} color={mutedColor} />
                </InputLeftElement>
                <Input
                  placeholder="Buscar profesor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  borderRadius="full"
                  size="sm"
                  bg={cardBg}
                />
              </InputGroup>

              <Button
                leftIcon={<MdFilterList />}
                size="sm"
                variant="outline"
                colorScheme="teal"
                onClick={() =>
                  setStatusFilter(
                    statusFilter === "all"
                      ? "active"
                      : statusFilter === "active"
                        ? "disabled"
                        : "all",
                  )
                }
              >
                {statusFilter === "all"
                  ? "Todos"
                  : statusFilter === "active"
                    ? "Activos"
                    : "Inactivos"}
              </Button>

              <Button
                leftIcon={<MdPerson />}
                colorScheme="teal"
                size="sm"
                onClick={() => navigate("/postTeacher")}
              >
                Nuevo Profesor
              </Button>
            </HStack>
          </Flex>

          {/* STATS CARDS */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
            <StatCard
              title="Total Profesores"
              count={totalTeachers}
              help="Plantel actual"
              color="teal.500"
            />
            <StatCard
              title="Activos"
              count={activeTeachersCount}
              help="En servicio"
              color="green.500"
              arrow="increase"
            />
            <StatCard
              title="Inactivos"
              count={disabledTeachersCount}
              help="Licencia/Baja"
              color="red.500"
              arrow="decrease"
            />
          </SimpleGrid>

          {/* TABLA DE PROFESORES */}
          <Card
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="sm"
          >
            <CardBody p={0}>
              {filteredAndSortedTeachers?.length > 0 ? (
                <TableContainer>
                  <Table variant="simple">
                    <Thead bg={bgColor}>
                      <Tr>
                        <Th
                          cursor="pointer"
                          onClick={() => handleSort("teacherLastName")}
                          color={textColor}
                          py={4}
                        >
                          <HStack spacing={2}>
                            <Text>Apellido</Text>
                            <SortIcon column="teacherLastName" sortConfig={sortConfig} />
                          </HStack>
                        </Th>
                        <Th
                          cursor="pointer"
                          onClick={() => handleSort("teacherName")}
                          color={textColor}
                        >
                          <HStack spacing={2}>
                            <Text>Nombre</Text>
                            <SortIcon column="teacherName" sortConfig={sortConfig} />
                          </HStack>
                        </Th>
                        <Th
                          display={{ base: "none", md: "table-cell" }}
                          color={textColor}
                        >
                          <HStack spacing={2}>
                            <Icon as={MdPhone} />
                            <Text>Teléfono</Text>
                          </HStack>
                        </Th>
                        <Th color={textColor}>Estado</Th>
                        <Th color={textColor} textAlign="center">
                          Acciones
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredAndSortedTeachers.map((teacher) => (
                        <Tr
                          key={teacher?._id}
                          _hover={{ bg: filteredColor }}
                          transition="0.2s"
                        >
                          <Td
                            fontSize="sm"
                            fontWeight="medium"
                            color={teacher?.isDisabled ? "gray.400" : textColor}
                          >
                            {teacher?.teacherLastName}
                          </Td>
                          <Td fontSize="sm">
                            <HStack spacing={2}>
                              <Text
                                color={
                                  teacher?.isDisabled ? "gray.400" : textColor
                                }
                              >
                                {teacher?.teacherName}
                              </Text>
                            </HStack>
                          </Td>
                          <Td
                            display={{ base: "none", md: "table-cell" }}
                            fontSize="sm"
                            color={mutedColor}
                          >
                            {teacher?.phone || "Sin teléfono"}
                          </Td>
                          <Td>
                            <Checkbox
                              size="lg"
                              colorScheme="green"
                              isChecked={!teacher?.isDisabled}
                              onChange={() =>
                                handleCheckboxChange(
                                  teacher._id,
                                  teacher?.isDisabled,
                                )
                              }
                            />
                          </Td>
                          <Td textAlign="center">
                            <Button
                              as={NavLink}
                              to={`/updateTeacher/${teacher?._id}`}
                              size="sm"
                              variant="ghost"
                              colorScheme="teal"
                              leftIcon={<MdEdit />}
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
                  <Text color={mutedColor}>
                    No se encontraron profesores registrados
                  </Text>
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
  <Card
    borderWidth="1px"
    borderColor={useColorModeValue("gray.200", "gray.600")}
  >
    <CardBody>
      <Stat>
        <StatLabel color="gray.500">{title}</StatLabel>
        <StatNumber color={color} fontSize="2xl">
          {count}
        </StatNumber>
        <StatHelpText>
          {arrow && <StatArrow type={arrow} />}
          {help}
        </StatHelpText>
      </Stat>
    </CardBody>
  </Card>
);

export default Teachers;
