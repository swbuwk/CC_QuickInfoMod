import { globalVars, settings } from "../../globalVariables"
import { createInfoBlock } from "../info/createInfoBlock"

export const buffsVisibleHTML = "<span>Buffs: <span style='color: rgb(2, 253, 2);'>visible</span> (Hide)</span>"
export const buffsHiddenHTML = "<span>Buffs: <span style='color: rgb(255, 42, 75);'>hidden</span> (Show)</span>"

export const createBuffsToggler = () => {
  const buffToggler = createInfoBlock("buffToggler")
  if (!buffToggler) return

  buffToggler.style.cursor = "pointer"
  buffToggler.style.transition = "background-color 0.5s"
  buffToggler.onmouseenter = () => { buffToggler.style.backgroundColor = "rgba(90, 90, 90, 0.5)" }
  buffToggler.onmouseleave = () => { buffToggler.style.backgroundColor = "rgba(0, 0, 0, 0.5)" } 
  buffToggler.innerHTML = `${settings.showBuffTimers ? buffsVisibleHTML : buffsHiddenHTML}`
  
  const toggleBuffTimersVisibility = () => {
    settings.showBuffTimers = !settings.showBuffTimers
    buffToggler.innerHTML = `${settings.showBuffTimers ? buffsVisibleHTML : buffsHiddenHTML}`

    if (!settings.showBuffTimers) {
      globalVars.buffTimers.forEach(buff => {
        const buffEl = l("QI_" + buff.id)
        if (!buffEl) return
        buffEl.remove()
      })
    } else {
      globalVars.buffTimers.forEach(buff => {
        createInfoBlock(buff.id)
      })
    }
  }
  buffToggler.onclick = toggleBuffTimersVisibility

  l("QIContainer")?.appendChild(buffToggler)
}