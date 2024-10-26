
import { CheckGCSpawn } from "./hooks/CheckGCSpawn";
import { UpdateBuffsTimer } from "./hooks/UpdateBuffsHook";
import { UpdateGCTimer } from "./hooks/UpdateGCTimerHook";
import { createInfoBlock } from "./utils/createInfoBlock";

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

  l("sectionLeft")?.appendChild(QIContainer)
}

const QIDrawHook = () => {
  CheckGCSpawn()
  UpdateGCTimer() 
  UpdateBuffsTimer()
}

const init = () => {
  initInfoContainer()
  createInfoBlock("GCTimer")

  Game.registerHook("draw", QIDrawHook)
}

const QIMod = {
  init,
}

Game.registerMod('QuickInfo', QIMod);