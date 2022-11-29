import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Layout from 'components/templates/Layout'
import useCart from 'lib/hooks/useCart'
import { GetPaintingsData, getPaintingsData } from 'lib/paintings'
import formatPrice from 'lib/formatPrice'
import CartForm from 'components/templates/CartForm'

export default function Cart(props: { allPaintingsData: GetPaintingsData }) {
  const paintings = props.allPaintingsData
  const [cart] = useCart()
  const [cartSSR, setCartSSR] = useState<GetPaintingsData>([])
  const [fullPrice, setFullPrice] = useState(0)

  useEffect(() => {
    const uniqCart = paintings.filter((painting) =>
      cart.includes(painting.name)
    )

    setFullPrice(
      uniqCart.reduce((amount, painting) => {
        const { width, height } = painting.image
        const price = width * height
        return amount + price
      }, 0)
    )
    setCartSSR(uniqCart)
  }, [cart, paintings])

  return (
    <Layout>
      <section>
        <h1 className="sr-only">Checkout</h1>

        <div className="relative mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-8 border-gray-100 py-12 shadow-sm md:py-24">
              <div className="mx-auto max-w-lg px-4 lg:px-8">
                <div className="flex items-center">
                  <h2 className="font-medium">Ваша корзина:</h2>
                </div>
                {cartSSR.length === 0 && (
                  <p className="mt-8">
                    Пусто, выбрать картины для покупки можно
                    <Link className="font-bold text-blue-600" href="/">
                      {' '}
                      здесь
                    </Link>
                  </p>
                )}

                {cartSSR.length > 0 && (
                  <>
                    <div className="mt-8">
                      <p className="text-2xl font-medium tracking-tight">
                        {formatPrice(fullPrice)}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">К оплате </p>
                    </div>

                    <div className="mt-12">
                      <div className="flow-root">
                        <ul className="-my-4 divide-y divide-gray-200">
                          {cartSSR.map((painting) => {
                            const { name, artist, year, image, id } = painting
                            return (
                              <li
                                key={name}
                                className="flex items-center justify-between py-4"
                              >
                                <div className="flex items-start">
                                  <Link
                                    className="h-16 w-16 flex-shrink-0  object-cover"
                                    key={id}
                                    href={`/painting/${id}`}
                                  >
                                    <Image
                                      className="h-16 rounded-lg object-cover"
                                      src={image.src}
                                      alt={name}
                                      width={48 * 2}
                                      height={48 * 2}
                                    />
                                  </Link>

                                  <div className="mw-300 mx-4">
                                    <p className="break-words text-sm">
                                      {name}
                                    </p>

                                    <dl className="mt-1 space-y-1 text-xs text-gray-500">
                                      <div>
                                        <dt className="inline">Artist: </dt>
                                        <dd className="inline">{artist}</dd>
                                      </div>

                                      <div>
                                        <dt className="inline">Year: </dt>
                                        <dd className="inline">{year}</dd>
                                      </div>
                                    </dl>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm">
                                    {formatPrice(
                                      painting.image.height *
                                        painting.image.width
                                    )}
                                  </p>
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <CartForm />
          </div>
        </div>
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
