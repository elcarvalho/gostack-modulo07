import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import Logo from '../../assets/images/logo.svg';

export default function Header() {
  const products = useSelector(state => state.cart.products);

  const cartSize = useMemo(
    () => products.reduce((total, product) => total + product.amount, 0),
    [products]
  );

  return (
    <Container>
      <Link to="/">
        <img src={Logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} items</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}
