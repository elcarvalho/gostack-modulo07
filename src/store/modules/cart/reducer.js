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
        const productIndex = draft.products.findIndex(
          product => product.id === action.product.id
        );

        if (productIndex >= 0) {
          draft.products[productIndex].amount += 1;
        } else {
          action.product.amount = 1;
          draft.products.push(action.product);
        }
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

    case '@cart/UPDATE_AMOUNT': {
      if (action.amount <= 0) {
        return state;
      }

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
