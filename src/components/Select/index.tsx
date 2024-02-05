import styled from 'styled-components';

export const Select = styled.select`
  padding: ${(props) => props.theme.spacing.small};
  border-radius: 0.25rem;
  border: 1px solid ${(props) => props.theme.colors.blend};
  margin: ${(props) => props.theme.spacing.small} 0;
  width: 100%;
  background-color: #fff;
  color: #000;

  cursor: pointer;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;
