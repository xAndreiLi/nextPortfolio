import '../styles/globals.scss';
import { AppProps } from 'next/app';
import { Exo_2 } from 'next/font/google'

const exo_2 = Exo_2({subsets:['latin']})

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={exo_2.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default App;
