import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { studentValidationSchema } from '../../utils/validationSchemas';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { GiArchiveRegister } from 'react-icons/gi';
import { postStudent } from '../../store/actions/studentActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';

const PostStudent = () => {
  const dispatch = useDispatch();
  const { representativeId } = useParams();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const formData = useSelector(state => state.students.formData);
  const error = useSelector(state => state.students.error);
  const loading = useSelector(state => state.students.loading);

  useEffect(() => {
    if (!loading && !error) {
      dispatch({ type: 'CLEAR_STUDENT_FORM_DATA' });
    }
  }, [dispatch, loading, error]);

  const toast = useToast();

  const handleSubmit = async (values, actions) => {
    try {
      dispatch({ type: 'STUDENT_LOADING' });

      const data = new FormData();
      data.append('representativeId', representativeId);

      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          data.append(key, value);
        }
      });

      await dispatch(postStudent(data));
      actions.resetForm();

      toast({
        title: '¡Registro exitóso!',
        description: 'El estudiante ha sido registrado exitosamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: '¡Error!',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const updateReduxFormData = useCallback(
    (field, value) => {
      if (formData[field] !== value) {
        dispatch({
          type: 'UPDATE_STUDENT_FORM_DATA',
          payload: { ...formData, [field]: value },
        });
      }
    },
    [dispatch, formData]
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
            <Text>Registrar Estudiante</Text>
          </Stack>
        </Heading>
        <Formik
          enableReinitialize
          initialValues={{
            studentName: formData?.studentName || '',
            studentLastName: formData?.studentLastName || '',
            grade: formData?.grade || '',
            section: formData?.section || '',
            schedule: formData?.schedule || '',
            birthPlace: formData?.birthPlace || '',
            birthDate: formData?.birthDate || '',
            sex: formData?.sex || '',
            email: formData?.email || '',
            phone: formData?.phone || '',
            fide_num: formData?.fide_num || '',
            size: formData?.size || '',
            address: formData?.address || '',
            imageUrl: formData?.imageUrl || '',
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
                      <Input
                        {...field}
                        autoComplete="name"
                        type="text"
                        placeholder="Ejem. Juan Antonio"
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData('studentName', e.target.value);
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="studentName" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  mr="5%"
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
                        placeholder="Ejem. Perez Delgado"
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData(
                            'studentLastName',
                            e.target.value
                          );
                        }}
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
                        placeholder="Selecciona el grado"
                        onChange={e => {
                          field.onChange(e);
                          updateReduxFormData('grade', e.target.value);
                        }}
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
                  isRequired
                  isInvalid={Boolean(errors.section && touched.section)} // Corregido a "section"
                >
                  <FormLabel mt={12} fontWeight={'normal'}>
                    Sección
                  </FormLabel>
                  <Field name="section">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Selecciona la sección"
                        onChange={e => {
                          field.onChange(e);
                          updateReduxFormData('section', e.target.value);
                        }}
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
                  isRequired
                  isInvalid={Boolean(errors.schedule && touched.schedule)}
                >
                  <FormLabel mt={12} fontWeight={'normal'}>
                    Turno
                  </FormLabel>
                  <Field name="schedule">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Selecciona el turno"
                        onChange={e => {
                          field.onChange(e);
                          updateReduxFormData('schedule', e.target.value);
                        }}
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
                    <ErrorMessage name="schedulen" />
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
                        autoComplete="address-level1"
                        type="text"
                        placeholder="Ejem. Caracas"
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData('birthPlace', e.target.value);
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="birthPlace" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  mr={'5%'}
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
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData('birthDate', e.target.value);
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
                  isRequired
                  isInvalid={Boolean(errors.sex && touched.sex)}
                >
                  <FormLabel fontWeight={'normal'} mt={12}>
                    Genero
                  </FormLabel>
                  <Field name="sex">
                    {({ field }) => (
                      <Select
                        {...field}
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData('sex', e.target.value);
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
                <FormControl
                  mr={'5%'}
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
                        autoComplete="email"
                        type="email"
                        placeholder="Ejem: correo@correo.com"
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData('email', e.target.value);
                        }}
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
                      <Input
                        {...field}
                        autoComplete="phone"
                        type="phone"
                        placeholder="Ejem: 02121234567"
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData('phone', e.target.value);
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="phone" />
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
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData('fide_num', e.target.value);
                        }}
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
                  mr={'5%'}
                  isRequired
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
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData('size', e.target.value);
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="size" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  mr={'5%'}
                  colSpan={6}
                  isRequired
                  isInvalid={Boolean(errors.address && touched.address)}
                >
                  <FormLabel mt={12}>Dirección</FormLabel>
                  <Field name="address">
                    {({ field }) => (
                      <Textarea
                        {...field}
                        autoComplete="address"
                        type="text"
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData('address', e.target.value);
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="address" />
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <FormControl
                isRequired
                isInvalid={Boolean(errors.imageUrl && touched.imageUrl)}
              >
                <FormLabel mt={6}>Foto del estudiante</FormLabel>
                <Field name="imageUrl">
                  {({ form }) => (
                    <Input
                      type="file"
                      name="imageUrl"
                      accept="image/svg+xml, image/webp, image/jpeg, image/png"
                      w={320}
                      onChange={e => {
                        const file = e.target.files[0];
                        form.setTouched({ ...touched, imageUrl: true });

                        if (file) {
                          const validTypes = [
                            'image/svg+xml',
                            'image/webp',
                            'image/jpeg',
                            'image/png',
                          ];

                          if (!validTypes.includes(file.type)) {
                            form.setFieldError('imageUrl', error);
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
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  )}
                </Field>
                {formData?.imageUrlPreview && (
                  <Box mt={2} w={300} border={'3px solid #ccc'}>
                    <Image
                      src={formData.imageUrlPreview}
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
                Registrar Estudiante
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

export default PostStudent;
