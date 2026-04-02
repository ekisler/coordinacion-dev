import { Center, Heading, Stack, Text } from '@chakra-ui/react';
import { BiSolidUserDetail } from 'react-icons/bi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  getTeachersById,
  getAttendanceListsById,
} from '../../store/actions/teacherActions.js';
import {
  getAssignmentsByTeacher,
  resetAssignments,
} from '../../store/actions/planningActions.js';
import { selectAttendanceLists } from '../../store/selectors.js';
import AccessDenied from '../../utils/AccessDenied.jsx';
import { Skeleto } from '../../utils/Skeleton.jsx';
import TeacherInfo from './TeacherInfo.jsx';
import AttendanceModal from './AttendanceModal.jsx';
import AssignmentsModal from './AssignmentsModals.jsx';
import { calculateAge } from '../../utils/calculateAge.js';

const TeacherDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const isTeacher = user?.roles?.isTeacher;
  const teacher = useSelector(state => state?.teachers?.teacher);
  const loading = useSelector(state => state?.teachers?.loading);
  const assignments = useSelector(state => state?.assignments?.assignments);
  const loadingAssignments = useSelector(state => state.assignments.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignmentsLoaded, setAssignmentsLoaded] = useState(false);
  const [isAttendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [loadingAttendances, setLoadingAttendances] = useState(false);
  const [attendancesLoaded, setAttendancesLoaded] = useState(false);
  const attendances = useSelector(selectAttendanceLists);
  const openAttendanceModal = () => setAttendanceModalOpen(true);
  const closeAttendanceModal = () => setAttendanceModalOpen(false);

  const loadAttendanceLists = async () => {
    if (attendancesLoaded) return;
    setLoadingAttendances(true);
    try {
      await dispatch(getAttendanceListsById(teacher?.userId));
    } catch (error) {}
    setLoadingAttendances(false);
    setAttendancesLoaded(true);
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setAssignmentsLoaded(false);
  };

  const loadAssignments = () => {
    if (teacher?.userId) {
      dispatch(getAssignmentsByTeacher(teacher.userId));
      setAssignmentsLoaded(true);
    }
  };

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        if (id) {
          dispatch({ type: 'RESET_TEACHER' });
          await dispatch(getTeachersById(id));
        }
      } catch (error) {
        console.error('Error al obtener el profesor:', error);
      }
    };

    fetchTeacher();
  }, [dispatch, id]);

  useEffect(() => {
    if (teacher?.userId) {
      dispatch(resetAssignments());
      dispatch(getAssignmentsByTeacher(teacher?.userId));
      return () => {
        dispatch(resetAssignments());
      };
    }
  }, [dispatch, teacher?.userId]);

  if (!isAdmin || isDisabled || !isTeacher) {
    return <AccessDenied />;
  }

  const age = calculateAge(teacher?.birthDate);

  const formatteBirthDate = teacher?.birthDate
    ? moment(teacher?.birthDate).format('DD/MM/YYYY')
    : '-';

  return (
    <Stack>
      <Heading mt={12} align={'center'} size="lg">
        <Stack direction="row" align="center" justify="center">
          <BiSolidUserDetail />
          <Text>Detalles del Profesor(a)</Text>
        </Stack>
      </Heading>
      <Center py={12} align={'center'}>
        {loading ? (
          <Stack size="xl" mb={32} mt={24}>
            <Skeleto />
          </Stack>
        ) : (
          <TeacherInfo
            teacher={teacher}
            age={age}
            formatteBirthDate={formatteBirthDate}
            openAttendanceModal={openAttendanceModal}
            openModal={openModal}
          />
        )}
      </Center>
      <AttendanceModal
        isAttendanceModalOpen={isAttendanceModalOpen}
        closeAttendanceModal={closeAttendanceModal}
        teacher={teacher}
        loadAttendanceLists={loadAttendanceLists}
        loadingAttendances={loadingAttendances}
        attendancesLoaded={attendancesLoaded}
        attendances={attendances}
      />
      <AssignmentsModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        teacher={teacher}
        loadAssignments={loadAssignments}
        loadingAssignments={loadingAssignments}
        assignmentsLoaded={assignmentsLoaded}
        assignments={assignments}
      />
    </Stack>
  );
};

export default TeacherDetails;
