import styled, { css } from 'styled-components';
import { Theme } from '../../utils/theme';
import { HTMLProps } from 'react';

type Variant = 'primary';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  variant: Variant;
};

const variantStyles = (theme: Theme, variant: Variant = 'primary') =>
  ({
    primary: css`
      color: ${theme.colors.button['text-primary']};
      background-color: ${theme.colors.button['bg-primary']};

      &:hover {
        background-color: ${theme.colors.button['bg-primary-hover']};
      }
    `,
  })[variant];

export const Button = styled.button<ButtonProps>`
  border: none;
  outline: none;
  padding: ${(props) => props.theme.spacing.small}
    ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.spacing.small};
  font-size: 0.875rem;
  transition: all 0.3s;
  transition-delay: 100ms;
  cursor: pointer;

  ${({ theme, variant }) => variantStyles(theme, variant)}

  :disabled {
    background-color: ${(props) => props.theme.colors.button['bg-disabled']};
    color: ${(props) => props.theme.colors.button['text-disabled']};
    cursor: not-allowed;
  }
`;
