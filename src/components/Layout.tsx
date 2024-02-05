import { ReactNode } from "react";
import styled from "styled-components";

const MainLayout = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors["light-gray"]};
`;

interface LayoutProps {
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}
