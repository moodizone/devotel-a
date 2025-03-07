export function endLoadingState() {
  const loadingElement = document.querySelector("#loading-page");

  if (loadingElement && !loadingElement.classList.contains("hide")) {
    loadingElement.classList.add("hide");
  }
}
export function registerLoadingState() {
  const loadingElement = document.querySelector("#loading-page");

  if (loadingElement && loadingElement.classList.contains("hide")) {
    loadingElement.classList.remove("hide");
  }
}
