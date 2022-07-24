export const loadImage = (url: string, callback: Function) => {
  const img = document.createElement('img')
  img.src = url
  img.addEventListener('load', () => {
    callback(img)
  })
}
