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

const AttendanceModal = ({
  isAttendanceModalOpen,
  closeAttendanceModal,
  teacher,
  loadAttendanceLists,
  loadingAttendances,
  attendancesLoaded,
  attendances,
}) => {
  return (
    <Modal isOpen={isAttendanceModalOpen} onClose={closeAttendanceModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={12}>
          Listas de asistencias {teacher?.teacherLastName}{' '}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={3} fontSize={12}>
            Profesor(a):{' '}
            <Text fontWeight={'bold'}>
              {teacher?.teacherLastName} {teacher?.teacherName}
            </Text>
          </Box>
          <Button
            onClick={loadAttendanceLists}
            isLoading={loadingAttendances}
            colorScheme="blue"
            fontSize={12}
            w={20}
            h={8}
            isDisabled={!teacher?.userId || loadingAttendances}
          >
            Ver listas
          </Button>
          {attendancesLoaded ? (
            loadingAttendances ? (
              <Center p={2}>
                <Spinner size="sm" />
                <Text fontSize="xs" ml={2}>
                  Cargando listas de asistencia...
                </Text>
              </Center>
            ) : attendances?.length > 0 ? (
              attendances.map(list => (
                <Box key={list?._id} p={2} borderBottomWidth={1}>
                  <Text fontSize="xs">📋 {list?.grade} Grado</Text>
                  <Text fontSize="xs">📋 Sección: {list?.section}</Text>
                  <Text fontSize="xs">📋 Turno: {list?.schedule}</Text>
                </Box>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500">
                No hay listas de asistencia registradas.
              </Text>
            )
          ) : (
            <Text fontSize="sm" color="gray.500" mt={6}>
              Haz clic en "Ver listas" para ver las listas asignadas.
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AttendanceModal;
