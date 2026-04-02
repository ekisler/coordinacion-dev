import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Flex, Heading, Text, Icon, SimpleGrid, Card, CardBody,
  VStack, HStack, Stat, StatLabel, StatNumber,
  Button, useColorModeValue, Divider, Badge
} from '@chakra-ui/react';
import {
  BarChart, Bar, Cell, PieChart, Pie, LineChart, Line, XAxis,
  YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer,
} from 'recharts';
import { MdBarChart, MdPeople, MdSchool, MdTimeline, MdFilterList } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { getStudents } from '../../store/actions/studentActions';
import { getTeachers } from '../../store/actions/teacherActions';
import { getRepresentative } from '../../store/actions/representativeActions';

const StatisticsList = () => {
  const dispatch = useDispatch();
  const { attendances = [] } = useSelector(state => state.attendances || {});
  const { students } = useSelector(state => state.students || {});
  const { teachers } = useSelector(state => state.teachers || {});
  const { representatives } = useSelector(state => state.representatives || {});
  
  const [viewMode, setViewMode] = useState('monthly');
  
  // Colores del tema
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const chartGridColor = useColorModeValue('#edf2f7', '#2d3748');

  useEffect(() => {
    if (!students?.length) dispatch(getStudents());
    if (!teachers?.length) dispatch(getTeachers());
    if (!representatives?.length) dispatch(getRepresentative());
  }, [dispatch, students, teachers, representatives]);

  // Procesamiento de datos optimizado con useMemo
  const stats = useMemo(() => {
    // 1. Distribución por Género
    const genderDist = [
      { name: 'Masculino', value: students?.filter(s => s.sex === 'Masculino').length || 0 },
      { name: 'Femenino', value: students?.filter(s => s.sex === 'Femenino').length || 0 },
    ];

    // 2. Distribución por Grado/Turno
    const gradeMap = {};
    students?.forEach(s => {
      const key = `${s?.grade}° ${s?.section}`;
      gradeMap[key] = (gradeMap[key] || 0) + 1;
    });
    const gradeData = Object.keys(gradeMap).map(key => ({ name: key, value: gradeMap[key] }));

    // 3. Asistencias
    const attendanceMap = {};
    attendances.forEach(record => {
      const date = new Date(record.date);
      if (!isNaN(date)) {
        const key = viewMode === 'monthly'
          ? date.toLocaleString('es-ES', { month: 'short' })
          : `Sem ${Math.ceil(date.getDate() / 7)}`;
        attendanceMap[key] = (attendanceMap[key] || 0) + 1;
      }
    });
    const attendanceData = Object.keys(attendanceMap).map(key => ({ name: key, count: attendanceMap[key] }));

    return { genderDist, gradeData, attendanceData };
  }, [students, attendances, viewMode]);

  return (
    <Box p={{ base: 4, md: 6 }}>
      {/* HEADER */}
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'stretch', md: 'center' }} mb={8} gap={4}>
        <VStack align="start" spacing={1}>
          <Heading size="lg" color={textColor} display="flex" alignItems="center" gap={3}>
            <Icon as={MdBarChart} color="teal.500" boxSize={8} />
            Estadísticas Institucionales
          </Heading>
          <Text color={mutedColor} fontSize="sm">Análisis detallado de población y rendimiento</Text>
        </VStack>
        <Badge colorScheme="teal" variant="subtle" p={2} borderRadius="md">
          Datos en Tiempo Real
        </Badge>
      </Flex>

      {/* KPI CARDS SUPERIORES */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <StatCard title="Estudiantes" count={students?.length || 0} icon={MdSchool} color="blue.500" />
        <StatCard title="Profesores" count={teachers?.length || 0} icon={GiTeacher} color="purple.500" />
        <StatCard title="Representantes" count={representatives?.length || 0} icon={MdPeople} color="orange.500" />
      </SimpleGrid>

      {/* GRÁFICOS PRINCIPALES */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
        
        {/* Gráfico de Asistencia (Línea) */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" boxShadow="sm">
          <CardBody>
            <Flex justify="space-between" align="center" mb={6}>
              <HStack>
                <Icon as={MdTimeline} color="red.400" boxSize={5} />
                <Heading size="md" color={textColor}>Tendencia de Asistencia</Heading>
              </HStack>
              <Button 
                size="xs" 
                leftIcon={<MdFilterList />} 
                onClick={() => setViewMode(viewMode === 'monthly' ? 'weekly' : 'monthly')}
                colorScheme="teal"
                variant="ghost"
              >
                {viewMode === 'monthly' ? 'Mensual' : 'Semanal'}
              </Button>
            </Flex>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                  <XAxis dataKey="name" fontSize={12} tickMargin={10} />
                  <YAxis fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="count" stroke="#E53E3E" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* Gráfico de Grados (Barras) */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" boxShadow="sm">
          <CardBody>
            <HStack mb={6}>
              <Icon as={MdSchool} color="green.400" boxSize={5} />
              <Heading size="md" color={textColor}>Alumnos por Grado</Heading>
            </HStack>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.gradeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                  <XAxis dataKey="name" fontSize={10} interval={0} />
                  <YAxis fontSize={12} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" fill="#48BB78" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* Distribución por Género (Donut) */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" boxShadow="sm">
          <CardBody>
            <Heading size="md" mb={4} textAlign="center" color={textColor}>Distribución por Género</Heading>
            <Box h="250px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.genderDist}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#3182CE" /> {/* Masculino */}
                    <Cell fill="#D53F8C" /> {/* Femenino */}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Divider my={4} />
            <HStack justify="center" spacing={10}>
              <VStack spacing={0}>
                <Text fontSize="xs" color={mutedColor}>VARONES</Text>
                <Text fontSize="lg" fontWeight="bold" color="blue.500">{stats.genderDist[0].value}</Text>
              </VStack>
              <VStack spacing={0}>
                <Text fontSize="xs" color={mutedColor}>HEMBRAS</Text>
                <Text fontSize="lg" fontWeight="bold" color="pink.500">{stats.genderDist[1].value}</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Card Informativo Extra */}
        <Card bg="teal.500" color="white" borderRadius="xl" boxShadow="lg">
          <CardBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
            <Icon as={MdPeople} boxSize={12} mb={4} opacity={0.8} />
            <Heading size="md" mb={2}>Comunidad Educativa</Heading>
            <Text fontSize="sm" mb={4}>
              Actualmente contamos con una población activa de <b>{students?.length + teachers?.length}</b> integrantes entre docentes y alumnos.
            </Text>
            <Button size="sm" variant="outline" color="white" _hover={{bg: "teal.600"}}>
              Descargar Reporte PDF
            </Button>
          </CardBody>
        </Card>

      </SimpleGrid>
    </Box>
  );
};

// Componente reutilizable para los KPI
const StatCard = ({ title, count, icon, color }) => (
  <Card borderWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.600')} boxShadow="sm">
    <CardBody>
      <Flex align="center" justify="space-between">
        <Stat>
          <StatLabel color="gray.500" fontWeight="bold" fontSize="sm">{title}</StatLabel>
          <StatNumber color={color} fontSize="3xl">{count}</StatNumber>
        </Stat>
        <Box p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
          <Icon as={icon} boxSize={6} color={color} />
        </Box>
      </Flex>
    </CardBody>
  </Card>
);

export default StatisticsList;