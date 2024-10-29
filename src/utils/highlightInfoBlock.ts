export const highlightInfoBlock = (infoBlock: HTMLElement | null) => {
  if (!infoBlock) return

  infoBlock.classList.add("qi_behind", "qi_highlighted")

  setTimeout(() => {
    infoBlock.classList.remove("qi_highlighted")
  }, 1000)
  setTimeout(() => {
    infoBlock.classList.remove("qi_behind")
  }, 1500)
}