import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { loginValidationSchema } from '../../utils/validationSchemas';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import { USER_LOADING_END } from '../../store/action-type';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
  useColorModeValue,
  Image,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IoIosLogIn } from 'react-icons/io';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { isAuthenticated, loading, error } = useSelector(state => state.auth);
  const { isOpen, onToggle } = useDisclosure();
  const [rememberMe, setRememberMe] = useState(false);
  const bgColor = useColorModeValue('gray.500', 'gray.100');

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: 'Inicio de sesión exitoso',
        description: 'Redirigiendo al dashboard...',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [isAuthenticated, navigate, toast]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', values.username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }
      try {
        await dispatch(loginUser(values.username, values.password));
      } catch (error) {
        setSubmitting(false);
      }
    },
  });

  // 1. Limpiar errores al montar el componente (solo una vez)
  useEffect(() => {
    // Al entrar: Limpiamos errores previos
    dispatch({ type: 'CLEAR_AUTH_ERROR' });

    // Al salir (desmontar): Apagamos el loading global de Redux
    return () => {
      dispatch({ type: USER_LOADING_END });
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: '¡Error!',
        description: error,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      dispatch({ type: 'CLEAR_AUTH_ERROR' });
    }
  }, [dispatch, error, toast]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('rememberedUsername');
    if (storedUsername) {
      formik.setFieldValue('username', storedUsername);
      setRememberMe(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={8} w={'full'} maxW={'lg'} py={14}>
          <Heading
            fontSize={'2xl'}
            color={bgColor}
            mb={1}
            display="flex"
            alignItems={'center'}
          >
            <Icon as={IoIosLogIn} mr={2} /> Login Coordinación
          </Heading>
          <Text color={bgColor}>Accede a tu cuenta</Text>
          <Box
            rounded={'lg'}
            boxShadow={'lg'}
            p={6}
            border={'1px'}
            borderColor={'gray.200'}
          >
            <Box as="form" onSubmit={formik.handleSubmit}>
              <FormControl
                mb={4}
                isInvalid={formik.touched.username && formik.errors.username}
              >
                <FormLabel htmlFor="username">Usuario</FormLabel>
                <Input
                  autoComplete="username"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Usuario"
                />
                {formik.touched.username && formik.errors.username ? (
                  <FormErrorMessage fontSize={'xs'}>
                    {formik.errors.username}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl
                mb={4}
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type={isOpen ? 'text' : 'password'}
                    value={formik.values.password}
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Contraseña"
                  />
                  <InputRightElement onClick={onToggle}>
                    {isOpen ? <ViewIcon /> : <ViewOffIcon />}
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password ? (
                  <FormErrorMessage fontSize={'xs'}>
                    {formik.errors.password}
                  </FormErrorMessage>
                ) : null}
              </FormControl>

              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox
                    name="rememberMe"
                    isChecked={rememberMe}
                    onChange={e => {
                      setRememberMe(e.target.checked);
                      if (!e.target.checked) {
                        localStorage.removeItem('rememberedUsername');
                      }
                    }}
                  >
                    Recordar datos
                  </Checkbox>
                  <NavLink to={'/forgot-password'} color={'blue.400'}>
                    ¿Olvidaste tu clave?
                  </NavLink>
                </Stack>

                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={formik.isSubmitting || loading}
                  isDisabled={formik.isSubmitting || loading}
                  loadingText="Iniciando sesión"
                >
                  Iniciar Sesión
                </Button>
              </Stack>
            </Box>
          </Box>
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
