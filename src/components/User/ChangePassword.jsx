import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  changePassword,
  clearPasswordReset,
} from '../../store/actions/passwordResetAction.js';
// import { clearEmailFromLocalStorage } from '../../utils/localStorageUtils.js';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { changePassword: passwordState } = useSelector(
    state => state.passwordReset
  );
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { isOpen: newIsOpen, onToggle: newOnToggle } = useDisclosure();
  const { isOpen: repeatIsOpen, onToggle: repeatOnToggle } = useDisclosure();
  const [validationError, setValidationError] = useState('');
  const toast = useToast();

  const handleNewPasswordChange = e => {
    const value = e.target.value;
    setNewPassword(value);

    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;

    if (!isValidLength) {
      setValidationError('La contraseña debe tener al menos 8 caracteres.');
    } else if (!hasUpperCase) {
      setValidationError(
        'La contraseña debe tener al menos una letra mayúscula'
      );
    } else if (!hasSpecialChar) {
      setValidationError(
        'La contraseña debe tener al menos un carácter especial'
      );
    } else {
      setValidationError('');
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (validationError) {
      toast({
        title: 'Error en la contraseña',
        description: validationError,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    if (newPassword !== repeatPassword) {
      toast({
        title: 'Error en la validación',
        description: 'Las contraseñas no coinciden.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    if (passwordState.error) {
      toast({
        title: 'Error',
        description: passwordState.error,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      dispatch(clearPasswordReset());
      return;
    }

    try {
      await dispatch(changePassword(passwordState?.email, newPassword));
      toast({
        title: '¡Éxito!',
        description:
          passwordState?.data?.message ||
          'Contraseña actualizada exitosamente.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      dispatch(clearPasswordReset());
      setNewPassword('');
      setRepeatPassword('');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      toast({
        title: '¡Error!',
        description:
          error?.message || 'Ocurrio un error al cambiar la contraseña',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      borderRadius="md"
      boxShadow="md"
      p={12}
      maxWidth="500px"
      mx="auto"
    >
      <Stack mt={'80px'} spacing={6} mb={1}>
        <Stack mt={4} align={'center'}>
          <Heading fontSize="2xl">Cambiar contraseña</Heading>
        </Stack>
        <FormControl>
          <Input
            mt={12}
            type="text"
            readOnly
            value={passwordState ? passwordState.email : ''}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel mt={6}>Nueva Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={newIsOpen ? 'text' : 'password'}
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Nueva contraseña"
            />
            <InputRightElement onClick={newOnToggle}>
              {newIsOpen ? <ViewIcon /> : <ViewOffIcon />}
            </InputRightElement>
          </InputGroup>
          {validationError && <Alert status="error">{validationError}</Alert>}
        </FormControl>

        <FormControl isRequired>
          <FormLabel mt={6}>Repetir la Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={repeatIsOpen ? 'text' : 'password'}
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
              placeholder="Repetir contraseña"
            />
            <InputRightElement onClick={repeatOnToggle}>
              {repeatIsOpen ? <ViewIcon /> : <ViewOffIcon />}
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack mt={4} align={'center'}>
          <Button type="submit" mt={6} colorScheme="blue">
            Actualizar Contraseña
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChangePassword;
