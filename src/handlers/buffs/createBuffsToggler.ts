import { globalVars, settings } from "../../globalVariables"
import { createInfoBlock } from "../info/createInfoBlock"

export const createBuffsToggler = () => {
  const buffToggler = createInfoBlock("buffToggler")
  if (!buffToggler) return

  buffToggler.style.cursor = "pointer"
  buffToggler.style.transition = "0.2s"
  buffToggler.onmouseenter = () => { buffToggler.style.backgroundColor = "rgba(90, 90, 90, 0.5)" }
  buffToggler.onmouseleave = () => { buffToggler.style.backgroundColor = "rgba(0, 0, 0, 0.5)" } 
  buffToggler.innerHTML = `${settings.showBuffTimers ? "Hide buffs" : "Show buffs"}`
  
  const toggleBuffTimersVisibility = () => {
    console.log(settings.showBuffTimers)
    settings.showBuffTimers = !settings.showBuffTimers
    buffToggler.innerHTML = `${settings.showBuffTimers ? "Hide buffs" : "Show buffs"}`

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