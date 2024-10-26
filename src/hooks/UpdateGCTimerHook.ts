import { INFO_BLOCK_FONT_SIZE, INFO_BLOCK_SIZE } from "../constants";
import { globalVars, settings } from "../globalVariables";
import { colorInterpolate } from "../utils/colorInterpolate";

export const UpdateGCTimer = () => {
  const minT = Game.shimmerTypes.golden.minTime
  const maxT = Game.shimmerTypes.golden.maxTime
  const difT = maxT - minT
  const t = Game.shimmerTypes.golden.time

  const timeToMin = Math.ceil((minT - t) / Game.fps);
  const timeToMax = Math.ceil(Math.min(difT, maxT - t) / Game.fps);
  const timerString = `${timeToMin > 0 ? `${timeToMin}+` : ""}${timeToMax}s`

  const chanceToSpawnTick = Math.max(0, (t - minT) / (maxT - minT)) ** 5;
  globalVars.GCnoSpawnChance *= 1 - chanceToSpawnTick
  const GCChance = ((1 - globalVars.GCnoSpawnChance)*100).toFixed(1)

  const GCChanceColor = colorInterpolate([255, 42, 75], [2, 253, 2], Math.min(1, parseFloat(GCChance) / 50))

  const GCTimer = l("QI_GCTimer")
  if (!GCTimer) return

  if (globalVars.natGCOnScreen) {
    GCTimer.innerHTML = `<span style="color: white;">GC: On screen</span>`
    return
  }

  GCTimer.innerHTML = `<span style="color: white;">GC: ${timerString}</span> <span style="color: rgb(${GCChanceColor.toString()});">${GCChance}%</span>`
}