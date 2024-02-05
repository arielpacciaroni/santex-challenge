import { useContext } from "react";
import ProductContext from "../components/ProductContext";

export function useProductContext() {
  return useContext(ProductContext);
}