// src/pages/SecurityCenter.jsx
import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import SelectLogo from '../utils/SelectLogo';

const SecurityCenter = () => {
  return (
    <Box p={5} maxW="800px" mx="auto">
      <SelectLogo />
      <Heading size="xl" mb={5}>
        Centro de Seguridad
      </Heading>
      <Text mb={5}>
        En Coordinación y Control Estudiantil, la seguridad de tu información es
        nuestra prioridad. Aquí encontrarás información sobre nuestras prácticas
        de seguridad y cómo protegemos tus datos.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Prácticas de Seguridad
      </Heading>
      <Text mb={5}>
        Implementamos medidas de seguridad avanzadas para proteger tu
        información personal, incluyendo cifrado de datos, autenticación de dos
        factores y monitoreo continuo de nuestras redes.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Reportar un Problema de Seguridad
      </Heading>
      <Text mb={5}>
        Si encuentras algún problema de seguridad, por favor repórtalo de
        inmediato a nuestro equipo de soporte en{' '}
        <Link href="mailto:kisler.fullstack@gmail.com" color="teal.500">
          kisler.fullstack@gmail.com
        </Link>
        .
      </Text>
    </Box>
  );
};

export default SecurityCenter;
