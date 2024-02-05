import { gql } from '@apollo/client';

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
