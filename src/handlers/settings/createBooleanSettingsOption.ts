import { settings } from "../../globalVariables";
import { SettingsOptionBoolean } from "../../types";

export const createBooleanSettingsOption = (parent: HTMLElement, setting: SettingsOptionBoolean) => {
  const currentSettingValue = settings[setting.id]
  
  const settingEl = document.createElement("a")
  settingEl.classList.add("smallFancyButton", "prefButton", "option")
  if (!currentSettingValue) settingEl.classList.add("off")
  settingEl.innerHTML = `${setting.name} ${currentSettingValue ? "ON" : "OFF"}`

  const setSetting = (val: boolean) => {
    (settings[setting.id] as boolean) = val
    settingEl.innerHTML = `${setting.name} ${val ? "ON" : "OFF"}`

    const action = val ? "remove" : "add"
    settingEl.classList[action]("off")
  }

  settingEl.onclick = () => { 
    const newValue = !settings[setting.id]
    setSetting(newValue) 
    PlaySound('snd/tick.mp3');
    if (setting.onChange) setting.onChange(newValue)
  }

  parent.appendChild(settingEl)
  
  if (setting.description) {
    const descriptionEl = document.createElement("label")
    descriptionEl.innerHTML = setting.description
    parent.appendChild(descriptionEl)
  }
  
  parent.appendChild(document.createElement("br"))
}