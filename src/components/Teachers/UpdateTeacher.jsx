import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { teacherValidationSchema } from '../../utils/validationSchemas';
import * as pdfjs from 'pdfjs-dist';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Image,
  Input,
  Textarea,
  Button,
  Flex,
  Select,
  Stack,
  Text,
  UnorderedList,
  ListItem,
  Spinner,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { GiArchiveRegister } from 'react-icons/gi';
import {
  updateTeachers,
  getTeachersById,
} from '../../store/actions/teacherActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';
import ShowErrorAlert from '../../utils/ShowErrorAlert.js';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const UpdateTeacher = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const formData = useSelector(state => state.teachers.formData);
  const error = useSelector(state => state.teachers.error);
  const teacher = useSelector(state => state.teachers.teacher);
  const loading = useSelector(state => state.teachers.loading);

  const [formInitialValues, setFormInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const bgColor = useColorModeValue('gray.400', 'gray.600');

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const teacher = await dispatch(getTeachersById(id));
        setFormInitialValues({
          ...teacher,
          imageUrlPreview: teacher?.imageUrl,
          curriculumUrlPreview: teacher?.curriculumUrl,
        });
      } catch (error) {
        console.error('Error fetching teacher:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeacher();
  }, [dispatch, id]);

  const toast = useToast();

  const handleSubmit = async values => {
    setIsLoading(true);
    try {
      dispatch({
        type: 'UPDATE_TEACHER_FORM_DATA',
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

      await dispatch(updateTeachers(id, data));

      toast({
        title: '¡Actualización exitosa!',
        description: 'Ahora puedes ver los detalles del profesor',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });

      navigate('/teachers');
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
            <Text>Actualizar Profesor(a)</Text>
          </Stack>
        </Heading>
        <Formik
          enableReinitialize
          initialValues={{
            teacherName: teacher?.teacherName || '',
            teacherLastName: teacher?.teacherLastName || '',
            birthPlace: teacher?.birthPlace || '',
            birthDate: teacher?.birthDate || '',
            sex: teacher?.sex || '',
            email: teacher?.email || '',
            profession: teacher?.profession || '',
            phone: teacher?.phone || '',
            size: teacher?.size || '',
            address: teacher?.address || '',
            imageUrl: teacher?.imageUrl || '',
            curriculumUrl: teacher?.curriculumUrl || null,
          }}
          validationSchema={teacherValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Flex>
                <FormControl
                  mr="5%"
                  isInvalid={Boolean(errors.teacherName && touched.teacherName)}
                >
                  <FormLabel fontWeight={'normal'}>Nombre(s)</FormLabel>
                  <Field name="teacherName">
                    {({ field }) => (
                      <Input {...field} type="text" autoComplete="name" />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="teacherName" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(
                    errors.teacherLastName && touched.teacherLastName
                  )}
                >
                  <FormLabel fontWeight={'normal'}>Apellido(s)</FormLabel>
                  <Field name="teacherLastName">
                    {({ field }) => (
                      <Input
                        {...field}
                        autoComplete="family-name"
                        type="text"
                        placeholder="Ejem. Perez Delgado"
                        onChange={e => {
                          field.onChange(e);
                          dispatch({
                            type: 'UPDATE_TEACHER_FORM_DATA',
                            payload: {
                              ...formData,
                              teacherLastName: e.target.value,
                            },
                          });
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="teacherLastName" />
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex>
                <FormControl
                  mr="5%"
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
                        placeholder="Ejem. Caracas"
                        onChange={e => {
                          field.onChange(e);
                          dispatch({
                            type: 'UPDATE_TEACHER_FORM_DATA',
                            payload: {
                              ...formData,
                              birthPlace: e.target.value,
                            },
                          });
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="birthPlace" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
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
                        max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
                        onChange={e => {
                          field.onChange(e);
                          dispatch({
                            type: 'UPDATE_TEACHER_FORM_DATA',
                            payload: {
                              ...formData,
                              birthDate: e.target.value,
                            },
                          });
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="birthDate" />
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex>
                <FormControl
                  mr="5%"
                  isInvalid={Boolean(errors.sex && touched.sex)}
                >
                  <FormLabel fontWeight={'normal'} mt={12}>
                    Genero
                  </FormLabel>
                  <Field name="sex">
                    {({ field }) => (
                      <Select
                        {...field}
                        onChange={e => {
                          field.onChange(e);
                          dispatch({
                            type: 'UPDATE_TEACHER_FORM_DATA',
                            payload: { ...formData, sex: e.target.value },
                          });
                        }}
                        autoComplete="off"
                      >
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
                <FormControl isInvalid={Boolean(errors.email && touched.email)}>
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
                  mr="5%"
                  isInvalid={Boolean(errors.profession && touched.profession)}
                >
                  <FormLabel fontWeight={'normal'} mt={12}>
                    Profesión
                  </FormLabel>
                  <Field name="profession">
                    {({ field }) => (
                      <Input
                        {...field}
                        autoComplete="organization-title"
                        type="text"
                        placeholder="Ejem: Docente"
                        onChange={e => {
                          field.onChange(e);
                          dispatch({
                            type: 'UPDATE_TEACHER_FORM_DATA',
                            payload: {
                              ...formData,
                              profession: e.target.value,
                            },
                          });
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="profession" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.phone && touched.phone)}>
                  <FormLabel fontWeight={'normal'} mt={12}>
                    Número de teléfono
                  </FormLabel>
                  <Field name="phone">
                    {({ field }) => (
                      <Input
                        {...field}
                        autoComplete="phone"
                        type="phone"
                        placeholder="Ejem: 02121234567"
                        onChange={e => {
                          field.onChange(e);
                          dispatch({
                            type: 'UPDATE_TEACHER_FORM_DATA',
                            payload: { ...formData, phone: e.target.value },
                          });
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="phone" />
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex>
                <FormControl
                  mr={'5%'}
                  isInvalid={Boolean(errors.size && touched.size)}
                >
                  <FormLabel fontWeight={'normal'} mt={12}>
                    Tallas (camisa pantalón zapato)
                  </FormLabel>
                  <Field name="size">
                    {({ field }) => (
                      <Input
                        {...field}
                        autoComplete="size"
                        type="text"
                        placeholder="Ejem: XL 32 40"
                        onChange={e => {
                          field.onChange(e);
                          dispatch({
                            type: 'UPDATE_TEACHER_FORM_DATA',
                            payload: { ...formData, size: e.target.value },
                          });
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="size" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  colSpan={6}
                  isInvalid={Boolean(errors.address && touched.address)}
                >
                  <FormLabel mt={6}>Dirección</FormLabel>
                  <Field name="address">
                    {({ field }) => (
                      <Textarea
                        {...field}
                        autoComplete="address"
                        type="text"
                        onChange={e => {
                          field.onChange(e);
                          dispatch({
                            type: 'UPDATE_TEACHER_FORM_DATA',
                            payload: { ...formData, address: e.target.value },
                          });
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="address" />
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              {/* imageUrl */}
              <FormControl
                isInvalid={Boolean(errors.imageUrl && touched.imageUrl)}
              >
                <FormLabel mt={6}>Foto del Profesor(a)</FormLabel>
                <Field name="imageUrl">
                  {({ form }) => (
                    <Input
                      type="file"
                      accept="image/svg+xml, image/webp, image/jpeg, image/png"
                      w={320}
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
                            type: 'UPDATE_TEACHER_FORM_DATA',
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
                {(formData?.imageUrlPreview || teacher?.imageUrl) && (
                  <Box mt={2} w={300} border={'3px solid #ccc'}>
                    <Image
                      src={formData?.imageUrlPreview || teacher?.imageUrl}
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
              <FormControl
                isInvalid={Boolean(
                  errors.curriculumUrl && touched.curriculumUrl
                )}
              >
                <FormLabel id="curriculumUrl" mt={6}>
                  Curriculum del profesor(a)
                </FormLabel>
                <Field name="curriculumUrl">
                  {({ form }) => (
                    <Input
                      type="file"
                      name="curriculumUrl"
                      accept=".pdf"
                      w={320}
                      onChange={e => {
                        const file = e.target.files[0];
                        form.setTouched({ ...touched, curriculumUrl: true });

                        if (!file) {
                          return;
                        }

                        if (file.size > 5 * 1024 * 1024) {
                          form.setFieldError('curriculumUrl', 'Maximo 5MB');
                          return;
                        }

                        if (file) {
                          const reader = new FileReader();
                          reader.onload = event => {
                            dispatch({
                              type: 'UPDATE_TEACHER_FORM_DATA',
                              payload: {
                                ...formData,
                                curriculumUrl: file,
                                curriculumUrlPreview: event.target.result,
                              },
                            });
                            form.setFieldValue('curriculumUrl', file);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      value={undefined}
                    />
                  )}
                </Field>

                {(formData?.curriculumUrlPreview || teacher?.curriculumUrl) && (
                  <Box mt={2} w={300} border={'3px solid #ccc'}>
                    <Viewer
                      fileUrl={
                        formData?.curriculumUrlPreview || teacher?.curriculumUrl
                      }
                    />
                  </Box>
                )}
                <FormErrorMessage fontSize={'xs'}>
                  <ErrorMessage name="curriculumUrl" />
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                mt={6}
              >
                Actualizar Profesor(a)
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
