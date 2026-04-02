// src/components/PrivacyPolicy.jsx
import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import SelectLogo from '../utils/SelectLogo';

const PrivacyPolicy = () => {
  return (
    <Box p={5} maxW="800px" mx="auto">
        <SelectLogo />
      <Heading size="xl" mb={5}>
        Política de Privacidad
      </Heading>
      <Text mb={5}>
        En Coordinación y Control Estudiantil, nos comprometemos a proteger tu
        privacidad. Esta política de privacidad explica cómo recopilamos,
        utilizamos y compartimos tu información personal.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Información que recopilamos
      </Heading>
      <Text mb={5}>
        Recopilamos información personal que nos proporcionas directamente, como
        tu nombre, dirección de correo electrónico y número de teléfono. También
        recopilamos información automáticamente cuando utilizas nuestra
        aplicación, como tu dirección IP y datos de uso.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Cómo utilizamos tu información
      </Heading>
      <Text mb={5}>
        Utilizamos tu información para proporcionar y mejorar nuestros
        servicios, comunicarnos contigo y personalizar tu experiencia en nuestra
        aplicación. También podemos utilizar tu información para cumplir con
        obligaciones legales y proteger nuestros derechos.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Cómo compartimos tu información
      </Heading>
      <Text mb={5}>
        No compartimos tu información personal con terceros, excepto cuando sea
        necesario para proporcionar nuestros servicios, cumplir con obligaciones
        legales o proteger nuestros derechos. Podemos compartir tu información
        con proveedores de servicios de confianza que actúan en nuestro nombre.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Tus derechos
      </Heading>
      <Text mb={5}>
        Tienes derecho a acceder, corregir y eliminar tu información personal.
        También puedes oponerte al procesamiento de tu información y solicitar
        la portabilidad de tus datos. Para ejercer estos derechos, puedes
        contactarnos en{' '}
        <Link href="mailto:kisler.fullstack@gmail.com" color="teal.500">
          kisler.fullstack@gmail.com
        </Link>
        .
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Cambios en nuestra política de privacidad
      </Heading>
      <Text mb={5}>
        Podemos actualizar esta política de privacidad de vez en cuando para
        reflejar cambios en nuestras prácticas o en la legislación aplicable. Te
        recomendamos revisar esta política periódicamente para estar informado
        sobre cómo protegemos tu información.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Contacto
      </Heading>
      <Text mb={5}>
        Si tienes alguna pregunta sobre nuestra política de privacidad, puedes
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

export default PrivacyPolicy;
