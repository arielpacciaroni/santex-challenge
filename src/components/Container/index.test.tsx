import { Container } from '.';
import { renderWithStyledProvider } from '../../utils/renderWithStyledProvider';
import { screen } from '@testing-library/react';

describe('Container component', () => {
  it('should render a container along with the children element', () => {
    const view = renderWithStyledProvider(<Container>Hello world!</Container>);

    expect(screen.getByText('Hello world!')).toBeInTheDocument();
    expect(view).toMatchSnapshot();
  });
});
