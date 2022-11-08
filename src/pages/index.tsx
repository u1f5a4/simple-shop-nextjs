import Head from "next/head";
import Link from "next/link";

import { Layout } from "components/templates";
import { Date } from "components/atoms";
import { getSortedPostsData } from "lib/posts";

import { globalData } from "globalData";

export default function Home({ allPostsData }) {
  return (
    <Layout home={true}>
      <Head>
        <title className="">{globalData.siteTitle}</title>
      </Head>

      <section>
        <p className="text-center">[Your Self Introduction]</p>
      </section>

      <section className="py-12 flex flex-col justify-center">
        <h2 className="pb-3">Blog</h2>
        <ul className="flex flex-col gap-3">
          {allPostsData.map(({ id, date, title }) => (
            <li className="" key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className="">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
