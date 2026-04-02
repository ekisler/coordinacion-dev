import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { representativeValidationSchema } from '../../utils/validationSchemas';
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
  useToast,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { GiArchiveRegister } from 'react-icons/gi';
import { postRepresentative } from '../../store/actions/representativeActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';

const PostRepresentative = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const formData = useSelector(state => state.representatives.formData);
  const error = useSelector(state => state.representatives.error);
  const loading = useSelector(state => state.representatives.loading);

  useEffect(() => {
    if (!loading && !error) {
      dispatch({ type: 'CLEAR_REPRESENTATIVE_FORM_DATA' });
    }
  }, [dispatch, loading, error]);

  const toast = useToast();

  const handleSubmit = async (values, actions) => {
    try {
      dispatch({ type: 'REPRESENTATIVE_LOADING' });

      const data = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          data.append(key, value);
        }
      });

      await dispatch(postRepresentative(data));
      actions.resetForm();

      toast({
        title: '¡Registro exitoso!',
        description: 'Ahora puedes ver los detalles del profesor',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      navigate('/representatives');
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
          type: 'UPDATE_REPRESENTATIVE_FORM_DATA',
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
            <Text>Registrar representante</Text>
          </Stack>
        </Heading>
        <Formik
          enableReinitialize
          initialValues={{
            representativeName: formData?.representativeName || '',
            representativeLastName: formData?.representativeLastName || '',
            birthPlace: formData?.birthPlace || '',
            birthDate: formData?.birthDate || '',
            sex: formData?.sex || '',
            email: formData?.email || '',
            profession: formData?.profession || '',
            phone: formData?.phone || '',
            size: formData?.size || '',
            address: formData?.address || '',
            imageUrl: formData?.imageUrl || '',
          }}
          validationSchema={representativeValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Flex>
                <FormControl
                  mr="5%"
                  isRequired
                  isInvalid={Boolean(
                    errors.representativeName && touched.representativeName
                  )}
                >
                  <FormLabel fontWeight={'normal'}>Nombre(s)</FormLabel>
                  <Field name="representativeName">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        autoComplete="name"
                        placeholder="Ejem. Juan Antonio"
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData(
                            'representativeName',
                            e.target.value
                          );
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="representativeName" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(
                    errors.representativeLastName &&
                      touched.representativeLastName
                  )}
                >
                  <FormLabel fontWeight={'normal'}>Apellido(s)</FormLabel>
                  <Field name="representativeLastName">
                    {({ field }) => (
                      <Input
                        {...field}
                        autoComplete="family-name"
                        type="text"
                        placeholder="Ejem. Perez Delgado"
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData(
                            'representativeLastName',
                            e.target.value
                          );
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="representativeLastName" />
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
                        max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
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
                  mr="5%"
                  isRequired
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
                        placeholder="Ejem: Abogado"
                        onBlur={e => {
                          field.onBlur(e);
                          updateReduxFormData('profession', e.target.value);
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="profession" />
                  </FormErrorMessage>
                </FormControl>
                <FormControl
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
              </Flex>
              <Flex>
                <FormControl
                  colSpan={6}
                  isRequired
                  isInvalid={Boolean(errors.address && touched.address)}
                >
                  <FormLabel mt={6}>Dirección</FormLabel>
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
                <FormLabel mt={6}>Foto del Representante</FormLabel>
                <Field name="imageUrl">
                  {({ form }) => (
                    <Input
                      type="file"
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
                          if (file.size > 5 * 1024 * 1024) {
                            form.setFieldError('imageUrl', error);
                            e.target.value = '';
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = event => {
                            dispatch({
                              type: 'UPDATE_REPRESENTATIVE_FORM_DATA',
                              payload: {
                                ...formData,
                                imageUrl: file,
                                imageUrlPreview: event.target.result,
                              },
                            });
                            form.setFieldValue('imageUrl', file);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  )}
                </Field>
                <FormErrorMessage fontSize={'xs'}>
                  <ErrorMessage name="imageUrl" />
                </FormErrorMessage>
                {formData?.imageUrlPreview && (
                  <Box mt={8} w={300} border={'3px solid #ccc'}>
                    <Image
                      src={formData.imageUrlPreview}
                      alt="Vista previa de la imagen"
                      w={500}
                      h={'auto'}
                    />
                  </Box>
                )}
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                mt={6}
              >
                Registrar represenatne
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

export default PostRepresentative;
