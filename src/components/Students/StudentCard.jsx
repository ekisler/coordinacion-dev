import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { getRandomImage } from '../../assets/ImageManager';
import { deleteStudent } from '../../store/actions/studentActions';

export default function StudentCard({ student }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const bgColor = useColorModeValue('blue.900', 'blue.50');
  const textColor = useColorModeValue('blue.50', 'blue.900');
  const randomImage = getRandomImage();
  const toast = useToast();

  const handleDisableStudent = () => {
    const isDisabled = student?.isDisabled;
    const action = isDisabled ? 'habilitado' : 'inhabilitado';
    if (
      window.confirm(
        `El estudiante ${student?.studentName} será  ${
          isDisabled ? 'habilitado' : 'inhabilitado,'
        } haga click en Aceptar para inhabilitar, de lo contrario haga click en Cancelar`
      )
    ) {
      try {
        dispatch(deleteStudent(student._id, !isDisabled));

        toast({
          title: 'Estudiante inhabilitado correctaemnte ',
          description: `El estudiante ${student?.studentName} ha sido ${action}.`,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      } catch (error) {
        toast({
          title: '¡Error!',
          description: error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }
  };

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
          onClick={handleDisableStudent}
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
            src={student?.imageUrl}
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
              {student?.studentName} {student?.studentLastName}
            </Heading>
            <Text fontSize={'sm'} color={'gray.500'}>
              Frontend Developer
            </Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600} color={bgColor}>
                23k
              </Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600} color={bgColor}>
                23k
              </Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Followers
              </Text>
            </Stack>
          </Stack>

          <Button
            w={'full'}
            mt={8}
            bg={bgColor}
            color={textColor}
            rounded={'md'}
            as={NavLink}
            to={`/student/${student?._id}`}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Ver más
          </Button>
          <Button
            w={'full'}
            mt={4}
            bg={'yellow.200'}
            color={'black'}
            rounded={'md'}
            as={NavLink}
            to={`/updateStudent/${student?._id}`}
            _hover={{
              bg: 'yellow.100',
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Editar
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
