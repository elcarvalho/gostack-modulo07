import produce from 'immer';

const INITIAL_STATE = {
  products: [],
  cartSize: 0,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD':
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

    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = state.products.findIndex(
          product => product.id === action.id
        );

        if (productIndex >= 0) {
          draft.products.splice(productIndex, 1);
        }

        draft.cartSize = draft.products.reduce(
          (prev, curr) => prev + curr.amount,
          0
        );
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

          draft.cartSize = draft.products.reduce(
            (prev, curr) => prev + curr.amount,
            0
          );
        }
      });
    }
    default:
      return state;
  }
}
