// src/components/Footer/FooterFAQ.js
import React from 'react';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import SelectLogo from '../utils/SelectLogo';

const FooterFAQ = () => {
  return (
    <Box p={5}  maxW="800px" mx="auto">
      <SelectLogo />
      <Heading size="xl" mb={5}>
        Preguntas Frecuentes
      </Heading>
      <Stack spacing={3}>
        <Text fontWeight="bold">¿Cómo puedo registrarme en la plataforma?</Text>
        <Text>
          Para registrarte, dirígete a la página de registro y completa el
          formulario con tus datos. Una vez que envíes el formulario, recibirás
          una notificación de éxito y podrás iniciar sesión.
        </Text>

        <Text fontWeight="bold">¿Qué debo hacer si olvidé mi contraseña?</Text>
        <Text>
          Si olvidaste tu contraseña, puedes hacer clic en "Olvidé mi
          contraseña" en la página de inicio de sesión. Se te enviará un enlace
          para restablecerla a tu correo electrónico registrado.
        </Text>

        <Text fontWeight="bold">
          ¿Cómo puedo acceder a las listas de asistencia?
        </Text>
        <Text>
          Las listas de asistencia están disponibles en el panel de control.
          Asegúrate de estar registrado como profesor o administrador para
          acceder a esta funcionalidad.
        </Text>

        <Text fontWeight="bold">¿Puedo modificar mis datos personales?</Text>
        <Text>
          Sí, puedes modificar tus datos personales accediendo a tu perfil y
          actualizando la información que desees cambiar.
        </Text>

        <Text fontWeight="bold">
          ¿Qué hago si encuentro un error en la plataforma?
        </Text>
        <Text>
          Si encuentras un error, por favor, contáctanos a través de la sección
          de contacto en el menú. Agradecemos tus comentarios y trabajaremos
          para resolver cualquier problema.
        </Text>

        <Text fontWeight="bold">¿Cómo puedo contactar al soporte técnico?</Text>
        <Text>
          Puedes contactar al soporte técnico enviando un correo a
          soporte@example.com o utilizando el formulario de contacto en nuestra
          página.
        </Text>

        <Text fontWeight="bold">
          ¿La plataforma es accesible desde dispositivos móviles?
        </Text>
        <Text>
          Sí, nuestra plataforma está diseñada para ser completamente responsiva
          y accesible desde dispositivos móviles y tabletas.
        </Text>

        <Text fontWeight="bold">
          ¿Dónde puedo encontrar más información sobre las políticas de
          privacidad?
        </Text>
        <Text>
          Puedes encontrar información detallada sobre nuestras políticas de
          privacidad en la sección de "Política de Privacidad" en el pie de
          página.
        </Text>
      </Stack>
    </Box>
  );
};

export default FooterFAQ;
