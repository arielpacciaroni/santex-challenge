import styled from "styled-components";
import { Product as ProductInterface } from "../graphql/queries";
import { useMemo, useState } from "react";
import Button from "./Button";

const ProductWrapper = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: ${props => props.theme.spacing.small};
`;

const ProductTitle = styled.h2`
  margin: 0;
  padding: ${props => props.theme.spacing.small};
  font-size: 1.6rem;
  font-weight: bold;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: ${props => props.theme.spacing.small};
  border-top-right-radius: ${props => props.theme.spacing.small};
`;

const ProductDescription = styled.p`
  padding: ${props => props.theme.spacing.small};
  color: #666;
`

const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing.small};
  margin: ${props => props.theme.spacing.small};
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
        <p>Price: ${selectedVariant.price}</p>
        <Button onClick={() => onAddToCart(selectedVariant.id)} variant="primary">Buy</Button>
      </ProductActions>
    </ProductWrapper>
  )
}