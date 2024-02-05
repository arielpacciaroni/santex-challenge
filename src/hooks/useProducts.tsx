import { useQuery } from '@apollo/client';
import { Product, productsQuery } from '../graphql/queries';
import { useMemo } from 'react';

interface ProductParams {
  page: number;
  itemsPerPage: number;
}

interface ProductResults {
  products: {
    items: Product[];
    totalItems: number;
  };
}

export function useProducts(params: ProductParams) {
  const { page, itemsPerPage } = params;

  const { data, loading, error, fetchMore } = useQuery<ProductResults>(
    productsQuery,
    {
      variables: {
        limit: itemsPerPage * page,
        offset: 0,
      },
    }
  );

  const hasNextPage = useMemo(() => {
    if (!data) return false;

    return data.products.totalItems > itemsPerPage * page;
  }, [data, page, itemsPerPage]);

  return {
    data: data?.products,
    loading,
    error,
    fetchMore,
    hasNextPage,
  };
}
