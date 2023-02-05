import { useAppDispatch } from "../app/hooks";
import * as productsActions from '../features/productsSlice';
import classNames from 'classnames';

const ProductCard = ({product}) => {
  const dispatch = useAppDispatch();
  const {name, imageUrl, snippet, price, id, isPined } = product;

  const handleDeleteProduct = (productId) => {
    dispatch(productsActions.removeProduct(productId));
  };

  const handlePinProduct = (productId) => {
    dispatch(productsActions.pinProduct(productId));
  };

  return (
    <div className={classNames('products__card', { isPined })}>
      <img className="products__card__img" src={imageUrl} alt={name}/>
      <p className="products__card__title"> {name} </p>
      <p className="products__card__price"> {price} USD </p>
      <p className="products__card__description"> {snippet} </p>
      <div className="products__card__buttons">
        <button onClick={() => handlePinProduct(id)} type="button"> Pin product</button>
        <button onClick={() => handleDeleteProduct(id)} type="button"> Delete product</button>
      </div>
    </div>
  )
};

export default ProductCard;