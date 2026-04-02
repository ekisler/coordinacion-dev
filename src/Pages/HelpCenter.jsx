// src/pages/HelpCenter.jsx
import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import SelectLogo from '../utils/SelectLogo';

const HelpCenter = () => {
  return (
    <Box p={5} maxW="800px" mx="auto">
      <SelectLogo />
      <Heading size="xl" mb={5}>
        Centro de Ayuda
      </Heading>
      <Text mb={5}>
        Bienvenido al Centro de Ayuda de Coordinación y Control Estudiantil. Aquí
        encontrarás respuestas a las preguntas más frecuentes y recursos útiles
        para aprovechar al máximo nuestra aplicación.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Preguntas Frecuentes
      </Heading>
      <Text mb={5}>
        ¿Tienes alguna pregunta? Consulta nuestra sección de preguntas
        frecuentes para encontrar respuestas rápidas y útiles.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Soporte Técnico
      </Heading>
      <Text mb={5}>
        Si necesitas asistencia técnica, no dudes en contactarnos en{' '}
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

export default HelpCenter;
