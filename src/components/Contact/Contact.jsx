import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import emailjs from '@emailjs/browser';
import { MdOutlineContactMail } from 'react-icons/md';
import { contactFormSchema } from './contactFormSchema';

function Contact() {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      from_name: '',
      email: '',
      role: '',
      message: '',
    },
    validationSchema: contactFormSchema,
    onSubmit: () => {
      if (emailjs && typeof emailjs.sendForm === 'function') {
        emailjs
          .sendForm(
            import.meta.env.VITE_EMAIL_SERVICE,
            import.meta.env.VITE_EMAIL_TEMPLATE,
            document.getElementById('contact-form'),
            import.meta.env.VITE_EMAIL_VALUES
          )
          .then(
            () => {
              toast({
                title: 'Mensaje enviado',
                description:
                  'Gracias por contactarnos. Te responderemos lo antes posible.',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
              });
              formik.resetForm();
            },
            error => {
              toast({
                title: '¡Error!',
                description:
                  error.text || 'Hubo un problema al enviar tu mensaje.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
              });
            }
          );
      } else {
        console.error('emailjs.sendForm no está disponible.');
      }
    },
  });

  return (
    <Box
      as="form"
      id="contact-form"
      onSubmit={formik.handleSubmit}
      borderRadius="md"
      border={'1px'}
      boxShadow="lg"
      p={6}
      mt={2}
      mb={2}
      maxWidth="500px"
      borderColor={'gray.200'}
      mx="auto"
    >
      <Stack mt={'6px'} spacing={6}>
        <Heading fontSize="3xl">
          <Stack direction="row" align="center" justify="center">
            <MdOutlineContactMail />
            <Text>Contáctanos</Text>
          </Stack>
        </Heading>

        <FormControl
          isRequired
          isInvalid={formik.touched.from_name && formik.errors.from_name}
        >
          <FormLabel mt={6}>Nombre Completo: </FormLabel>
          <Input
            autoComplete="name"
            type="text"
            name="from_name"
            placeholder="Ejemplo: John Doe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.from_name}
          />
          {formik.touched.from_name && formik.errors.from_name && (
            <Box color="red.500" fontSize="sm">
              {formik.errors.from_name}
            </Box>
          )}
        </FormControl>

        <FormControl
          isRequired
          isInvalid={formik.touched.email && formik.errors.email}
        >
          <FormLabel>Email</FormLabel>
          <Input
            autoComplete="email"
            type="email"
            name="email"
            placeholder="Ejemplo: correo@ejemplo.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <Box color="red.500" fontSize="sm">
              {formik.errors.email}
            </Box>
          )}
        </FormControl>

        <FormControl
          isRequired
          isInvalid={formik.touched.role && formik.errors.role}
        >
          <FormLabel>Asunto: </FormLabel>
          <Input
            type="text"
            name="role"
            placeholder="Ejemplo: Solicitar cotización"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          />
          {formik.touched.role && formik.errors.role && (
            <Box color="red.500" fontSize="sm">
              {formik.errors.role}
            </Box>
          )}
        </FormControl>

        <FormControl
          isRequired
          isInvalid={formik.touched.message && formik.errors.message}
        >
          <FormLabel>Mensaje</FormLabel>
          <Textarea
            name="message"
            placeholder="Tu mensaje aquí"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message && (
            <Box color="red.500" fontSize="sm">
              {formik.errors.message}
            </Box>
          )}
        </FormControl>

        <Stack mb={12}>
          <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Contact;
