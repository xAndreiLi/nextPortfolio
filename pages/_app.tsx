import { AppProps } from 'next/app'
import '../styles/globals.css'
import { Roboto_Mono } from 'next/font/google'

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto_mono.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default App
