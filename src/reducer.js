const reducer = (state, action) => {
  if(action.type === 'LOADING') {
    return {
      ...state,
      isLoading: true,
    }
  }
  if(action.type === 'GET_DATA') {
    return {
      ...state,
      isLoading: false,
      cart: action.payload,
    }
  }
  if(action.type === 'INCREASE') {
    const tempCart = state.cart.map(item => {
      if(item.id === action.payload) {
        return {...item, amount: item.amount + 1}
      }
      return item;
    })
    return {
      ...state,
      cart: tempCart
    }
  }
  if(action.type === 'DECREASE') {
    let tempCart = state.cart.map(item => {
      if(item.id === action.payload) {
        return {...item, amount: item.amount - 1}
      }
      return item;
    });
    tempCart = tempCart.filter(item => item.amount !== 0);
    return {
      ...state,
      cart: tempCart
    }
  }
  if(action.type === 'REMOVE') {
    const newCart = state.cart.filter(item => item.id != action.payload);
    return {
      ...state,
      cart: newCart,
    }
  }
  if(action.type ===  'GET_TOTAL') {
    let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
      const { price, amount } = cartItem;
      const itemTotal = price*amount;
      cartTotal.total += itemTotal;
      cartTotal.amount += amount;
      return cartTotal;
    },{
      total : 0,
      amount : 0
    })

    total = parseFloat(total.toFixed(2));

    return {
      ...state,
      total: total,
      amount: amount,
    }
  }
  if(action.type === 'CLEAR_CART') {
    return {
      ...state,
      cart: []
    }
  }
  if(action.type === "TOGGLE") {
    let tempCart = state.cart.map(item => {
      if(item.id === action.payload.id) {
        if(action.payload.type === 'inc') {
          return { ...item, amount: item.amount + 1 };
        }
        if(action.payload.type === 'dec') {
          return { ...item, amount: item.amount - 1 };
        }
      }
      return item
    });
    tempCart = tempCart.filter(item => item.amount !== 0);
    return {
      ...state,
      cart: tempCart
    }
  }
  throw new Error('no matching action type')
};

export default reducer;