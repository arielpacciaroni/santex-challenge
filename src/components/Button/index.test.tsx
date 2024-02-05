import { Button } from '.';
import { renderWithStyledProvider } from '../../utils/renderWithStyledProvider';
import { fireEvent, screen } from '@testing-library/react';

describe('Button component', () => {
  it('should render a button', () => {
    const view = renderWithStyledProvider(
      <Button variant="primary">Hello world!</Button>
    );

    expect(screen.getByText('Hello world!')).toBeInTheDocument();
    expect(view).toMatchSnapshot();
  });

  it('should pass on the onClick button', async () => {
    const onClick = jest.fn();

    renderWithStyledProvider(
      <Button variant="primary" onClick={onClick}>
        Hello world!
      </Button>
    );

    fireEvent.click(screen.getByText('Hello world!'));

    expect(onClick).toHaveBeenCalled();
  });
});
