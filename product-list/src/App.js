import React from 'react';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <ProductForm />
      <SearchBar />
      <ProductList />
    </div>
  );
}

export default App;
