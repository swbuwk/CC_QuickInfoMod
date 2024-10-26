
import { CheckGCSpawn } from "./hooks/CheckGCSpawn";
import { replaceNativeHandlers } from "./hooks/ReplaceNativeHandlers";
import { UpdateBuffsTimer } from "./hooks/UpdateBuffsHook";
import { UpdateGCTimer } from "./hooks/UpdateGCTimerHook";
import { createInfoBlock } from "./utils/createInfoBlock";

const initSettingsSection = () => {
  const settings = document.createElement("div")
  settings.id = "subsection"
  settings.innerHTML = `
    <div class="title">Quick Info Settings</div>
    <div class="listing">
      <div class="sliderBox">
        <div style="float:left" class="smallFancyButton">UI Scale</div>
        <div style="float:right" class="smallFancyButton">50%</div>
        <input class="slider" style="clear:both" type="range" min="0" max="100" value="50">
      </div>
    </div>
  `

  const settingsBlock = l("menu")?.querySelector("#block")
}
 
const initInfoContainer = () => {
  const QIContainer = document.createElement("div")
  QIContainer.id = "QIContainer"
  QIContainer.style.position = "absolute"
  QIContainer.style.top = "10px"
  QIContainer.style.left = "10px"
  QIContainer.style.zIndex = "1000"
  QIContainer.style.display = "flex"
  QIContainer.style.flexDirection = "column"
  QIContainer.style.alignItems = "flex-start"
  QIContainer.style.justifyContent = "center"
  QIContainer.style.gap = "3px"
  QIContainer.style.fontWeight = "bold"
  QIContainer.style.fontSize = "10px"

  l("sectionLeft")?.appendChild(QIContainer)
}

const QIDrawHook = () => {
  if (Game.drawT % 5 !== 0) return
  UpdateGCTimer() 

  if (Game.drawT % 10 !== 0) return
  CheckGCSpawn()
  UpdateBuffsTimer()
}

const init = () => {
  initInfoContainer()
  initSettingsSection()
  replaceNativeHandlers()
  createInfoBlock("GCTimer")

  Game.registerHook("draw", QIDrawHook)
}

const QIMod = {
  init,
}

Game.registerMod('QuickInfo', QIMod);