import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { formatPrice } from '../../util/format';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

import * as CartActions from '../../store/modules/cart/actions';

export default function Cart() {
  const products = useSelector(state => state.cart.products);

  const total = useMemo(
    () =>
      formatPrice(
        products.reduce(
          (total, product) => total + product.price * product.amount,
          0
        )
      ),
    [products]
  );

  const productList = useMemo(
    () =>
      products.map(product => ({
        ...product,
        subtotal: formatPrice(product.price * product.amount),
      })),
    [products]
  );

  const dispatch = useDispatch();

  const handleIncrement = product => {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  };

  const handleDecrement = product => {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  };

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {productList.map(product => (
            <tr key={String(product.id)}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => handleDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button
                    type="button"
                    onClick={() => handleIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} color="#7150c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(CartActions.removeFromCart(product.id))
                  }
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
