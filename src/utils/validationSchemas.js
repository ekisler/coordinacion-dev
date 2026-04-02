import * as Yup from 'yup';
;

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .required('El usuario es obligatorio'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
});

export const emailValidationSchema = Yup.string({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Correo electrónico inválido'
    )
    .required('El correo electrónico es obligatorio'),
});

export const studentValidationSchema = Yup.object({
  studentName: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre solo permite letras y espacios'
    )
    .min(2, 'Minimo 2 caracteres para el nombre')
    .max(50, 'Máximo 50 caracteres para el nombre')
    .test('max-words', 'Máximo 3 palabras permitidas', value =>
      value ? value.trim().split(/\s+/).length <= 3 : true
    )
    .required('El nombre es obligatorio'),
  studentLastName: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El apellido solo permite letras y espacios'
    )
    .min(2, 'Minimo 2 caracteres para el apellido')
    .max(50, 'Máximo 50 caracteres para el apellido')
    .test('max-words', 'Máximo 3 palabras permitidas', value =>
      value ? value.trim().split(/\s+/).length <= 3 : true
    )
    .required('El apellido es obligatorio'),
  birthPlace: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'Lugar de nacimiento solo permite letras y espacios'
    )
    .min(3, 'Minimo 3 caracteres para lugar de nacimiento')
    .required('El lugar de nacimiento es obligatorio'),
  birthDate: Yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro')
    .min(
      new Date('1930-01-01'),
      'La fecha de nacimiento no puede ser antes de 1930'
    ),
  sex: Yup.string()
    .oneOf(['Masculino', 'Femenino'], 'Seleccione un género válido')
    .required('El género es obligatorio'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Correo electrónico inválido'
    )
    .required('El correo electrónico es obligatorio'),
  phone: Yup.string()
    .matches(
      /^[0-9]{11}$/,
      'El número de teléfono debe tener 11 dígitos solo números'
    )
    .required('El número de teléfono es obligatorio'),
  fide_num: Yup.string().matches(
    /^[0-9]{7}$/,
    'El Id FIDE debe tener 7 dígitos numéricos'
  ),
  size: Yup.string()
    .matches(
      /^[A-Za-z0-9\s]+$/,
      'Solo letras, números, espacios y un máximo 8 caracteres'
    )
    .min(4, 'Minimo 4 caracteres')
    .max(8, 'Máximo 8 caracteres')
    .required('Las tallas son obligatorias'),
  address: Yup.string()
    .matches(/^[A-Za-z0-9\s.,!?()-]+$/, 'Solo letras, números y espacios')
    .max(150, 'Máximo 150 caracteres')
    .min(10, 'Mínimo 10 caracteres')
    .required('La dirección es obligatoria'),
  imageUrl: Yup.mixed()
  .nullable()
});

export const representativeValidationSchema = Yup.object({
  representativeName: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre solo permite letras y espacios'
    )
    .min(2, 'Minimo 2 caracteres para el nombre')
    .max(50, 'Máximo 50 caracteres para el nombre')
    .test('max-words', 'Máximo 3 palabras permitidas', value =>
      value ? value.trim().split(/\s+/).length <= 3 : true
    )
    .required('El nombre es obligatorio'),
  representativeLastName: Yup.string()
    .min(2, 'Minimo 2 caracteres para el apellido')
    .max(50, 'Máximo 50 caracteres para el apellido')
    .required('El apellido es obligatorio'),
  birthPlace: Yup.string()
    .min(3, 'Minimo 3 caracteres para lugar de nacimiento')
    .required('El lugar de nacimiento es obligatorio'),
  birthDate: Yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro')
    .min(
      new Date('1930-01-01'),
      'La fecha de nacimiento no puede ser antes de 1930'
    )
    .required('La fecha de nacimiento es obligatoria'),
  sex: Yup.string()
    .oneOf(['Masculino', 'Femenino'], 'Seleccione un género válido')
    .required('El género es obligatorio'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Correo electrónico inválido'
    )
    .required('El correo electrónico es obligatorio'),
  phone: Yup.string()
    .matches(
      /^[0-9]{11}$/,
      'El número de teléfono debe tener 11 dígitos solo números'
    )
    .required('El número de teléfono es obligatorio'),
  profession: Yup.string()
    .min(3, 'Minimo 3 caracteres para la profesión')
    .required('La profesión es obligatoria'),
  address: Yup.string()
    .matches(/^[A-Za-z0-9\s., !?()-]+$/, 'Solo letras, números y espacios')
    .max(150, 'Máximo 150 caracteres')
    .min(10, 'Mínimo 10 caracteres')
    .required('La dirección es obligatoria'),
  imageUrl: Yup.mixed()
    .nullable()
});

