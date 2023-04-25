import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  )
}
