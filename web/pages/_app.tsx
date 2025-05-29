import type { AppProps } from "next/app"
import Head from "next/head"
import "../styles/globals.css"
import Layout from "../src/components/layout"

const title = "Expression by Shue"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="a site for viewing Shue's art journey" content="shue's art" />
        <link rel="icon" href="/images/rainbows/rainbow-blue-svgrepo-com.svg" />
      </Head>
      <Layout>
        <main className="h-full">
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  )
}

export default MyApp
