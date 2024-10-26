import { MULT_CLICK_IDS } from "../constants";
import { globalVars } from "../globalVariables";
import { BuffUtils } from "../utils/buff";
import { createInfoBlock } from "../handlers/info/createInfoBlock";

export const UpdateBuffsTimer = () => {
  Object.keys(Game.buffs).forEach((key: string) => {
    const buff = (Game.buffs as unknown as Record<string, Game.Buff>)[key] 
    if (!buff) return

    const { time, multCpS, multClick } = buff

    const buffId = BuffUtils.getId(buff)
    const buffTime = Math.ceil(time / Game.fps)
    const buffName = BuffUtils.getName(buff)
    const buffIcon = BuffUtils.getIcon(buff)
    const buffMult = (MULT_CLICK_IDS.includes(buffId) ? multClick : multCpS) || 0
    const buffMultColor = buffMult > 1 ? "rgb(2, 253, 2)" : "rgb(255, 42, 75)"

    if (!globalVars.buffTimers.find(b => b.id === buffId)) {
      createInfoBlock(buffId)
      globalVars.buffTimers.push({ id: buffId, key })
    }

    const buffEl = l("QI_" + buffId)
    if (!buffEl) return

    buffEl.innerHTML = `
      ${buffIcon}<span>${buffName}: ${buffTime}s</span> <span style="color: ${buffMultColor};">x${parseFloat(buffMult.toFixed(1))}</span>
    `
  })

  if (globalVars.buffTimers.length > Object.keys(Game.buffs).length) {
    let deletedId = "";
    globalVars.buffTimers.forEach((buff, i) => {
      if (!Object.keys(Game.buffs).includes(buff.key)) {
        const buffEl = l("QI_" + buff.id)
        if (!buffEl) return
        buffEl.remove()
        deletedId = buff.id
      }
    })
    globalVars.buffTimers = globalVars.buffTimers.filter(buff => buff.id !== deletedId)
  }
}