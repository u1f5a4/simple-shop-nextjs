import { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'

type Props = {
  children: ReactNode
  home?: boolean
}

export default function Layout({ children, home }: Props) {
  return (
    <div
      id="root"
      className="container px-6 flex flex-col gap-y-6 mx-auto lg:max-w-screen-lg"
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Simple shop using Next.js" />
        <meta name="og:title" content="simple-shop-nextjs" />
      </Head>

      <header className="flex flex-col items-center gap-y-6 pt-6">
        <h1>
          <Link className="" href="/">
            simple-shop-nextjs
          </Link>
        </h1>
      </header>

      <main className="flex-grow">{children}</main>

      {!home && (
        <div className="container">
          <Link href="/">← Back to home</Link>
        </div>
      )}

      <footer className="py-6">
        <p className="text-xs text-slate-400 text-center">(c) 2022</p>
      </footer>
    </div>
  )
}
