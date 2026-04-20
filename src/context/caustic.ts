import { createContext, useContext } from 'react'

export type CausticRef = React.MutableRefObject<number>

export const CausticContext = createContext<CausticRef>({ current: 0 })

export function useCausticIntensity(): CausticRef {
  return useContext(CausticContext)
}
