import { settings } from "../../globalVariables"
import { SettingsOptionSlider } from "../../types"

export const createSliderSettingOption = (parent: HTMLElement, setting: SettingsOptionSlider) => {
  const currentSettingValue = settings[setting.id]
  
  const settingEl = document.createElement("div")
  settingEl.className = "sliderBox"

  const settingLabel = document.createElement("div")
  settingLabel.style.float = "left"
  settingLabel.className = "smallFancyButton"
  settingLabel.innerHTML = setting.name

  const settingValue = document.createElement("div")
  settingValue.style.float = "right"
  settingValue.className = "smallFancyButton"
  settingValue.innerHTML = setting.valueFormat(currentSettingValue as number)

  const settingInput = document.createElement("input")
  settingInput.className = "slider"
  settingInput.type = "range"
  settingInput.min = String(setting.min)
  settingInput.max = String(setting.max)
  settingInput.step = String(setting.step)
  settingInput.value = String(currentSettingValue !== undefined ? currentSettingValue : setting.default)

  settingEl.appendChild(settingLabel)
  settingEl.appendChild(settingValue)
  settingEl.appendChild(settingInput)

  const setSetting = (val: string) => {
    (settings[setting.id] as number) = +val
    settingValue.innerHTML = setting.valueFormat(+val)
    if (setting.onChange) setting.onChange(+val)
  }

  settingEl.onchange = () => {
    setSetting(settingInput.value)
    PlaySound('snd/tick.mp3');
  }
  settingEl.oninput = () => {
    setSetting(settingInput.value)
  }

  parent.appendChild(settingEl)
  parent.appendChild(document.createElement("br"))
}
