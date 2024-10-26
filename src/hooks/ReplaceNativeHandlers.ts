import { settingsOptions } from "../globalVariables"
import { createSettingsOption } from "../handlers/settings"

const addCustomSettings = () => {
  if (!l("menu")?.childNodes?.length) return

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
  const InitUpdateMenu = Game.UpdateMenu
  Game.UpdateMenu = () => {
    InitUpdateMenu()
    addCustomSettings()
  }
}