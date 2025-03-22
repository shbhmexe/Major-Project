import React from 'react';
import './App.css';
import ColorMatrix from './components/ColorMatrix';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Matrix Game</h1>
        <p>Click on boxes to change their color to green</p>
        <p>When the last box is clicked, all boxes will turn orange in sequence</p>
        <ColorMatrix />
      </header>
    </div>
  );
}

export default App;
