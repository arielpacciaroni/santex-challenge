import { Header } from ".";
import { useProductContext } from "../../hooks/useProductContext";
import { renderWithStyledProvider } from "../../utils/renderWithStyledProvider";
import { screen } from "@testing-library/react";

jest.mock('../../hooks/useProductContext');

describe('Header component', () => {
  it('should render the header', () => {
    (useProductContext as jest.MockedFunction<typeof useProductContext>).mockReturnValue({
      subTotal: 0,
      setSubTotal: jest.fn()
    });

    const component = renderWithStyledProvider(
      <Header />
    );

    expect(component).toMatchSnapshot();
  });

  it('should render the correct subTotal in the header', () => {
    (useProductContext as jest.MockedFunction<typeof useProductContext>).mockReturnValue({
      subTotal: 100,
      setSubTotal: jest.fn()
    });

    renderWithStyledProvider(
      <Header />
    );

    expect(screen.queryByText('$100')).toBeInTheDocument();
  })
})