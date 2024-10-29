import { INFO_BLOCK_FONT_SIZE, INFO_BLOCK_SIZE } from "../../constants"
import { settings } from "../../globalVariables"

export const createInfoBlock = (id: string) => {
  const infoBlock = document.createElement("div")
  infoBlock.id = "QI_" + id

  infoBlock.classList.add("qi_infoBlock")
  infoBlock.style.height = `${settings.guiScale * INFO_BLOCK_SIZE}px`
  infoBlock.style.fontSize = `${settings.guiScale * INFO_BLOCK_FONT_SIZE}px`

  l("QIContainer")?.appendChild(infoBlock)

  return infoBlock
}