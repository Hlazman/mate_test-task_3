import { useEffect } from "react";
import ProductCard from "./ProductCard";
import dataProducts from "../data/products.json";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import * as productsActions from '../features/productsSlice';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);
  
  useEffect(()=> {
    dispatch(productsActions.setProducts(dataProducts));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <div className="products">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)

};

export default ProductList;