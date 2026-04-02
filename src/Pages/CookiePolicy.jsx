// src/components/CookiePolicy.jsx
import React from 'react';
import { Box, Heading, Text, List, ListItem, Link } from '@chakra-ui/react';
import SelectLogo from '../utils/SelectLogo';

const CookiePolicy = () => {
  return (
    <Box p={5} maxW="800px" mx="auto">
      <SelectLogo />
      <Heading size="xl" mb={5}>
        Política de Cookies
      </Heading>
      <Text mb={5}>
        En Coordinación y Control Estudiantil, utilizamos cookies para mejorar tu
        experiencia en nuestra aplicación. Esta política de cookies explica qué
        son las cookies, cómo las utilizamos y cómo puedes gestionarlas.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        ¿Qué son las cookies?
      </Heading>
      <Text mb={5}>
        Las cookies son pequeños archivos de texto que se almacenan en tu
        dispositivo cuando visitas un sitio web. Las cookies nos permiten
        reconocer tu dispositivo y recordar tus preferencias y acciones
        anteriores.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        ¿Qué tipos de cookies utilizamos?
      </Heading>
      <Text mb={3}>
        Utilizamos los siguientes tipos de cookies en nuestra aplicación:
      </Text>
      <List spacing={3} mb={5}>
        <ListItem>
          <Text as="strong">Cookies de autenticación:</Text> Estas cookies son
          esenciales para permitirte iniciar sesión en tu cuenta y acceder a
          áreas seguras de la aplicación. Sin estas cookies, no podríamos
          ofrecerte los servicios que has solicitado.
        </ListItem>
        <ListItem>
          <Text as="strong">Cookies de sesión:</Text> Utilizamos cookies de
          sesión para mantener tu sesión activa mientras navegas por nuestra
          aplicación. Estas cookies se eliminan automáticamente cuando cierras
          tu navegador.
        </ListItem>
        <ListItem>
          <Text as="strong">Cookies de seguridad:</Text> Estas cookies se
          utilizan para mejorar la seguridad de nuestra aplicación y proteger tu
          cuenta contra accesos no autorizados.
        </ListItem>
      </List>

      <Heading as="h2" size="lg" mb={3}>
        ¿Cómo utilizamos las cookies?
      </Heading>
      <Text mb={3}>Utilizamos cookies para los siguientes propósitos:</Text>
      <List spacing={3} mb={5}>
        <ListItem>
          <Text as="strong">Autenticación y seguridad:</Text> Utilizamos cookies
          para autenticar a los usuarios y proteger sus datos. Por ejemplo,
          utilizamos cookies para almacenar tokens de acceso y refrescar tokens
          cuando sea necesario.
        </ListItem>
        <ListItem>
          <Text as="strong">Mejora de la experiencia del usuario:</Text> Las
          cookies nos permiten recordar tus preferencias y personalizar tu
          experiencia en nuestra aplicación.
        </ListItem>
      </List>

      <Heading as="h2" size="lg" mb={3}>
        ¿Cómo puedes gestionar las cookies?
      </Heading>
      <Text mb={5}>
        La mayoría de los navegadores web te permiten gestionar las cookies a
        través de la configuración del navegador. Puedes configurar tu navegador
        para que rechace las cookies o para que te avise cuando se envíen
        cookies a tu dispositivo. Sin embargo, ten en cuenta que si desactivas
        las cookies, es posible que algunas funciones de nuestra aplicación no
        funcionen correctamente.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Cambios en nuestra política de cookies
      </Heading>
      <Text mb={5}>
        Podemos actualizar esta política de cookies de vez en cuando para
        reflejar cambios en nuestras prácticas o en la legislación aplicable. Te
        recomendamos revisar esta política periódicamente para estar informado
        sobre cómo utilizamos las cookies.
      </Text>

      <Heading as="h2" size="lg" mb={3}>
        Contacto
      </Heading>
      <Text mb={5}>
        Si tienes alguna pregunta sobre nuestra política de cookies, puedes
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

export default CookiePolicy;
