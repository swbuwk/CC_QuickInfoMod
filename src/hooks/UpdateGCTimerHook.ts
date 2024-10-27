import { INFO_BLOCK_FONT_SIZE, INFO_BLOCK_SIZE } from "../constants";
import { globalVars, settings } from "../globalVariables";
import { colorInterpolate } from "../utils/colorInterpolate";

export const UpdateGCTimer = () => {
  const minT = Game.shimmerTypes.golden.minTime
  const maxT = Game.shimmerTypes.golden.maxTime
  const difT = maxT - minT
  const t = Game.shimmerTypes.golden.time
  const internalT = Math.max(0, t - minT)

  const timeToMin = Math.ceil((minT - t) / Game.fps);
  const timeToMax = Math.ceil(Math.min(difT, maxT - t) / Game.fps);
  const timerString = `${timeToMin > 0 ? `${timeToMin}+` : ""}${timeToMax}s`

  // formula source: i made that up
  const GCChance = (1 - Math.exp( ( -5 * ((internalT/Game.fps)**5.93) ) / ( (difT/Game.fps)**5 ) )) * 100
  const GCChanceColor = colorInterpolate([255, 42, 75], [2, 253, 2], Math.min(1, GCChance / 50))

  const GCTimer = l("QI_GCTimer")
  if (!GCTimer) return

  if (globalVars.natGCOnScreen) {
    GCTimer.innerHTML = `<span style="color: white;">GC: On screen</span>`
    return
  }

  GCTimer.innerHTML = `<span style="color: white;">GC: ${timerString}</span> <span style="color: rgb(${GCChanceColor.toString()});">${GCChance.toFixed(1)}%</span>`
}