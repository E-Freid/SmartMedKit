import * as Yup from 'yup';

export const kitEditValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  location: Yup.string().required('Location is required'),
});