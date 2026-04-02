import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { representativeValidationSchema } from '../../utils/validationSchemas';
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
  UnorderedList,
  ListItem,
  Spinner,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { GiArchiveRegister } from "react-icons/gi";
import {
  updateRepresentatives,
  getRepresentativesById,
} from '../../store/actions/representativeActions.js';
import AccessDenied from '../../utils/AccessDenied.jsx';
import ShowErrorAlert from '../../utils/ShowErrorAlert.js';

const UpdateRepresentative = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.roles?.isAdmin;
  const isDisabled = user?.roles?.isDisabled;
  const formData = useSelector(state => state.representatives.formData);
  const error = useSelector(state => state.representatives.error);
  const representative = useSelector(
    state => state.representatives.representative
  );
  const loading = useSelector(state => state.representatives.loading);

  const [formInitialValues, setFormInitialValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const bgColor = useColorModeValue('gray.400', 'gray.600');

  useEffect(() => {
    const fetchRepresentative = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const student = await dispatch(getRepresentativesById(id));
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
    fetchRepresentative();
  }, [dispatch, id]);

  const toast = useToast();

  const handleSubmit = async values => {
    setIsLoading(true);
    try {
      dispatch({
        type: 'UPDATE_REPRESENATIVE_FORM_DATA',
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

      await dispatch(updateRepresentatives(id, data));

      toast({
        title: '¡Actualización exitosa!',
        description: 'Ahora puedes ver los detalles del Representante',
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
            <Text>Actualizar Representante</Text>
          </Stack>
        </Heading>
        <Formik
          enableReinitialize
          initialValues={{
            representativeName: representative?.representativeName || '',
            representativeLastName:
              representative?.representativeLastName || '',
            birthPlace: representative?.birthPlace || '',
            birthDate: representative?.birthDate || '',
            sex: representative?.sex || '',
            email: representative?.email || '',
            profession: representative?.profession || '',
            phone: representative?.phone || '',
            address: representative?.address || '',
            imageUrl: representative?.imageUrl || '',
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
                      <Input {...field} type="text" autoComplete="name" />
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
                        max={new Date().toISOString().split('T')[0]}
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
                      />
                    )}
                  </Field>
                  <FormErrorMessage fontSize={'xs'}>
                    <ErrorMessage name="profession" />
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

              {/* imageUrl */}
              <FormControl
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
                      }}
                      value={undefined}
                    />
                  )}
                </Field>
                {(formData?.imageUrlPreview || representative?.imageUrl) && (
                  <Box mt={2} w={300} border={'3px solid #ccc'}>
                    <Image
                      src={
                        formData?.imageUrlPreview || representative?.imageUrl
                      }
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
                Actualizar Representante
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

export default UpdateRepresentative;
