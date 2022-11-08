import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import { Layout } from "components/templates";
import { Date } from "components/atoms";

import { getAllPostIds, getPostData } from "lib/posts";

type PostData = {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
};

export default function Post({ postData }: PostData) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className="text-xl font-bold text-center">{postData.title}</h1>
        <div className="text-center pb-6 text-sm">
          <Date dateString={postData.date} />
        </div>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
