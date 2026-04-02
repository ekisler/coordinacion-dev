import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {
  clearPasswordReset,
  startPasswordResetProcess,
} from '../../store/actions/passwordResetAction';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { forgotPassword } = useSelector(state => state.passwordReset);
  const [emailLocal, setEmailLocal] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (forgotPassword.error && forgotPassword.error.message) {
      toast({
        title: '¡Error!',
        description: forgotPassword.error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      dispatch(clearPasswordReset());
    }
  }, [dispatch, forgotPassword.error, toast]);

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      await dispatch(startPasswordResetProcess(emailLocal));
      if (forgotPassword.data?.message) {
        toast({
          title: '¡Éxito!',
          description: forgotPassword?.data.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        setEmailLocal('');
      }
    } catch (error) {
      console.error(
        'Error al iniciar el proceso de recuperación de contraseña:',
        error
      );

      if (error.response && error.response.data) {
        toast({
          title: 'Error',
          description: error.response.data.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack>
      <Heading mt={32} align={'center'} fontSize="2xl">
        Recupera tu contraseña aquí
      </Heading>

      <Box
        borderRadius="md"
        boxShadow="md"
        p={14}
        maxW={'600px'}
        maxH={'400px'}
        mx="auto"
        mb={32}
      >
        <Stack mt={'5px'} spacing={8} mb={4}>
          <FormControl mb={4} isRequired>
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              autoComplete="email"
              type="email"
              value={emailLocal}
              onChange={e => setEmailLocal(e.target.value)}
              placeholder="Ingrese su correo electrónico"
            />
          </FormControl>
          <Button
            colorScheme="blue"
            w="full"
            onClick={handleSendEmail}
            disabled={!emailLocal.trim() || loading}
            isLoading={loading}
            loadingText="Enviando..."
          >
            {!loading && 'Enviar'}
          </Button>

          <Flex direction="row" justify={'center'} gap={12}>
            <Text color={'blue.400'} mb={4}>
              ¿Ya has enviado tu correo?
            </Text>
            <Link href="/login">Inicia sesión</Link>
          </Flex>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ForgotPassword;
