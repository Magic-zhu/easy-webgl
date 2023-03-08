Easy WebGl

The goal is to make the api as same as canvas2d

```js
const { EwContext } = EW
const ctx = new EwContext('#app')
ctx.beginPath()
ctx.moveTo(0, 0)
ctx.lineTo(250, 250)
ctx.lineTo(500, 0)
ctx.lineTo(500, 500)
ctx.closePath()
ctx.stroke()
```

![](https://files.catbox.moe/kxhip8.png)

```js
const { EwContext } = EW
const ctx = new EwContext('#app')
ctx.drawImage(
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661345653&t=2c0219ed26f1b1dce883ded249305123',
  0,
  0,
  500,
  500
)
ctx.drawImage(
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661345653&t=2c0219ed26f1b1dce883ded249305123',
  0,
  0,
  200,
  200
)
```

![](https://files.catbox.moe/2h7g8m.png)

TODO: list

[ ] - fillRect(x, y, width, height)
[ ] - strokeRect(x, y, width, height)
[ ] - clearRect(x, y, width, height)
[ ] - bezierCurveTo()
[ ] - quadraticCurveTo()
[ ] - rect()
[ ] - ellipse()
[ ] - arcTo()
[ ] - arc()

[ ] - fillStyle
[ ] - strokeStyle
