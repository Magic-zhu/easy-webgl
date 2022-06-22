Easy WebGl

The goal is to make the api as same as canvas2d

```js
  const { EwContext } = EW
  const ctx = new EwContext("#app")
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(250, 250)
  ctx.lineTo(500, 0)
  ctx.lineTo(500, 500)
  ctx.closePath()
  ctx.stroke()
```

![](https://files.catbox.moe/kxhip8.png)




