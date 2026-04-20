import { useEffect, type RefObject } from 'react'
import { useCausticIntensity } from '../context/caustic'

export function useWaveGlow(ref: RefObject<HTMLElement | null>) {
  const intensityRef = useCausticIntensity()

  useEffect(() => {
    let raf: number
    let smooth = 0

    function tick() {
      // Exponential smoothing — glow lags slightly behind the wave
      smooth = smooth * 0.94 + intensityRef.current * 0.06

      const el = ref.current
      if (el) {
        const v = smooth
        // Border brightens with wave
        el.style.borderColor = `rgba(255,255,255,${(0.07 + v * 0.22).toFixed(3)})`
        // Outer glow swells
        el.style.boxShadow = [
          `0 8px 48px rgba(0,0,0,0.55)`,
          `0 0 ${(12 + v * 28).toFixed(1)}px rgba(255,255,255,${(v * 0.08).toFixed(3)})`,
          `inset 0 1px 0 rgba(255,255,255,${(0.05 + v * 0.1).toFixed(3)})`,
        ].join(',')
      }

      raf = requestAnimationFrame(tick)
    }

    tick()
    return () => cancelAnimationFrame(raf)
  }, [ref, intensityRef])
}
