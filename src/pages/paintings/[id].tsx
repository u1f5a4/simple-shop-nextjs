import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps, GetStaticPaths } from 'next'

import { getAllPaintingPaths, getPaintingData } from 'lib/paintings'
import Layout from 'components/templates/Layout'

type PaintingProps = {
  paintingData: {
    image: {
      src: string
      base64: string
      height: number
      width: number
      type?: string
    }
    artist: string
    name: string
    year: string
    id: string
    contentHtml: string
  }
}

export default function Painting(props: PaintingProps) {
  const { artist, name, year, image, contentHtml } = props.paintingData

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>

      <article className="my-3">
        <div className="mb-6 gap-3 sm:flex">
          <div className="sm:w-1/2">
            <Image
              className="aspect-auto"
              src={image.src}
              alt={`${name}, ${artist}, ${year}`}
              width={1024 / 2}
              height={image.height}
              blurDataURL={image.base64}
              placeholder="blur"
              sizes="50vw"
            />
          </div>

          <div className="self-end sm:w-1/2">
            <h1 className="text-xl font-bold">{name}</h1>
            <h2>
              {artist} {year}
            </h2>
          </div>
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPaintingPaths()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const paintingData = await getPaintingData(params.id as string)
  return {
    props: {
      paintingData,
    },
  }
}
