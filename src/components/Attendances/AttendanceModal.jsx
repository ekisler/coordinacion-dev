// AttendanceModal.jsx
import React from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Text,
  Box,
} from '@chakra-ui/react';
import { formatDate } from '../../utils/dateUtils.js';
import MapComponent from '../Map/MapComponent.jsx';

const AttendanceModal = ({ isOpen, onClose, selectedItem }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Entrada de: {selectedItem?.username}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Profesor(a): {selectedItem?.username}</Text>
          <Text>Fecha: {formatDate(selectedItem?.date).split('\n')[0]}</Text>
          <Text>Hora: {formatDate(selectedItem?.date).split('\n')[1]}</Text>
          {selectedItem && selectedItem?.location && (
            <Box
              as="section"
              maxW="full"
              h="300px"
              w={'400px'}
              borderWidth="1px"
              borderRadius="md"
              overflow={'hidden'}
            >
              <MapComponent coordinates={selectedItem?.location} />
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AttendanceModal;
