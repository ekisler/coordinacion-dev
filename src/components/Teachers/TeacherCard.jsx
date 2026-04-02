import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Heading,
  Avatar,
  Box,
  Center,
  IconButton,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { getRandomImage } from '../../assets/ImageManager';
import AssignPlanningModal from '../Planning/AssignPlanningModal.jsx';
import AssignListModal from './AssignListModal.jsx';
import { handleDisableTeacher } from '../../utils/teacherUtils.js';

export default function TeacherCard({ teacher }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const bgColor = useColorModeValue('blue.900', 'blue.50');
  const textColor = useColorModeValue('blue.50', 'blue.900');
  const randomImage = getRandomImage();
  const toast = useToast();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAssignListOpen, setIsAssignListOpen] = useState(false);

  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'300px'}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        position={'relative'}
      >
        {isSuperAdmin && (
          <IconButton
            icon={<CloseIcon />}
            size="xs"
            colorScheme="red"
            position="absolute"
            top="2"
            right="2"
            onClick={() => handleDisableTeacher(teacher, dispatch, toast)}
          />
        )}
        <Image
          h={'120px'}
          w={'full'}
          src={randomImage}
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={teacher?.imageUrl}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading
              fontSize={'16'}
              fontWeight={600}
              fontFamily={'body'}
              color={bgColor}
              align={'center'}
            >
              {teacher?.teacherName} {teacher?.teacherLastName}
            </Heading>
            <Text fontSize={'sm'} color={'gray.500'}>
              {teacher?.profession}
            </Text>
          </Stack>
          <Flex justify={'center'}>
            <Button
              fontSize={12}
              w={16}
              h={7}
              mt={3}
              bg={'yellow.200'}
              color={'black'}
              rounded={'md'}
              as={NavLink}
              to={`/updateTeacher/${teacher?._id}`}
              _hover={{
                bg: 'yellow.100',
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Editar
            </Button>
          </Flex>
          <Flex justify={'center'}>
            <Button
              w={20}
              h={7}
              fontSize={12}
              mt={3}
              bg={bgColor}
              color={textColor}
              rounded={'md'}
              as={NavLink}
              to={`/teacher/${teacher?._id}`}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Ver más
            </Button>
          </Flex>
          <Flex justify={'center'}>
            <Button
              fontSize={12}
              w={28}
              h={7}
              mt={3}
              bg={'green.200'}
              color={'black'}
              rounded={'md'}
              onClick={() => setIsAssignListOpen(true)}
              _hover={{
                bg: 'green.100',
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Asignar Lista
            </Button>
          </Flex>
          <Flex justify={'center'}>
            <Button
              fontSize={12}
              w={40}
              h={7}
              mt={3}
              color={'gray.400'}
              rounded={'md'}
              onClick={() => setIsAssignModalOpen(true)}
              _hover={{
                bg: 'green.50',
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Asignar Planificación
            </Button>
          </Flex>
        </Box>
      </Box>
      {isAssignModalOpen && (
        <AssignPlanningModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          teacher={teacher}
        />
      )}
      {isAssignListOpen && (
        <AssignListModal
          isOpen={isAssignListOpen}
          onClose={() => setIsAssignListOpen(false)}
          teacher={teacher}
        />
      )}
    </Center>
  );
}
