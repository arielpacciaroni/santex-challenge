import { useCallback, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Product } from "./Product";
import { ProductListWrapper } from "./ProductListWrapper";
import { useAddItemToOrder } from "../hooks/useAddItemToOrder";
import Button from "./Button";

export function ProductList() {
  const [page, setPage] = useState(1);
  const { data, loading, hasNextPage } = useProducts({ page, itemsPerPage: 6 });
  const { addItemToOrder } = useAddItemToOrder();

  const incrementPage = () => {
    setPage(page + 1);
  }

  const onAddToCart = useCallback((variantId: string) => {
    addItemToOrder({
      productVariantId: variantId,
      quantity: 1
    })
  }, [addItemToOrder])

  return (
    <>
      <ProductListWrapper>
        {data?.items.map((product) => (
          <Product key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </ProductListWrapper>
      {!loading && hasNextPage && (
        <Button variant="primary" onClick={incrementPage} disabled={!hasNextPage}>
          Load more
        </Button>
      )}
     
    </>
  );
}
