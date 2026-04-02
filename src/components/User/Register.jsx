import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { registerValidationSchema } from '../../utils/validationSchemas.js';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputRightElement,
  InputGroup,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IoIosPersonAdd } from 'react-icons/io';
import { registerUser } from '../../store/actions/authActions.js';

export default function SplitScreen() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (values, actions) => {
    setIsLoading(true);
    try {
      await dispatch(registerUser(values));
      actions.resetForm();

      toast({
        title: 'Registro exitoso',
        description: 'Ahora puedes iniciar sesión',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: '¡Error!',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const bgColor = useColorModeValue('gray.500', 'gray.100');
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={14}>
            <Stack marginLeft={1}>
              <Heading
                fontSize={'2xl'}
                color={bgColor}
                mb={6}
                mt={5}
                display={'flex'}
                alignItems={'center'}
              >
                <Icon as={IoIosPersonAdd} mr={2} /> Registrate
              </Heading>
              <Text color={bgColor}>
                disfruta de todas nuestras funciones ✌️
              </Text>
            </Stack>
            <Box rounded={'lg'} boxShadow={'lg'} p={6} border={'1px'} borderColor={'gray.200'}>
              <Formik
                initialValues={{
                  username: '',
                  name: '',
                  lastname: '',
                  email: '',
                  password: '',
                }}
                validationSchema={registerValidationSchema}
                onSubmit={handleRegister}
              >
                {formik => (
                  <Form>
                    <Stack spacing={6}>
                      <FormControl
                        isRequired
                        isInvalid={
                          formik.touched.username && formik.errors.username
                        }
                      >
                        <FormLabel>Usuario</FormLabel>
                        <Field
                          as={Input}
                          name="username"
                          autoComplete="username"
                        />
                        <FormErrorMessage>
                          {formik.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                      <HStack>
                        <Box>
                          <FormControl
                            id="firstName"
                            isRequired
                            isInvalid={
                              formik.touched.name && formik.errors.name
                            }
                          >
                            <FormLabel>Nombre(s)</FormLabel>
                            <Field
                              as={Input}
                              autoComplete="given-name"
                              name="name"
                            />
                            <FormErrorMessage>
                              {formik.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl
                            id="lastName"
                            isRequired
                            isInvalid={
                              formik.touched.lastname && formik.errors.lastname
                            }
                          >
                            <FormLabel>Apellido(s)</FormLabel>
                            <Field as={Input} name="lastname" />
                            <FormErrorMessage>
                              {formik.errors.lastname}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                      </HStack>
                      <FormControl
                        id="email"
                        isRequired
                        isInvalid={formik.touched.email && formik.errors.email}
                      >
                        <FormLabel>Correo Electónico</FormLabel>
                        <Field as={Input} name="email" autoComplete="email" />
                        <FormErrorMessage>
                          {formik.errors.email}
                        </FormErrorMessage>
                        <FormHelperText fontSize={'xs'}>
                          Nunca compartiremos su correo.
                        </FormHelperText>
                      </FormControl>
                      <FormControl
                        id="password"
                        isRequired
                        isInvalid={
                          formik.touched.password && formik.errors.password
                        }
                      >
                        <FormLabel>Contraseña</FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                          />
                          <InputRightElement h={'full'}>
                            <Button
                              variant={'ghost'}
                              onClick={() =>
                                setShowPassword(showPassword => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {formik.errors.password}
                        </FormErrorMessage>
                        <FormHelperText fontSize={'sm'}>
                          La contraseña debe tener al menos 8 caracteres,
                          incluyendo:
                          <FormHelperText fontSize={'xs'}>
                            La contraseña debe tener al menos 8 caracteres,
                            incluyendo:
                            <Text>• 1 número (por ejemplo: 0-9)</Text>
                            <Text>• 1 letra mayúscula (por ejemplo: A-Z)</Text>
                            <Text>• 1 letra minúscula (por ejemplo: a-z)</Text>
                            <Text>
                              • 1 carácter especial por ejemplo:{' '}
                              {'#$%&/()=?¡!°°|¨*+[]{}ñ:_.-,;<>).'}
                            </Text>
                          </FormHelperText>
                        </FormHelperText>
                      </FormControl>
                      <Stack spacing={10} pt={2}>
                        <Button
                          isLoading={isLoading}
                          loadingText="Registrando..."
                          size="lg"
                          bg={'blue.400'}
                          color={'white'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                          type="submit"
                          isDisabled={isLoading}
                        >
                          Registrate
                        </Button>
                      </Stack>
                      <Stack pt={6}>
                        <Text align={'center'}>
                          ¿Eres usuario?{' '}
                          <Link href="/login" color={'blue.400'}>
                            Entrar
                          </Link>
                        </Text>
                      </Stack>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Box>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}
