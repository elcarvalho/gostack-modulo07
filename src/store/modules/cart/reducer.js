const INITIAL_STATE = {
  products: [],
  cartSize: 0,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const cartSize = state.products.length + 1;
      return { products: [...state.products, action.product], cartSize };

    default:
      return state;
  }
}
