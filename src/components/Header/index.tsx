import styled from 'styled-components';
import { useProductContext } from '../../hooks/useProductContext';
import { Container } from '../Container';
import { Button } from '../Button';
import { useCallback } from 'react';

const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.highlight};
  padding: ${(props) => props.theme.spacing.medium};
`;

const Image = styled.img`
  width: 100px;
  height: auto;
`;

const HeaderMenu = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export function Header() {
  const { subTotal, setSubTotal } = useProductContext();

  const handleClearCart = useCallback(() => {
    setSubTotal(0);
  }, []);

  return (
    <HeaderWrapper>
      <Container>
        <HeaderMenu>
          <div>
            <Image
              src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
              alt="Logo"
            />
            <p>Your subtotal: ${subTotal}</p>
          </div>
          <Button variant="error" onClick={handleClearCart}>
            Clear cart
          </Button>
        </HeaderMenu>
      </Container>
    </HeaderWrapper>
  );
}
