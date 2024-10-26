import { globalVars } from "../globalVariables";

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
  const GCChance = parseFloat(((1 - globalVars.GCnoSpawnChance)*100).toFixed(1))

  const GCTimer = l("QI_GCTimer")
  if (!GCTimer) return

  if (globalVars.natGCOnScreen) {
    GCTimer.innerHTML = `<span style="color: rgb(255, 255, 255);">GC: On screen</span>`
    return
  }

  GCTimer.innerHTML = `<span style="color: rgb(255, 255, 255);">GC: ${timerString}</span> <span style="color: rgb(255, 255, 255);">${GCChance}%</span>`
}