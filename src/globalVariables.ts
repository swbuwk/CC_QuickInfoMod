import { INFO_BLOCK_FONT_SIZE, INFO_BLOCK_SIZE } from "./constants"
import { GlobalVariables, Settings, SettingsOption } from "./types"

export const globalVars: GlobalVariables = {
  buffTimers: [],
  natGCOnScreen: false,
  GCnoSpawnChance: 1
} 

export const settings: Settings = {
  guiScale: 1,
  updateFrequency: 10,
  shortBuffNames: true,
  showBuildingName: false,
  hideOldBuffTImers: false,
  highlightExistingBuffs: true
}

export const settingsOptions: SettingsOption[] = [
  { 
    id: "guiScale", 
    name: "GUI Scale", 
    type: "slider", 
    min: 0.5, 
    max: 2, 
    step: 0.1, 
    default: 1, 
    valueFormat: `x{val}`,
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
    type: "slider", 
    min: 1, 
    max: 100, 
    step: 1, 
    default: 10,
    valueFormat: `every {val} ticks`
  },
  { 
    id: "shortBuffNames", 
    name: "Short buff names", 
    type: "boolean", 
    default: true,
  },
  { 
    id: "showBuildingName", 
    name: "Show building names", 
    type: "boolean", 
    default: false,
  },
  { 
    id: "hideOldBuffTImers", 
    name: "Hide old buff timers", 
    type: "boolean", 
    default: false,
    onChange: (val: boolean) => {
      const buffsEl = l("buffs")
      if (!buffsEl) return
      buffsEl.style.display = val ? "none" : "block"
    }
  },
  { 
    id: "highlightExistingBuffs", 
    name: "Highlight existing buffs",
    type: "boolean", 
    default: false,
  },
]