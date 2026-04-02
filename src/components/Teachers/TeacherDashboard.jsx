import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttendanceLists, getTeacherByUserId } from '../../store/actions/teacherActions';
import { getAssignmentsByTeacher } from '../../store/actions/planningActions';
import { Box, Stack, Spinner, Text } from '@chakra-ui/react';
import AccessDenied from '../../utils/AccessDenied';
import AssignedPlannings from '../Planning/TDashboard';
import AssignedAttendanceLists from './AssignedAttendanceLists';

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const userId = user?.userId;
  const teacher = useSelector(state => state?.teachers?.teacher);
  const assignments = useSelector(state => state?.assignments?.assignments);
  const attendanceLists = useSelector(state => state?.attendance?.lists); // NUEVO SELECTOR

  // Verificando que los estados de carga existan
  const loadingTeacher = useSelector(state => state.teachers?.loading) || false;
  const loadingAssignments =
    useSelector(state => state.assignments?.loading) || false;
  const loadingAttendance =
    useSelector(state => state.attendance?.loading) || false;

  // Combinando todos los estados de carga
  const loading = loadingTeacher || loadingAssignments || loadingAttendance;

  const isTeacher = user?.roles?.isTeacher;
  const isDisabled = user?.roles?.isDisabled;

  useEffect(() => {
    if (userId) {
      dispatch(getTeacherByUserId(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (teacher?.userId) {
      dispatch(getAssignmentsByTeacher(teacher?.userId));
      dispatch(getAttendanceLists(teacher?.userId)); // NUEVA PETICIÓN
    }
  }, [dispatch, teacher]);

  return (
    <Box>
      <Stack>
        {!isTeacher || isDisabled ? (
          <AccessDenied />
        ) : loading ? (
          <Spinner mt={24} />
        ) : (
          <>
            <Text>Aquí las planificaciones</Text>
            <AssignedPlannings teacher={teacher} assignments={assignments} />
            <Text>Aquí las listas</Text>
            <AssignedAttendanceLists
              teacher={teacher}
              attendanceLists={attendanceLists}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};

export default TeacherDashboard;
