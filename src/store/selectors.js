import { createSelector } from 'reselect';

const selectTeacherState = state => state?.teachers;
const selectAttendancesState = state => state?.attendances;
const selectStudentsState = state => state?.students;

export const selectAttendanceLists = createSelector(
  [selectTeacherState],
  teachersState => teachersState?.attendanceLists?.lists || []
);

export const selectAttendances = createSelector(
  [selectAttendancesState],
  attendancesState => attendancesState?.attendances
);

export const selectStudents = createSelector(
  [selectStudentsState],
  studentsState => studentsState?.students
);

export const selectGroupedStudents = createSelector(
  [selectStudents],
  students => {
    const grouped = students?.reduce((acc, student) => {
      if (student?.grade && student?.section && student?.schedule) {
        const key = `${student?.grade}-${student?.section}-${student?.schedule}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(student);
      }
      return acc;
    }, {});

    return grouped;
  }
);

