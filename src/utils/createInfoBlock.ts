export const createInfoBlock = (id: string) => {
  const infoBlock = document.createElement("div")
  infoBlock.id = "QI_" + id

  infoBlock.style.position = "relative"
  infoBlock.style.display = "flex"
  infoBlock.style.alignItems = "center"
  infoBlock.style.gap = "6px"
  infoBlock.style.height = "14px"
  infoBlock.style.padding = "3px 6px"
  infoBlock.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
  infoBlock.style.borderRadius = "5px"

  l("QIContainer")?.appendChild(infoBlock)
}