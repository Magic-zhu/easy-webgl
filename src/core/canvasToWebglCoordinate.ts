import { Config } from './Config'
/**
 * 归一化坐标系
 * @param x - 坐标点
 * @param y - 坐标点
 */
export const canvasToWebglCoordinate = (x: number, y: number) => {
  return {
    x: (x / Config.canvasWidth) * 2 - 1,
    y: (y / Config.canvasHeight) * 2 - 1,
  }
}
