import { INFO_BLOCK_FONT_SIZE, INFO_BLOCK_SIZE } from "../../constants"
import { settings } from "../../globalVariables"

export const applySettings = () => {
  if (settings.guiScale !== 1) {
    const GCTimer = l("QI_GCTimer")
    if (GCTimer) {
      GCTimer.style.height = `${settings.guiScale * INFO_BLOCK_SIZE}px`
      GCTimer.style.fontSize = `${settings.guiScale * INFO_BLOCK_FONT_SIZE}px`
    }
  }

  if (!settings.showOldBuffTImers) {
    const buffsEl = l("buffs")
    if (!buffsEl) return
    buffsEl.style.display = "none"
  }

  if (settings.alternativeBuffStacking) {
    const QIContainer = l("QIContainer")
    if (!QIContainer) return

    QIContainer.style.flexDirection = "row"
    QIContainer.style.flexWrap = "wrap"
    QIContainer.style.width = `calc(100% - ${20 + (settings?.showOldBuffTImers ? 50 : 0)}px)`
    QIContainer.style.justifyContent = "flex-start"
  }
}