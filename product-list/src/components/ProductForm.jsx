import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import * as productsActions from '../features/productsSlice';

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const [{ id, name, price, snippet, imageUrl, isPined }, setValues] = useState({
    name: '',
    price: '',
    snippet: '',
    imageUrl: '',
    id: '',
    isPined: false,
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(productsActions.addProduct({ id, name, price, snippet, imageUrl, isPined }));
    setValues({
      name: '',
      price: '',
      snippet: '',
      imageUrl: '',
      id: '',
      isPined: false,
    });
    setMessage('Your product added to the bottom of the list')
    setTimeout(()=> setMessage(''), 3000);
  }; 

const handleChange = (event) => {
  if (event.target.files) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.addEventListener("load", () => {
      setValues(current => ({ 
      ...current, imageUrl: reader.result }));
    }, false);

  } else {
    const { name: field, value } = event.target;
  
    setValues(current => ({ 
      ...current, [field]: value, id: name }));
  }
};

useEffect(() => {
  if (name && price && snippet && imageUrl) {
    setIsDisabled(false);
  }
}, [name, price, snippet, imageUrl])

  return (
    <section>
      <form className="product-form">
        <input
          value={name}
          onChange={handleChange}
          className="product-form-fields" 
          type="text" name="name" 
          placeholder="Product name"
        />
        
        <input 
          className="product-form-fields" 
          type="number" 
          name="price" 
          placeholder="Product price" 
          value={price}
          onChange={handleChange}
        />

        <textarea
          rows={4} 
          cols={40}
          type="text" 
          name="snippet" 
          value={snippet}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="file"> Upload product Image </label>
          <input
            id="file"
            className="product-form-fields" 
            type="file" 
            name="imageUrl" 
            onChange={handleChange}
          />
        </div>

        <button
          className="product-form-button"
          onClick={handleFormSubmit} 
          type="submit"
          disabled={isDisabled}
        > 
          Add product to list
        </button>
      </form>

      <p>{message}</p>
      
      <hr />
    </section>
  )
};

export default ProductForm;