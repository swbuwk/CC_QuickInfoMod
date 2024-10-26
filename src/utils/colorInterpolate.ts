type Color = [number, number, number]

export const colorInterpolate = (colorA: Color, colorB: Color, intval: number): number[] => {
  const color = [0, 0, 0]
  return color.map((_, i) => Math.round(colorA[i] * (1 - intval) + colorB[i] * intval))
}
