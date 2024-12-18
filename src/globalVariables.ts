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
  showBuffTimers: true,
  showBuffToggler: true,
  showGCTimer: true,
  warnLastingBuffs: true
}

export const settingsOptions: SettingsOption[] = [
  {
    id: "showGCTimer", 
    name: "Show Golden Cookie timer",
    description: `(toggles Golden Cookie timer visibility)`,
    type: "boolean", 
    default: true,
    onChange: (val: boolean) => {
      const GCTimer = l("QI_GCTimer")
      if (!GCTimer) return
      GCTimer.style.display = val ? "flex" : "none"
    }
  },
  {
    id: "showBuffToggler", 
    name: "Show buff toggler",
    description: `(toggles toggler visibility a.k.a "Hide buffs" button (meta toggler time))`,
    type: "boolean", 
    default: true,
    onChange: (val: boolean) => {
      const buffToggler = l("QI_buffToggler")
      if (!buffToggler) return
      buffToggler.style.display = val ? "flex" : "none"
    }
  },
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
    id: "warnLastingBuffs",
    name: "Warn lasting buffs",
    description: "(warns you when you have a buff that will expire in less than 10 seconds)",
    type: "boolean",
    default: true,
    onChange: (val: boolean) => {
      const QIContainer = l("QIContainer")
      if (!QIContainer) return

      QIContainer.classList.toggle("qi_warnOff", !val)
    }
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
    description: "(toggles the buff stacking from vertical to horizontal)",
    type: "boolean", 
    default: false,
    onChange: (val: boolean) => {
      const QIContainer = l("QIContainer")
      if (!QIContainer) return
  
      if (val) {
        QIContainer.classList.add("qi_altStacking")
        QIContainer.style.width = `calc(100% - ${20 + (settings?.showOldBuffTImers ? 50 : 0)}px)`
      } else {
        QIContainer.classList.remove("qi_altStacking")
        QIContainer.style.width = ""
      }
    }
  },
]