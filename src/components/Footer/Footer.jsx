import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

import AppStoreBadge from '../../utils/AppStoreBadge';
import PlayStoreBadge from '../../utils/PlayStoreBadge';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function LargeWithAppLinksAndSocial() {
  const year = new Date().getFullYear();
  const bgColor = useColorModeValue('red.600', 'red.400');

  return (
    <Box
      mt={{ base: "0", sm: '100', md: "0", }}
      bg={useColorModeValue('blue.50', 'blue.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      bottom={0}
      left={0}
      width="100%"
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Compañia</ListHeader>
            <Box as="a" href={'/about-us'} fontSize={'sm'}>
              Sobre nosotros
            </Box>
            <Box as="a" href={'#'} fontSize={'sm'}>
              Blog
            </Box>
            <Box as="a" href={'#'} fontSize={'sm'}>
              Carreras
            </Box>
            <Box as="a" href={'/contact'} fontSize={'sm'}>
              Contáctenos
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Soporte</ListHeader>
            <Box as="a" href={'/help-center'} fontSize={'sm'}>
              Centro de ayuda
            </Box>
            <Box as="a" href={'/security-center'} fontSize={'sm'}>
              Centro de seguridad
            </Box>
            <Box as="a" href={'/comunity-guidelines'} fontSize={'sm'}>
              Normas de la comunidad
            </Box>
            <Box as="a" href={'/faq'} fontSize={'sm'}>
              Preguntas frecuentes (FAQ)
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={'/cookie-policy'} fontSize={'sm'}>
              Política de cookies
            </Box>
            <Box as="a" href={'/privacy-policy'} fontSize={'sm'}>
              Política de privacidad
            </Box>
            <Box as="a" href={'/terms-of-service'} fontSize={'sm'}>
              Terminos de Servicio
            </Box>
            <Box as="a" href={'/law-enforcement'} fontSize={'sm'}>
              Aplicación de la ley
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Instalar aplicación</ListHeader>
            <AppStoreBadge />
            <PlayStoreBadge />
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Link href="https://emisaelportfolio.netlify.app" isExternal>
            <Text fontSize={'xs'}>
              <Text as="span" color={bgColor} fontWeight="bold">
                © {year}
              </Text>{' '}
              Realizado por:{' '}
              <Text as="span" color={bgColor} fontWeight="bold">
                {' '}
                Emisael Kisler R
              </Text>
            </Text>
          </Link>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
