import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WeekDays from '../../utils/WeekDays';
import { startOfWeek, format, addDays } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Heading,
  Stack,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  IconButton,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  selectAttendanceLists,
  selectAttendances,
} from '../../store/selectors';
import { postAttendance } from '../../store/actions/attendanceActions';
import { getAttendances } from '../../store/actions/attendanceActions';
import { getAttendanceListsById } from '../../store/actions/teacherActions';
import { PlusSquareIcon } from '@chakra-ui/icons';
import generateWeekData from '../../utils/generateWeeksData';
import AccessDenied from '../../utils/AccessDenied';
import { IoListSharp } from 'react-icons/io5';
import { SkeletonTDashboard } from '../../utils/Skeleton';

const AssignedAttendanceLists = () => {
  const dispatch = useDispatch();
  const attendances = useSelector(selectAttendanceLists);
  const loading = useSelector(state => state?.attendances?.loading);
  const attendance = useSelector(selectAttendances);
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isTeacher = user?.roles?.isTeacher;
  const isDisabled = user?.roles?.isDisabled;
  const userId = user?.userId;
  const [weeks, setWeeks] = useState([]);
  const [localLoading, setLocalLoading] = useState(true)
  const toast = useToast();
  const bgColor = useColorModeValue('blue.900', 'blue.50');

  useEffect(() => {
    const fetchData = async () => {
      setLocalLoading(true)
      try {
        await dispatch(getAttendanceListsById(userId));
        await dispatch(getAttendances());
      } catch (error) {
        toast({
          title: 'Error al cargar datos',
          description:
            error.message || 'No se pudieron cargar las asistencias.',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        setLocalLoading(false)
      }
    };

    fetchData();
  }, [dispatch, toast, userId]);

  useEffect(() => {
    const calculateWeeks = () => {
      const weekData = generateWeekData();

      const currentWeek = {
        startOfWeekDate: weekData[0].date, // Primer día de la semana (lunes)
        days: weekData,
      };

      setWeeks([currentWeek]);
    };

    calculateWeeks();
  }, []);

  if (loading || localLoading) {
    return <SkeletonTDashboard />;
  }

  if (!(isAdmin || (isDisabled && !isTeacher))) {
    return <AccessDenied />;
  }

  const handleAttendanceChange = async (
    studentId,
    weekIndex,
    dayIndex,
    isChecked
  ) => {
    const nowCaracas = new Date();
    const currentCaracasWeekStart = startOfWeek(nowCaracas, {
      weekStartsOn: 1,
    });

    // Obtener el día real de la semana basado en el índice
    const targetDay = addDays(currentCaracasWeekStart, dayIndex);

    const updatedAttendance = {
      studentId,
      week: weekIndex + 1,
      day: format(targetDay, 'EEEE', { locale: enUS }),
      status: isChecked,
      locked: true,
      date: targetDay.toISOString(),
    };

    try {
      await dispatch(postAttendance(updatedAttendance));
      dispatch(getAttendances());
      toast({
        description: '¡Asistencia actualizada!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: '¡Error!',
        description:
          error.message || 'Hubo un error al registrar la asistencia.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  if (!attendances || attendances.length === 0) {
    return <Text>No hay listas de asistencia disponibles.</Text>;
  }

  const today = new Date();
  const formattedDate = format(today, 'EEEE dd/MM/yyyy', { locale: es });

  const sortedAttendances = [...attendances].sort((a, b) => {
    const gradeA = parseInt(a.grade, 10);
    const gradeB = parseInt(b.grade, 10);

    if (gradeA !== gradeB) {
      return gradeA - gradeB;
    }

    return a.section.localeCompare(b.section, 'es', { numeric: true });
  });

  return (
    <Box>
      <Flex justify={'center'}>
        <Heading size={'lg'} mt={12} color={bgColor} p={4}>
          <Stack direction="row" align="center" justify="center">
            <IoListSharp />
            <Text>Listas Asignadas</Text>
          </Stack>
        </Heading>
      </Flex>
      <Box display={'flex'} justifyContent={'center'} p={2}>
        Profesor(a):&nbsp;
        <Text fontWeight={'bold'}>
          {user?.lastname} {user?.name}
        </Text>
      </Box>

      <Flex justify="end" mr={12} mb={4}>
        {' '}
        <Text fontSize="xs" fontWeight="bold">
          {formattedDate}
        </Text>
      </Flex>
      {sortedAttendances.map(list => {
        return (
          <Box
            key={list._id}
            p={5}
            boxShadow="md"
            borderRadius="lg"
            mb={6}
            mr={2}
            ml={2}
            borderWidth={1}
            borderColor="gray.200"
          >
            <Heading size="md" mb={4}>
              {list.grade} {list.section} || Turno: {list.schedule}
            </Heading>
            <Box display="flex" justifyContent="flex-end" mb={4}>
              <IconButton icon={<PlusSquareIcon />} colorScheme="yellow" />
            </Box>
            <Box overflowX="auto">
              <Table
                variant="simple"
                size="sm"
                maxW={'100%'}
                overflowX={'auto'}
              >
                <Thead>
                  <Tr>
                    <Th>Alumno</Th>
                    <WeekDays weeks={weeks} />
                    <Th minW="150px" maxW="200px" textAlign="center">
                      Observaciones
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {list.students.map((student, index) => {
                    // Filtramos las asistencias del estudiante actual
                    const studentAttendances = attendance.filter(
                      att => String(att.studentId._id) === String(student._id)
                    );

                    return (
                      <Tr key={student?._id}>
                        {/* Nombre del estudiante */}
                        <Td w={300} borderRight={'1px solid gray'}>
                          {index + 1}
                          {') '}
                          {`${student?.studentLastName} ${student?.studentName}`}
                        </Td>

                        {/* Iteramos por cada semana y día */}
                        {weeks.map((week, weekIndex) =>
                          week.days.map((dayObj, dayIndex) => {
                            const targetDate = new Date(dayObj.date);
                            targetDate.setHours(0, 0, 0, 0);
                            // Buscamos si el estudiante tiene asistencia marcada para este día específico
                            const attendanceRecord = studentAttendances.find(
                              att => {
                                const attendanceDate = new Date(att.date)
                                  .toISOString()
                                  .split('T')[0];
                                const targetDateNormalized = new Date(
                                  targetDate
                                )
                                  .toISOString()
                                  .split('T')[0];

                                return attendanceDate === targetDateNormalized;
                              }
                            );
                            const isMarked = Boolean(attendanceRecord);
                            const isLocked = Boolean(
                              attendanceRecord && attendanceRecord.locked
                            );

                            return (
                              <Td
                                borderRight={'1px solid gray'}
                                key={`${student?._id}-${weekIndex}-${dayIndex}`}
                                textAlign="center"
                              >
                                <Button
                                  h={4}
                                  w={4}
                                  size="icon"
                                  variant={isMarked ? 'solid' : 'outline'}
                                  colorScheme={isMarked ? 'green' : 'gray'}
                                  onClick={() =>
                                    handleAttendanceChange(
                                      student._id,
                                      weekIndex,
                                      dayIndex,
                                      !isMarked
                                    )
                                  }
                                  isDisabled={isDisabled || isLocked}
                                >
                                  {isMarked ? '✓' : ''}
                                </Button>
                              </Td>
                            );
                          })
                        )}

                        {/* Observaciones */}
                        <Td minW="150px" maxW="200px" overflow="hidden">
                          <Input
                            name="observation"
                            size="xs"
                            h={6}
                            flex="1"
                            minW="100px"
                            maxW="200px"
                            placeholder="Observaciones"
                          />
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AssignedAttendanceLists;
