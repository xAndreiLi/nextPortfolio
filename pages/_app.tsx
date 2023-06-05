import { AppProps } from 'next/app'
import '../styles/app.css'
import { Space_Grotesk, Great_Vibes, Dancing_Script, Inter } from 'next/font/google'

export const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
export const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: "400",
})
export const dancingScript = Dancing_Script({subsets: ['latin']})
export const inter = Inter({ subsets: ['latin'] })

export const fonts = [
  spaceGrotesk.className, greatVibes.className, 
  dancingScript.className, inter.className
]
export const fontClass = fonts.join(' ')

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={fontClass}>
      <Component {...pageProps} />
    </main>
  )
}

export default App;
