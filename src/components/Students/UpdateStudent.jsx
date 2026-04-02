import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { studentValidationSchema } from '../../utils/validationSchemas';
import {
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Image,
  Input,
  Text,
  Textarea,
  Button,
  Flex,
  Select,
  Stack,
  UnorderedList,
  ListItem,
  Spinner,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { GiArchiveRegister } from 'react-icons/gi';
import {
  updateStudents,
  getStudentById,
} from '../../store/actions/studentActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';
import ShowErrorAlert from '../../utils/ShowErrorAlert.js';

const UpdateTeacher = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const formData = useSelector(state => state.students.formData);
  const error = useSelector(state => state.students.error);
  const student = useSelector(state => state.students.student);
  const loading = useSelector(state => state.students.loading);

  const [formInitialValues, setFormInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const bgColor = useColorModeValue('gray.400', 'gray.600');

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const student = await dispatch(getStudentById(id));
        setFormInitialValues({
          ...student,
          imageUrlPreview: student?.imageUrl,
        });
      } catch (error) {
        console.error('Error fetching student:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudent();
  }, [dispatch, id]);

  const toast = useToast();

  const handleSubmit = async values => {
    setIsLoading(true);
    try {
      dispatch({
        type: 'UPDATE_STUDENT_FORM_DATA',
        payload: values,
      });

      const dataToSubmit = { ...formInitialValues, ...values };
      const data = new FormData();
      Object.entries(dataToSubmit).forEach(([key, value]) => {
        if (value instanceof File) {
          data.append(key, value);
        } else if (value !== undefined && value !== null && value !== '') {
          data.append(key, value);
        }
      });

      await dispatch(updateStudents(id, data));

      toast({
        title: '¡Actualización exitosa!',
        description: 'Ahora puedes ver los detalles del Estudiante',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });

      navigate('/students');
    } catch (error) {
      toast({
        title: '¡Error!',
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <ShowErrorAlert error={error} />;
  if (loading || isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (!isAdmin || isDisabled) {
    return <AccessDenied />;
  }

  return (
    <Stack>
      <Box
        maxW={800}
        w={'97%'}
        h={'auto'}
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        p={6}
        m="10px auto"
        mt={24}
        onSubmit={handleSubmit}
      >
        <Heading size={{ base: "md", md: "lg", lg: "lg" }} mb={'12'} mt={'2'}>
          <Stack direction="row" align="center" justify="center">
            <GiArchiveRegister />
            <Text>Actualizar Estudiante</Text>
          </Stack>
        </Heading>
        <Formik
          enableReinitialize
          initialValues={{
            studentName: student?.studentName || '',
            studentLastName: student?.studentLastName || '',
            grade: student?.grade || '',
            section: student?.section || '',
            schedule: student?.schedule || '',
            birthPlace: student?.birthPlace || '',
            birthDate: student?.birthDate || '',
            sex: student?.sex || '',
            email: student?.email || '',
            phone: student?.phone || '',
            fide_num: student?.fide_num || '',
            size: student?.size || '',
            address: student?.address || '',
            imageUrl: student?.imageUrl || '',
          }}
          validationSchema={studentValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Flex>
                <FormControl
                  mr="5%"
                  isRequired
                  isInvalid={Boolean(errors.studentName && touched.studentName)}
                >
                  <FormLabel fontWeight={'normal'}>Nombre(s)</FormLabel>
                  <Field name="studentName">
                    {({ field }) => (
                      <Input {...field} type="text" autoComplete="name" />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="studentName" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(
                    errors.studentLastName && touched.studentLastName
                  )}
                >
                  <FormLabel fontWeight={'normal'}>Apellido(s)</FormLabel>
                  <Field name="studentLastName">
                    {({ field }) => (
                      <Input
                        {...field}
                        autoComplete="family-name"
                        type="text"
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="studentLastName" />
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex>
                <FormControl
                  mr="5%"
                  isRequired
                  isInvalid={Boolean(errors.grade && touched.grade)}
                >
                  <FormLabel mt={12} fontWeight={'normal'}>
                    Grado°
                  </FormLabel>
                  <Field name="grade">
                    {({ field }) => (
                      <Select
                        {...field}
                        autoComplete="grade"
                        placeholder="Seleccione Gado"
                      >
                        {Array.from({ length: 11 }, (_, i) => i + 1).map(
                          grade => (
                            <option key={grade} value={`${grade}°`}>
                              {grade}°
                            </option>
                          )
                        )}
                      </Select>
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="grade" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  mr="5%"
                  isInvalid={Boolean(errors.section && touched.section)} // Corregido a "section"
                >
                  <FormLabel mt={12} fontWeight={'normal'}>
                    Sección
                  </FormLabel>
                  <Field name="section">
                    {({ field }) => (
                      <Select
                        {...field}
                        autoComplete="seccion"
                        placeholder="Seleccione Sección"
                      >
                        {['A', 'B', 'C', 'D', 'E'].map(letter => (
                          <option key={letter} value={letter}>
                            Sección {letter}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="section" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  mr="5%"
                  isInvalid={Boolean(errors.schedule && touched.schedule)} // Corregido a "section"
                >
                  <FormLabel mt={12} fontWeight={'normal'}>
                    Turno
                  </FormLabel>
                  <Field name="schedule">
                    {({ field }) => (
                      <Select
                        {...field}
                        autoComplete="schedule"
                        placeholder="Seleccione el turno"
                      >
                        {['Mañana', 'Tarde', 'Noche', 'Mixto'].map(letter => (
                          <option key={letter} value={letter}>
                            {letter}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="schedule" />
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex>
                <FormControl
                  mr="5%"
                  isRequired
                  isInvalid={Boolean(errors.birthPlace && touched.birthPlace)}
                >
                  <FormLabel mt={12} fontWeight={'normal'}>
                    Lugar de nacimiento
                  </FormLabel>
                  <Field name="birthPlace">
                    {({ field }) => (
                      <Input
                        {...field}
                        autoComplete="address-level2"
                        type="text"
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="birthPlace" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  mr="5%"
                  isRequired
                  isInvalid={Boolean(errors.birthDate && touched.birthDate)}
                >
                  <FormLabel mt={12} fontWeight={'normal'}>
                    Fecha de nacimiento
                  </FormLabel>
                  <Field name="birthDate">
                    {({ field }) => (
                      <Input
                        {...field}
                        autoComplete="year"
                        type="date"
                        min={'1930-01-01'}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="birthDate" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  mr={'5%'}
                  isInvalid={Boolean(errors.fide_num && touched.fide_num)}
                >
                  <FormLabel fontWeight={'normal'} mt={12}>
                    ID FIDE
                  </FormLabel>
                  <Field name="fide_num">
                    {({ field }) => (
                      <Input
                        {...field}
                        autoComplete="fide_num"
                        type="text"
                        placeholder="Ejem: 1234567"
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="fide_num" />
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex>
                <FormControl
                  mr="5%"
                  isRequired
                  isInvalid={Boolean(errors.sex && touched.sex)}
                >
                  <FormLabel fontWeight={'normal'} mt={12}>
                    Genero
                  </FormLabel>
                  <Field name="sex">
                    {({ field }) => (
                      <Select {...field} autoComplete="off">
                        <option value="">Seleccione un género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                      </Select>
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="sex" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.email && touched.email)}
                >
                  <FormLabel fontWeight={'normal'} mt={12}>
                    Correo electrónico
                  </FormLabel>
                  <Field name="email">
                    {({ field }) => (
                      <Input
                        {...field}
                        color={bgColor}
                        autoComplete="email"
                        type="email"
                        isReadOnly
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="email" />
                  </FormErrorMessage>
                  <FormHelperText>
                    Nunca compartiremos su correo.
                  </FormHelperText>
                </FormControl>
              </Flex>
              <Flex>
                <FormControl
                  mr={'5%'}
                  isRequired
                  isInvalid={Boolean(errors.phone && touched.phone)}
                >
                  <FormLabel fontWeight={'normal'} mt={12}>
                    Número de teléfono
                  </FormLabel>
                  <Field name="phone">
                    {({ field }) => (
                      <Input {...field} autoComplete="phone" type="phone" />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="phone" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.size && touched.size)}
                >
                  <FormLabel fontWeight={'normal'} mt={12}>
                    Tallas (camisa pantalón zapato)
                  </FormLabel>
                  <Field name="size">
                    {({ field }) => (
                      <Input {...field} autoComplete="size" type="text" />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="size" />
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <FormControl
                colSpan={6}
                isRequired
                isInvalid={Boolean(errors.address && touched.address)}
              >
                <FormLabel mt={6}>Dirección</FormLabel>
                <Field name="address">
                  {({ field }) => (
                    <Textarea {...field} autoComplete="address" type="text" />
                  )}
                </Field>
                <FormErrorMessage fontSize={'xs'}>
                  <ErrorMessage name="address" />
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={Boolean(errors.imageUrl && touched.imageUrl)}
              >
                <FormLabel mt={6}>Foto del Estudiante</FormLabel>
                <Field name="imageUrl">
                  {({ form }) => (
                    <Input
                      type="file"
                      accept="image/svg+xml, image/webp, image/jpeg, image/png"
                      w={400}
                      onChange={e => {
                        const file = e.target.files[0];
                        form.setTouched({ ...touched, imageUrl: true });

                        if (!file) {
                          return;
                        }

                        const validTypes = [
                          'image/svg+xml',
                          'image/webp',
                          'image/jpeg',
                          'image/png',
                        ];

                        if (!validTypes.includes(file.type)) {
                          form.setFieldError('imageUrl', 'Formato invalido');
                          e.target.value = '';
                          return;
                        }
                        if (file.size > 5 * 1024 * 1024) {
                          form.setFieldError('imageUrl', 'Maximo 5MB');
                          e.target.value = '';
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = event => {
                          dispatch({
                            type: 'UPDATE_STUDENT_FORM_DATA',
                            payload: {
                              ...formData,
                              imageUrl: file,
                              imageUrlPreview: event.target.result,
                            },
                          });
                          form.setFieldValue('imageUrl', file);
                        };
                        reader.readAsDataURL(file);
                      }}
                      value={undefined}
                    />
                  )}
                </Field>
                {(formData?.imageUrlPreview || student?.imageUrl) && (
                  <Box mt={2} w={300} border={'3px solid #ccc'}>
                    <Image
                      src={formData?.imageUrlPreview || student?.imageUrl}
                      alt="Vista previa de la imagen"
                      w={500}
                      h={'auto'}
                    />
                  </Box>
                )}
                <FormErrorMessage fontSize={'xs'}>
                  <ErrorMessage name="imageUrl" />
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                mt={6}
              >
                Actualizar Estudiante
              </Button>
              {Object.keys(errors).length > 0 && (
                <Box
                  mt={6}
                  bg="red.50"
                  p={4}
                  borderRadius="md"
                  border="1px solid red"
                >
                  <Heading size="sm" mb={2} color="red.600">
                    Error(es) en el formulario
                  </Heading>
                  <UnorderedList color="red.600" fontSize={'sm'}>
                    {Object.keys(errors).map((field, idx) => (
                      <ListItem key={idx}>{errors[field]}</ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Stack>
  );
};

export default UpdateTeacher;
