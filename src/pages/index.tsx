import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { GetPaintingsData, getPaintingsData } from 'lib/paintings'
import Checkbox from 'components/molecules/Checkbox'
import Layout from 'components/templates/Layout'

export default function Home(props: { allPaintingsData: GetPaintingsData }) {
  const [paintings, setPaintings] = useState(props.allPaintingsData)

  const add = (artist: string) =>
    setPaintings(
      paintings.concat(
        props.allPaintingsData.filter((paint) => paint.artist === artist)
      )
    )

  const remove = (artist: string) =>
    setPaintings(paintings.filter((paint) => paint.artist !== artist))

  return (
    <Layout home={true}>
      <Head>
        <title className="">simple-shop-nextjs</title>
      </Head>

      <div className="mb-4 flex flex-wrap gap-4">
        <Checkbox
          label="Salvador Dalí"
          init={true}
          onTrue={() => add('Salvador Dalí')}
          onFalse={() => remove('Salvador Dalí')}
        />

        <Checkbox
          label="Vincent van Gogh"
          init={true}
          onTrue={() => add('Vincent van Gogh')}
          onFalse={() => remove('Vincent van Gogh')}
        />
      </div>

      <section className="columns-2 gap-3 md:columns-3">
        {paintings.map(({ id, name, artist, year, image }) => (
          <Link className="mb-3 block" key={id} href={`/painting/${id}`}>
            <Image
              className="w-full"
              src={image.src}
              alt={name}
              height={image.height}
              width={image.width}
              blurDataURL={image.base64}
              placeholder="blur"
              sizes="(max-width: 768px) 50vw,
                     33vw"
            />
          </Link>
        ))}
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPaintingsData = await getPaintingsData()
  return {
    props: {
      allPaintingsData,
    },
  }
}
