import { Point } from 'src/core/Point'

/**
 * 已知一条线段，一个距离获得偏移这个距离后的点坐标
 *
 * @param {number} distance
 * @param {Point} startPoint
 * @param {Point} endPoint
 * @return {*}  {Point[]}
 */
export const offsetLine = (
  distance: number,
  startPoint: Point,
  endPoint: Point
): Point[] => {
  const k = (endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)
  const tx = Math.sqrt(Math.pow(distance, 2) / (1 + Math.pow(k, 2)))
  const ty = k * tx
  return [
    new Point(startPoint.x - tx, startPoint.y + ty),
    new Point(endPoint.x - tx, endPoint.y + ty),
    new Point(startPoint.x + tx, startPoint.y - ty),
    new Point(endPoint.x + tx, endPoint.y - ty),
  ]
}
