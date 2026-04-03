import {
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Button,
  Badge,
  Icon,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import image5 from '../../assets/image5.png';
import logotipo1 from '../../assets/logotipo1.png';
import logotipo2 from '../../assets/logotipo2.png';
import logotipo3 from '../../assets/logotipo3.png';
import SelectLogo from '../../utils/SelectLogo';
import AppStoreBadge from '../../utils/AppStoreBadge';
import PlayStoreBadge from '../../utils/PlayStoreBadge';

const Home = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardHoverBg = useColorModeValue('blue.50', 'gray.600');
  const cardBorderColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Container maxW={'7xl'} py={8}>
      {/* Hero Section */}
      <VStack spacing={6} textAlign="center" mb={16}>
        <SelectLogo />
        <Heading
          size={{ base: '2xl', md: '3xl', lg: '4xl' }}
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          fontWeight="extrabold"
          lineHeight="tall"
        >
          Coordinación y Control de Estudios 
        </Heading>
        <Text
          fontSize={{ base: 'lg', md: 'xl' }}
          color={textColor}
          maxW="3xl"
          mx="auto"
          lineHeight="tall"
        >
          Transforma la gestión educativa de tu institución con nuestra
          plataforma integral. Control de asistencias, calificaciones y
          comunicación en un solo lugar.
        </Text>
        <HStack spacing={4} mt={4}>
          <Button
            colorScheme="blue"
            size="lg"
            rounded="full"
            px={8}
            shadow="md"
            transition="all 0.3s ease"
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
          >
            Comenzar Ahora
          </Button>
          <Button
            variant="outline"
            size="lg"
            rounded="full"
            px={8}
            colorScheme="blue"
            _hover={{ bg: 'blue.50' }}
          >
            Ver Demo
          </Button>
        </HStack>
      </VStack>

      {/* Servicios Ofrecidos - Cards */}
      <Box py={16}>
        <VStack spacing={12}>
          <VStack spacing={2}>
            <Text
              textTransform="uppercase"
              color="blue.500"
              fontWeight="bold"
              fontSize="sm"
              letterSpacing="wide"
            >
              Nuestros Servicios
            </Text>
            <Heading size="2xl" textAlign="center">
              Todo lo que necesitas para tu institución
            </Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {[
              {
                title: 'Gestión de Asistencias',
                icon: '📊',
                desc: 'Control detallado de asistencias con reportes en tiempo real y verificación por GPS.',
              },
              {
                title: 'Control de Calificaciones',
                icon: '📈',
                desc: 'Registro y seguimiento de calificaciones con generación automática de boletines.',
              },
              {
                title: 'Comunicación con Padres',
                icon: '💬',
                desc: 'Canal directo entre profesores y representantes para un seguimiento efectivo.',
              },
              {
                title: 'Planificación Escolar',
                icon: '📅',
                desc: 'Asignación de planificaciones por materia y grado a cada profesor.',
              },
              {
                title: 'Panel de Control',
                icon: '📱',
                desc: 'Dashboard completo con estadísticas y métricas de tu plantel.',
              },
              {
                title: 'Reportes Avanzados',
                icon: '📑',
                desc: 'Genera reportes personalizados en PDF, Excel y más formatos.',
              },
            ].map((service, index) => (
              <Box
                key={index}
                p={6}
                bg={cardBg}
                rounded="xl"
                shadow="md"
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-5px)',
                  shadow: 'xl',
                  bg: cardHoverBg,
                }}
                border="1px"
                borderColor={cardBorderColor}
              >
                <Text fontSize="3xl" mb={4}>
                  {service.icon}
                </Text>
                <Heading size="md" mb={2}>
                  {service.title}
                </Heading>
                <Text color={textColor}>{service.desc}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Sección Transformando la Educación */}
      <Box py={20} bg={bgColor}>
        <Container maxW="7xl">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={16}
            alignItems="center"
          >
            <Stack spacing={6}>
              <Badge
                colorScheme="blue"
                px={3}
                py={1}
                rounded="full"
                w="fit-content"
                fontSize="sm"
              >
                ✨ Transformando la Educación
              </Badge>
              <Heading size="2xl" lineHeight="tall" color={headingColor}>
                Simplifica la gestión educativa hoy mismo con nuestra plataforma
                en la nube.
              </Heading>
              <Text fontSize="lg" color={textColor} lineHeight="tall">
                Todo lo que necesitas para gestionar tu institución educativa de
                manera eficiente y moderna.
              </Text>
              <VStack align="start" spacing={4} mt={4}>
                {[
                  'Registra, edita y consulta datos de estudiantes y profesores',
                  'Asistencias en tiempo real con verificación GPS',
                  'Panel de control con estadísticas actualizadas',
                  'Diseñada a medida para tus necesidades específicas',
                ].map((item, i) => (
                  <HStack key={i} align="start" spacing={3}>
                    <Icon as={CheckCircleIcon} color="green.500" mt={1} />
                    <Text color={textColor}>{item}</Text>
                  </HStack>
                ))}
              </VStack>
              <Button
                colorScheme="blue"
                size="lg"
                mt={6}
                px={8}
                rounded="full"
                shadow="md"
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              >
                Comenzar Gratis
              </Button>
            </Stack>
            <Flex justify="center">
              <Box
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  top: -10,
                  left: -10,
                  right: 10,
                  bottom: 10,
                  bg: 'blue.400',
                  zIndex: -1,
                  rounded: 'xl',
                  opacity: 0.2,
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Plataforma educativa"
                  rounded="xl"
                  shadow="2xl"
                  maxW="500px"
                  w="full"
                  objectFit="cover"
                  transition="all 0.3s ease"
                  _hover={{ transform: 'scale(1.02)' }}
                />
              </Box>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Sección Acceso desde cualquier dispositivo */}
      <Box py={20}>
        <Container maxW="7xl">
          <VStack spacing={16}>
            <Box
              w="full"
              h="60vh"
              minH="400px"
              backgroundImage="url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
              backgroundSize="cover"
              backgroundPosition="center"
              rounded="2xl"
              position="relative"
              overflow="hidden"
              shadow="2xl"
            >
              <VStack
                w="full"
                h="full"
                justify="center"
                px={{ base: 6, md: 12 }}
                bgGradient="linear(to-r, blackAlpha.800, blackAlpha.400)"
              >
                <Stack maxW="2xl" align="flex-start" spacing={6}>
                  <Text
                    color="white"
                    fontWeight="bold"
                    lineHeight={1.2}
                    fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                    textShadow="0 2px 4px rgba(0,0,0,0.3)"
                  >
                    Accede a toda la información de tu plantel desde cualquier
                    dispositivo y ubicación
                  </Text>
                  <Text
                    color="whiteAlpha.900"
                    fontSize={{ base: 'md', md: 'lg' }}
                    textShadow="0 1px 2px rgba(0,0,0,0.3)"
                  >
                    Sin necesidad de instalar software. 100% en la nube y
                    compatible con todos tus dispositivos.
                  </Text>
                  <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                    <Button
                      bg="blue.500"
                      color="white"
                      size="lg"
                      rounded="full"
                      px={8}
                      shadow="lg"
                      _hover={{ bg: 'blue.600', transform: 'translateY(-2px)' }}
                      transition="all 0.3s ease"
                    >
                      Probar Gratis
                    </Button>
                    <Button
                      bg="whiteAlpha.200"
                      color="white"
                      size="lg"
                      rounded="full"
                      px={8}
                      backdropFilter="blur(10px)"
                      border="1px"
                      borderColor="whiteAlpha.300"
                      _hover={{ bg: 'whiteAlpha.300' }}
                    >
                      Ver Funcionalidades
                    </Button>
                  </Stack>
                </Stack>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Sección ¡Y tiene App! */}
      <Box py={20} bg={useColorModeValue('white', 'gray.800')}>
        <Container maxW="7xl">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={16}
            alignItems="center"
          >
            <Flex justify="center" order={{ base: 2, lg: 1 }}>
              <Box position="relative">
                <Image
                  src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="App móvil"
                  rounded="2xl"
                  shadow="2xl"
                  maxW="400px"
                  w="full"
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  bottom="-20"
                  right="-20"
                  bg="green.500"
                  color="white"
                  px={4}
                  py={2}
                  rounded="full"
                  shadow="lg"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  Disponible ahora
                </Box>
              </Box>
            </Flex>
            <Stack spacing={6} order={{ base: 1, lg: 2 }}>
              <Badge
                colorScheme="green"
                px={3}
                py={1}
                rounded="full"
                w="fit-content"
                fontSize="sm"
              >
                📱 ¡Nueva App Móvil!
              </Badge>
              <Heading size="2xl" lineHeight="tall" color={headingColor}>
                <Text as="span" color="blue.500">
                  ¡Y tiene App!
                </Text>{' '}
                Para iOS y Android
              </Heading>
              <Text fontSize="lg" color={textColor} lineHeight="tall">
                Desde su panel de control estará siempre informado con las
                ultimas actualizaciones de su plantel educativo. Reciba
                notificaciones en tiempo real y acceda a todas las
                funcionalidades desde su móvil.
              </Text>
              <HStack mt={4} spacing={4}>
                <Button
                  as="a"
                  href="#"
                  variant="unstyled" // Elimina todos los estilos por defecto (fondo, bordes, sombras)
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _focus={{ boxShadow: 'none' }} // Elimina la sombra azul al hacer clic
                  _active={{ boxShadow: 'none' }} // Elimina la sombra al mantener presionado
                >
                  <AppStoreBadge />
                </Button>

                <Button
                  as="a"
                  href="#"
                  variant="unstyled"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _focus={{ boxShadow: 'none' }}
                  _active={{ boxShadow: 'none' }}
                >
                  <PlayStoreBadge />
                </Button>
              </HStack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Patrocinadores */}
      <Box py={16} bg={bgColor}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={textColor}
              textAlign="center"
            >
              Empresas e instituciones que confían en nosotros
            </Text>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} w="full">
              {[
                { src: image5, alt: 'Patrocinador 1' },
                { src: logotipo1, alt: 'Patrocinador 2' },
                { src: logotipo2, alt: 'Patrocinador 3' },
                { src: logotipo3, alt: 'Patrocinador 4' },
              ].map((logo, index) => (
                <Flex
                  key={index}
                  justify="center"
                  align="center"
                  p={4}
                  bg={cardBg}
                  rounded="lg"
                  shadow="sm"
                  _hover={{ shadow: 'md', transform: 'scale(1.05)' }}
                  transition="all 0.3s ease"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    boxSize="60px"
                    objectFit="contain"
                    opacity={0.8}
                    _hover={{ opacity: 1 }}
                  />
                </Flex>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Container>
  );
};

export default Home;
