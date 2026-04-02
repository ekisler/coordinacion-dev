// src/pages/AboutUs.jsx
import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import SelectLogo from '../utils/SelectLogo';

const AboutUs = () => {
  return (
    <Box p={5} maxW="800px" mx="auto">
      <SelectLogo />
      <Heading size="xl" mb={5}>
        Sobre Nosotros
      </Heading>
      <Text mb={5}>
        En Coordinación Control Estudiantil, estamos dedicados a proporcionar
        soluciones innovadoras para la gestión educativa. Nuestra misión es
        facilitar la administración escolar y mejorar la experiencia educativa
        para estudiantes, profesores y personal administrativo.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Nuestra Historia
      </Heading>
      <Text mb={5}>
        Fundada en 2024, Coordinación Control Estudiantil nació de
        la necesidad de simplificar y optimizar los procesos administrativos en
        las instituciones educativas. Desde entonces, hemos crecido y
        evolucionado, incorporando nuevas tecnologías y adaptándonos a las
        necesidades cambiantes de nuestros usuarios.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Nuestra Misión
      </Heading>
      <Text mb={5}>
        Nuestra misión es proporcionar herramientas eficientes y fáciles de usar
        que permitan a las instituciones educativas gestionar sus operaciones de
        manera más efectiva. Nos esforzamos por mejorar la comunicación, la
        organización y la eficiencia en el entorno educativo.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Nuestro Equipo
      </Heading>
      <Text mb={5}>
        Contamos con un equipo de profesionales apasionados y dedicados,
        comprometidos con la excelencia y la innovación. Nuestro equipo trabaja
        incansablemente para desarrollar y mejorar nuestras soluciones,
        asegurando que satisfagan las necesidades de nuestros usuarios.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Contáctanos
      </Heading>
      <Text mb={5}>
        Si tienes alguna pregunta o deseas saber más sobre nosotros, no dudes en
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

export default AboutUs;
