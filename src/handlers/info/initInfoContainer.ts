export const initInfoContainer = () => {
  const QIContainer = document.createElement("div")
  QIContainer.id = "QIContainer"
  QIContainer.classList.add("qi_infoContainer")

  l("sectionLeft")?.appendChild(QIContainer)
}
