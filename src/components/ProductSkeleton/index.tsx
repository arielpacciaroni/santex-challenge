import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';

const ProductWrapper = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid ${(props) => props.theme.colors.blend};
  border-radius: ${(props) => props.theme.spacing.small};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing.medium};
  min-height: 150px;
`;

export function ProductSkeleton() {
  return (
    <ProductWrapper>
      <TailSpin visible height={60} width={60} color="#ccc" />
    </ProductWrapper>
  );
}
