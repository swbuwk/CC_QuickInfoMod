import { INFO_BLOCK_FONT_SIZE, INFO_BLOCK_SIZE } from "../../constants"
import { settings } from "../../globalVariables"
import { buffsHiddenHTML } from "../buffs/createBuffsToggler"

const notScaledElements = ["QI_buffToggler", "QI_GCTimer"] 

export const applySettings = () => {
  if (settings.guiScale !== 1) {
    notScaledElements.forEach(id => {
      const element = l(id)
      if (element) {
        element.style.height = `${settings.guiScale * INFO_BLOCK_SIZE}px`
        element.style.fontSize = `${settings.guiScale * INFO_BLOCK_FONT_SIZE}px`
      }
    })
  }

  if (!settings.showGCTimer) {
    const GCTimer = l("QI_GCTimer")
    if (!GCTimer) return
    GCTimer.style.display = "none"
  }

  if (!settings.showBuffToggler) {
    const buffToggler = l("QI_buffToggler")
    if (!buffToggler) return
    buffToggler.style.display = "none"
  }

  if (!settings.showOldBuffTImers) {
    const buffsEl = l("buffs")
    if (buffsEl) {
      buffsEl.style.display = "none"
    }
  }

  if (settings.alternativeBuffStacking) {
    const QIContainer = l("QIContainer")
    if (QIContainer) {
      QIContainer.style.flexDirection = "row"
      QIContainer.style.flexWrap = "wrap"
      QIContainer.style.width = `calc(100% - ${20 + (settings?.showOldBuffTImers ? 50 : 0)}px)`
      QIContainer.style.justifyContent = "flex-start"
    }
  }

  if (!settings.showBuffTimers) {
    const buffToggler = l("QI_buffToggler")
    if (!buffToggler) return
    buffToggler.innerHTML = buffsHiddenHTML
  }
}