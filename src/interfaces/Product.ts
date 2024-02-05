import { Asset } from './Asset';
import { ProductVariant } from './ProductVariant';

export interface Product {
  id: string;
  name: string;
  description: string;
  variants: ProductVariant[];
  featuredAsset: Asset | null;
}
