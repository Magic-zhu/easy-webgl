export const loadImage = (url: string, callback: Function) => {
  const img = new Image()
  img.src = url
  img.addEventListener('load', () => {
    callback(img)
  })
}
