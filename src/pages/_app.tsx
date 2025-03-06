import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import './styles/globals.scss'
import 'semantic-ui-css/semantic.min.css'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{
        `
          :root {
            --inter-font: ${inter.style.fontFamily}
          }
        `}</style>
      <Component {...pageProps} />
    </>
  )
}