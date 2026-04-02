import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Text, Heading, Icon, Table, Tbody, Tr, Td, Thead, Th, Tabs, TabList,
  Tab, TabPanels, TabPanel, useColorModeValue, TableContainer, Flex, VStack,
  HStack, SimpleGrid, Card, CardBody, Stat, StatLabel, StatNumber, StatHelpText,
  Badge
} from '@chakra-ui/react';
import { IoListSharp } from 'react-icons/io5';
import { MdSchool, MdCalendarToday, MdGroups } from 'react-icons/md';
import { getAttendances } from '../../store/actions/attendanceActions';
import { selectAttendances } from '../../store/selectors';
import AccessDenied from '../../utils/AccessDenied';

const AttendanceLists = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const attendanceLists = useSelector(selectAttendances);
  const isSuperAdmin = user?.roles?.isSuperAdmin;

  // Colores consistentes con la nueva interfaz
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const sorterColor= useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    if (isSuperAdmin) {
      dispatch(getAttendances());
    }
  }, [dispatch, isSuperAdmin]);

  // Agrupar y ordenar datos (Tu lógica original optimizada con useMemo)
  const sortedGroupedArray = useMemo(() => {
    if (!attendanceLists || attendanceLists.length === 0) return [];

    const grouped = attendanceLists.reduce((acc, attendance) => {
      const { grade, section, schedule } = attendance.studentId;
      const key = `${grade}-${section}-${schedule}`;
      if (!acc[key]) {
        acc[key] = { grade, section, schedule, data: [] };
      }
      acc[key].data.push(attendance);
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => {
      const gradeCompare = parseInt(a.grade) - parseInt(b.grade);
      if (gradeCompare !== 0) return gradeCompare;
      const sectionCompare = a.section.localeCompare(b.section);
      if (sectionCompare !== 0) return sectionCompare;
      return a.schedule === 'mañana' ? -1 : 1;
    });
  }, [attendanceLists]);

  if (!isSuperAdmin) return <AccessDenied />;

  if (!attendanceLists || attendanceLists.length === 0) {
    return (
      <Flex direction="column" align="center" justify="center" py={20}>
        <Icon as={IoListSharp} boxSize={16} color="gray.300" mb={4} />
        <Text color={mutedColor} fontSize="lg">No hay listas de asistencia disponibles.</Text>
      </Flex>
    );
  }

  // Stats Globales para coherencia visual
  const totalRecords = attendanceLists.length;
  const totalClasses = sortedGroupedArray.length;

  return (
    <Box p={{ base: 4, md: 6 }}>
      {/* HEADER */}
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'stretch', md: 'center' }} mb={8} gap={4}>
        <VStack align="start" spacing={1}>
          <Heading size="lg" color={textColor} display="flex" alignItems="center" gap={3}>
            <Icon as={IoListSharp} color="teal.500" boxSize={8} />
            Listas de Asistencias
          </Heading>
          <Text color={mutedColor} fontSize="sm">Resumen consolidado por grado y sección</Text>
        </VStack>
      </Flex>

      {/* STATS CARDS */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
        <StatCard title="Total Registros" count={totalRecords} icon={MdCalendarToday} color="teal.500" help="Entradas de asistencia" />
        <StatCard title="Grupos/Divisiones" count={totalClasses} icon={MdSchool} color="blue.500" help="Secciones activas" />
      </SimpleGrid>

      {/* TABS DE ASISTENCIA */}
      <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="hidden" boxShadow="sm">
        <Tabs variant="enclosed" colorScheme="teal" isLazy>
          <TabList bg={'sorterColor'} p={2} borderBottomWidth="1px" overflowX="auto" overflowY="hidden">
            {sortedGroupedArray.map(group => (
              <Tab
                key={group.grade + group.section + group.schedule}
                fontSize="xs"
                fontWeight="bold"
                borderRadius="lg"
                _selected={{ bg: 'white', color: 'teal.600', boxShadow: 'sm' }}
                mr={2}
              >
                {group.grade}° "{group.section}" {group.schedule.charAt(0).toUpperCase()}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {sortedGroupedArray.map(group => (
              <TabPanel key={group.grade + group.section + group.schedule} p={0}>
                <Box p={6}>
                  <HStack justify="space-between" mb={6}>
                    <VStack align="start" spacing={0}>
                      <Heading size="md" color={textColor}>
                        Grado: {group.grade} "{group.section}"
                      </Heading>
                      <Badge colorScheme="teal" variant="subtle" borderRadius="full" px={3}>
                        Turno {group.schedule}
                      </Badge>
                    </VStack>
                    <Icon as={MdGroups} boxSize={8} color="teal.100" />
                  </HStack>

                  <TableContainer borderWidth="1px" borderRadius="lg">
                    <Table variant="simple" size="md">
                      <Thead bg={bgColor}>
                        <Tr>
                          <Th color={textColor} width="80px">Nro.</Th>
                          <Th color={textColor}>Alumno</Th>
                          <Th color={textColor} textAlign="center">Asistencias Totales</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {group.data
                          .reduce((acc, attendance) => {
                            const student = attendance.studentId;
                            const existingStudent = acc.find(item => item.studentId._id === student._id);
                            if (existingStudent) {
                              existingStudent.attendanceCount += attendance.status ? 1 : 0;
                            } else {
                              acc.push({ studentId: student, attendanceCount: attendance.status ? 1 : 0 });
                            }
                            return acc;
                          }, [])
                          .map((studentAttendance, index) => {
                            const { studentId, attendanceCount } = studentAttendance;
                            return (
                              <Tr key={studentId._id} _hover={sorterColor} transition="0.2s">
                                <Td fontSize="sm" fontWeight="bold" color="teal.500">{index + 1}</Td>
                                <Td fontSize="sm" fontWeight="medium">
                                  {`${studentId.studentLastName}, ${studentId.studentName}`}
                                </Td>
                                <Td fontSize="sm" textAlign="center">
                                  <Badge colorScheme="green" variant="solid" borderRadius="md" px={3}>
                                    {attendanceCount}
                                  </Badge>
                                </Td>
                              </Tr>
                            );
                          })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Card>
    </Box>
  );
};

// Componente de StatCard adaptado para este panel
const StatCard = ({ title, count, icon, color, help }) => (
  <Card borderWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.600')} boxShadow="sm">
    <CardBody>
      <Flex align="center" justify="space-between">
        <Stat>
          <StatLabel color="gray.500" fontWeight="bold">{title}</StatLabel>
          <StatNumber color={color} fontSize="3xl">{count}</StatNumber>
          <StatHelpText>{help}</StatHelpText>
        </Stat>
        <Icon as={icon} boxSize={10} color={color} opacity={0.2} />
      </Flex>
    </CardBody>
  </Card>
);

export default AttendanceLists;