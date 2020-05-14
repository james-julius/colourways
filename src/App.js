import React from 'react';
import './App.scss';

function App() {
  setInterval(() => {
    colourChanger()
  }, 2000)
  const colourChanger = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
  }
  return (
  <div className="App">
    <div className="sidebar"/>
    <div className="colourButton" onClick={colourChanger}>Click me</div>
  </div>
  );
}

export default App;
