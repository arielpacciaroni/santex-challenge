import { useLazyQuery } from '@apollo/client';
import { useProducts } from '.';

jest.mock('@apollo/client');

describe('useProducts', () => {
  it('should call the query products and return the data', async () => {
    const fetchMore = jest.fn();
    const data = {
      products: {
        items: [
          {
            id: '1',
            name: 'Product 1',
            description: 'Description 1',
            price: 100,
            image: {
              url: 'http://image1.com',
            },
          },
        ],
        totalItems: 1,
      },
    };
    (useLazyQuery as jest.Mock).mockReturnValue([
      fetchMore,
      { called: true, loading: false, data, error: undefined },
    ]);

    const products = useProducts();

    expect(products).toEqual({
      data: data.products,
      totalItems: data.products.totalItems,
      loading: false,
      error: undefined,
      called: true,
      fetchMore,
    });
  });
});
