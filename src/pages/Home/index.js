import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import { formatPrice } from '../../util/format';

import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);

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

  return (
    <ProductList>
      {products.map(product => (
        <li key={String(product.id)}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#fff" /> 3
            </div>
            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
