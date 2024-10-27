import { INFO_BLOCK_FONT_SIZE, INFO_BLOCK_SIZE } from "./constants"
import { GlobalVariables, Settings, SettingsOption } from "./types"

export const globalVars: GlobalVariables = {
  buffTimers: [],
  natGCOnScreen: false,
} 

export const settings: Settings = {
  guiScale: 1,
  updateFrequency: 10,
  shortBuffNames: false,
  showBuildingName: false,
  showOldBuffTImers: true,
  highlightExistingBuffs: true,
  showMultipliers: true,
  alternativeBuffStacking: false,
  showBuffTimers: true
}

export const settingsOptions: SettingsOption[] = [
  { 
    id: "guiScale", 
    name: "GUI Scale", 
    description: "(scales the Quick Info GUI)",
    type: "slider", 
    min: 0.5, 
    max: 2, 
    step: 0.1, 
    default: 1, 
    valueFormat: (val) => `x${val}`,
    onChange: (val: number) => {
      const QIContainer = l("QIContainer")
      if (!QIContainer) return
      QIContainer.querySelectorAll("div").forEach((div) => {
        div.style.height = `${val * INFO_BLOCK_SIZE}px`
        div.style.fontSize = `${val * INFO_BLOCK_FONT_SIZE}px`
      })
    }
  },
  { 
    id: "updateFrequency", 
    name: "Update Frequency", 
    description: "(changes how often the buff timers are updated, low tick values can cause minor lag)",
    type: "slider", 
    min: 0, 
    max: 100.1, 
    step: 2, 
    default: 10,
    valueFormat: (val: number) => val === 0 ? "every tick" : `every ${val} ticks`
  },
  { 
    id: "shortBuffNames", 
    name: "Short buff names", 
    description: "(shortens the buff names (e.g. Click Frenzy -> CF, Building specal -> BS))", 
    type: "boolean", 
    default: false,
  },
  { 
    id: "showBuildingName", 
    name: "Show building names", 
    description: '(shows the building names on the "building special" buffs)',
    type: "boolean", 
    default: false,
  },
  { 
    id: "showOldBuffTImers", 
    name: "Show old buff timers", 
    description: "(shows the old buff timers, just if you wanna see them idk)",
    type: "boolean", 
    default: true,
    onChange: (val: boolean) => {
      const buffsEl = l("buffs")
      if (!buffsEl) return
      buffsEl.style.display = val ? "block" : "none"

      if (settings.alternativeBuffStacking) {
        const QIContainer = l("QIContainer")
        if (!QIContainer) return

        QIContainer.style.width = `calc(100% - ${20 + (settings?.showOldBuffTImers ? 50 : 0)}px)`
      }
    }
  },
  { 
    id: "highlightExistingBuffs", 
    name: "Highlight existing buffs",
    description: "(highlights the buffs that you already have)",
    type: "boolean", 
    default: true,
  },
  { 
    id: "showMultipliers", 
    name: "Show buff mult.",
    description: "(shows the buff multipliers)",
    type: "boolean", 
    default: true,
  },
  { 
    id: "alternativeBuffStacking", 
    name: "Alt. buffs stacking",
    description: "(toggles the buff stacking from horizontal to vertical)",
    type: "boolean", 
    default: false,
    onChange: (val: boolean) => {
      const QIContainer = l("QIContainer")
      if (!QIContainer) return
  
      if (val) {
        QIContainer.style.flexDirection = "row"
        QIContainer.style.flexWrap = "wrap"
        QIContainer.style.width = `calc(100% - ${20 + (settings?.showOldBuffTImers ? 50 : 0)}px)`
        QIContainer.style.justifyContent = "flex-start"
      } else {
        QIContainer.style.flexDirection = "column"
        QIContainer.style.flexWrap = ""
        QIContainer.style.width = ""
        QIContainer.style.justifyContent = "center"
      }
    }
  },
]