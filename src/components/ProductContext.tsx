import { createContext, ReactNode } from 'react';
import useStateWithStorage from '../hooks/useStateWithStorage';

interface ProductContextValues {
  subTotal: number;
  setSubTotal: (value: number) => void;
}

const ProductContext = createContext<ProductContextValues>({
  subTotal: 0,
  setSubTotal: () => {},
});

interface ProductContextProviderProps {
  children: ReactNode;
}

function ProductContextProvider({ children }: ProductContextProviderProps) {
  const [subTotal, setSubTotal] = useStateWithStorage('subTotal', 0);

  return (
    <ProductContext.Provider value={{ subTotal, setSubTotal }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContextProvider };
export default ProductContext;
