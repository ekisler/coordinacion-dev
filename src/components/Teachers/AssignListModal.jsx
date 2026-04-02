import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Text,
  Box,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignAttendanceList } from '../../store/actions/teacherActions';
import { getAttendances } from '../../store/actions/attendanceActions';
import { selectGroupedStudents } from '../../store/selectors';
import { getStudents } from '../../store/actions/studentActions';
import AccessDenied from '../../utils/AccessDenied';

const AssignListModal = ({ isOpen, onClose, teacher }) => {
  const { user } = useSelector(state => state.auth);
    const isAdmin = user?.roles?.isAdmin;
    const isDisabled = user?.roles?.isDisabled;
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();

  const groupedStudents = useSelector(selectGroupedStudents);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getAttendances());
  }, [dispatch]);

  const uniqueGradeSections = groupedStudents
    ? Object.keys(groupedStudents).reduce((acc, key) => {
        const [grade, section, schedule] = key.split('-');
        if (grade && section && schedule) {
          acc[key] = { grade, section, schedule };
        }
        return acc;
      }, {})
    : {};

  const uniqueGrades = [
    ...new Set(Object.values(uniqueGradeSections).map(item => item.grade)),
  ].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  const availableSections = [
    ...new Set(
      Object.values(uniqueGradeSections)
        .filter(item => item.grade === selectedGrade)
        .map(item => item.section)
    ),
  ].sort();  

  const availableSchedules = Object.values(uniqueGradeSections)
    .filter(
      item => item.grade === selectedGrade && item.section === selectedSection
    )
    .map(item => item.schedule)
    .sort();

  const handleAssign = async () => {
    if (!selectedGrade || !selectedSection || !selectedSchedule) {
      toast({
        title: 'Campos incompletos',
        description: 'Selecciona un grado y una sección.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    try {
      await dispatch(
        assignAttendanceList(
          teacher?.userId?._id,
          selectedGrade,
          selectedSection,
          selectedSchedule
        )
      );
      toast({
        title: 'Lista asignada',
        description: `Lista de ${selectedGrade} - ${selectedSection} - ${selectedSchedule} asignada correctamente.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.message || 'No se pudo asignar la lista.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  if (!isAdmin || isDisabled) {
    return <AccessDenied />;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={12}>Asignar Lista de Asistencia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={3} fontSize={12}>
            Profesor(a):{' '}
            <Text fontWeight={'bold'}>
              {teacher?.teacherLastName} {teacher?.teacherName}
            </Text>
          </Box>

          <Select
            name="selectGrade"
            placeholder="Selecciona un grado"
            value={selectedGrade}
            onChange={e => {
              setSelectedGrade(e.target.value);
              setSelectedSection('');
            }}
          >
            {uniqueGrades.map(grade => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </Select>

          <Select
            name="selectSection"
            placeholder="Selecciona una sección"
            mt={4}
            value={selectedSection}
            onChange={e => {
              setSelectedSection(e.target.value);
              setSelectedSchedule('');
            }}
            isDisabled={!selectedGrade}
          >
            {availableSections.map(section => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </Select>

          <Select
            name="selectSchedule"
            placeholder="Selecciona un turno"
            mt={4}
            value={selectedSchedule}
            onChange={e => setSelectedSchedule(e.target.value)}
            isDisabled={!selectedSection}
          >
            {availableSchedules.map(schedule => (
              <option key={schedule} value={schedule}>
                {schedule}
              </option>
            ))}
          </Select>

          <Button
            colorScheme="green"
            mt={4}
            onClick={handleAssign}
            w={'100%'}
            isDisabled={!selectedGrade || !selectedSection}
          >
            Asignar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AssignListModal;
