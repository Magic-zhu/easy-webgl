export const loadImage = (url: string, callback: Function) => {
  const img = document.createElement('img')
  img.setAttribute("crossOrigin", "anonymous")
  img.src = url
  img.addEventListener('load', () => {
    callback(img)
  })
}
