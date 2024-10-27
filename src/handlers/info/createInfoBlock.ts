import { INFO_BLOCK_FONT_SIZE, INFO_BLOCK_SIZE } from "../../constants"
import { settings } from "../../globalVariables"

export const createInfoBlock = (id: string) => {
  const infoBlock = document.createElement("div")
  infoBlock.id = "QI_" + id

  infoBlock.style.position = "relative"
  infoBlock.style.zIndex = "10"
  infoBlock.style.display = "flex"
  infoBlock.style.alignItems = "center"
  infoBlock.style.gap = "6px"
  infoBlock.style.height = `${settings.guiScale * INFO_BLOCK_SIZE}px`
  infoBlock.style.fontSize = `${settings.guiScale * INFO_BLOCK_FONT_SIZE}px`
  infoBlock.style.padding = "3px 6px"
  infoBlock.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
  infoBlock.style.borderRadius = "5px"
  infoBlock.style.transition = "box-shadow 0.5s"

  l("QIContainer")?.appendChild(infoBlock)

  return infoBlock
}