import React, { useEffect, useState } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Heading,
  Text, Flex, Icon, Card, CardBody, TableContainer, Badge,
  HStack, VStack, Skeleton
} from '@chakra-ui/react';
import { AiOutlineAudit } from 'react-icons/ai';
import { MdHistory, MdDevices } from 'react-icons/md';
import { ref, onValue } from 'firebase/database';
import { database } from '../../utils/firebase';
import { parseTimestamp } from './parseTimestamp';

const AuditLogs = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Colores consistentes con la nueva interfaz
  const sorterColor= useColorModeValue('gray.50', 'gray.700');
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');

  useEffect(() => {
    const auditRef = ref(database, 'audit_log');

    const unsubscribe = onValue(auditRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const auditsArray = Object.entries(data).map(([id, audit]) => ({
          _id: id,
          ...audit,
        }));

        auditsArray.sort((a, b) => {
          const dateA = parseTimestamp(a.timestamp);
          const dateB = parseTimestamp(b.timestamp);
          return dateB - dateA;
        });

        setAudits(auditsArray);
      } else {
        setAudits([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error al obtener registros de auditoría:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Función para darle color a las acciones
  const getActionBadge = (action) => {
    const act = action?.toLowerCase() || '';
    if (act.includes('create') || act.includes('post')) return 'green';
    if (act.includes('update') || act.includes('put')) return 'blue';
    if (act.includes('delete')) return 'red';
    if (act.includes('login')) return 'purple';
    return 'gray';
  };

  return (
    <Box p={{ base: 4, md: 6 }}>
      {/* HEADER */}
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'stretch', md: 'center' }} mb={8} gap={4}>
        <VStack align="start" spacing={1}>
          <Heading size="lg" color={textColor} display="flex" alignItems="center" gap={3}>
            <Icon as={AiOutlineAudit} color="teal.500" boxSize={8} />
            Auditoría del Sistema
          </Heading>
          <Text color={mutedColor} fontSize="sm">Historial de acciones y movimientos de usuarios</Text>
        </VStack>
        <Badge colorScheme="orange" variant="outline" p={2} borderRadius="md">
          {audits.length} Registros totales
        </Badge>
      </Flex>

      {/* TABLA DE AUDITORÍA */}
      <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="hidden" boxShadow="sm">
        <CardBody p={0}>
          {loading ? (
            <VStack p={6} spacing={4} align="stretch">
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </VStack>
          ) : (
            <TableContainer>
              <Table variant="simple" size="md">
                <Thead bg={bgColor}>
                  <Tr>
                    <Th color={textColor} textTransform="none">Usuario</Th>
                    <Th color={textColor} textTransform="none">Acción</Th>
                    <Th color={textColor} textTransform="none">Entidad</Th>
                    <Th color={textColor} textTransform="none">Detalles Técnicos</Th>
                    <Th color={textColor} textTransform="none">Fecha y Hora</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {audits.map((audit) => (
                    <Tr key={audit._id} _hover={sorterColor} transition="0.2s">
                      <Td>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="bold" color={textColor}>
                            {audit?.lastname} {audit?.name}
                          </Text>
                          <Text fontSize="xs" color={mutedColor}>@{audit?.username}</Text>
                        </VStack>
                      </Td>
                      <Td>
                        <Badge colorScheme={getActionBadge(audit?.action)} variant="subtle" px={2} borderRadius="full">
                          {audit?.action}
                        </Badge>
                      </Td>
                      <Td>
                        <Text fontSize="sm" fontWeight="medium">{audit?.entity}</Text>
                      </Td>
                      <Td>
                        <HStack spacing={2} color={mutedColor}>
                          <Icon as={MdDevices} />
                          <Text fontSize="xs">{audit?.ipAddress}</Text>
                        </HStack>
                      </Td>
                      <Td>
                        <HStack spacing={2} color={mutedColor}>
                          <Icon as={MdHistory} />
                          <Text fontSize="xs">
                            {new Date(audit?.timestamp).toLocaleString('es-ES', {
                              dateStyle: 'medium',
                              timeStyle: 'short'
                            })}
                          </Text>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}

          {!loading && audits.length === 0 && (
            <Flex direction="column" align="center" py={12}>
              <Icon as={AiOutlineAudit} boxSize={12} color="gray.300" mb={4} />
              <Text color={mutedColor}>No hay registros de auditoría.</Text>
            </Flex>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default AuditLogs;