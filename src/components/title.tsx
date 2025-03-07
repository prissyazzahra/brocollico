import Head from "next/head"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  title?: string
  description?: string
}

const Title = ({ children, title, description }: Props) => {
  return (
    <>
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/globe.svg"/>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head>
    {children}
    </>
  )
}

export default Title