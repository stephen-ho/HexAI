import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Tooltip, TextField } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const defaultColors = [
    {"color": "#F3B289", "description": "A peachy-orange color that might remind you of the color of a beach sunset."},
    {"color": "#FF7F50", "description": "A vibrant coral with a reddish-orange hue."},
    {"color": "#FFC0CB", "description": "A soft pinkish-orange coral color that is often found on the Great Barrier Reef."},
    {"color": "#FFD700", "description": "A bright yellow color that can be found in certain coral species."},
    {"color": "#FFA07A", "description": "A salmon pink coral color that is seen in many reef formations."},
    {"color": "#FA8072", "description": "A coral with a deep orange-red hue that is often found in deeper waters on the Great Barrier Reef."},
    {"color": "#FFCFAF", "description": "A light peach coral color that is commonly found on the Great Barrier Reef."}
  ];

  // const defaultCurrentColor = {"color": "#F3B289", "description": "A peachy-orange color that might remind you of the color of a beach sunset."};

  const [ colors, setColors ] = useState(defaultColors);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ userDescription, setDescription ] = useState("corals of the Great Barrier Reef");
  const [ currentColor, setCurrentColor ] = useState("");

  function handleChange(e) {
    setDescription(e.target.value);
  }

  function handleClick() {
    setIsLoading(true);
    axios.post('/api/getColors', {
      userDescription: userDescription
    })
    .then((response) => {
      setColors(response.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleDarker() {
    setIsLoading(true);
    axios.post('/api/darker', {
      colors: colorsArr.toString()
    })
    .then((response) => {
      setColors(response.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleLighter() {
    setIsLoading(true);
    axios.post('/api/lighter', {
      colors: colorsArr.toString()
    })
    .then((response) => {
      setColors(response.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const colorWheel = colors.map((color, index) => {
    const identifier = `dot${index}`
    return (
      <div key={index} className={identifier}>
        <span
          className="dot"
          style={{ background: color.color }}
          onMouseEnter={() => setCurrentColor(color)}
        />
      </div>
    );
  });

  const colorsArr = colors.map((color) => {
    return color.color;
  })

  const loader =
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
      </div>
    </div>

  const loading = isLoading ? <div>{loader}</div> : null;

  const extras = (colors.length > 1) ?
    <div className="extras">
      <Tooltip title="Generate the same colors but one shade darker" placement="top">
        <Button variant="contained" size="large" onClick={handleDarker}>Darker</Button>
      </Tooltip>
      <Tooltip title="Generate the same colors but one shade lighter" placement="top">
        <Button variant="contained" size="large" onClick={handleLighter}>Lighter</Button>
      </Tooltip>
    </div>
    : null;

  const fontColor = currentColor ? currentColor.color : "#B2B2B2";
  const hexCode = currentColor ? currentColor.color : "#TUTORIAL";
  const colorDesc = currentColor ? currentColor.description : "Enter keywords or a sentence that describes the theme to generate colors for and click [Generate Colors]";

  return (
    <>
      <Head>
        <title>HexAI</title>
        <meta name="description" content="Generate colors with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero">
        <h1>HexAI</h1>
        <h3>Allow me to assist you in finding the perfect color scheme!</h3>
      </div>
      <main className="main">
        {loading}
        <div className="input">
          <TextField
            className="promptInput"
            variant="outlined"
            value={userDescription}
            onChange={handleChange}
            label="Give me 7 hex colors that represent..."
          />
          <Button className="button" variant="contained" size="large" onClick={handleClick}>Generate Colors</Button>
        </div>
        <div className="colors">
          <div className="colorWheel">
            {colorWheel}
          </div>
          <div className="colorInfo">
            <h2 style={{color: fontColor}}>{hexCode}</h2>
            <b>{colorDesc}</b>
          </div>
        </div>
        {extras}
        <a href="https://stephen-ho.github.io/" className="link">HexAI by Stephen Ho</a>
      </main>
    </>
  )
}
