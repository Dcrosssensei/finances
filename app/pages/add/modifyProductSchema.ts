import * as yup from 'yup';
import { validationId } from '@/app/api';

export const modifyProductSchema = yup.object().shape({
  id: yup
    .string()
    .required('ID es requerido'),
  name: yup
    .string()
    .required('Nombre es requerido')
    .min(6, 'Nombre debe tener al menos 6 caracteres')
    .max(100, 'Nombre no debe exceder los 100 caracteres'),
  description: yup
    .string()
    .required('Descripción es requerida')
    .min(10, 'Descripción debe tener al menos 10 caracteres')
    .max(200, 'Descripción no debe exceder los 200 caracteres'),
  logo: yup
    .string()
    .required('Logo es requerido'),
  date_release: yup
    .date()
    .required('Fecha de Liberación es requerida')
    ,
  date_revision: yup
    .date()
    .required('Fecha de Revisión es requerida')
});