export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(20, 'El usuario no puede superar los 20 caracteres')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'El usuario solo puede contener letras, números y guiones bajos'
    )
    .required('El usuario es obligatorio'),

  name: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre solo permite letras y espacios'
    )
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es obligatorio'),

  lastname: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El apellido solo permite letras y espacios'
    )
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .required('El apellido es obligatorio'),

  email: Yup.string()
    .email('Correo electrónico inválido')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),

  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'La contraseña debe incluir al menos una letra mayúscula')
    .matches(/[a-z]/, 'La contraseña debe incluir al menos una letra minúscula')
    .matches(/[0-9]/, 'La contraseña debe incluir al menos un número')
    .matches(
      /[\W_]/,
      'La contraseña debe incluir al menos un carácter especial'
    )
    .required('La contraseña es obligatoria'),
});

export const teacherValidationSchema = Yup.object({
  teacherName: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre solo permite letras y espacios'
    )
    .min(2, 'Minimo 2 caracteres para el nombre')
    .max(50, 'Máximo 50 caracteres para el nombre')
    .test('max-words', 'Máximo 3 palabras permitidas', value =>
      value ? value.trim().split(/\s+/).length <= 3 : true
    ),
  teacherLastName: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El apellido solo permite letras y espacios'
    )
    .min(2, 'Minimo 2 caracteres para el apellido')
    .max(50, 'Máximo 50 caracteres para el apellido')
    .test('max-words', 'Máximo 3 palabras permitidas', value =>
      value ? value.trim().split(/\s+/).length <= 3 : true
    ),
  birthPlace: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'Lugar de nacimiento solo permite letras y espacios'
    )
    .min(3, 'Minimo 3 caracteres para lugar de nacimiento'),
  birthDate: Yup.date()
    .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro')
    .min(
      new Date('1930-01-01'),
      'La fecha de nacimiento no puede ser antes de 1930'
    ),
  sex: Yup.string()
    .oneOf(['Masculino', 'Femenino'], 'Seleccione un género válido'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Correo electrónico inválido'
    ),
  profession: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'La profesión solo permite letras y espacios'
    )
    .min(4, 'Minimo 4 caracteres para la profesión')
    .max(50, 'Máximo 50 caracteres para la profesión')
    .test('max-words', 'Máximo 3 palabras permitidas', value =>
      value ? value.trim().split(/\s+/).length <= 3 : true
    ),
  phone: Yup.string()
    .matches(
      /^[0-9]{11}$/,
      'El número de teléfono debe tener 11 dígitos solo números'
    )
    .required('El número de teléfono es obligatorio'),
  size: Yup.string()
    .min(4, 'Minimo 4 caracteres para las tallas')
    .max(8, 'Máximo 8 caracteres para las tallas')
    .matches(
      /^[A-Za-z0-9\s]+$/,
      'Solo letras, números, espacios y un máximo 8 caracteres'
    )
    .required('Las tallas son obligatorias'),
  address: Yup.string()
    .matches(/^[A-Za-z0-9\s.,!?()-]+$/, 'La dirección solo permite letras, números y espacios')
    .max(150, 'Máximo 150 caracteres')
    .min(10, 'Mínimo 10 caracteres')
    .required('La dirección es obligatoria'),
  imageUrl: Yup.mixed()
    .nullable(),
  curriculumUrl: Yup.mixed()
    .nullable()
});

export const contacValidationSchema = Yup.object().shape({
  from_name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre completo es obligatorio'),
  email: Yup.string()
    .email('El email no es válido')
    .required('El correo electrónico es obligatorio'),
  role: Yup.string()
    .min(3, 'El asunto debe tener al menos 3 caracteres')
    .required('El asunto es obligatorio'),
  message: Yup.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .required('El mensaje es obligatorio'),
});
