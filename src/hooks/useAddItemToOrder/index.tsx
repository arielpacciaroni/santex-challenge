import { useApolloClient, useMutation } from '@apollo/client';
import { addItemToOrderMutation } from '../../graphql/mutations';
import { ProductVariant } from '../../interfaces/ProductVariant';
import { useContext } from 'react';
import ProductContext from '../../components/ProductContext';
import { productVariantFragment } from '../../graphql/queries';

interface ItemParams {
  productVariantId: ProductVariant['id'];
  quantity: number;
}

export function useAddItemToOrder() {
  const context = useContext(ProductContext);
  const queryClient = useApolloClient();

  const [mutateAddItemToOrder] = useMutation(addItemToOrderMutation);

  const addItemToOrder = async (params: ItemParams) => {
    await mutateAddItemToOrder({ variables: params });
    const variant = queryClient.readFragment<ProductVariant>({
      id: `ProductVariant:${params.productVariantId}`,
      fragment: productVariantFragment,
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
