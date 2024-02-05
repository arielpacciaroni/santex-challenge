import { gql } from '@apollo/client';

export const addItemToOrderMutation = gql`
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      __typename
    }
  }
`;
