import React from 'react';
import './App.css';
import Game from './components/Game'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Game/>
    </div>
  );
}

export default App;
