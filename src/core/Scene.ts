import { Shape } from './Shape'
export class Scene {
  context: Shape[] = []
  /**
   * *向场景中添加一个绘图元素
   * @param {Shape} shape
   * @memberof Scene
   */
  add(shape: Shape) {
    this.context.push(shape)
  }
}
