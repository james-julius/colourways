import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import hslWheel from "./hslwheel.png";
import convert from "color-convert";
import openLockIcon from "./lockOpen.svg";
import lockShutIcon from "./lockShut.svg";

function App() {
  const [scheme, setScheme] = useState("monochromatic");
  const [primaryHue, setPrimaryHue] = useState(0);
  const [secondHandStyle, setSecondHandStyle] = useState({ display: "none" });
  const [thirdHandStyle, setThirdHandStyle] = useState({ display: "none" });
  const [primaryColor, setPrimaryColor] = useState({
    backgroundColor: "crimson",
  });
  const [secondaryColor, setSecondaryColor] = useState({
    backgroundColor: "rebeccapurple",
  });
  const [secondaryFontColor, setSecondaryFontColor] = useState({
    color: "black",
  });
  const [tertiaryColor, setTertiaryColor] = useState({
    backgroundColor: "white",
  });
  const [colorFormat, setColorFormat] = useState("hsl");
  const [colorFormatHandlePosition, setColorFormatHandlePosition] = useState(
    {}
  );
  const [dynamicTextColor, setDynamicTextColor] = useState({ color: "black" });
  const primaryRef = useRef();
  const secondaryRef = useRef();
  const tertiaryRef = useRef();
  const [colorBarOne, setColorBarOne] = useState("crimson");
  const [colorBarTwo, setColorBarTwo] = useState("rebeccapurple");
  const [colorBarThree, setColorBarThree] = useState("white");
  const [colorBarLocks, setColorBarLocks] = useState([false, false, false]);

  // Helper function for changeColorFormat - handles format writing style in Colorbars of HSL/HEX/RGB/CMYK
  const handleColorFormat = (inputHsl) => {
    console.log(inputHsl);
    // Function is called on render
    console.log("INPUT HSL: ", inputHsl);
    console.log(colorFormat);
    const hslArr = inputHsl.slice(5, inputHsl.length - 1).replace(/%/g, "")
      .split`,`.map((str) => +str);
    if (colorFormat === "hsl") {
      return inputHsl;
    }
    if (colorFormat === "rgb") {
      let [r, g, b] = convert.hsl.rgb(hslArr);
      return `rgb(${r},${g},${b})`;
    }
    if (colorFormat === "cmyk") {
      let [c, m, y, k] = convert.hsl.cmyk(hslArr);
      return `cmyk(${c},${m},${y},${k})`;
    }
    if (colorFormat === "hex") {
      // console.log(convert.hsl.hex)
      return "#" + convert.hsl.hex(hslArr);
    }
  };

  // Actual format change handler - uses helper function and moves switch handle position
  const changeColorFormat = (format) => {
    // Animating the slider switch to the selected format
    // Syntax change is handled by the below function, that returns directly to the element.
    let leftValue;
    switch (format) {
      case "hsl":
        setColorFormat("hsl");
        leftValue = "calc(12.5% - 8px)";
        break;
      case "rgb":
        setColorFormat("rgb");
        leftValue = "calc(37.5% - 8px)";
        break;
      case "cmyk":
        setColorFormat("cmyk");
        leftValue = "calc(62.5% - 8px)";
        break;
      case "hex":
        setColorFormat("hex");
        leftValue = "calc(87.5% - 8px)";
        break;
      default:
        break;
    }
    // console.log(leftValue)
    setColorFormatHandlePosition({
      position: "absolute",
      left: leftValue,
    });
  };

  useEffect(() => {
    console.log("updating colour bars");
    setColorBarOne(handleColorFormat(primaryColor.backgroundColor));
    setColorBarTwo(handleColorFormat(secondaryColor.backgroundColor));
    setColorBarThree(handleColorFormat(tertiaryColor.backgroundColor));
    //eslint-disable-next-line
  }, [colorFormat]);

  const hsl = (hue, saturation, lightness) => {
    return `hsl(${hue},${saturation}, ${lightness + "%"})`;
  };

  const colourChanger = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let [h, s, l] = [
      Math.floor(Math.random() * 360),
      100,
      Math.floor(Math.random() * 100),
    ];
    if (l >= 50) {
      setDynamicTextColor({ color: "rgb(50,50,50)" });
    } else {
      setDynamicTextColor({ color: "rgb(240,240,240)" });
    }
    document.getElementsByClassName(
      "main"
    )[0].style.backgroundColor = `rgba(${r},${g},${b}, 0.3)`;
    document.getElementsByClassName(
      "sidebar"
    )[0].style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
  };

  const handleCopy = (refIndex) => {
    switch (refIndex) {
      case 0:
        navigator.clipboard.writeText(
          handleColorFormat(primaryColor.backgroundColor)
        );
        setColorBarOne("Copied!");
        break;
      case 1:
        navigator.clipboard.writeText(
          handleColorFormat(secondaryColor.backgroundColor)
        );
        setColorBarTwo("Copied!");
        break;
      case 2:
        navigator.clipboard.writeText(
          handleColorFormat(tertiaryColor.backgroundColor)
        );
        setColorBarThree("Copied!");
        break;
      default:
        break;
    }
  };

  const handleMouseEnter = (refIndex) => {
    switch (refIndex) {
      case 0:
        setColorBarOne("Double click to copy");
        break;
      case 1:
        setColorBarTwo("Double click to copy");
        break;
      case 2:
        setColorBarThree("Double click to copy");
        break;
      default:
        break;
    }
  };
  const handleMouseLeave = (refIndex) => {
    switch (refIndex) {
      case 0:
        setColorBarOne(handleColorFormat(primaryColor.backgroundColor));
        break;
      case 1:
        setColorBarTwo(handleColorFormat(secondaryColor.backgroundColor));
        break;
      case 2:
        setColorBarThree(handleColorFormat(tertiaryColor.backgroundColor));
        break;
      default:
        break;
    }
  };

  const applyColorScheme = () => {
    if (scheme === "monochromatic") {
      console.log("changing to monochromatic");
      const hue = Math.floor(Math.random() * 360);
      setPrimaryHue(hue);
      setSecondHandStyle({ display: "none" });
      setThirdHandStyle({ display: "none" });
      const lightness = [
        Math.floor(Math.random() * 50) + 25,
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 20) + 80,
      ];
      console.log(lightness);
      const [primary, secondary, tertiary] = [
        hsl(hue, "100%", lightness[0]),
        hsl(hue, "100%", lightness[1]),
        hsl(hue, "20%", lightness[2]),
      ];
      console.log([primary, secondary, tertiary]);
      if (!colorBarLocks[0]) {
        setColorBarOne(handleColorFormat(primaryColor.backgroundColor));
        setPrimaryColor({
          backgroundColor: primary,
          color: tertiary,
        });
      }
      if (!colorBarLocks[1]) {
        setSecondaryColor({
          backgroundColor: secondary,
          color: tertiary,
        });
        setColorBarTwo(handleColorFormat(secondaryColor.backgroundColor));
        setSecondaryFontColor({ color: secondary });
      }
      if (!colorBarLocks[1]) {
        setColorBarThree(handleColorFormat(tertiaryColor.backgroundColor));
        setPrimaryColor({
          backgroundColor: primary,
          color: tertiary,
        });
        setTertiaryColor({ backgroundColor: tertiary });
      }
    }
    if (scheme === "analogous") {
      console.log("changing to analogous");
      let hue = Math.floor(Math.random() * 360);
      const hueOne = hue;
      const hueTwo = hue <= 30 ? hue - 30 + 360 : hue - 30;
      const hueThree = hue >= 330 ? hue + 30 - 360 : hue + 30;
      setPrimaryHue(hue);
      if (!colorBarLocks[1]) {
        setSecondHandStyle({
          display: "block",
          transform: `rotate(${hueTwo}deg)`,
        });
      }
      if (!colorBarLocks[2]) {
        setThirdHandStyle({
          display: "block",
          transform: `rotate(${hueThree}deg)`,
        });
      }
      const lightness = [
        Math.floor(Math.random() * 50) + 25,
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 20) + 80,
      ];
      console.log(lightness);
      const [primary, secondary, tertiary] = [
        hsl(hueOne, "100%", lightness[0]),
        hsl(hueTwo, "100%", lightness[1]),
        hsl(hueThree, "100%", lightness[2]),
      ];
      console.log([primary, secondary, tertiary]);

      if (!colorBarLocks[0]) {
        setColorBarOne(handleColorFormat(primaryColor.backgroundColor));
        setPrimaryColor({
          backgroundColor: primary,
          color: tertiary,
        });
      }

      if (!colorBarLocks[1]) {
        setColorBarTwo(handleColorFormat(secondaryColor.backgroundColor));
        setSecondaryFontColor({ color: secondary });
        setSecondaryColor({
          backgroundColor: secondary,
          color: tertiary,
        });
      }

      if (!colorBarLocks[2]) {
        setTertiaryColor({ backgroundColor: tertiary });
        setColorBarThree(handleColorFormat(tertiaryColor.backgroundColor));
      }
    }
    if (scheme === "double analogous") {
      console.log("changing to double analogous");
      let hue = Math.floor(Math.random() * 360);
      const hueOne = hue;
      const hueTwo = hue <= 60 ? hue - 60 + 360 : hue - 60;
      const hueThree = hue >= 300 ? hue + 60 - 360 : hue + 60;
      setPrimaryHue(hue);
      if (!colorBarLocks[1]) {
        setSecondHandStyle({
          display: "block",
          transform: `rotate(${hueTwo}deg)`,
        });
      }
      if (!colorBarLocks[2]) {
        setThirdHandStyle({
          display: "block",
          transform: `rotate(${hueThree}deg)`,
        });
      }
      const lightness = [
        Math.floor(Math.random() * 50) + 25,
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 20) + 80,
      ];
      console.log(lightness);
      const [primary, secondary, tertiary] = [
        hsl(hueOne, "100%", lightness[0]),
        hsl(hueTwo, "100%", lightness[1]),
        hsl(hueThree, "100%", lightness[2]),
      ];
      console.log([primary, secondary, tertiary]);

      if (!colorBarLocks[0]) {
        setColorBarOne(handleColorFormat(primaryColor.backgroundColor));
        setPrimaryColor({
          backgroundColor: primary,
          color: tertiary,
        });
      }

      if (!colorBarLocks[1]) {
        setColorBarTwo(handleColorFormat(secondaryColor.backgroundColor));
        setSecondaryFontColor({ color: secondary });
        setSecondaryColor({
          backgroundColor: secondary,
          color: tertiary,
        });
      }

      if (!colorBarLocks[2]) {
        setTertiaryColor({ backgroundColor: tertiary });
        setColorBarThree(handleColorFormat(tertiaryColor.backgroundColor));
      }
    }
    if (scheme === "triple analogous") {
      console.log("changing to triple analogous");
      let hue = Math.floor(Math.random() * 360);
      const hueOne = hue;
      const hueTwo = hue <= 90 ? hue - 90 + 360 : hue - 90;
      const hueThree = hue >= 270 ? hue + 90 - 360 : hue + 90;
      setPrimaryHue(hue);
      if (!colorBarLocks[1]) {
        setSecondHandStyle({
          display: "block",
          transform: `rotate(${hueTwo}deg)`,
        });
      }
      if (!colorBarLocks[2]) {
        setThirdHandStyle({
          display: "block",
          transform: `rotate(${hueThree}deg)`,
        });
      }
      const lightness = [
        Math.floor(Math.random() * 50) + 25,
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 20) + 80,
      ];
      console.log(lightness);
      const [primary, secondary, tertiary] = [
        hsl(hueOne, "100%", lightness[0]),
        hsl(hueTwo, "100%", lightness[1]),
        hsl(hueThree, "100%", lightness[2]),
      ];
      console.log([primary, secondary, tertiary]);

      if (!colorBarLocks[0]) {
        setColorBarOne(handleColorFormat(primaryColor.backgroundColor));
        setPrimaryColor({
          backgroundColor: primary,
          color: tertiary,
        });
      }

      if (!colorBarLocks[1]) {
        setColorBarTwo(handleColorFormat(secondaryColor.backgroundColor));
        setSecondaryFontColor({ color: secondary });
        setSecondaryColor({
          backgroundColor: secondary,
          color: tertiary,
        });
      }

      if (!colorBarLocks[2]) {
        setTertiaryColor({ backgroundColor: tertiary });
        setColorBarThree(handleColorFormat(tertiaryColor.backgroundColor));
      }
    }
    if (scheme === "complementary") {
      console.log("changing to complementary");
      let hue = Math.floor(Math.random() * 360);
      const hueOne = hue;
      const hueTwo = hue <= 180 ? hue + 180 : hue - 180;
      setPrimaryHue(hue);
      if (!colorBarLocks[1]) {
        setSecondHandStyle({
          display: "block",
          transform: `rotate(${hueTwo}deg)`,
        });
      }
      if (!colorBarLocks[2]) {
        setThirdHandStyle({ display: "none" });
      }
      // setThirdHandStyle({display: 'block', transform: `rotate(${hueThree}deg)`});
      const lightness = [
        Math.floor(Math.random() * 50) + 25,
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 20) + 80,
      ];
      // console.log(lightness);
      const [primary, secondary, tertiary] = [
        hsl(hueOne, "100%", lightness[0]),
        hsl(hueTwo, "100%", lightness[1]),
        hsl(hueOne, "20%", lightness[2]),
      ];
      // console.log([primary,secondary,tertiary]);
      if (!colorBarLocks[0]) {
        setColorBarOne(handleColorFormat(primaryColor.backgroundColor));
        setPrimaryColor({
          color: tertiary,
          backgroundColor: primary,
        });
      }
      if (!colorBarLocks[1]) {
        setColorBarTwo(handleColorFormat(secondaryColor.backgroundColor));
        setSecondaryFontColor({ color: secondary });
        setSecondaryColor({
          backgroundColor: secondary,
          color: tertiary,
        });
      }
      if (!colorBarLocks[2]) {
        setTertiaryColor({ backgroundColor: tertiary });
        setColorBarThree(handleColorFormat(tertiaryColor.backgroundColor));
      }
    }
    if (scheme === "triadic") {
      console.log("changing to triadic");
      let hue = Math.floor(Math.random() * 360);
      const hueOne = hue;
      const hueTwo = hue <= 120 ? hue - 120 + 360 : hue - 120;
      const hueThree = hue >= 240 ? hue + 120 - 360 : hue + 120;
      if (!colorBarLocks[1]) {
        setPrimaryHue(hue);
      }
      if (!colorBarLocks[1]) {
        setSecondHandStyle({
          display: "block",
          transform: `rotate(${hueTwo}deg)`,
        });
      }
      if (!colorBarLocks[1]) {
        setThirdHandStyle({
          display: "block",
          transform: `rotate(${hueThree}deg)`,
        });
      }
      const lightness = [
        Math.floor(Math.random() * 50) + 25,
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 10) + 90,
      ];
      console.log(lightness);
      const [primary, secondary, tertiary] = [
        hsl(hueOne, "100%", lightness[0]),
        hsl(hueTwo, "100%", lightness[1]),
        hsl(hueThree, "40%", lightness[2]),
      ];
      console.log([primary, secondary, tertiary]);
      if (!colorBarLocks[0]) {
        setColorBarOne(handleColorFormat(primaryColor.backgroundColor));
        setPrimaryColor({
          backgroundColor: primary,
        });
      }
      if (!colorBarLocks[1]) {
        setColorBarTwo(handleColorFormat(secondaryColor.backgroundColor));
        setSecondaryFontColor({ color: secondary });
        setSecondaryColor({
          backgroundColor: secondary,
          color: tertiary,
        });
      }
      if (!colorBarLocks[2]) {
        setColorBarThree(handleColorFormat(tertiaryColor.backgroundColor));
        setTertiaryColor({ backgroundColor: tertiary });
      }
    }
    if (scheme === "random") {
      console.log("changing to random");
      const hueOne = Math.floor(Math.random() * 360);
      const hueTwo = Math.floor(Math.random() * 360);
      const hueThree = Math.floor(Math.random() * 360);
      setPrimaryHue(hueOne);
      if (!colorBarLocks[1]) {
        setSecondHandStyle({
          display: "block",
          transform: `rotate(${hueTwo}deg)`,
        });
      }
      if (!colorBarLocks[2]) {
        setThirdHandStyle({
          display: "block",
          transform: `rotate(${hueThree}deg)`,
        });
      }
      const lightness = [
        Math.floor(Math.random() * 50) + 25,
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 10) + 90,
      ];
      // console.log(lightness);
      const [primary, secondary, tertiary] = [
        hsl(hueOne, "100%", lightness[0]),
        hsl(hueTwo, "100%", lightness[1]),
        hsl(hueThree, "40%", lightness[2]),
      ];
      // console.log([primary,secondary,tertiary]);

      if (!colorBarLocks[0]) {
        setColorBarOne(handleColorFormat(primaryColor.backgroundColor));
        setPrimaryColor({
          backgroundColor: primary,
        });
      }
      if (!colorBarLocks[1]) {
        setColorBarTwo(handleColorFormat(secondaryColor.backgroundColor));
        setSecondaryFontColor({ color: secondary });
        setSecondaryColor({
          backgroundColor: secondary,
          color: tertiary,
        });
      }
      if (!colorBarLocks[2]) {
        setColorBarThree(handleColorFormat(tertiaryColor.backgroundColor));
        setTertiaryColor({ backgroundColor: tertiary });
      }
    }
  };

  useEffect(() => {
    colourChanger();
    setInterval(colourChanger, 15000);
    // colourChanger();
  }, []);

  return (
    <div className="App">
      <div className="sidebar">
        <h1 style={dynamicTextColor}>Colourways</h1>
        <h2 style={dynamicTextColor}>
          A colour scheme generator for websites.
        </h2>
        <select onChange={(event) => setScheme(event.target.value)}>
          <option value="monochromatic">Monochromatic</option>
          <option value="complementary">Complementary</option>
          <option value="triadic">Triadic</option>
          <option value="analogous">Analogous</option>
          <option value="double analogous">Doubled Analogous</option>
          <option value="triple analogous">Tripled Analogous</option>
          <option value="random">Random</option>
        </select>
        <div className="colourButton" onClick={applyColorScheme}>
          Generate
        </div>
        <div className="colourway">
          <h3 style={dynamicTextColor}>Format:</h3>
          <span className="switch">
            <div className="slider">
              <div
                className="handleContainer"
                onClick={() => changeColorFormat("hsl")}
              >
                <div className="handleoverlay" />
              </div>
              <div
                className="handleContainer"
                onClick={() => changeColorFormat("rgb")}
              >
                <div className="handleoverlay" />
              </div>
              <div
                className="handleContainer"
                onClick={() => changeColorFormat("cmyk")}
              >
                <div className="handleoverlay" />
              </div>
              <div
                className="handleContainer"
                onClick={() => changeColorFormat("hex")}
              >
                <div className="handleoverlay" />
              </div>
              <div className="handle" style={colorFormatHandlePosition} />
            </div>
            <div className="options" style={dynamicTextColor}>
              <p>HSL</p>
              <p>RGB</p>
              <p>CMYK</p>
              <p>HEX</p>
            </div>
          </span>
          <div
            className="colorBar"
            ref={primaryRef}
            style={primaryColor}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={() => handleMouseLeave(0)}
            onDoubleClick={() => handleCopy(0)}
          >
            {colorBarOne}
            <img
              className="lockIcon"
              alt={colorBarLocks[0] ? "Locked" : "Changeable"}
              src={colorBarLocks[0] ? lockShutIcon : openLockIcon}
              onClick={() =>
                setColorBarLocks([
                  !colorBarLocks[0],
                  colorBarLocks[1],
                  colorBarLocks[2],
                ])
              }
            />
          </div>
          <div
            className="colorBar"
            ref={secondaryRef}
            style={secondaryColor}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={() => handleMouseLeave(1)}
            onDoubleClick={() => handleCopy(1)}
          >
            <span>
              {colorBarTwo}
              <img
                className="lockIcon"
                alt={colorBarLocks[1] ? "Locked" : "Changeable"}
                src={colorBarLocks[1] ? lockShutIcon : openLockIcon}
                onClick={() =>
                  setColorBarLocks([
                    colorBarLocks[0],
                    !colorBarLocks[1],
                    colorBarLocks[2],
                  ])
                }
              />
            </span>
          </div>
          <div
            className="colorBar"
            ref={tertiaryRef}
            style={tertiaryColor}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={() => handleMouseLeave(2)}
            onDoubleClick={() => handleCopy(2)}
          >
            <span>
              {colorBarThree}
              <img
                className="lockIcon"
                alt={colorBarLocks[2] ? "Locked" : "Changeable"}
                src={colorBarLocks[2] ? lockShutIcon : openLockIcon}
                onClick={() =>
                  setColorBarLocks([
                    colorBarLocks[0],
                    colorBarLocks[1],
                    !colorBarLocks[2],
                  ])
                }
              />
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
            <span className="contentBlock" style={primaryColor}>
              Content Block
            </span>
            <span className="contentBlock" style={primaryColor}>
              Content Block
            </span>
          </div>
          <div className="section2" style={secondaryFontColor}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
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
          <span src={hslWheel} className="hslWheel" />
        </div>
        <div
          className="handContainer"
          style={{ transform: `rotate(${primaryHue}deg)` }}
        >
          <span className="colourHandOne" />
        </div>
        <div className="handContainerTwo" style={secondHandStyle}>
          <span className="colourHandTwo" />
        </div>
        <div className="handContainerThree" style={thirdHandStyle}>
          <span className="colourHandThree" />
        </div>
      </div>
    </div>
  );
}

export default App;
