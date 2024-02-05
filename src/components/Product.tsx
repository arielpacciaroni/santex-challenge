import styled from "styled-components";
import { Product as ProductInterface } from "../graphql/queries";
import { baseColors } from "../utils/baseColors";
import { useMemo, useState } from "react";

const ProductWrapper = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem;
`;

const ProductTitle = styled.h2`
  margin: 0;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const ProductDescription = styled.p`
  padding: 0.5rem;
`

const ProductActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem;
`;

const ProductActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${baseColors.success};
  color: ${baseColors.highlight};
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #22c55e;
  }
`;

interface ProductProps {
  product: ProductInterface;
  onAddToCart: ( variantId: string) => void;
}

export function Product(props: ProductProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(props.product.variants[0].id);
  const { product, onAddToCart } = props;

  const selectedVariant = useMemo(() => {
    return product.variants.find(variant => variant.id === selectedVariantId)!;
  }, [selectedVariantId, product.variants]);

  return (
    <ProductWrapper>
      <ProductImage src={product.featuredAsset.preview} alt={product.name} />
      <ProductTitle>{product.name}</ProductTitle>
      <ProductDescription>{product.description}</ProductDescription>
      <select value={selectedVariantId} onChange={(e) => setSelectedVariantId(e.target.value)}>
        {product.variants.map(variant => (
          <option key={variant.id} value={variant.id}>{variant.name}</option>
        ))}
      </select>
      <ProductActions>
        <p>Price: ${selectedVariant?.price}</p>
        <ProductActionButton onClick={() => onAddToCart(selectedVariant.id)}>Buy</ProductActionButton>
      </ProductActions>
    </ProductWrapper>
  )
}