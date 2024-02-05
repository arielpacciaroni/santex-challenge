import { gql } from '@apollo/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  variants: Variant[];
  featuredAsset: Asset;
}

export interface Variant {
  id: string;
  name: string;
  price: number;
}

interface Asset {
  id: string;
  preview: string;
}

export const productsQuery = gql`
  query Products($offset: Int, $limit: Int) {
    products(options: { take: $limit, skip: $offset }) {
      items {
        id
        name
        description
        variants {
          id
          name
          price
        }
        featuredAsset {
          id
          preview
        }
      }
      totalItems
    }
  }
`;
