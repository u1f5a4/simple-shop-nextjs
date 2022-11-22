import { atom } from 'recoil'

export const cart = atom({
  key: 'cart', // unique ID (with respect to other atoms/selectors)
  default: [] as string[], // default value (aka initial value)
})
