// src/pages/CommunityGuidelines.jsx
import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import SelectLogo from '../utils/SelectLogo';

const CommunityGuidelines = () => {
  return (
    <Box p={5} maxW="800px" mx="auto">
      <SelectLogo />
      <Heading size="xl" mb={5}>
        Normas de la Comunidad
      </Heading>
      <Text mb={5}>
        En Coordinación y Control Estudiantil, creemos en la importancia de
        mantener un entorno seguro y respetuoso para todos nuestros usuarios.
        Estas son nuestras normas de la comunidad.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Respeto y Cortesía
      </Heading>
      <Text mb={5}>
        Trata a los demás con respeto y cortesía. No se tolerará ningún tipo de
        acoso, discriminación o comportamiento abusivo.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Contenido Apropiado
      </Heading>
      <Text mb={5}>
        Publica solo contenido que sea apropiado para un entorno educativo. No
        se permite contenido ofensivo, inapropiado o ilegal.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Reportar Comportamiento Inapropiado
      </Heading>
      <Text mb={5}>
        Si encuentras algún comportamiento inapropiado, por favor repórtalo a
        nuestro equipo de soporte en{' '}
        <Link href="mailto:kisler.fullstack@gmail.com" color="teal.500">
          kisler.fullstack@gmail.com
        </Link>
        .
      </Text>
    </Box>
  );
};

export default CommunityGuidelines;
