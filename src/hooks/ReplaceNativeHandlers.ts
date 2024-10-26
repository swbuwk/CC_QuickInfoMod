const addCustomSettings = () => {
  console.log("update")
}

export const replaceNativeHandlers = () => {
  const InitUpdateMenu = Game.UpdateMenu
  Game.UpdateMenu = () => {
    addCustomSettings()
    InitUpdateMenu()
  }
}