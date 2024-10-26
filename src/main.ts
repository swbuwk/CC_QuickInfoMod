
import { settings } from "./globalVariables";
import { CheckGCSpawn } from "./hooks/CheckGCSpawn";
import { replaceNativeHandlers } from "./hooks/ReplaceNativeHandlers";
import { UpdateBuffsTimer } from "./hooks/UpdateBuffsTimerHook";
import { UpdateGCTimer } from "./hooks/UpdateGCTimerHook";
import { createInfoBlock } from "./handlers/info/createInfoBlock";
import { initInfoContainer } from "./handlers/info/initInfoContainer";
import { Settings } from "./types";
import { applySettings } from "./handlers/settings/applySettings";
 
const QIDrawHook = () => {
  if (Game.drawT % Math.ceil(settings.updateFrequency / 2) !== 0) return
  UpdateGCTimer() 

  if (Game.drawT % settings.updateFrequency !== 0) return
  CheckGCSpawn()
  UpdateBuffsTimer()
}

const init = () => {
  initInfoContainer()
  replaceNativeHandlers()
  createInfoBlock("GCTimer")

  Game.registerHook("draw", QIDrawHook)
}

const save = () => {
  return JSON.stringify(settings)
}

const load = (dataStr: string) => {
  const data = JSON.parse(dataStr);

  (Object.keys(data) as (keyof Settings)[]).forEach(<K extends keyof Settings>(key: K) => {
    settings[key] = data[key]
  })

  applySettings()
}

const QIMod = {
  init,
  save,
  load
}

Game.registerMod('QuickInfo', QIMod);