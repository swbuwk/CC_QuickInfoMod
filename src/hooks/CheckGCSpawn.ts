import { globalVars } from "../globalVariables"

declare var Game: any;

export const CheckGCSpawn = () => {
  let hasNatGC = false
  Game.shimmers.forEach((shimmer: Game.shimmer) => {
    if (shimmer.type === "golden" && shimmer.spawnLead) {
      hasNatGC = true
    }
  })
  globalVars.natGCOnScreen = hasNatGC
}
