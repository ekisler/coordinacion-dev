import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPlannings,
  resetPlanningSuccess,
} from '../../store/actions/planningActions';
import {
  Box,
  Heading,
  Stack,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { BsReverseListColumnsReverse } from 'react-icons/bs';
import SubjectTabs from './SubjectTabs';
import PlanningModal from './PlanningModal';
import AccessDenied from '../../utils/AccessDenied.jsx';
import { SkeletonTDashboard } from '../../utils/Skeleton.jsx';

const PlanningManagement = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const { plannings, loading } = useSelector(state => state.plannings);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPlanning, setSelectedPlanning] = useState(null);

  useEffect(() => {
    dispatch(getPlannings());
  }, [dispatch]);

  const handleEdit = planning => {
    setSelectedPlanning(planning);
    onOpen();
  };

  const handleCreate = () => {
    setSelectedPlanning(null);
    onOpen();
  };

  const handleClose = () => {
    dispatch(resetPlanningSuccess());
    onClose();
  };

  if (!isAdmin || isDisabled) {
    return <AccessDenied />;
  }

  return (
    <Box p={5}>
      <Heading align={'center'} mt={12} mb={4}>
        <Stack direction="row" align="center" justify="center">
          <BsReverseListColumnsReverse />
          <Text>Gestión de Planificaciones</Text>
        </Stack>
      </Heading>
      <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={handleCreate}>
        Nueva Planificación
      </Button>

      {loading ? (
        <SkeletonTDashboard />
      ) : (
        <Box mt={6}>
          <SubjectTabs plannings={plannings} handleEdit={handleEdit} />
        </Box>
      )}

      <PlanningModal
        isOpen={isOpen}
        onClose={handleClose}
        planning={selectedPlanning}
      />
    </Box>
  );
};

export default PlanningManagement;
