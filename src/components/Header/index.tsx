import styled from 'styled-components';
import { useProductContext } from '../../hooks/useProductContext';
import { Container } from '../Container';

const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.highlight};
  padding: ${(props) => props.theme.spacing.medium};
`;

const Image = styled.img`
  width: 100px;
  height: auto;
`;

export function Header() {
  const { subTotal } = useProductContext();

  return (
    <HeaderWrapper>
      <Container>
        <Image
          src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
          alt="Logo"
        />
        <p>Your subtotal: ${subTotal}</p>
      </Container>
    </HeaderWrapper>
  );
}
