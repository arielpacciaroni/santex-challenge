import { gql } from '@apollo/client';

export const productVariantFragment = gql`
  fragment ProductVariantFields on ProductVariant {
    id
    name
    price
  }
`;

export const featuredAssetFieldsFragment = gql`
  fragment FeaturedAssetFields on Asset {
    id
    preview
  }
`;

export const productsQuery = gql`
  query Products($offset: Int, $limit: Int) {
    products(options: { take: $limit, skip: $offset }) {
      items {
        id
        name
        description
        variants {
          ...ProductVariantFields
        }
        featuredAsset {
          ...FeaturedAssetFields
        }
      }
      totalItems
    }
  }

  ${productVariantFragment}
  ${featuredAssetFieldsFragment}
`;
