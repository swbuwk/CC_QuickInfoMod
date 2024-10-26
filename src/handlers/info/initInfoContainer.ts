export const initInfoContainer = () => {
  const QIContainer = document.createElement("div")
  QIContainer.id = "QIContainer"
  QIContainer.style.position = "absolute"
  QIContainer.style.top = "10px"
  QIContainer.style.left = "10px"
  QIContainer.style.zIndex = "1000"
  QIContainer.style.display = "flex"
  QIContainer.style.flexDirection = "column"
  QIContainer.style.alignItems = "flex-start"
  QIContainer.style.justifyContent = "center"
  QIContainer.style.gap = "3px"
  QIContainer.style.fontWeight = "bold"

  l("sectionLeft")?.appendChild(QIContainer)
}
