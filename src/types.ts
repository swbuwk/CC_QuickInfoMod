export type BuffTimer = {
  id: string
  key: string
  time: number
}

export type GlobalVariables = {
  buffTimers: BuffTimer[]
  natGCOnScreen: boolean
}

type SettingsOptionBase<T> = {
  id: keyof Settings
  name: string
  type: "slider" | "boolean"
  default: T
  onChange?: (val: T) => void
}

export type SettingsOptionSlider = SettingsOptionBase<number> & {
  type: "slider"
  min: number
  max: number
  step: number
  valueFormat: (val: number) => string
}

export type SettingsOptionBoolean = SettingsOptionBase<boolean> & { 
  type: "boolean"
}

export type SettingsOption = SettingsOptionSlider | SettingsOptionBoolean

export type Settings = {
  guiScale: number
  updateFrequency: number
  shortBuffNames: boolean
  showBuildingName: boolean
  hideOldBuffTImers: boolean
  highlightExistingBuffs: boolean
}