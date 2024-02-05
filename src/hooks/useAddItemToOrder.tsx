import { gql, useApolloClient, useMutation } from '@apollo/client';
import { addItemToOrderMutation } from '../graphql/mutations';
import { Variant } from '../graphql/queries';
import { useContext } from 'react';
import ProductContext from '../components/ProductContext';

interface ItemParams {
  productVariantId: string;
  quantity: number;
}

export function useAddItemToOrder() {
  const context = useContext(ProductContext);
  const queryClient = useApolloClient();

  const [mutateAddItemToOrder] = useMutation(addItemToOrderMutation);

  const addItemToOrder = async (params: ItemParams) => {
    await mutateAddItemToOrder({ variables: params });
    const variant = queryClient.readFragment<Variant>({
      id: `ProductVariant:${params.productVariantId}`,
      fragment: gql`
        fragment NewVariant on ProductVariant {
          id
          name
          price
        }
      `,
    });

    if (variant) {
      const subTotal = context.subTotal;
      context.setSubTotal(subTotal + variant.price * params.quantity);
    }
  };

  return {
    addItemToOrder,
  };
}
