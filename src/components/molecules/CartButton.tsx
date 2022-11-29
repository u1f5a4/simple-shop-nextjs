import Link from 'next/link'

import CartIcon from 'components/atoms/CartIcon'
import useCart from 'lib/hooks/useCart'

export default function CartButton() {
  const [cart] = useCart()
  const count = cart.length
  return (
    <Link className="relative self-end" href="/cart">
      <div className="h-8 w-8">
        <CartIcon />
      </div>

      <span className="absolute left-4 bottom-0 translate-x-1/2 rounded-full border border-white bg-gray-500 py-0.5 px-1.5 text-xs text-white">
        {count}
      </span>
    </Link>
  )
}
