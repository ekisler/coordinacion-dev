// src/pages/LawEnforcement.jsx
import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import SelectLogo from '../utils/SelectLogo';

const LawEnforcement = () => {
  return (
    <Box p={5} maxW="800px" mx="auto">
      <SelectLogo />
      <Heading size="xl" mb={5}>
        Aplicación de la Ley
      </Heading>
      <Text mb={5}>
        En Coordinación Y Control Estudiantil, nos comprometemos a cooperar con
        las autoridades legales y a cumplir con todas las leyes y regulaciones
        aplicables. Esta página describe cómo manejamos las solicitudes de
        información por parte de las autoridades legales.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Solicitudes de Información
      </Heading>
      <Text mb={5}>
        Respondemos a las solicitudes de información de las autoridades legales
        de acuerdo con nuestras políticas internas y las leyes aplicables. Todas
        las solicitudes deben ser enviadas a nuestro equipo legal en{' '}
        <Link href="mailto:kisler.fullstack@gmail.com" color="teal.500">
          kisler.fullstack@gmail.com
        </Link>
        .
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Protección de la Privacidad
      </Heading>
      <Text mb={5}>
        Nos comprometemos a proteger la privacidad de nuestros usuarios. Solo
        divulgamos información personal cuando es requerido por la ley y después
        de una revisión exhaustiva por parte de nuestro equipo legal.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Contacto
      </Heading>
      <Text mb={5}>
        Si tienes alguna pregunta sobre nuestras políticas de aplicación de la
        ley, puedes contactarnos en{' '}
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

export default LawEnforcement;
