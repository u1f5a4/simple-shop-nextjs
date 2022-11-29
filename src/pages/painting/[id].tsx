import Head from 'next/head'
import Image from 'next/image'

import {
  getAllPaintingPaths,
  GetPaintingData,
  getPaintingData,
} from 'lib/paintings'
import Layout from 'components/templates/Layout'
import useCart from 'lib/hooks/useCart'
import formatPrice from 'lib/formatPrice'

export default function Painting({
  artist,
  name,
  year,
  image,
  contentHtml,
}: GetPaintingData) {
  const [cart, addToCart, removeFromCart] = useCart()
  const inCart = cart.includes(name)

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
              width={image.width}
              height={image.height}
              blurDataURL={image.base64}
              priority
              placeholder="blur"
              sizes="50vw"
            />
          </div>

          <div className="flex flex-col gap-2 self-end sm:w-1/2">
            <h1 className="text-xl font-bold">{name}</h1>

            <h2>
              {artist} {year}
            </h2>

            <p className="">Цена: {formatPrice(image.width * image.height)}</p>

            {inCart ? (
              <button
                className="bg-gray-300 py-2 px-4 text-white"
                onClick={() => removeFromCart(name)}
              >
                Убрать из корзины
              </button>
            ) : (
              <button
                className="bg-gray-500 py-2 px-4 text-white"
                onClick={() => addToCart(name)}
              >
                Купить
              </button>
            )}
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

export const getStaticPaths = async () => {
  const paths = getAllPaintingPaths()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const paintingData = await getPaintingData(params.id as string)
  return {
    props: {
      ...paintingData,
    },
  }
}
