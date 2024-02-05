import styled from "styled-components";
import { useProductContext } from "../../hooks/useProductContext";

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.highlight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.medium};
`;

const Image = styled.img`
  width: 100px;
  height: auto;
`;

export function Header() {
  const { subTotal } = useProductContext();

  return (
    <HeaderWrapper>
      <Image
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="Logo"
      />
      <p>${subTotal}</p>
    </HeaderWrapper>
  );
}
