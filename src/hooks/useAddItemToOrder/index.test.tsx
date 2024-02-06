import { useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { useAddItemToOrder } from '.';

jest.mock('@apollo/client');
jest.mock('react');

describe('useAddItemToOrder', () => {
  it('should call the mutation add item to order and update the context', async () => {
    const price = 100;
    const mutateAddItemToOrder = jest.fn();
    const readFragment = jest.fn(() => ({
      price,
    }));
    const setSubTotal = jest.fn();
    const context = {
      subTotal: 0,
      setSubTotal,
    };

    (useMutation as jest.Mock).mockReturnValue([mutateAddItemToOrder]);
    (useApolloClient as jest.Mock).mockReturnValue({
      readFragment,
    });
    (useContext as jest.Mock).mockReturnValue(context);

    const { addItemToOrder } = useAddItemToOrder();

    await addItemToOrder({ productVariantId: '1', quantity: 1 });

    expect(mutateAddItemToOrder).toHaveBeenCalledWith({
      variables: {
        productVariantId: '1',
        quantity: 1,
      },
    });
    expect(setSubTotal).toHaveBeenCalledWith(price);
  });

  it('should call the mutation add item to order and NOT update the context if variant is not found', async () => {
    const mutateAddItemToOrder = jest.fn();
    const readFragment = jest.fn(() => null);
    const setSubTotal = jest.fn();
    const context = {
      subTotal: 0,
      setSubTotal,
    };

    (useMutation as jest.Mock).mockReturnValue([mutateAddItemToOrder]);
    (useApolloClient as jest.Mock).mockReturnValue({
      readFragment,
    });
    (useContext as jest.Mock).mockReturnValue(context);

    const { addItemToOrder } = useAddItemToOrder();

    await addItemToOrder({ productVariantId: '1', quantity: 1 });

    expect(mutateAddItemToOrder).toHaveBeenCalledWith({
      variables: {
        productVariantId: '1',
        quantity: 1,
      },
    });
    expect(setSubTotal).not.toHaveBeenCalled();
  });
});
