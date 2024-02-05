import styled from "styled-components";
import { baseColors } from "../utils/baseColors";
import { useContext } from "react";
import ProductContext from "./ProductContext";

const HeaderWrapper = styled.header`
  background-color: ${baseColors.secondary};
  color: ${baseColors.highlight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
`;

export function Header() {
  const context = useContext(ProductContext);
  return (
    <HeaderWrapper>
      <Image
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />

      <div>${context.subTotal}</div>
    </HeaderWrapper>
  );
}
