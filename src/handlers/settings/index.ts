import { SettingsOption } from "../../types"
import { createBooleanSettingsOption } from "./createBooleanSettingsOption"
import { createSliderSettingOption } from "./createSliderSettingOption"

export const createSettingsOption = (parent: HTMLElement, setting: SettingsOption) => {
  if (setting.type === "slider") {
    createSliderSettingOption(parent, setting)
  } else if (setting.type === "boolean") {
    createBooleanSettingsOption(parent, setting)
  }
}