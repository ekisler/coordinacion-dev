import * as Yup from 'yup';

export const contactFormSchema = Yup.object({
  from_name: Yup.string().required('El nombre es requerido'),
  email: Yup.string()
    .email('Correo inválido')
    .required('El correo es requerido'),
  role: Yup.string().required('El asunto es requerido'),
  message: Yup.string().required('El mensaje es requerido'),
});
