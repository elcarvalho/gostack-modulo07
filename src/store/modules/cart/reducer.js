import produce from 'immer';

const INITIAL_STATE = {
  products: [],
  cartSize: 0,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
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

        draft.cartSize += 1;
      });

    default:
      return state;
  }
}
