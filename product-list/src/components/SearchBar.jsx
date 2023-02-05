import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import * as productsActions from '../features/productsSlice';
import { useDebounce } from "../app/useDebounce";
import dataProducts from "../data/products.json";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [noSearchResult, setNoSearchResult] = useState('');
  const searchDebounce = useDebounce(query, 500);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  }; 

  useEffect(() => {
    if (searchDebounce) {
      const searchedProducts = dataProducts.filter(product => {
        return product.name.toLowerCase().includes(searchDebounce.toLowerCase()) 
        || product.snippet.toLowerCase().includes(searchDebounce.toLowerCase());
      });
  
      dispatch(productsActions.setProducts(searchedProducts));

      if (!searchedProducts.length) {
        setNoSearchResult('No products were found');
      } else {
        setNoSearchResult('');
      }
    }

    if (!searchDebounce.length) {
      setNoSearchResult('');
      dispatch(productsActions.setProducts(dataProducts));
    }
  }, [searchDebounce, dispatch]);

  return (
    <section className="searchbar">
      <input
        className="searchbar__field" 
        type="search" 
        placeholder="Search the product by name or description"
        value={query}
        onChange={handleSearch} 
      />

      <p>{noSearchResult}</p>
    </section>
  )
};

export default SearchBar;