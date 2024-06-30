import { ProductTypes, ProductTypesToSend } from '@/app/models';
import { format } from 'date-fns';

export function transformToSend(data: ProductTypes): ProductTypesToSend {
  return {
    ...data, 
    date_release: format(data.date_release, 'yyyy-MM-dd'), 
    date_revision: format(data.date_revision, 'yyyy-MM-dd') 
  };
}
