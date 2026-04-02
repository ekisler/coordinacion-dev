import api from './apiInterceptor.js';

export const apiRegisterUser = user => {
  return api.post('/users/registers', user);
};

export const apiLoginUser = (username, password) => {
  return api.post('/users/login', {
    username,
    password,
  });
};

export const apiCheckAuthUser = () => {
  return api.get('/users/checkAuth');
};

export const apiLogoutUser = () => {
  return api.post(`/users/logout`, {});
};

export const apiGetUsers = () => {
  return api.get(`/users/getUsers`);
};

export const apiUpdateUser = (id, data) => {
  return api.patch(`/users/updateUser/${id}`, data);
};

export const apiGetRepresentative = () => {
  return api.get(`/representatives/getRepresentatives`);
};

export const apiGetRepresentativeId = id => {
  return api.get(`/representatives/getRepresentative/${id}`);
};

export const apiPostRepresentative = data => {
  return api.post(`/representatives/postRepresentative`, data);
};

export const apiUpdateRepresentative = (id, data) => {
  return api.patch(`/representatives/updateRepresentative/${id}`, data);
};

export const apiDeleteRepresentative = (id, isDisabled) => {
  return api.delete(`/representatives/deleteRepresentative/${id}`, {
    data: { isDisabled },
  });
};

export const apiGetStudents = () => {
  return api.get(`/students/getStudents`);
};

export const apiGetStudentId = id => {
  return api.get(`/students/getStudent/${id}`);
};

export const apiPostStudent = data => {
  return api.post(`/students/postStudent/`, data);
};

export const apiUpdateStudent = (id, data) => {
  return api.patch(`/students/updateStudent/${id}`, data);
};

export const apiPostOnlyStudent = data => {
  return api.post(`/students/postStudentOnly`, data);
};

export const apiDeleteStudent = (id, isDisabled) => {
  return api.delete(`/students/deleteStudent/${id}`, {
    data: { isDisabled },
  });
};

export const apiGetTeachers = () => {
  return api.get(`/teachers/getTeachers`);
};

export const apiGetTeacherId = id => {
  return api.get(`/teachers/getTeacher/${id}`);
};

export const apiGetTeacherByUserId = userId => {
  return api.get(`/teachers/getTeacherByUserId/${userId}`);
};

export const apiPostTeacher = data => {
  return api.post(`/teachers/postTeacher`, data);
};

export const apiUpdateTeacher = (id, data) => {
  return api.patch(`/teachers/updateTeacher/${id}`, data);
};

export const apiDeleteTeacher = (id, isDisabled) => {
  return api.delete(`/teachers/deleteTeacher/${id}`, {
    data: { isDisabled },
  });
};

export const apiInitiatePasswordReset = email => {
  return api.post(`/users/request-reset`, { email });
};

export const apiChangePassword = (email, newPassword) => {
  return api.put(`/users/reset-password`, { email, newPassword });
};

export const apiGetPlannings = () => {
  return api.get(`/plannings/getPlannings`);
};

export const apiUpdatePlanning = (planningId, updatedData) => {
  return api.put(`/plannings/updatePlanning/${planningId}`, updatedData);
};

export const apiCreatePlanning = newPlanningData => {
  return api.post(`/plannings/postPlanning`, newPlanningData);
};

export const apiAssignPlanningToTeacher = (planningId, teacherId) => {
  return api.post(`/plannings/assignPlanning`, {
    planningId,
    teacherId,
  });
};

export const apiGetAssignmentByTeacher = teacherId => {
  return api.get(`/plannings/getAssignment/${teacherId}`);
};

export const apiGetAttendanceById = studentId => {
  return api.get(`/attendances/getAttendanceById/${studentId}`);
};

export const apiGetAttendances = () => {
  return api.get(`/attendances/getAttendances`);
};

export const apiPostAttendance = attendanceData => {
  return api.post(`/attendances/postAttendance`, attendanceData);
};

export const apiLockAttendance = date => {
  return api.patch(`/attendances/lock/${date}`, {});
};

export const apiGetAttendancesListById = userId => {
  return api.get(`/teachers/getAttendancesListById/${userId}`);
};

export const apiGetAllAttendanceLists = () => {
  return api.get(`/teachers/getAllAttendanceLists`);
};

export const apiAssignAttendanceList = (userId, grade, section, schedule) => {
  return api.post(`/attendances/postAttendancesList`, {
    userId,
    grade,
    section,
    schedule,
  });
};

export const apiGetAudits = () => {
  return api.get(`/audits/getAudits`);
};

export const apiDeleteAsists = id => {
  return api.delete(`/asists/delete-asists/${id}`);
};

export const apiDeleteExits = id => {
  return api.delete(`/asists/delete-exits/${id}`);
};
