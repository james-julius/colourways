import React, { useState, useEffect, useRef } from "react";
import "./resources/App.scss";
import hslWheel from "./resources//hslwheel.png";
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
  const [primarySVGFill, setPrimarySVGFill] = useState({fill: 'crimson'});
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
        setPrimarySVGFill({fill: primary})
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
        setPrimarySVGFill({fill: primary})
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
        setPrimarySVGFill({fill: primary})
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
        setPrimarySVGFill({fill: primary})
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
        setPrimarySVGFill({fill: primary})
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
        setPrimarySVGFill({fill: primary})
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
        setPrimarySVGFill({fill: primary})
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
        setPrimarySVGFill({fill: primary})
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
            <span className="genericLogo">WidgetMaker</span>
            <h4>Home</h4>
            <h4>How it works</h4>
            <h4>Meet the team</h4>
          </div>
          <div className="section1" style={{...secondaryColor, secondaryFontColor}}>
            <h2>We make the best widgets around</h2>
            <span className="ctaButton" style={primaryColor}>Find out more</span>
          </div>
          <div className="section2" style={secondaryFontColor}>
            <span className="contentBlock" style={primarySVGFill}>
              {/* <img className="workSVG" alt="A briefcase" src={Briefcase}/> */}
              <svg className="workSVG" id="bold" enableBackground="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m15 6.5c-.552 0-1-.448-1-1v-1.5h-4v1.5c0 .552-.448 1-1 1s-1-.448-1-1v-1.5c0-1.103.897-2 2-2h4c1.103 0 2 .897 2 2v1.5c0 .552-.448 1-1 1z"/><path d="m12.71 15.38c-.18.07-.44.12-.71.12s-.53-.05-.77-.14l-11.23-3.74v7.63c0 1.52 1.23 2.75 2.75 2.75h18.5c1.52 0 2.75-1.23 2.75-2.75v-7.63z"/><path d="m24 7.75v2.29l-11.76 3.92c-.08.03-.16.04-.24.04s-.16-.01-.24-.04l-11.76-3.92v-2.29c0-1.52 1.23-2.75 2.75-2.75h18.5c1.52 0 2.75 1.23 2.75 2.75z"/></svg>
            </span>
            <p className="textContent"><h4>Business Widgets</h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.</p>
          </div>
          <div className="section3" style={primarySVGFill}>
            <p className="textContent"><h4>Party Widgets</h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.</p>
            <span className="contentBlock">
              {/* <img alt="Balloons" style={primaryColor} className="partySVG" src={Party}/> */}
              {/* <svg id="Capa_1" className="partySVG" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m198.723 253.712c4.142 0 7.5-3.358 7.5-7.5v-11.002c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v11.003c0 4.142 3.358 7.499 7.5 7.499z"/><path d="m313.24 253.712c4.142 0 7.5-3.358 7.5-7.5v-11.002c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v11.003c0 4.142 3.358 7.499 7.5 7.499z"/><path d="m276.731 250.813c2.722-3.123 2.396-7.86-.727-10.582-3.122-2.722-7.86-2.396-10.581.727-4.994 5.729-13.877 5.746-18.883 0-2.722-3.123-7.459-3.448-10.582-.727-3.122 2.721-3.448 7.459-.727 10.581 10.98 12.6 30.531 12.587 41.5.001z"/><path d="m35.952 325.584c2.688 3.151 7.422 3.526 10.574.837 3.151-2.688 3.526-7.422.837-10.574-13.874-16.261-24.143-34.679-28.917-51.862-12.242-44.069 9.143-89.538 48.247-109.225 33.636-16.973 74.265-12.189 103.124 12.051-37.333 47.976-24.84 114.505 10.836 161.917-9.402 13.867-22.209 25.395-38.225 29.844h-.001c-26.077 7.225-53.59-5.524-74.614-22.662-3.211-2.617-7.935-2.136-10.552 1.075-2.617 3.21-2.136 7.935 1.075 10.552 14.937 12.176 30.337 20.479 45.454 24.747l.952 11.525c1.304 15.778 14.527 27.576 29.914 27.576 6.1 0 9.655-1.722 15.51-3.17 31.803 68.492 99.526 99.627 102.722 101.064.001 0 .002 0 .003.001 2.134.799 4.069.993 6.16.009 2.957-1.327 70.882-32.453 102.745-101.073 5.847 1.447 9.416 3.171 15.51 3.17 15.396 0 28.61-11.807 29.914-27.576l.952-11.526c15.08-4.257 30.442-12.529 45.344-24.653 26.157-21.283 46.513-51.051 54.453-79.629 7.803-28.088 4.202-57.534-10.142-82.913-9.434-16.693-22.774-30.311-38.792-39.898 6.747-20.592 7.226-43.089 1.223-64.066-1.139-3.982-5.29-6.287-9.273-5.147-3.982 1.14-6.287 5.291-5.147 9.274 4.968 17.361 4.811 35.924-.343 53.077-4.388-1.854-9.048-3.467-13.468-4.697-35.042-9.726-72.697-1.074-99.889 21.989-16.4-16.009-37.579-26.707-61.496-29.981-.831-13.172-3.157-26.485-6.804-38.848 2.957-8.987 6.608-17.114 10.866-24.183 35.54-59.009 120.317-60.93 158.632-4.157 2.317 3.433 6.979 4.338 10.412 2.021s4.338-6.979 2.021-10.412c-46.756-69.277-152.742-63.228-189.792 15.889-29.256-62.438-102.35-80.377-155.668-48.263-22.293 13.427-39.077 34.407-47.26 59.076-7.395 22.294-7.38 46.355-.108 68.467-40.988 24.644-62.357 74.499-48.947 122.77 5.346 19.245 16.696 39.695 31.958 57.584zm246.576-182.113c39.114 11.516 67.593 47.73 67.593 90.322 0 26.01-10.401 59.644-33.915 89.927-39.182 48.649-88.254 44.502-124.761-5.637-16.729-22.918-27.395-51.61-29.292-76.451-5.066-66.102 56.724-116.684 120.375-98.161zm1.784 231.684c1.77 9.281-5.348 17.862-14.777 17.862h-27.107c-9.448 0-16.544-8.6-14.777-17.862l1.38-7.231c17.123 6.649 35.396 7.186 53.901 0zm-145.601 20.675c-9.103 2.528-18.243-3.857-19.02-13.256l-.606-7.338c19.66 1.959 37.102-3.382 51.915-14.466l3.285 6.638c4.19 8.468-.371 18.642-9.456 21.167zm26.13 8.308 4.003-1.112c18.179-5.05 27.237-25.393 18.885-42.271l-5.158-10.423c2.793-2.98 5.462-6.215 8.006-9.682 7.723 8.335 15.947 15.153 24.503 20.353l-2.164 11.34c-1.684 8.826.635 17.858 6.362 24.78 11.237 13.584 26.544 10.444 29.203 10.893v81.999c-19.472-11.17-61.051-39.263-83.64-85.877zm98.64 85.878v-81.999h6.054c18.868 0 33.04-17.176 29.511-35.673l-2.164-11.341c8.555-5.2 16.78-12.018 24.503-20.353 2.544 3.467 5.214 6.702 8.006 9.682l-5.158 10.423c-8.368 16.912.742 37.231 18.885 42.271l4.003 1.112c-22.587 46.613-64.167 74.707-83.64 85.878zm128.79-107.442c-.778 9.415-9.933 15.779-19.02 13.256-23.386-6.498 2.412.667-26.118-7.256-9.104-2.53-13.638-12.716-9.456-21.167l3.285-6.638c7.629 5.735 16.169 9.925 24.558 12.255 8.435 2.346 17.558 3.187 27.357 2.211zm92.497-190.106c12.372 21.891 15.479 47.29 8.748 71.517-7.032 25.312-25.987 52.904-49.467 72.01-20.989 17.077-48.505 29.802-74.514 22.578-16.043-4.463-28.838-15.997-38.226-29.845 36.178-47.388 48.126-113.998 10.836-161.916 22.969-19.313 55.066-27.272 85.864-18.729h.002c23.438 6.506 44.044 21.891 56.757 44.385zm-418.301-54.133c-12.313-40.843 4.441-85.431 41.58-107.799 44.568-26.843 102.365-12.503 129.212 32.071 10.832 17.986 16.689 40.898 18.257 62.048-27.117.091-54.677 10.52-75.685 30.968-31.296-26.596-75.752-33.407-113.364-17.288z"/></g></svg> */}
              <svg id="Capa_1" style={primarySVGFill} className="partySVG" enableBackground="new 0 0 500.432 500.432" height="512" viewBox="0 0 500.432 500.432" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m262.514 49.215c28.962-48.086 91.422-63.589 139.508-34.627s63.589 91.422 34.627 139.508-106.995 89.445-155.081 60.483c-48.086-28.962-48.016-117.278-19.054-165.364z"/><path d="m237.918 49.215c-28.962-48.086-91.422-63.589-139.508-34.627s-63.589 91.422-34.627 139.508 106.995 89.445 155.081 60.483 48.016-117.278 19.054-165.364z" /><path d="m363.116 348.904c-4.07-.747-7.982 1.95-8.729 6.025-8.511 46.432-37.029 79.518-59.455 99.098-14.376 12.552-28.172 21.336-37.216 26.499v-124.429c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v124.429c-9.044-5.163-22.84-13.946-37.216-26.499-22.425-19.58-50.944-52.666-59.455-99.098-.747-4.075-4.656-6.771-8.729-6.025-4.074.747-6.772 4.655-6.025 8.729 7.382 40.272 29.76 77.624 64.716 108.018 26.141 22.729 49.909 33.57 51.116 34.113.001 0 .003.001.004.002.004.002.015.007.019.008 1.994.925 4.378.83 6.141 0 1.003-.45 24.878-11.29 51.139-34.123 34.956-30.394 57.334-67.746 64.716-108.018.746-4.074-1.952-7.983-6.026-8.729z" /><path d="m285.914 364.231-4.954-25.964h-61.488l-4.954 25.964c-2.651 13.894 8 26.769 22.144 26.769h27.107c14.145 0 24.796-12.874 22.145-26.769z" /><path d="m175.241 354.564-11.723-23.691-59.245 16.459 2.177 26.343c1.165 14.097 14.873 23.651 28.502 19.864l26.118-7.256c13.628-3.786 20.444-19.042 14.171-31.719z" /><path d="m90.488 84.28c0-25.457 4.695-49.918 13.327-72.722-1.819.952-3.623 1.957-5.405 3.03-48.086 28.962-63.589 91.422-34.627 139.508 14.821 24.608 42.495 47.449 72.429 60.011-28.789-36.624-45.724-81.432-45.724-129.827z"/><path d="m201.313 202.061c-15.026-54.086-71.052-85.751-125.138-70.725s-85.75 71.052-70.724 125.138 79.131 114.833 133.217 99.807 77.671-100.134 62.645-154.22z" /><path d="m325.191 354.564 11.723-23.691 59.245 16.459-2.177 26.343c-1.165 14.097-14.873 23.651-28.502 19.864l-26.118-7.256c-13.628-3.786-20.444-19.042-14.171-31.719z" /><path d="m299.118 202.061c15.026-54.086 71.052-85.751 125.138-70.725s85.751 71.052 70.725 125.138-79.131 114.833-133.217 99.807-77.671-100.134-62.646-154.22z" /><path d="m95.197 127.946c-6.321.518-12.684 1.629-19.021 3.39-54.086 15.025-85.751 71.052-70.725 125.138s79.131 114.833 133.217 99.807c33.527-9.314 55.328-45.559 63.483-84.65-54.425-32.393-93.883-83.735-106.954-143.685z" /><path d="m351.856 224.273c0 56.134-45.506 131.824-101.64 131.824s-101.64-75.689-101.64-131.824 45.506-101.64 101.64-101.64 101.64 45.505 101.64 101.64z" /><g><g><path d="m192.956 244.193c-4.142 0-7.5-3.358-7.5-7.5v-11.003c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5v11.003c0 4.142-3.357 7.5-7.5 7.5z" /></g><g><path d="m307.475 244.193c-4.142 0-7.5-3.358-7.5-7.5v-11.003c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5v11.003c0 4.142-3.358 7.5-7.5 7.5z" /></g><g><path d="m250.216 250.743c-7.954 0-15.517-3.444-20.75-9.45-2.721-3.123-2.396-7.86.727-10.582 3.123-2.721 7.86-2.396 10.582.727 2.384 2.736 5.825 4.305 9.441 4.305 3.617 0 7.058-1.569 9.442-4.305 2.721-3.123 7.459-3.448 10.582-.727s3.448 7.459.727 10.582c-5.234 6.005-12.798 9.45-20.751 9.45z" /></g></g><path d="m148.673 228.638c2.255 55.61 46.851 127.459 101.543 127.459 29.241 0 55.593-20.542 74.136-48.155-70.418-3.372-133.008-33.47-175.679-79.304z" /></g></svg>
            </span>
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