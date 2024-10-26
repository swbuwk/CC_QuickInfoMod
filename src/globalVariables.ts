type GlobalVarivales = {
  buffTimers: { id: string, key: string }[]
  natGCOnScreen: boolean
  GCnoSpawnChance: number
}

export const globalVars: GlobalVarivales = {
  buffTimers: [],
  natGCOnScreen: false,
  GCnoSpawnChance: 1
} 

export const settings = {
  uiScale: 1,
  updateFrequency: 10,
  shortBuffNames: true
}