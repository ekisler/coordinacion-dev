import { useDispatch, useSelector } from 'react-redux';
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
import { NavLink } from 'react-router-dom';
import { getRandomImage } from '../../assets/ImageManager';
import { deleteRepresentative } from '../../store/actions/representativeActions';

export default function SocialProfileWithImage({ representative }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const bgColor = useColorModeValue('blue.900', 'blue.50');
  const textColor = useColorModeValue('blue.50', 'blue.900');
  const randomImage = getRandomImage();
  const toast = useToast();

  const handleDisableRepresentative = () => {
    const isDisabled = representative?.isDisabled;
    const action = isDisabled ? 'habilitado' : 'inhabilitado';
    if (
      window.confirm(
        `El representante ${representative?.representativeName} será  ${
          isDisabled ? 'habilitado' : 'inhabilitado,'
        } haga click en Aceptar para inhabilitar, de lo contrario haga click en Cancelar`
      )
    ) {
      try {
        dispatch(deleteRepresentative(representative._id, !isDisabled));

        toast({
          title: 'Representante inhabilitado correctaemnte ',
          description: `El representante ${representative?.representativeName} ha sido ${action}.`,
          status: 'success',
          duration: 6000,
          isClosable: true,
          position: 'top',
        });
      } catch (error) {
        toast({
          title: '¡Error!',
          description: error.message,
          status: 'error',
          duration: 6000,
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
            onClick={handleDisableRepresentative}
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
            src={representative?.imageUrl}
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
              {representative?.representativeName}{' '}
              {representative?.representativeLastName}
            </Heading>
            <Text fontSize={'sm'} color={'gray.500'}>
              {representative?.profession}
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
            to={`/representatives/${representative?._id}`}
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
            to={`/updateRepresentative/${representative?._id}`}
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
