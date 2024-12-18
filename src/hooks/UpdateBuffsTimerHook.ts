import { COLORS, MULT_CLICK_IDS } from "../constants";
import { globalVars, settings } from "../globalVariables";
import { BuffUtils } from "../utils/buff";
import { createInfoBlock } from "../handlers/info/createInfoBlock";

export const UpdateBuffsTimer = () => {
  Object.keys(Game.buffs).forEach((key: string) => {
    const buff = (Game.buffs as unknown as Record<string, Game.Buff>)[key] 
    if (!buff) return
    if (!settings.showBuffTimers) return

    const { time, multCpS, multClick } = buff

    const buffId = BuffUtils.getId(buff)
    const buffTime = Math.ceil(time / Game.fps)
    const buffName = BuffUtils.getName(buff)
    const buffIcon = BuffUtils.getIcon(buff)
    const buffMult = (MULT_CLICK_IDS.includes(buffId) ? multClick : multCpS) || 0
    const buffMultColor = buffMult > 1 ? COLORS.green : COLORS.red

    if (!globalVars.buffTimers.find(b => b.id === buffId)) {
      createInfoBlock(buffId)
      globalVars.buffTimers.push({ id: buffId, key })
    }

    const buffEl = l("QI_" + buffId)
    if (!buffEl) return

    buffEl.classList.toggle('qi_warning', buffTime <= 10)

    buffEl.innerHTML = `
      ${buffIcon}<span>${buffName}: ${buffTime}s</span> <span style="color: ${buffMultColor}; display: ${buffMult === 0 || !settings.showMultipliers ? "none" : "inline"};">x${parseFloat(buffMult.toFixed(1))}</span>
    `
  })

  if (globalVars.buffTimers.length !== Object.keys(Game.buffs).length) {
    let deletedIds: string[] = [];
    const buffTimersCopy = globalVars.buffTimers.slice()
    buffTimersCopy.forEach((buff, i) => {
      if (!Object.keys(Game.buffs).includes(buff.key)) {
        const buffEl = l("QI_" + buff.id)
        if (!buffEl) return
        buffEl.remove()
        deletedIds.push(buff.id)
      }
    })
    globalVars.buffTimers = globalVars.buffTimers.filter(buff => !deletedIds.includes(buff.id))
  }
}