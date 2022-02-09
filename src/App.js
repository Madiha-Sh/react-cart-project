import React, { Component } from 'react';
import NavBar from './navbar';
import Cart from './cart';
import { useGlobalContext } from './context';

function App() {

  const { isLoading } = useGlobalContext();

  if(isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <NavBar />
      <Cart />
    </main>
  );
}

export default App;