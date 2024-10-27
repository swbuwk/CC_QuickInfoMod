import { globalVars, settings, settingsOptions } from "../globalVariables"
import { createSettingsOption } from "./settings"
import { BuffTimer } from "../types"
import { BuffUtils } from "../utils/buff"
import { highlightInfoBlock } from "../utils/highlightInfoBlock"

const addCustomSettings = () => {
  if (!l("menu")?.childNodes?.length) return
  if (Game.onMenu !== 'prefs') return

  const settingsEl = document.createElement("div")
  settingsEl.id = "QISettings"
  settingsEl.className = "subsection"

  const settingsTitle = document.createElement("div")
  settingsTitle.className = "title"
  settingsTitle.innerHTML = "Quick Info Settings"

  const settingsListing = document.createElement("div")
  settingsListing.className = "listing"

  settingsOptions.forEach((settingsOption) => {
    createSettingsOption(settingsListing, settingsOption)
  })

  settingsEl.appendChild(settingsTitle)
  settingsEl.appendChild(settingsListing)

  l('menu')?.insertBefore(settingsEl, l('menu')?.childNodes[3] || null)
}

const detectExistingBuff = (oldBuffTimers: BuffTimer[], newBuff: Game.Buff) => {
  const newBuffId = BuffUtils.getId(newBuff)
  const oldBuffCandidate = oldBuffTimers.find(buff => buff.id === newBuffId)

  if (oldBuffCandidate) {
    oldBuffCandidate.time = newBuff.time
    const buffEl = l("QI_" + oldBuffCandidate.id)
    highlightInfoBlock(buffEl)
  }
}

export const replaceNativeHandlers = () => {
  const InitUpdateMenu = Game.UpdateMenu
  Game.UpdateMenu = () => {
    InitUpdateMenu()
    addCustomSettings()
  }

  const gainBuff = Game.gainBuff
  Game.gainBuff = (...args: Parameters<typeof gainBuff>) => {
    const oldBuffTimers = globalVars.buffTimers
    const buff = gainBuff(...args)
    if (settings.highlightExistingBuffs) {
      detectExistingBuff(oldBuffTimers, buff)
    }
    return buff
  }
}