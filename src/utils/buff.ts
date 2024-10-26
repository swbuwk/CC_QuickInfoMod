import { SHORT_BUFF_NAMES, ICON_SIZE, ICON_URL } from "../constants"

const getId = (buff: Game.Buff) => {
  const { type: buffType, arg2 } = buff
  const { name: buffTypeName } = buffType
  const buffId = buffTypeName === "building buff" ? `${buffTypeName}_${arg2}` : buffTypeName
  return buffId.replaceAll(" ", "_")
}

const getName = (buff: Game.Buff) => {
  let buffId = getId(buff)
  if (buffId.includes("building_buff")) return "BS"
  return SHORT_BUFF_NAMES[buffId] || buff?.name
}

const getIcon = (buff: Game.Buff) => {
  const { icon } = buff
  const backgroundPos = `${-icon[0]*ICON_SIZE}px ${-icon[1]*ICON_SIZE}px`
  const backgroundSize = `${36*ICON_SIZE}px`
  return `
    <div style="width: ${ICON_SIZE}px; height: ${ICON_SIZE}px; background-image: url(${ICON_URL}); background-size: ${backgroundSize}; background-position: ${backgroundPos}"></div>
  `
}

export const BuffUtils = {
  getId,
  getName,
  getIcon,
}
