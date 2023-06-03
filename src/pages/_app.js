import { Roboto } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@/styles/globals.css'
import Script from "next/script";


const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps }) {
  return (
    <>
    <Script
      strategy='lazyOnload'
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
    />

    <Script id="analytics" strategy='lazyOnload'>
      {
        `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `
      }
    </Script>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
    </>
  )
}
