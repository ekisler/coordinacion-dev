import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/actions/authActions';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { IoIosHome } from 'react-icons/io';
import { PiStudentBold } from 'react-icons/pi';
import { GiTeacher } from 'react-icons/gi';
import { TbCalendar } from 'react-icons/tb';
import { IoListSharp } from 'react-icons/io5';
import { MdOutlineContactMail } from 'react-icons/md';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { AiOutlineControl } from 'react-icons/ai';
import { IoIosLogOut } from 'react-icons/io';
import { IoIosLogIn } from 'react-icons/io';
import { IoIosPersonAdd } from 'react-icons/io';
import logo512 from '../../assets/logo512.png';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const bpValue = useBreakpointValue({ base: 'center', md: 'left' });
  const colorValue = useColorModeValue('gray.800', 'white');
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const greenColor = useColorModeValue('green.500', 'green.200');

  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleLogout = async e => {
    e.preventDefault();
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Error en logout:', error);
      alert('Error al cerrar sesión');
    }
  };

  return (
    <Box position="sticky" w="100%" zIndex={10} bg={bgColor} px={10} py={-1}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'flex-end', md: 'start' }}
          alignItems="center"
        >
          <Text
            textAlign={bpValue}
            fontFamily={'heading'}
            color={colorValue}
          ></Text>
          <NavLink to="/" onClick={onClose}>
            {' '}
            <Image
              src={logo512}
              alt="Logo"
              width={50}
              height={29}
              ml={{ base: 0, md: 4 }}
            />
          </NavLink>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
        >
          {isAuthenticated ? (
            <Button
              as={'a'}
              fontSize={'xs'}
              fontWeight={400}
              variant={'link'}
              color={'red.500'} // <--- Esto pone el texto y el icono en rojo
              _hover={{ textDecoration: 'none', color: 'red.600' }}
              href="/login"
              onClick={handleLogout}
              leftIcon={<IoIosLogOut fontSize="1.3em" />}
            >
              Salir{' '}
              <Text as="span" color={linkColor} ml={2}>
                {user?.username}
              </Text>
            </Button>
          ) : (
            <>
              <Button
                as={'a'}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                href={'/login'}
                leftIcon={<IoIosLogIn fontSize="1.3em" />}
                color={greenColor}
              >
                Entrar
              </Button>
              <Button
                as={'a'}
                display={{ base: 'none', md: 'inline-flex' }}
                px={2}
                fontSize={'sm'}
                size={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'blue.600'}
                href={'/register'}
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Registrate
              </Button>
            </>
          )}
        </Stack>
        <Stack direction={'row'} spacing={7}>
          <Button
            onClick={toggleColorMode}
            ml={1}
            size={{ base: 'xs', md: 'sm' }}
            px={{ base: 1, md: 2 }}
            height={{ base: '28px', md: '34px' }}
            minW={{ base: '28px', md: '34px' }}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav
          onClose={onClose}
          handleLogout={handleLogout}
          linkColor={linkColor}
        />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const isTeacher = user?.roles?.isTeacher;

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            {navItem.label === 'Home' && (
              <PopoverTrigger>
                <NavLink
                  to={navItem.href ?? '#'} // Cambia href por toz
                  style={() => ({
                    padding: '8px',
                    fontSize: '14px',
                    fontWeight: 100,
                    color: { linkColor },
                    hover: {
                      color: linkHoverColor,
                    },
                    textDecoration: 'none',
                  })}
                >
                  <Icon as={IoIosHome} mr={1} fontSize="1em" />
                  {navItem.label}
                </NavLink>
              </PopoverTrigger>
            )}

            {isAuthenticated && navItem.label !== 'Home' && (
              <Fragment>
                {navItem.label === 'Estudiantes' &&
                  isAdmin &&
                  isDisabled === false && (
                    <Box key={navItem.label}>
                      <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                          <Box
                            as="a"
                            p={2}
                            href={navItem.href ?? '#'}
                            fontSize={'sm'}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                              textDecoration: 'none',
                              color: linkHoverColor,
                            }}
                          >
                            <Icon as={PiStudentBold} mr={1} fontSize="1em" />
                            {navItem.label}
                          </Box>
                        </PopoverTrigger>
                        <PopoverContent
                          border={0}
                          boxShadow={'xl'}
                          bg={popoverContentBgColor}
                          p={4}
                          rounded={'xl'}
                          minW={'sm'}
                        >
                          <Stack>
                            {navItem.children.map(child => (
                              <DesktopSubNav key={child.label} {...child} />
                            ))}
                          </Stack>
                        </PopoverContent>
                      </Popover>
                    </Box>
                  )}
                {navItem.label === 'Profesores' &&
                  isAdmin &&
                  isDisabled === false && (
                    <Box key={navItem.label}>
                      <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                          <Box
                            as="a"
                            p={2}
                            href={navItem.href ?? '#'}
                            fontSize={'sm'}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                              textDecoration: 'none',
                              color: linkHoverColor,
                            }}
                          >
                            <Icon as={GiTeacher} mr={1} fontSize="1em" />
                            {navItem.label}
                          </Box>
                        </PopoverTrigger>
                        <PopoverContent
                          border={0}
                          boxShadow={'xl'}
                          bg={popoverContentBgColor}
                          p={4}
                          rounded={'xl'}
                          minW={'sm'}
                        >
                          <Stack>
                            {navItem.children.map(child => (
                              <DesktopSubNav key={child.label} {...child} />
                            ))}
                          </Stack>
                        </PopoverContent>
                      </Popover>
                    </Box>
                  )}
              </Fragment>
            )}
            {navItem.label === 'Planificación' && isTeacher && (
              <PopoverTrigger>
                <NavLink
                  to={navItem.href}
                  style={({ isActive }) => ({
                    padding: '8px',
                    fontSize: '14px',
                    fontWeight: 100,
                    color: { linkColor },
                    hover: {
                      color: linkHoverColor,
                    },
                    textDecoration: 'none',
                  })}
                >
                  <Icon as={TbCalendar} mr={1} fontSize="1em" />
                  {navItem.label}
                </NavLink>
              </PopoverTrigger>
            )}
            {navItem.label === 'Listas' && isTeacher && (
              <PopoverTrigger>
                <NavLink
                  to={navItem.href}
                  style={({ isActive }) => ({
                    padding: '8px',
                    fontSize: '14px',
                    fontWeight: 100,
                    color: { linkColor },
                    hover: {
                      color: linkHoverColor,
                    },
                    textDecoration: 'none',
                  })}
                >
                  <Icon as={IoListSharp} mr={1} fontSize="1em" />
                  {navItem.label}
                </NavLink>
              </PopoverTrigger>
            )}
            {navItem.label === 'Agente-Teacher-AI' && isTeacher && (
              <PopoverTrigger>
                <NavLink
                  to={navItem.href}
                  style={({ isActive }) => ({
                    padding: '8px',
                    fontSize: '14px',
                    fontWeight: 100,
                    color: { linkColor },
                    hover: {
                      color: linkHoverColor,
                    },
                    textDecoration: 'none',
                  })}
                >
                  <Icon as={GiArtificialIntelligence} mr={1} fontSize="1em" />
                  {navItem.label}
                </NavLink>
              </PopoverTrigger>
            )}
            {navItem.label === 'Contáctanos' && (
              <PopoverTrigger>
                <NavLink
                  to={navItem.href}
                  style={({ isActive }) => ({
                    padding: '8px',
                    fontSize: '14px',
                    fontWeight: 100,
                    color: { linkColor },
                    hover: {
                      color: linkHoverColor,
                    },
                    textDecoration: 'none',
                  })}
                >
                  <Icon as={MdOutlineContactMail} mr={1} fontSize="1em" />
                  {navItem.label}
                </NavLink>
              </PopoverTrigger>
            )}
            {navItem.label === 'Panel de control' && isSuperAdmin && (
              <PopoverTrigger>
                <NavLink
                  to={navItem.href}
                  style={({ isActive }) => ({
                    padding: '8px',
                    fontSize: '14px',
                    fontWeight: 100,
                    color: { linkColor },
                    hover: {
                      color: linkHoverColor,
                    },
                    textDecoration: 'none',
                  })}
                >
                  <Icon as={AiOutlineControl} mr={1} fontSize="1em" />
                  {navItem.label}
                </NavLink>
              </PopoverTrigger>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as={NavLink}
      to={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'blue.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = ({ onClose, linkColor, handleLogout }) => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const isTeacher = user?.roles?.isTeacher;

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.find(navItem => navItem.label === 'Home')?.href && (
        <MobileNavItem
          key="Home"
          label="Home"
          onClose={onClose}
          href={NAV_ITEMS.find(navItem => navItem.label === 'Home')?.href}
        />
      )}

      {isAuthenticated && isAdmin && isDisabled === false && (
        <MobileNavItem
          key="Estudiantes"
          label="Estudiantes"
          href="#"
          onClose={onClose}
          show={true}
          children={
            NAV_ITEMS.find(navItem => navItem.label === 'Estudiantes')?.children
          }
        />
      )}

      {isAuthenticated && isAdmin && isDisabled === false && (
        <MobileNavItem
          key="Profesores"
          label="Profesores"
          href="#"
          onClose={onClose}
          show={true}
          children={
            NAV_ITEMS.find(navItem => navItem.label === 'Profesores')?.children
          }
        />
      )}
      {isAuthenticated && isTeacher && isDisabled === false && (
        <MobileNavItem
          key="Planificación"
          label="Mis Planificación"
          href="/dashboard/teacher"
          onClose={onClose}
          show={true}
          children={
            NAV_ITEMS.find(navItem => navItem.label === 'Planificación')
              ?.children
          }
        />
      )}
      {isAuthenticated && isTeacher && isDisabled === false && (
        <MobileNavItem
          key="Listas"
          label="Listas"
          href="/lists"
          onClose={onClose}
          show={true}
          children={
            NAV_ITEMS.find(navItem => navItem.label === 'Listas')?.children
          }
        />
      )}
      <MobileNavItem
        key="Contáctanos"
        label="Contáctanos"
        href="/contact"
        onClose={onClose}
        show={true}
        children={
          NAV_ITEMS.find(navItem => navItem.label === 'Contáctanos')?.children
        }
      />
      {isAuthenticated && isTeacher && isDisabled === false && (
        <MobileNavItem
          key="Agente-Teacher-AI"
          label="Agente-Teacher-AI"
          href="/chat"
          onClose={onClose}
          show={true}
          children={
            NAV_ITEMS.find(navItem => navItem.label === 'Agente-Teacher-AI')
              ?.children
          }
        />
      )}
      {isAuthenticated && isSuperAdmin && isDisabled === false && (
        <MobileNavItem
          key="Panel de control"
          label="Panel de control"
          href="/dashboard"
          onClose={onClose}
          show={true}
          children={
            NAV_ITEMS.find(navItem => navItem.label === 'Panel de control')
              ?.children
          }
        />
      )}
      {isAuthenticated && (
        <Stack spacing={4} mt={4} pt={4} borderTop={1} borderStyle={'solid'}>
          <Text fontWeight={700} fontSize={'xs'} color={'gray.500'} px={2}>
            {user.username}
          </Text>
          <Button
            display="flex"
            justifyContent="start"
            variant="ghost"
            colorScheme="red"
            leftIcon={<Icon as={IoIosLogOut} fontSize="1.3em" />}
            onClick={handleLogout} // <--- Asegúrate de tener esta función definida arriba
            px={2}
          >
            Cerrar Sesión
          </Button>
        </Stack>
      )}
      {!isAuthenticated && (
        <Stack
          spacing={4}
          mt={4}
          pt={4}
          borderTop={1}
          borderStyle={'solid'}
          borderColor={linkColor}
        >
          <Text fontWeight={700} fontSize={'xs'} color={'gray.500'} px={2}>
            CUENTA
          </Text>

          <MobileNavItem label="Entrar" href="/login" onClose={onClose} />

          <Box px={2}>
            <Button
              as={NavLink}
              to="/register"
              w="full"
              colorScheme="blue"
              onClick={onClose}
              size="md"
              leftIcon={<Icon as={IoIosPersonAdd} />}
            >
              Registrate
            </Button>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href = '#', onClose }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <NavLink
                key={child.label}
                to={child.href} // Asegúrate de que cada `child` tiene su `href`
                onClick={() => {
                  onClose(); // Cierra el menú principal
                }}
                style={({ isActive }) => ({
                  padding: '8px',
                  fontSize: 'sm',
                  fontWeight: 500,
                  color: isActive ? 'blue.500' : 'gray.600',
                  textDecoration: 'none',
                  display: 'block',
                })}
              >
                {child.label}
                {child.subLabel && (
                  <Text fontSize="sm" color="gray.500">
                    - {child.subLabel}
                  </Text>
                )}
              </NavLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

/**
 * @typedef {Object} NavItem
 * @property {string} label
 * @property {string} [subLabel]
 * @property {NavItem[]} [children]
 * @property {string} [href]
 */

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Estudiantes',
    children: [
      {
        label: 'Representantes',
        href: '/representatives',
      },
      {
        label: 'Estudiantes',
        href: '/students',
      },
      {
        label: 'Registrar Representante',
        subLabel: '(Registra un Representante aquí)',
        href: '/postRepresentative',
      },
      {
        label: 'Registrar Estudiante sin representante',
        subLabel: '(Registra Estudiante sin representante)',
        href: '/postStudentOnly',
      },
    ],
  },
  {
    label: 'Profesores',
    children: [
      {
        label: 'Profesores',
        href: 'teachers',
      },
      {
        label: 'Registro de profesores',
        subLabel: 'Registra los profesores aquí',
        href: '/postTeacher',
      },
      {
        label: 'Entradas',
        subLabel: 'Asistencia de profesores',
        href: '/attendances',
      },
      {
        label: 'Salidas',
        subLabel: 'Salidas de profesores',
        href: '/exits',
      },
      {
        label: 'Planificación Escolar',
        subLabel: 'Central de Planificación',
        href: '/planning-management',
      },
    ],
  },
  {
    label: 'Planificación',
    href: '/dashboard/teacher',
  },
  {
    label: 'Listas',
    href: '/lists',
  },
  {
    label: 'Contáctanos',
    href: '/contact',
  },
  {
    label: 'Agente-Teacher-AI',
    href: '/chat',
  },
  {
    label: 'Panel de control',
    href: '/dashboard',
  },
];
