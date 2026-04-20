import { useEffect, useRef } from 'react'
import type { CausticRef } from '../context/caustic'

const W = 300
const H = 200
// Sample the center region that roughly maps to the card area
const SX = 90, SY = 65, SW = 120, SH = 70

interface Props {
  intensityRef: CausticRef
}

export default function CausticBackground({ intensityRef }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = W
    canvas.height = H

    const buf = new Uint8ClampedArray(W * H * 4)
    let t = 0
    let raf: number

    function frame() {
      let centerSum = 0

      for (let y = 0; y < H; y++) {
        const ny = y / H
        for (let x = 0; x < W; x++) {
          const nx = x / W

          const a = Math.sin(nx * 7.1 + ny * 4.3 + t * 0.38)
          const b = Math.sin(nx * 4.0 + ny * 8.2 + t * 0.27)
          const c = Math.sin(nx * 5.5 + ny * 3.1 + t * 0.51)
          const d = Math.sin(nx * 2.8 + ny * 6.6 + t * 0.33)

          const v     = a + b + c + d
          const blob  = Math.pow(Math.max(0, v / 4), 2.2)
          const vein  = Math.pow(Math.max(0, Math.sin(v * 1.2)), 6)
          const bright = Math.round(Math.min(1, blob * 0.7 + vein * 0.5) * 255)

          const i = (y * W + x) * 4
          buf[i] = buf[i + 1] = buf[i + 2] = bright
          buf[i + 3] = 255

          // Accumulate brightness for the center card region
          if (x >= SX && x < SX + SW && y >= SY && y < SY + SH) {
            centerSum += bright
          }
        }
      }

      intensityRef.current = centerSum / (SW * SH * 255)
      ctx.putImageData(new ImageData(buf, W, H), 0, 0)
      t += 0.006
      raf = requestAnimationFrame(frame)
    }

    frame()
    return () => cancelAnimationFrame(raf)
  }, [intensityRef])

  return <canvas ref={ref} className="caustic-canvas" aria-hidden="true" />
}
