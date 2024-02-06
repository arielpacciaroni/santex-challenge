import { ProductList } from '.';
import { useProducts } from '../../hooks/useProducts';
import { useAddItemToOrder } from '../../hooks/useAddItemToOrder';

import { renderWithStyledProvider } from '../../utils/renderWithStyledProvider';

jest.mock('../../hooks/useProducts');
jest.mock('../../hooks/useAddItemToOrder');

describe('ProductList component', () => {
  it('should render the list of products', () => {
    (useProducts as jest.MockedFunction<typeof useProducts>).mockReturnValue({
      data: {
        items: [],
        totalItems: 0,
      },
      totalItems: 0,
      loading: false,
      error: undefined,
      called: false,
      fetchMore: jest.fn(),
    });

    (
      useAddItemToOrder as jest.MockedFunction<typeof useAddItemToOrder>
    ).mockReturnValue({
      addItemToOrder: jest.fn(),
    });

    const view = renderWithStyledProvider(<ProductList />);

    expect(view).toMatchSnapshot();
  });

  it('should call fetchMore when the component is mounted', () => {
    const fetchMore = jest.fn();

    (useProducts as jest.MockedFunction<typeof useProducts>).mockReturnValue({
      data: {
        items: [],
        totalItems: 0,
      },
      totalItems: 0,
      loading: false,
      error: undefined,
      called: false,
      fetchMore,
    });

    (
      useAddItemToOrder as jest.MockedFunction<typeof useAddItemToOrder>
    ).mockReturnValue({
      addItemToOrder: jest.fn(),
    });

    renderWithStyledProvider(<ProductList />);

    expect(fetchMore).toHaveBeenCalledWith({
      variables: {
        limit: 6,
        offset: 0,
      },
    });
  });

  it('should render a list of products if there are products', () => {
    (useProducts as jest.MockedFunction<typeof useProducts>).mockReturnValue({
      data: {
        items: [{
          description: 'description',
          id: 'id',
          featuredAsset: {
            id: 'id',
            preview: 'preview',
          },
          name: 'Product name',
          variants: [{
            id: 'id',
            name: 'name',
            price: 2000
          }]
        }],
        totalItems: 1,
      },
      totalItems: 1,
      loading: false,
      error: undefined,
      called: false,
      fetchMore: jest.fn(),
    });

    (
      useAddItemToOrder as jest.MockedFunction<typeof useAddItemToOrder>
    ).mockReturnValue({
      addItemToOrder: jest.fn(),
    });

    const view = renderWithStyledProvider(<ProductList />);

    expect(view.getByText('Product name')).toBeInTheDocument();
    expect(view.getByRole('button', { name: /Buy/i })).toBeInTheDocument();
  });

  it('should trigger addItemToOrder whenever Buy button is clicked', () => {
    const addItemToOrder = jest.fn();
    
    (useProducts as jest.MockedFunction<typeof useProducts>).mockReturnValue({
      data: {
        items: [{
          description: 'description',
          id: 'id',
          featuredAsset: {
            id: 'id',
            preview: 'preview',
          },
          name: 'Product name',
          variants: [{
            id: 'variantId',
            name: 'name',
            price: 2000
          }]
        }],
        totalItems: 1,
      },
      totalItems: 1,
      loading: false,
      error: undefined,
      called: false,
      fetchMore: jest.fn(),
    });

    (
      useAddItemToOrder as jest.MockedFunction<typeof useAddItemToOrder>
    ).mockReturnValue({
      addItemToOrder,
    });

    const view = renderWithStyledProvider(<ProductList />);

    view.getByRole('button', { name: /Buy/i }).click();

    expect(addItemToOrder).toHaveBeenCalledWith({
      productVariantId: 'variantId',
      quantity: 1,
    });
  });

  it('should load more products if Load more button is clicked', () => {
    const fetchMore = jest.fn();
    
    (useProducts as jest.MockedFunction<typeof useProducts>).mockReturnValue({
      data: {
        items: [{
          description: 'description',
          id: 'id',
          featuredAsset: {
            id: 'id',
            preview: 'preview',
          },
          name: 'Product name',
          variants: [{
            id: 'variantId',
            name: 'name',
            price: 2000
          }]
        }],
        totalItems: 1,
      },
      totalItems: 1,
      loading: false,
      error: undefined,
      called: false,
      fetchMore,
    });

    (
      useAddItemToOrder as jest.MockedFunction<typeof useAddItemToOrder>
    ).mockReturnValue({
      addItemToOrder: jest.fn(),
    });

    const view = renderWithStyledProvider(<ProductList />);

    view.getByRole('button', { name: /Load more/i }).click();

    expect(fetchMore).toHaveBeenCalled();
  });
});
