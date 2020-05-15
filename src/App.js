import React, { useState, useEffect } from 'react';
import './App.scss';
import hslWheel from './hslwheel.png';
import {convert as colorConvert } from 'color-convert';

function App() {
  const [scheme, setScheme] = useState('monochromatic');
  const [primaryHue, setPrimaryHue] = useState(0);
  const [primaryColor, setPrimaryColor] = useState({backgroundColor: 'crimson'});
  const [secondaryColor, setSecondaryColor] = useState({backgroundColor: 'rebeccapurple'});
  const [secondaryFontColor, setSecondaryFontColor] = useState({color: 'black'});
  const [tertiaryColor, setTertiaryColor] = useState({backgroundColor: 'white'});
  const [colorFormat, setColorFormat] = useState('hsla');
  const [colorFormatHandlePosition, setColorFormatHandlePosition] = useState({});

  const changeColorFormat = (format) => {
    console.log(format)
    console.log('format change called with format: ' + format)
    let leftValue;
    switch (format) {
      case 'hsla':
        leftValue = 'calc(12.5%-8px)';
        break;
      case 'rgb': 
        leftValue = 'calc(37.5%-8px)';
        break;
      case 'cmyk':
        leftValue = 'calc(62.5%-8px)';
        break;
      case 'hex':
        leftValue = 'calc(97.5%-8px)';
        break;
    }
    console.log(leftValue)
    setColorFormatHandlePosition({
      position: 'absolute',
      left: leftValue
    });
  }

  const hsla = (hue, saturation, lightness, opacity) => {
    return `hsla(${hue},${saturation}, ${lightness + '%'}, ${opacity})`;
  };

  const colourChanger = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    document.getElementsByClassName('main')[0].style.backgroundColor = `rgba(${r},${g},${b}, 0.3)`;
    document.getElementsByClassName('sidebar')[0].style.backgroundColor = `rgba(${r},${g},${b},1)`;
  }

  const applyColorScheme = () => {
    if (scheme === 'monochromatic') {
      console.log('changing to a monochromatic style')
      const hue = Math.floor(Math.random()*360);
      setPrimaryHue(hue);
      const lightness = [
        Math.floor(Math.random()*50)+25,
        Math.floor(Math.random()*50),
        Math.floor(Math.random()*20)+80];
      console.log(lightness);
      const primary = hsla(hue,'100%',lightness[0], 1);
      const secondary = hsla(hue,'100%',lightness[1], 1);
      const tertiary = hsla(hue,'100%',lightness[2], 1);
      setPrimaryColor({
        color: tertiary,
        backgroundColor: primary
      });
      setSecondaryColor({
        backgroundColor: secondary,
        color: tertiary
      });
      setSecondaryFontColor({color: secondary})
      setTertiaryColor({backgroundColor: tertiary});
    }
  }

  useEffect(() => {
    colourChanger();
    setInterval(colourChanger, 5000);
    // colourChanger();
  }, []);

  return (
  <div className="App">
    <div className="sidebar">
      <h1>Colourways</h1>
      <h2>A colour scheme generator for websites.</h2>
      <select onChange={(event) => setScheme(event.target.value)}>
        <option value="monochromatic">Monochromatic</option>
        <option value="complementary">Complementary</option>
        <option value="triadic">Triadic</option>
      </select>
      <div className="colourButton" onClick={applyColorScheme}>Generate</div>
      <div className="colourway">
        <h3>Format:</h3>
        <span className="switch" onClick={changeColorFormat}>
          <div className="slider">
            <div className="handleContainer" onClick={() => changeColorFormat('hsla')}>
              <div className="handleoverlay"/>
            </div>
            <div className="handleContainer" onClick={() => changeColorFormat('rgb')}>
              <div className="handleoverlay"/>
            </div>
            <div className="handleContainer" onClick={() => changeColorFormat('cmyk')}>
              <div className="handleoverlay"/>
            </div>
            <div className="handleContainer" onClick={() => changeColorFormat('hex')}>
              <div className="handleoverlay"/>
            </div>
            <div className="handle" style={colorFormatHandlePosition}/>
          </div>
          <div className="options">
            <p>HSL</p>
            <p>RGB</p>
            <p>CMYK</p>
            <p>HEX</p>
          </div>
        </span>
        <div className="colorBar" style={primaryColor} onClick={() => console.log('single clicked')} onDoubleClick={() => {console.log('double clicked')}}>
            {primaryColor.backgroundColor}
        </div>
        <div className="colorBar" style={secondaryColor}>
          <span>
            {secondaryColor.backgroundColor} 
          </span>
        </div>
        <div className="colorBar" style={tertiaryColor}>
          <span>
            {tertiaryColor.backgroundColor}
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
        <div className="section2" style={secondaryFontColor}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna 
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <div className="footer" style={secondaryColor}>
          <span className="footerSubContainer">
            <p>Login</p>
            <p>Sign Up</p>
          </span>
          <span className="footerSubContainer">
            <p>Pricing</p>
            <p>About us</p>
          </span>
        </div>
      </div>
      <div className="hslWheelContainer">
        <div src={hslWheel} className="hslWheel">
          <div className="handContainer" style={{transform: `rotate(${primaryHue}deg)`}}>
            <span className="colourHandOne" />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
