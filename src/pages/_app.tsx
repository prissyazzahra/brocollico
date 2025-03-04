import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import './styles/globals.scss'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <style jsx global>{
        `
          :root {
            --inter-font: ${inter.style.fontFamily}
          }
        `}</style>
      <Component {...pageProps} />
    </main>
  )
}