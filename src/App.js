import React, { useState, useEffect, useRef } from 'react';
import './App.scss';

function App() {
  // const [scheme, setScheme] = useState('monochromatic');

  const colourChanger = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    document.getElementsByClassName('main')[0].style.backgroundColor = `rgb(${r},${g},${b})`;
  }

  useEffect(() => {
    colourChanger();
  }, []);

  return (
  <div className="App">
    <div className="sidebar">
      <h2>Colour Scheme Generator</h2>
      <select>
        <option>Monochromatic</option>
        <option>Complementary</option>
        <option>Triadic</option>
      </select>
      <div className="colourButton" onClick={colourChanger}>Click me</div>
    </div>
    <div className="main">
      <div className="minisite">
        <div className="nav">
          <span>∆</span>
          <h4>Home</h4>
          <h4>About us</h4>
        </div>
        <div className="section1">
          <span className="content-block">Content Block</span>
          <span className="content-block">Content Block</span>
        </div>
        <div className="section2"/>
        <div className="footer"/>
      </div>
    </div>
  </div>
  );
}

export default App;
