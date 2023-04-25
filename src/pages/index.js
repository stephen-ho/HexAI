import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Tooltip, TextField } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [ colors, setColors ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ userDescription, setDescription ] = useState("");
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
    // console.log(colorsArr.toString());
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
    <div class="loader">
      <div class="loader-inner">
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
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

  const fontColor = `color: ${currentColor.color}`;

  return (
    <>
      <Head>
        <title>HexAI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            <h2 style={{color: currentColor.color}}>{currentColor.color}</h2>
            <b>{currentColor.description}</b>
          </div>
        </div>
        {extras}
        <a href="https://stephen-ho.github.io/">HexAI by Stephen Ho</a>
      </main>
    </>
  )
}
