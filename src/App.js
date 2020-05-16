import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.scss';
import hslWheel from './hslwheel.png';
import convert from 'color-convert';

function App() {
  const [scheme, setScheme] = useState('monochromatic');
  const [primaryHue, setPrimaryHue] = useState(0);
  const [primaryColor, setPrimaryColor] = useState({backgroundColor: 'crimson'});
  const [secondaryColor, setSecondaryColor] = useState({backgroundColor: 'rebeccapurple'});
  const [secondaryFontColor, setSecondaryFontColor] = useState({color: 'black'});
  const [tertiaryColor, setTertiaryColor] = useState({backgroundColor: 'white'});
  const [currentColors, setCurrentColors] = useState([primaryColor.backgroundColor, secondaryColor.backgroundColor, tertiaryColor.backgroundColor]);
  const [colorFormat, setColorFormat] = useState('hsl');
  const [colorFormatHandlePosition, setColorFormatHandlePosition] = useState({});
  const [dynamicTextColor, setDynamicTextColor] = useState({color: 'black'});
  const primaryRef = useRef();
  const secondaryRef = useRef();
  const tertiaryRef = useRef();
  
  const handleCopy = (inputRef, refIndex) => {
    navigator.clipboard.writeText(handleColorFormat(currentColors[refIndex]));
    inputRef.current.innerHTML = 'Copied!'
  }

  const handleMouseEnter = (inputRef) => {
    console.log(inputRef)
    inputRef.current.innerHTML = 'Double click to copy.';
  }
  const handleMouseLeave = (inputRef, refIndex) => {
    console.log(currentColors)
    console.log('REFINDEX: ',refIndex);
    console.log(currentColors[refIndex])
    inputRef.current.innerHTML = handleColorFormat(currentColors[refIndex]);
  }

  const changeColorFormat = useCallback((format) => {
    // Animating the slider switch to the selected format
    // Syntax change is handled by the below function, that returns directly to the element.
    let leftValue;
    switch (format) {
      case 'hsl':
        setColorFormat('hsl');
        leftValue = 'calc(12.5% - 8px)';
        break;
      case 'rgb': 
      setColorFormat('rgb');
        leftValue = 'calc(37.5% - 8px)';
        break;
      case 'cmyk':
        setColorFormat('cmyk');
        leftValue = 'calc(62.5% - 8px)';
        break;
      case 'hex':
        setColorFormat('hex');
        leftValue = 'calc(87.5% - 8px)';
        break;
    }
    // console.log(leftValue)
    setColorFormatHandlePosition({
      position: 'absolute',
      left: leftValue
    });
  }, [colorFormat]);

  const handleColorFormat = useCallback((inputHsl) => {
    // Function is called on render
    // console.log('INPUT HSL: ', inputHsl);
    // console.log(colorFormat)
    const hslArr = inputHsl.slice(5, inputHsl.length -1).replace(/%/g, '').split`,`.map(str => +str);
    if (colorFormat === 'hsl') {
      return inputHsl}
    if (colorFormat === 'rgb') {
      let [r,g,b] = convert.hsl.rgb(hslArr);
      return `rgb(${r},${g},${b})`}
    if (colorFormat === 'cmyk') {
      let [c,m,y,k] = convert.hsl.cmyk(hslArr);
      return `cmyk(${c},${m},${y},${k})`}
    if (colorFormat === 'hex') {
      // console.log(convert.hsl.hex)
      return '#' + convert.hsl.hex(hslArr)}
  }, [colorFormat]);

  const hsl = (hue, saturation, lightness) => {
    return `hsl(${hue},${saturation}, ${lightness + '%'})`;
  };

  const colourChanger = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let [h,s,l] = [Math.floor(Math.random()*360),100,Math.floor(Math.random()* 100)];
    if (l >= 50 ) {setDynamicTextColor({color: 'rgb(50,50,50)'})} else {setDynamicTextColor({color: 'rgb(240,240,240)'})}
    document.getElementsByClassName('main')[0].style.backgroundColor = `rgba(${r},${g},${b}, 0.3)`;
    document.getElementsByClassName('sidebar')[0].style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
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
      const [primary,secondary,tertiary] = [hsl(hue,'100%',lightness[0]),hsl(hue,'100%',lightness[1]),hsl(hue,'100%',lightness[2])];
      console.log([primary,secondary,tertiary]);
      setCurrentColors([primary,secondary,tertiary]);
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
    setInterval(colourChanger, 15000);
    // colourChanger();
  }, []);

  return (
  <div className="App">
    <div className="sidebar">
      <h1 style={dynamicTextColor}>Colourways</h1>
      <h2 style={dynamicTextColor}>A colour scheme generator for websites.</h2>
      <select onChange={(event) => setScheme(event.target.value)}>
        <option value="monochromatic">Monochromatic</option>
        <option value="complementary">Complementary</option>
        <option value="triadic">Triadic</option>
      </select>
      <div className="colourButton" onClick={applyColorScheme}>Generate</div>
      <div className="colourway">
        <h3 style={dynamicTextColor}>Format:</h3>
        <span className="switch">
          <div className="slider">
            <div className="handleContainer" onClick={() => changeColorFormat('hsl')}>
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
          <div className="options" style={dynamicTextColor}>
            <p>HSL</p>
            <p>RGB</p>
            <p>CMYK</p>
            <p>HEX</p>
          </div>
        </span>
        <div className="colorBar" ref={primaryRef} 
          style={primaryColor} 
          onMouseEnter={() => handleMouseEnter(primaryRef)} 
          onMouseLeave={() => handleMouseLeave(primaryRef,0)} 
          onDoubleClick={() => handleCopy(primaryRef, 0)}>
            {handleColorFormat(primaryColor.backgroundColor)}
        </div>
        <div className="colorBar" ref={secondaryRef} 
          style={secondaryColor} 
          onMouseEnter={() => handleMouseEnter(secondaryRef)} 
          onMouseLeave={() => handleMouseLeave(secondaryRef,1)} 
          onDoubleClick={() => handleCopy(secondaryRef, 1)}>
          <span>
            {handleColorFormat(secondaryColor.backgroundColor)} 
          </span>
        </div>
        <div className="colorBar" ref={tertiaryRef} 
          style={tertiaryColor} 
          onMouseEnter={() => handleMouseEnter(tertiaryRef)} 
          onMouseLeave={() => handleMouseLeave(tertiaryRef,2)} 
          onDoubleClick={() => handleCopy(tertiaryRef, 2)}>
          <span>
            {handleColorFormat(tertiaryColor.backgroundColor)}
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
