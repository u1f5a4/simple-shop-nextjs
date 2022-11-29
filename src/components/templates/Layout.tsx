import { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Header from 'components/organisms/Header'
import Footer from 'components/organisms/Footer'

type Props = {
  children: ReactNode
  home?: boolean
}

export default function Layout({ children, home }: Props) {
  return (
    <div
      id="root"
      className="container mx-auto flex flex-col gap-y-6 px-6 lg:max-w-screen-lg"
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Simple shop using Next.js" />
        <meta name="og:title" content="simple-shop-nextjs" />
      </Head>

      <Header />

      <main className="flex-grow">{children}</main>

      {!home && (
        <div className="container">
          <Link href="/">← Back to home</Link>
        </div>
      )}

      <Footer />
    </div>
  )
}
