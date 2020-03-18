import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../services/api';

import { formatPrice } from '../../util/format';

import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';

import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState([]);

  const cartProducts = useSelector(state => state.cart.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const response = await api.get('/products');

      const products = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(products);
    };

    getProducts();
  }, []);

  const productsAmount = useMemo(
    () =>
      cartProducts.reduce((amount, product) => {
        amount[product.id] = product.amount;

        return amount;
      }, {}),
    [cartProducts]
  );

  useEffect(() => {
    setAmount(productsAmount);
  }, [productsAmount]);

  const handleAddProduct = product => {
    dispatch(CartActions.addToCart(product));
  };

  return (
    <ProductList>
      {products.map(product => (
        <li key={String(product.id)}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[product.id] || 0}
            </div>
            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
