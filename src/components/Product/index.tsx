import styled from 'styled-components';
import { Product as ProductInterface } from '../../interfaces/Product';
import { useMemo, useState } from 'react';
import { Button } from '../Button';
import { Select } from '../Select';

const ProductWrapper = styled.div`
  background-color: white;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid ${(props) => props.theme.colors.blend};
  border-radius: ${(props) => props.theme.spacing.small};
`;

const ProductTitle = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: bold;
`;

const ProductInformation = styled.div`
  padding: ${(props) => props.theme.spacing.small};
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: ${(props) => props.theme.spacing.small};
  border-top-right-radius: ${(props) => props.theme.spacing.small};
`;

const ProductDescription = styled.p`
  color: #666;
  margin: ${(props) => props.theme.spacing.medium} 0;
`;

const ProductActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${(props) => props.theme.spacing.small};
  margin: ${(props) => props.theme.spacing.small} 0;
`;

const placeholderImage = 'https://placehold.co/600x400';

interface ProductProps {
  product: ProductInterface;
  onAddToCart: (variantId: string) => void;
}

export function Product(props: ProductProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    props.product.variants[0].id
  );
  const { product, onAddToCart } = props;
  const noVariants = product.variants.length === 0;

  const selectedVariant = useMemo(() => {
    return product.variants.find((variant) => variant.id === selectedVariantId);
  }, [selectedVariantId, product.variants]);

  return (
    <ProductWrapper>
      <ProductImage
        src={product.featuredAsset?.preview ?? placeholderImage}
        alt={product.name}
      />
      <ProductInformation>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        <p>Choose a variant:</p>
        <Select
          value={selectedVariantId!}
          onChange={(e) => setSelectedVariantId(e.target.value)}
        >
          {product.variants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.name} - ${variant.price}
            </option>
          ))}
        </Select>
        <ProductActions>
          <Button
            onClick={() => {
              if (selectedVariant) {
                onAddToCart(selectedVariant.id);
              }
            }}
            variant="primary"
            disabled={noVariants}
          >
            Buy
          </Button>
        </ProductActions>
      </ProductInformation>
    </ProductWrapper>
  );
}
