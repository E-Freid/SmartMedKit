import * as Yup from 'yup';

export const validationSchema = Yup.object({
  kitId: Yup.number()
    .typeError('Invalid Kit ID')
    .integer('Invalid Kit ID')
    .required('Required'),
});