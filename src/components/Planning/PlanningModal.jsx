import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Textarea,
  Text,
  Box,
  Heading,
  Stack,
  Spinner,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  createPlanning,
  updatePlanning,
  resetPlanningSuccess,
} from '../../store/actions/planningActions';

const PlanningModal = ({ isOpen, onClose, planning }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.plannings);
  const [grade, setGrade] = useState('');
  const [subjects, setSubjects] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (planning) {
      setGrade(planning.grade);
      setSubjects(
        planning.subjects.map(subject => ({
          ...subject,
          title: subject.title || '',
          topics: subject.topics.map(topic => ({
            Concepto: topic.Concepto || '',
            Procedimiento: topic.Procedimiento || '',
            Actitudinal: topic.Actitudinal || '',
          })),
        }))
      );
    } else {
      setGrade('');
      setSubjects([
        {
          subject: '',
          title: '',
          topics: [
            { Concepto: '', Procedimiento: '', Actitudinal: '' },
          ],
        },
      ]);
    }
  }, [planning]);

  const handleSave = () => {
    const data = { grade, subjects };
    if (planning) {
      dispatch(updatePlanning(planning._id, data));
    } else {
      dispatch(createPlanning(data));
    }
    onClose();
  };

  useEffect(() => {
    if (success) {
      toast({
        title: planning ? 'Planificación actualizada' : 'Planificación creada',
        description: 'Los cambios se han guardado correctamente.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });

      if (!planning) {
        setGrade('');
        setSubjects([
          {
            subject: '',
            title: '',
            topics: [
              { Concepto: '', Procedimiento: '', Actitudinal: '' },
            ],
          },
        ]);
      }
      dispatch(resetPlanningSuccess())
      onClose();
    }
    if (error) {
      toast({
        title: 'Error',
        description: 'Hubo un problema al guardar la planificación.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [dispatch, error, onClose, planning, success, toast]);

  const handleAddTopic = (subjectIndex, newTitle) => {
    setSubjects(prev =>
      prev.map((subject, index) =>
        index === subjectIndex
          ? {
              ...subject,
              topics: [
                ...subject.topics,
                { Concepto: '', Procedimiento: '', Actitudinal: '' },
              ],
            }
          : subject
      )
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {planning ? 'Editar Planificación' : 'Nueva Planificación'}
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {loading && <Spinner size="xl" />}
          </VStack>
        </ModalBody>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Stack direction="row" align="center">
              <Text>Grado:</Text>
              <Input
                w={12}
                type="number"
                name="grade"
                value={grade}
                onChange={e => setGrade(e.target.value)}
                mb={4}
              />
            </Stack>
            {subjects.map((subject, i) => (
              <Box key={i} p={3} borderWidth="1px" borderRadius="lg">
                <Heading size="sm" mb={2}>
                  Asignatura: {subject.subject}
                </Heading>

                <Input
                  w={'96'}
                  value={subject.subject}
                  name="subject"
                  placeholder="Ejemplo: Matemáticas"
                  onChange={e => {
                    setSubjects(prev => {
                      const newSubjects = [...prev];
                      newSubjects[i].subject = e.target.value;
                      return newSubjects;
                    });
                  }}
                  mb={4}
                />
                <Heading size="sm" mb={2}>
                  Título del tema: {subject.title}
                </Heading>
                <Input
                  w={96}
                  mb={4}
                  value={subject.title}
                  name="title"
                  onChange={e => {
                    setSubjects(prev => {
                      const newSubjects = [...prev];
                      newSubjects[i].title = e.target.value;
                      return newSubjects;
                    });
                  }}
                  placeholder="Ejemplo: Matemáticas III"
                />

                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th width="30%">Concepto</Th>
                      <Th width="30%">Procedimiento</Th>
                      <Th width="30%">Actitudinal</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {subject.topics.map((topic, j) => (
                      <Fragment key={`${i}-${j}`}>
                        <Tr key={j}>
                          <Td>
                            <Textarea
                              placeholder="Concepto"
                              value={topic.Concepto}
                              name="Concepto"
                              onChange={e =>
                                setSubjects(prev => {
                                  const newSubjects = [...prev];
                                  newSubjects[i].topics[j].Concepto =
                                    e.target.value;
                                  return newSubjects;
                                })
                              }
                              resize="vertical"
                              size="sm"
                            />
                          </Td>
                          <Td>
                            <Textarea
                              placeholder="Procedimiento"
                              value={topic.Procedimiento}
                              name="Procedimiento"
                              onChange={e =>
                                setSubjects(prev => {
                                  const newSubjects = [...prev];
                                  newSubjects[i].topics[j].Procedimiento =
                                    e.target.value;
                                  return newSubjects;
                                })
                              }
                              resize="vertical"
                              size="sm"
                            />
                          </Td>
                          <Td>
                            <Textarea
                              placeholder="Actitudinal"
                              value={topic.Actitudinal}
                              name="Actitudinal"
                              onChange={e =>
                                setSubjects(prev => {
                                  const newSubjects = [...prev];
                                  newSubjects[i].topics[j].Actitudinal =
                                    e.target.value;
                                  return newSubjects;
                                })
                              }
                              resize="vertical"
                              size="sm"
                            />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td colSpan={3}>
                            <Divider my={2} borderColor="gray.400" />
                          </Td>
                        </Tr>
                      </Fragment>
                    ))}
                  </Tbody>
                </Table>
                <Stack align={'end'} mt={2}>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleAddTopic(i)}
                    mt={2}
                    ml={'auto'}
                  >
                    <AddIcon />
                  </Button>
                </Stack>
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>
            {planning ? 'Actualizar Planificación' : 'Crear Planificación'}
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlanningModal;
