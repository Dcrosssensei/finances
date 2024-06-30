

import { transformToSend } from '@/app/api';
import { format } from 'date-fns';

jest.mock('date-fns', () => ({
  format: jest.fn()
}));

describe('transformToSend', () => {
  it('should transform and format dates correctly', () => {
    const inputData = {
        "id": "001",
        "name": "Producto Innovador A",
        "description": "Producto A ofrece una solución integral con características avanzadas que mejoran la eficiencia y la productividad.",
        "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
        "date_release": new Date("2024-01-29"),
        "date_revision": new Date("2024-06-29")
      };

    const expectedOutput = {
        "id": "001",
        "name": "Producto Innovador A",
        "description": "Producto A ofrece una solución integral con características avanzadas que mejoran la eficiencia y la productividad.",
        "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
        "date_release": "2024-01-29",
        "date_revision": "2024-06-29"
      };

      (format as jest.Mock).mockImplementation((date, formatString) => {
        if (formatString === 'yyyy-MM-dd') {
          return date.toISOString().split('T')[0];
        }
        return date.toISOString();
      });

    const result = transformToSend(inputData);

    expect(result).toEqual(expectedOutput);
  });
});
