import { useToast } from '@chakra-ui/react';
import { apiDeleteAsists, apiDeleteExits } from '../../store/actions/api.js';

const HandleDelete = () => {
  const toast = useToast();

  const handleDeleteEntri = async itemId => {
    try {
      await apiDeleteAsists(itemId);

      toast({
        title: '¡Entrada deshabilitada!.',
        description: 'La entrada ha sido deshabilitada con éxito.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.error('Error al deshabilitar la entrada:', error);
      toast({
        title: '¡Error al deshabilitar la entrada!',
        description: 'Ocurrió un error al intentar deshabilitar la entrada.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleDeleteExit = async itemId => {
    try {
      await apiDeleteExits(itemId);

      toast({
        title: '¡Salida deshabilitada!',
        description: 'La salida ha sido deshabilitada con éxito.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.error('Error al deshabilitar la salida:', error);
      toast({
        title: '¡Error al deshabilitar la salida!',
        description: 'Ocurrió un error al intentar deshabilitar la salida.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return {
    handleDeleteEntri,
    handleDeleteExit,
  };
};

export default HandleDelete;
