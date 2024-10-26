import { SHORT_BUFF_NAMES, ICON_SIZE, ICON_URL, BUILDING_NAMES } from "../constants"
import { settings } from "../globalVariables"

const getId = (buff: Game.Buff) => {
  const { type: buffType, arg2 } = buff
  const { name: buffTypeName } = buffType
  const buffId = buffTypeName.includes("building") ? `${buffTypeName}_${arg2}` : buffTypeName
  return buffId.replaceAll(" ", "_")
}

const getBuildingName = (buff: Game.Buff) => {
  const { arg2 } = buff
  if (arg2 === undefined) return ""
  return BUILDING_NAMES[arg2]
}

const getName = (buff: Game.Buff) => {
  let buffId = getId(buff)
  let buffName: string;

  if (!settings.shortBuffNames) {
    buffName = buff?.name
  } else if (buffId.includes("building_buff")) {
    buffName = "BS"
  } else if (buffId.includes("building_debuff")) {
    buffName = "Rust"
  } else {
    buffName = SHORT_BUFF_NAMES[buffId] || buff?.name
  }

  if (settings.showBuildingName) buffName += ` (${getBuildingName(buff)})`

  return buffName
}

const getIcon = (buff: Game.Buff) => {
  const { icon } = buff
  const size = settings.guiScale * ICON_SIZE
  const backgroundPos = `${-icon[0]*size}px ${-icon[1]*size}px`
  const backgroundSize = `${36*size}px`
  return `
    <div style="width: ${size}px; height: ${size}px; background-image: url(${ICON_URL}); background-size: ${backgroundSize}; background-position: ${backgroundPos}"></div>
  `
}

export const BuffUtils = {
  getId,
  getName,
  getIcon,
  getBuildingName
}
