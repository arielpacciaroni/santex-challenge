import { useLazyQuery } from '@apollo/client';
import { Product } from '../../interfaces/Product';
import { productsQuery } from '../../graphql/queries';

interface ProductResults {
  products: {
    items: Product[];
    totalItems: number;
  };
}

export function useProducts() {
  const [fetchMore, { called, loading, data, error }] =
    useLazyQuery<ProductResults>(productsQuery, {
      variables: {
        limit: 6,
        offset: 0,
      },
    });

  return {
    data: data?.products,
    totalItems: data?.products.totalItems ?? 0,
    loading,
    error,
    called,
    fetchMore,
  };
}
