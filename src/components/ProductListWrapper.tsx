import styled from "styled-components";

export const ProductListWrapper = styled.div`
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${props => props.theme.spacing.small};
`