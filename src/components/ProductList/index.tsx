import { useCallback, useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../Product';
import { ProductListWrapper } from '../ProductListWrapper';
import { useAddItemToOrder } from '../../hooks/useAddItemToOrder';
import { Button } from '../Button';
import styled from 'styled-components';
import { Product as ProductInterface } from '../../interfaces/Product';

const ProductListActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2.5rem 0;
`;

const productsPerPage = 6;

export function ProductList() {
  const [disableLoadMoreButton, setDisableLoadMoreButton] = useState(false);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [page, setPage] = useState(1);
  const { data, loading, called, fetchMore } = useProducts();
  const { addItemToOrder } = useAddItemToOrder();

  useEffect(() => {
    if (!called) {
      fetchMore({
        variables: {
          limit: productsPerPage,
          offset: 0,
        },
      });
      setPage((prevPage) => prevPage + 1);
    }
  }, [called, fetchMore]);

  useEffect(() => {
    if (data) {
      const itemsWithVariants = data.items.filter(
        (product) => product.variants.length > 0
      );
      if (itemsWithVariants.length === 0) {
        setDisableLoadMoreButton(true);
      }
      setProducts((prevProducts) => [...prevProducts, ...itemsWithVariants]);
    }
  }, [data]);

  const incrementPage = () => {
    fetchMore({
      variables: {
        limit: productsPerPage,
        offset: productsPerPage * (page - 1),
      },
    });
    setPage((prevPage) => prevPage + 1);
  };

  const onAddToCart = useCallback(
    (variantId: string) => {
      addItemToOrder({
        productVariantId: variantId,
        quantity: 1,
      });
    },
    [addItemToOrder]
  );

  return (
    <>
      <ProductListWrapper>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </ProductListWrapper>
      <ProductListActions>
        {!loading && !disableLoadMoreButton && (
          <Button
            variant="primary"
            onClick={incrementPage}
            style={{ padding: '1rem 2rem' }}
          >
            Load more
          </Button>
        )}
      </ProductListActions>
    </>
  );
}
