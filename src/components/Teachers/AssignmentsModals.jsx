import React from 'react';
import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';

const AssignmentsModal = ({
  isModalOpen,
  closeModal,
  teacher,
  loadAssignments,
  loadingAssignments,
  assignmentsLoaded,
  assignments,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={12}>Planificación de:</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={3} mt={-4} fontSize={12}>
            Profesor(a):{' '}
            <Text fontWeight={'bold'}>
              {teacher?.teacherLastName} {teacher?.teacherName}
            </Text>
          </Box>{' '}
          <Button
            onClick={loadAssignments}
            isLoading={loadingAssignments}
            colorScheme="blue"
            fontSize={12}
            w={24}
            h={8}
          >
            Planificación
          </Button>
          {assignmentsLoaded ? (
            loadingAssignments ? (
              <Center p={2}>
                <Spinner size="sm" />
                <Text fontSize="xs" ml={2}>
                  Cargando asignaciones...
                </Text>
              </Center>
            ) : assignments?.length > 0 ? (
              assignments.map(assignment => (
                <Box key={assignment?._id} p={2} borderBottomWidth={1}>
                  <Text fontSize="xs">📖 {assignment?.planningId?.title}</Text>
                  <Text fontSize="xs">
                    Grado: {assignment?.planningId?.grade}°
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    Materia: {assignment?.planningId?.subjects?.[0]?.subject}
                  </Text>
                </Box>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500">
                No hay asignaciones registradas.
              </Text>
            )
          ) : (
            <Text fontSize="sm" color="gray.500" mt={6}>
              Haz clic en "Planificación" para ver las asignaciones.
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AssignmentsModal;
