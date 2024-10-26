import { COLORS } from "../constants"

export const highlightInfoBlock = (infoBlock: HTMLElement | null) => {
  if (!infoBlock) return

  infoBlock.style.boxShadow = `0 0 10px 10px white`
  infoBlock.style.zIndex = "5"

  setTimeout(() => {
    infoBlock.style.boxShadow = ``
  }, 1000)
  setTimeout(() => {
    infoBlock.style.zIndex = "10"
  }, 1500)
}