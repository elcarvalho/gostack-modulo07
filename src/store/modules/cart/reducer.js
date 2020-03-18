import produce from 'immer';
import { formatPrice } from '../../../util/format';

const INITIAL_STATE = {
  products: [],
  cartSize: 0,
  total: formatPrice(0),
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;
        draft.products.push(product);
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = state.products.findIndex(
          product => product.id === action.id
        );

        if (productIndex >= 0) {
          draft.products.splice(productIndex, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const productIndex = state.products.findIndex(
          product => product.id === action.id
        );

        if (productIndex >= 0) {
          draft.products[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
