import { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { globalData } from "globalData";

type Props = {
  children: ReactNode;
  home?: boolean;
};

export function Layout({ children, home }: Props) {
  return (
    <div id="root" className="flex flex-col gap-y-6 mx-auto max-w-screen-md">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Simple shop using Next.js" />
        <meta name="og:title" content={globalData.siteTitle} />
      </Head>

      <header className="flex flex-col items-center gap-y-6 pt-6">
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={144}
              width={144}
              alt={globalData.name}
            />
            <h1>{globalData.name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className="rounded-full"
                height={108}
                width={108}
                alt={globalData.name}
              />
            </Link>
            <h2>
              <Link className="" href="/">
                {globalData.name}
              </Link>
            </h2>
          </>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      {!home && (
        <div className="">
          <Link href="/">← Back to home</Link>
        </div>
      )}

      <footer className="py-6">
        <p className="text-xs text-slate-400 text-center">(c) 2022</p>
      </footer>
    </div>
  );
}
