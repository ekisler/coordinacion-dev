import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Flex, Icon, Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import {
  FaRegUser,
  FaChartBar,
  FaUserShield,
} from 'react-icons/fa';
import { GiTeacher } from "react-icons/gi";
import { IoListSharp } from "react-icons/io5";
import { PiStudentBold } from 'react-icons/pi';
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { AiOutlineAudit } from "react-icons/ai";

const SidebarItem = ({ icon, label, path, isActive }) => {
  const navigate = useNavigate();
  return (
    <Link
      onClick={() => navigate(path)}
      _hover={{ textDecor: 'none' }}
      className={isActive ? 'active' : ''}
    >
      <Flex
        align="center"
        p={2}
        borderRadius="lg"
        _hover={{ bg: 'blue.600', color: 'white' }}
        className={`sidebar-item ${isActive ? 'active' : ''}`}
        sx={{
          backgroundColor: isActive ? 'blue.600' : undefined,
          color: isActive ? 'white' : undefined,
          '&:hover': {
            backgroundColor: isActive ? 'blue.700' : undefined,
          },
        }}
      >
        <Icon as={icon} mr={3} boxSize={3} />{' '}
        <Text fontSize="xs" fontWeight="medium">
          {label}
        </Text>
      </Flex>
    </Link>
  );
};

const Sidebar = () => {
  const { user } = useSelector(state => state.auth);
  const isSuperAdmin = user?.roles?.isSuperAdmin;
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const bgColor = useColorModeValue('blue.50', 'blue.900')
  const useColor = useColorModeValue('gray.700', 'gray.200');

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  if (!isSuperAdmin) return null;

  return (
    <Box
      w={{ base: 'auto', md: '150px' }} // Cambiado el ancho del SideBar
      justifyContent={{ base: 'center', md: 'center' }}
      display={{ base: 'flex', md: 'block' }}
      bg={bgColor}
      color={useColor}
      borderRight={'1px solid'}

      p={3}
    >
      <VStack align="stretch" spacing={3}>
        <Text fontSize="xm" fontWeight={'bold'}  textAlign="center" mt={4}>
          {user?.lastname} {' '} {user?.name}
        </Text>
        <Text></Text>
        <SidebarItem
          icon={MdOutlineFamilyRestroom}
          label="Representantes"
          path="/dashboard/representatives"
          isActive={activePath === '/dashboard/representatives'}
        />
        <SidebarItem
          icon={FaRegUser}
          label="Usuarios"
          path="/dashboard/users"
          isActive={activePath === '/dashboard/users'}
        />
        <SidebarItem
          icon={PiStudentBold}
          label="Estudiantes"
          path="/dashboard/students"
          isActive={activePath === '/dashboard/students'}
        />
        <SidebarItem
          icon={GiTeacher}
          label="Profesores"
          path="/dashboard/teachers"
          isActive={activePath === '/dashboard/teachers'}
        />
        <SidebarItem
          icon={IoListSharp}
          label="Listas"
          path="/dashboard/lists"
          isActive={activePath === '/dashboard/lists'}
        />
        <SidebarItem
          icon={FaChartBar}
          label="Estadísticas"
          path="/dashboard/stats"
          isActive={activePath === '/dashboard/stats'}
        />
        <SidebarItem
          icon={FaUserShield}
          label="Administración"
          path="/dashboard/admin"
          isActive={activePath === '/dashboard/admin'}
        />
        <SidebarItem
          icon={AiOutlineAudit}
          label="Registros"
          path="/dashboard/audits"
          isActive={activePath === '/dashboard/audits'}
        />
      </VStack>
    </Box>
  );
};

export default Sidebar;
