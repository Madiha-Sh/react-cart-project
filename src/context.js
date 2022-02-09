import React, { Component, useState, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import data from './data';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  const initialState = {
    isLoading: true,
    cart: [],
    amount: 0,
    total: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const url = 'https://course-api.com/react-useReducer-cart-project';
  
  const getData = async () => {
    dispatch({ type: 'LOADING' });
    // const resp = await fetch(url);
    // const data = await resp.json();
    dispatch({ type: 'GET_DATA', payload: data });
  };

  // const handleIncrease = (id) => {
  //   dispatch({ type: 'INCREASE', payload: id});
  // };

  // const handleDecrease = (id) => {
  //   dispatch({ type: 'DECREASE', payload: id});
  // };

  const handleToggle = (id, type) => {
    dispatch({ type: 'TOGGLE', payload: {id, type} });
  }

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE', payload: id});
  }

  const handleClear = () => {
    dispatch({ type: "CLEAR_CART" })
  };

  useEffect(() => {
    getData();
  }, [data])

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' });
  }, [state.cart]);

  return (
    <AppContext.Provider 
      value={{
        ...state,
        // handleIncrease,
        // handleDecrease,
        handleRemove,
        handleClear,
        handleToggle,
      }}
    >
      { children }
    </AppContext.Provider>
  )
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };