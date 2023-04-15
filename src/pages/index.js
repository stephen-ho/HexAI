import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import axios from "axios";
import { useState, useEffect } from "react";

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

  return (
    <>
      <Head>
        <title>HexAI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        {/* <h1>HexAI</h1> */}
        {loading}
        <div className="input">
          <input
            value={userDescription}
            onChange={handleChange}
            placeholder="Give me 7 hex colors that represent..."
          />
          <button onClick={handleClick}>Generate Colors</button>
        </div>
        <div className="colors">
          <div className="colorWheel">
            {colorWheel}
          </div>
          <div className="colorInfo">
            <h2>{currentColor.color}</h2>
            {currentColor.description}
          </div>
        </div>
      </main>
    </>
  )
}
