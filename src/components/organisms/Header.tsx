import Link from 'next/link'

import CartButton from 'components/molecules/CartButton'

export default function Header() {
  return (
    <header className="flex flex-col items-center pt-6">
      <h1>
        <Link className="" href="/">
          simple-shop-nextjs
        </Link>
      </h1>
    </header>
  )
}
