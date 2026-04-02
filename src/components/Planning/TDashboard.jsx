import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAssignmentsByTeacher } from '../../store/actions/planningActions';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  CardBody,
  CardHeader,
  Box,
  Flex,
  Heading,
  Input,
  Stack,
  Table,
  Text,
  Tabs,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
} from '@chakra-ui/react';
import { TbCalendar } from 'react-icons/tb';
import AccessDenied from '../../utils/AccessDenied';
import { getAttendanceListsById } from '../../store/actions/teacherActions';
import { SkeletonTDashboard } from '../../utils/Skeleton';

const TDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const isTeacher = user?.roles?.isTeacher;
  const assignments = useSelector(state => state?.assignments?.assignments);
  const loading = useSelector(state => state?.assignments?.loading);
  const error = useSelector(state => state?.assignments?.error);
  const userId = user?.userId;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        if (userId) {
          await dispatch(getAssignmentsByTeacher(userId));
          dispatch(getAttendanceListsById(userId));
        }
      } catch (err) {}
    };

    fetchAssignments();
  }, [dispatch, userId]);

  if (!(isAdmin || (isDisabled && !isTeacher))) {
    return <AccessDenied />;
  }

  if (loading) return <SkeletonTDashboard />;

  if (error) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        height="100vh"
        backgroundColor="rgba(0, 0, 0, 0.5)"
      >
        <Text
          color="red.500"
          fontSize="xl"
          fontWeight="bold"
          textAlign="center"
        >
          {error}, debe culminar su registro, contácte a coordinación.
        </Text>
      </Flex>
    );
  }

  if (!assignments || assignments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <Heading>Estado de Asignaciones</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            No se han encontrado asignaciones para este profesor. Por favor,
            contacte a coordinación para su asignación.
          </Text>
        </CardBody>
      </Card>
    );
  }

  const uniqueSubjects = [];
  if (assignments && Array.isArray(assignments)) {
    uniqueSubjects.push(
      ...assignments.flatMap(plan =>
        plan?.planningId?.subjects?.map(subject => subject.title)
      )
    );
  }

  const filteredAssignments = Array.isArray(assignments)
    ? assignments.filter(plan =>
        plan?.planningId?.subjects?.some(subject =>
          subject.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  return (
    <Tabs variant="enclosed" isLazy>
      <VStack spacing={4} p={5} align="stretch">
        <Heading align="center" mt={12}>
          <Stack direction="row" align="center" justify="center">
            <TbCalendar />
            <Text>Planificación Asignada</Text>
          </Stack>
        </Heading>
        <Accordion allowToggle>
          <AccordionItem
            border="1px solid"
            borderColor="gray.300"
            borderRadius="lg"
            shadow="md"
          >
            <h2>
              <AccordionButton p={4}>
                <Text
                  flex="1"
                  textAlign="center"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  Indicadores según el grado
                </Text>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p={4}>
              <Card
                border="1px solid"
                borderColor="gray.300"
                borderRadius="lg"
                shadow="md"
              >
                <CardBody>
                  <TableContainer overflowX="auto">
                    <Table variant="striped" colorScheme="gray" size="md">
                      <Thead>
                        <Tr>
                          <Th textAlign="center">1°</Th>
                          <Th textAlign="center">2°</Th>
                          <Th textAlign="center">3°</Th>
                          <Th textAlign="center">4°</Th>
                          <Th textAlign="center">5°</Th>
                          <Th textAlign="center">6°</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {[
                          [
                            'Identificar',
                            'Identificar',
                            'Ejecutar',
                            'Ejecutar',
                            'Identificar',
                            'Comprender',
                          ],
                          [
                            'Ubicar',
                            'Reconocer',
                            'Realizar',
                            'Identificar',
                            'Ejecutar',
                            'Analizar',
                          ],
                          [
                            'Demostrar',
                            'Realizar',
                            'Identificar',
                            'Analizar',
                            'Reconocer',
                            'Reconocer',
                          ],
                          [
                            'Ejecutar',
                            'Aplicar',
                            'Reconocer',
                            'Reconocer',
                            'Analizar',
                            'Realizar',
                          ],
                          ['Utilizar', '', '', '', 'Idear', ''],
                        ].map((row, i) => (
                          <Tr key={i}>
                            {row.map((cell, j) => (
                              <Td
                                key={j}
                                textAlign="center"
                                whiteSpace="nowrap"
                              >
                                {cell}
                              </Td>
                            ))}
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </CardBody>
              </Card>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Input
          name="searchTerm"
          placeholder="Buscar asignatura..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          mb={4}
          w={500}
        />
        {uniqueSubjects.length > 0 && (
          <Box p={4} borderRadius="md" boxShadow="sm" mb={4}>
            <Heading size="sm" mb={2}>
              Materias asignadas:
            </Heading>
            <Text>{uniqueSubjects.join(' | ')}</Text>
          </Box>
        )}

        {/* Mostrar asignaturas filtradas */}
        {filteredAssignments.length === 0 ? (
          <Text>
            No tienes planificaciones asignadas o no se encontraron
            coincidencias.
          </Text>
        ) : (
          filteredAssignments.map(plan => (
            <Box key={plan._id} p={4} boxShadow="md">
              <Heading size="md" mb={4}>
                Grado: {plan?.planningId?.grade}°
              </Heading>
              {plan?.planningId?.subjects?.map((subject, index) => (
                <Box key={index} mb={6}>
                  <Heading size="sm" mb={2}>
                    {subject.title}
                  </Heading>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th width="30%">Concepto</Th>
                        <Th width="30%">Procedimiento</Th>
                        <Th width="40%">Actitudinal</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {subject.topics.map(topic => (
                        <Tr key={topic._id}>
                          <Td>{topic.Concepto}</Td>
                          <Td>{topic.Procedimiento}</Td>
                          <Td>{topic.Actitudinal}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              ))}
            </Box>
          ))
        )}
      </VStack>
    </Tabs>
  );
};

export default TDashboard;
