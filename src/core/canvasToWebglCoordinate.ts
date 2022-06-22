/**
 * 归一化坐标系
 * @param x - 坐标点
 * @param y - 坐标点
 */
export const canvasToWebglCoordinate = (
  x: number,
  y: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  return {
    x: (x / canvasWidth) * 2 - 1,
    y: -((y / canvasHeight) * 2 - 1),
  }
}
