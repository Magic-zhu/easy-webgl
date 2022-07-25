export class Matrix4 extends Array {
  constructor() {
    super()
    for (let i = 0; i < 16; i++) {
      this[i] = 0
    }
  }


  getOrigin(self: boolean) {
    if (self) {
      return this
    } else {
      return new Matrix4()
    }
  }

  /**
   * 正射
   * @param left
   * @param right
   * @param bottom
   * @param top
   * @param near
   * @param far
   * @param self - {boolean} true的时候改变自身 false的时候生成新的矩阵
   */
  orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number, self = true): Matrix4 {
    const r = this.getOrigin(self)
    r[0] = 2 / (right - left)
    r[1] = 0
    r[2] = 0
    r[3] = 0
    r[4] = 0
    r[5] = 2 / (top - bottom)
    r[6] = 0
    r[7] = 0
    r[8] = 0
    r[9] = 0
    r[10] = 2 / (near - far)
    r[11] = 0
    r[12] = (left + right) / (left - right)
    r[13] = (bottom + top) / (bottom - top)
    r[14] = (near + far) / (near - far)
    r[15] = 1
    return r
  }

  /**
   * 平移
   * @param tx
   * @param ty
   * @param tz
   * @param self
   */
  translate(tx: number, ty: number, tz: number, self = true): Matrix4 {
    const r = this.getOrigin(self)
    r[12] = this[0] * tx + this[4] * ty + this[8] * tx + this[12]
    r[13] = this[1] * tx + this[5] * ty + this[9] * tx + this[13]
    r[14] = this[2] * tx + this[6] * ty + this[10] * tx + this[14]
    r[15] = this[3] * tx + this[7] * ty + this[11] * tx + this[15]
    // * 如果不是自身 复制一下值
    if (!self) {
      for (let i = 0; i < 12; i++) {
        r[i] = this[i]
      }
    }
    return r
  }

  /**
   * 缩放
   * @param sx
   * @param sy
   * @param sz
   * @param self
   */
  scale(sx: number, sy: number, sz: number, self = true):Matrix4 {

    const r = this.getOrigin(self)
    r[0] = sx * this[0 * 4 + 0]
    r[1] = sx * this[0 * 4 + 1]
    r[2] = sx * this[0 * 4 + 2]
    r[3] = sx * this[0 * 4 + 3]
    r[4] = sy * this[1 * 4 + 0]
    r[5] = sy * this[1 * 4 + 1]
    r[6] = sy * this[1 * 4 + 2]
    r[7] = sy * this[1 * 4 + 3]
    r[8] = sz * this[2 * 4 + 0]
    r[9] = sz * this[2 * 4 + 1]
    r[10] = sz * this[2 * 4 + 2]
    r[11] = sz * this[2 * 4 + 3]

    if (!self) {
      r[12] = this[12]
      r[13] = this[13]
      r[14] = this[14]
      r[15] = this[15]
    }

    return r
  }
}
