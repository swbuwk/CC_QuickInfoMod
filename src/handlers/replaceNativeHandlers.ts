import { globalVars, settings, settingsOptions } from "../globalVariables"
import { createSettingsOption } from "./settings"
import { BuffUtils } from "../utils/buff"
import { styles } from "../styles"

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

export const replaceNativeHandlers = () => {
  const initUpdateMenu = Game.UpdateMenu
  Game.UpdateMenu = () => {
    initUpdateMenu()
    addCustomSettings()
  }

  const initLoadSave = Game.LoadSave
  Game.LoadSave = (data?: string) => {
    // to sync timers
    BuffUtils.clearTimers()
    return initLoadSave(data)
  }

  const gainBuff = Game.gainBuff
  Game.gainBuff = (...args: Parameters<typeof gainBuff>) => {
    const oldBuffTimers = globalVars.buffTimers
    const buff = gainBuff(...args)
    if (settings.highlightExistingBuffs) {
      BuffUtils.highlightExistingBuff(oldBuffTimers, buff)
    }
    return buff
  }

  const QIStyles = document.createElement('style');
  QIStyles.id = 'QIStyles';
  QIStyles.innerHTML = styles;
  document.getElementsByTagName('head')[0].appendChild(QIStyles);
}