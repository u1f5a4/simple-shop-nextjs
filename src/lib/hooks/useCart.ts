import { useRecoilState } from 'recoil'

import useLocalStorage from 'lib/hooks/useLocalStorage'
import { cart } from 'stores/atoms/cart'
import { useEffect } from 'react'

export default function useCart() {
  const [cartLS, setCartLS] = useLocalStorage('cart', [])
  const [cartGS, setCartGS] = useRecoilState<string[]>(cart)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setCartGS(cartLS), [])

  const addToCart = (name: string) => {
    if (cartLS.includes(name)) return

    setCartGS([...cartGS, name])
    setCartLS([...cartLS, name])
  }

  const removeFromCart = (name: string) => {
    setCartLS(cartLS.filter((item) => item !== name))
    setCartGS(cartGS.filter((item) => item !== name))
  }

  return [cartGS, addToCart, removeFromCart] as const
}
