import GlobalStoreProvider from 'stores/GlobalStoreProvider'
import 'styles/global.css'

export default function App({ Component, pageProps }) {
  return (
    <GlobalStoreProvider>
      <Component {...pageProps} />
    </GlobalStoreProvider>
  )
}
