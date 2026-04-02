import { deleteTeacher } from '../store/actions/teacherActions';

export const handleDisableTeacher = (teacher, dispatch, toast) => {
  const isDisabled = teacher?.userId?.roles?.isDisabled;
  const action = isDisabled ? 'habilitado' : 'inhabilitado';

  if (
    window.confirm(
      `El Profesor(a) ${teacher?.teacherName} será ${
        isDisabled ? 'habilitado' : 'inhabilitado'
      }, haga click en Aceptar, de lo contrario haga click en Cancelar`
    )
  ) {
    dispatch(deleteTeacher(teacher._id, !isDisabled));

    toast({
      title: `El Profesor(a) ${teacher?.teacherName} ha sido ${action}.`,
      status: isDisabled ? 'success' : 'error',
      duration: 6000,
      isClosable: true,
      position: 'top',
    });
  }
};
