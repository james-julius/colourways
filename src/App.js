import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [scheme, setScheme] = useState('monochromatic');
  const [primaryColor, setPrimaryColor] = useState({backgroundColor: 'crimson'});
  const [secondaryColor, setSecondaryColor] = useState({backgroundColor: 'rebeccapurple'});
  const [tertiaryColor, setTertiaryColor] = useState({backgroundColor: 'white'});

  const hsla = (hue, saturation, lightness, opacity) => {
    return `hsla(${hue},${saturation}, ${lightness + '%'}, ${opacity})`;
  };

  const colourChanger = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    document.getElementsByClassName('main')[0].style.backgroundColor = `rgb(${r},${g},${b})`;
  }

  const applyColorScheme = () => {
    if (scheme === 'monochromatic') {
      console.log('changing to a monochromatic style')
      const primaryHue = Math.floor(Math.random()*360);
      const lightness = [
        Math.floor(Math.random()*30)+.7,
        Math.floor(Math.random()*50)+.2,
        Math.floor(Math.random()*100)]
      console.log(lightness)
      setPrimaryColor({backgroundColor: hsla(primaryHue,'100%',lightness[0], 1)});
      setSecondaryColor({backgroundColor: hsla(primaryHue,'100%',lightness[1], 1)});
      setTertiaryColor({backgroundColor: hsla(primaryHue,'100%',lightness[2], 1)});
      console.log([primaryColor, secondaryColor, tertiaryColor])
    }
  }

  useEffect(() => {
    colourChanger();
    setInterval(colourChanger, 10000);
    // colourChanger();
  }, []);

  return (
  <div className="App">
    <div className="sidebar">
      <h1>Colourways</h1>
      <h2>The colour scheme generator for websites.</h2>
      <select onChange={(event) => setScheme(event.target.value)}>
        <option value="monochromatic">Monochromatic</option>
        <option value="complementary">Complementary</option>
        <option value="triadic">Triadic</option>
      </select>
      <div className="colourButton" onClick={applyColorScheme}>Click me</div>
      <div className="colourway">
        <div className="colorBar" style={primaryColor}>
          <span>
            Primary: 
          </span>
        </div>
        <div className="colorBar" style={secondaryColor}>
          <span>
            Secondary:
          </span>
        </div>
        <div className="colorBar" style={tertiaryColor}>
          <span>
            Tertiary:
          </span>
        </div>
      </div>
    </div>
    <div className="main">
      <div className="minisite" style={tertiaryColor}>
        <div className="nav" style={primaryColor}>
          <span className="genericLogo">∆</span>
          <h4>Home</h4>
          <h4>About us</h4>
        </div>
        <div className="section1">
          <span className="contentBlock" style={primaryColor}>Content Block</span>
          <span className="contentBlock" style={primaryColor}>Content Block</span>
        </div>
        <div className="section2"/>
        <div className="footer" style={secondaryColor}/>
      </div>
    </div>
  </div>
  );
}

export default App;
