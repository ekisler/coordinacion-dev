import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import {
  assignPlanningToTeacher,
  getPlannings,
} from '../../store/actions/planningActions';
import AccessDenied from '../../utils/AccessDenied';

const AssignPlanningModal = ({ isOpen, onClose, teacher }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const { plannings } = useSelector(state => state.plannings);
  const [selectedPlanning, setSelectedPlanning] = useState('');

  const toast = useToast();

  useEffect(() => {
    dispatch(getPlannings());
  }, [dispatch]);

  const handleAssign = async () => {
    if (!selectedPlanning) return;
    try {
      await dispatch(assignPlanningToTeacher(selectedPlanning, teacher.userId));

      toast({
        title: 'Planificación asignada',
        description: 'La planificación se ha asignado correctamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      onClose();
    } catch (error) {
      toast({
        title: '¡Error!',
        description: error.message || 'Error desconocido',
        status: 'error',
        duration: 5000,
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
        <ModalHeader fontSize={12}>Asignar Planificación</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={3} fontSize={12}>
            Profesor(a):{' '}
            <Text fontWeight={'bold'}>
              {teacher?.teacherLastName} {teacher?.teacherName}
            </Text>
          </Box>
          <Select
            name="grade"
            placeholder="Seleccionar Planificación"
            onChange={e => setSelectedPlanning(e.target.value)}
          >
            {plannings.map(planning => (
              <option key={planning._id} value={planning._id}>
                {`Grado ${planning.grade} - ${planning.subjects
                  .map(s => s.subject)
                  .join(', ')}`}
              </option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleAssign}
            isDisabled={!selectedPlanning}
          >
            Asignar
          </Button>
          <Button ml={2} onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AssignPlanningModal;
