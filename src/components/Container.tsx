import { ReactNode } from "react";
import styled from "styled-components";

interface ContainerProps {
  children: ReactNode;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
`;
