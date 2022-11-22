import { RecoilRoot } from 'recoil'

export default function GlobalStoreProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>
}
