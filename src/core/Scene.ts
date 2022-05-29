import { Shape } from './Shape'
export class Scene {
  context: Shape[] = []
  add(shape: Shape) {
    this.context.push(shape)
  }
}
