import { ProductTypes, ProductTypesToSend } from '@/app/models';
import { format } from 'date-fns';

/**
 * Transforms a `ProductTypes` object into a `ProductTypesToSend` object.
 * Formats `date_release` and `date_revision` to 'yyyy-MM-dd' format.
 *
 * @param {ProductTypes} data - The product data to transform.
 * @returns {ProductTypesToSend} - The transformed product data with formatted dates.
 */
export function transformToSend(data: ProductTypes): ProductTypesToSend {
  return {
    ...data, 
    date_release: format(data.date_release, 'yyyy-MM-dd'), 
    date_revision: format(data.date_revision, 'yyyy-MM-dd') 
  };
}
