// src/components/TermsOfService.jsx
import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import SelectLogo from '../utils/SelectLogo';

const TermsOfService = () => {
  return (
    <Box p={5} maxW="800px" mx="auto">
        <SelectLogo />
      <Heading size="xl" mb={5}>
        Términos de Servicio
      </Heading>
      <Text mb={5}>
        Bienvenido a Coordinación y Control Estudiantil. Al utilizar nuestra
        aplicación, aceptas cumplir con los siguientes términos de servicio. Por
        favor, léelos cuidadosamente.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Uso de la aplicación
      </Heading>
      <Text mb={5}>
        Nuestra aplicación está destinada a ser utilizada por estudiantes,
        profesores y personal administrativo. Debes utilizar la aplicación de
        manera responsable y cumplir con todas las leyes y regulaciones
        aplicables.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Cuenta de usuario
      </Heading>
      <Text mb={5}>
        Para utilizar ciertas funciones de nuestra aplicación, debes crear una
        cuenta de usuario. Eres responsable de mantener la confidencialidad de
        tu cuenta y contraseña, y de todas las actividades que ocurran bajo tu
        cuenta.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Contenido generado por el usuario
      </Heading>
      <Text mb={5}>
        Puedes enviar contenido a nuestra aplicación, como comentarios y
        mensajes. Al enviar contenido, nos otorgas una licencia para utilizar,
        reproducir y distribuir tu contenido. No somos responsables del
        contenido generado por los usuarios.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Propiedad intelectual
      </Heading>
      <Text mb={5}>
        Todos los derechos de propiedad intelectual en nuestra aplicación y su
        contenido son propiedad de Coordinación Control Estudiantil o de
        nuestros licenciantes. No puedes utilizar nuestro contenido sin nuestro
        permiso expreso.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Limitación de responsabilidad
      </Heading>
      <Text mb={5}>
        No seremos responsables de ningún daño indirecto, incidental, especial o
        consecuente que surja del uso de nuestra aplicación. Nuestra
        responsabilidad total por cualquier reclamación relacionada con nuestra
        aplicación se limitará al monto que pagaste por utilizar nuestros
        servicios.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Cambios en los términos de servicio
      </Heading>
      <Text mb={5}>
        Podemos actualizar estos términos de servicio de vez en cuando para
        reflejar cambios en nuestras prácticas o en la legislación aplicable. Te
        recomendamos revisar estos términos periódicamente para estar informado
        sobre tus derechos y obligaciones.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Contacto
      </Heading>
      <Text mb={5}>
        Si tienes alguna pregunta sobre nuestros términos de servicio, puedes
        contactarnos en{' '}
        <Link href="mailto:kisler.fullstack@gmail.com" color="teal.500">
          kisler.fullstack@gmail.com
        </Link>{' '}
        o a través de{' '}
        <Link href="tel:+584242870937" color="teal.500">
          +584242870937
        </Link>
        .
      </Text>
    </Box>
  );
};

export default TermsOfService;
