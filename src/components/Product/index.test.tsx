import userEvent from '@testing-library/user-event';
import { Product } from '.';
import { renderWithStyledProvider } from '../../utils/renderWithStyledProvider';
import { fireEvent, screen } from '@testing-library/react';

describe('Product component', () => {
  it('should render a product', () => {
    const view = renderWithStyledProvider(
      <Product
        onAddToCart={jest.fn()}
        product={{
          id: '1',
          name: 'Product name',
          description: 'Product description',
          featuredAsset: {
            id: '1',
            preview: 'https://via.placeholder.com/300',
          },
          variants: [
            {
              id: '1',
              price: 100,
              name: 'Variant 1',
            },
          ],
        }}
      />
    );

    expect(screen.getByText('Product name')).toBeInTheDocument();
    expect(screen.getByText('Product description')).toBeInTheDocument();
    expect(screen.getByText('Choose a variant:')).toBeInTheDocument();
    expect(view).toMatchSnapshot();
  });

  it('should trigger the onAddToCart function when the button is clicked', () => {
    const onAddToCart = jest.fn();
    const variantId = 'someVariantId';
    renderWithStyledProvider(
      <Product
        onAddToCart={onAddToCart}
        product={{
          id: '1',
          name: 'Product name',
          description: 'Product description',
          featuredAsset: {
            id: '1',
            preview: 'https://via.placeholder.com/300',
          },
          variants: [
            {
              id: variantId,
              price: 100,
              name: 'Variant 1',
            },
          ],
        }}
      />
    );

    fireEvent.click(screen.getByText('Buy'));

    expect(onAddToCart).toHaveBeenCalledWith(variantId);
  });

  it('should change the selected variant when the select input changes', () => {
    const view = renderWithStyledProvider(
      <Product
        onAddToCart={jest.fn()}
        product={{
          id: '1',
          name: 'Product name',
          description: 'Product description',
          featuredAsset: {
            id: '1',
            preview: 'https://via.placeholder.com/300',
          },
          variants: [
            {
              id: '1',
              price: 100,
              name: 'Variant 1',
            },
            {
              id: '2',
              price: 200,
              name: 'Variant 2',
            },
          ],
        }}
      />
    );

    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Variant 2 - $200' })
    );

    expect(screen.getByText('Variant 2 - $200')).toBeInTheDocument();

    expect(view).toMatchSnapshot();
  });
});
