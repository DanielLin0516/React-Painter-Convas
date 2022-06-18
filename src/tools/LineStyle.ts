export const drawLine = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: any,
  size: any,
  colorline: any
) => {
  ctx.beginPath()
  //设置颜色
  ctx.strokeStyle = color.color
  ctx.lineWidth = size.width
  ctx.lineCap = 'round'
  if (colorline.idDash) ctx.setLineDash([1, 15])
  else ctx.setLineDash([])
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  // ctx.fillRect(x1,y1,x2 - x1,y2 - y1)
  ctx.fillStyle = 'green'
  ctx.stroke()
}

export const drawSquare = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: any,
  size: any,
  colorline: any,
  dom: HTMLCanvasElement,
  imageData: ImageData | null
) => {
  ctx.strokeStyle = color.color
  ctx.lineWidth = size.width
  ctx.lineCap = 'round'
  ctx.fillStyle = color.color
  if (colorline.idDash) ctx.setLineDash([1, 15])
  else ctx.setLineDash([])
  // ctx.clearRect(0,0,dom.offsetWidth,dom.offsetWidth)
  if (imageData !== null) {
    // console.log(imageData)
    ctx.putImageData(imageData, 0, 0, 0, 0, dom.offsetWidth, dom.offsetHeight)
  }
  // ctx.moveTo(x1, y1);
  // ctx.lineTo(x2, y1);
  // ctx.lineTo(x1,y2)
  // ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
  ctx.beginPath()
  ctx.rect(x1, y1, x2 - x1, y2 - y1)
  ctx.stroke()
  //阴影
  // ctx.shadowBlur = 15;
  // ctx.shadowColor = "black"
  // ctx.shadowOffsetX = 25;
  // console.log(dom.imgData)
  ctx.closePath

  // ctx.clearRect(x1, y1, x2 - x1, y2 - y1);
}
export const eraseLine = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  size: any
) => {
  ctx.beginPath()
  //设置颜色
  ctx.lineWidth = size.width
  ctx.lineCap = 'round'
  ctx.globalCompositeOperation = 'destination-out'
  ctx.setLineDash([])
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  // ctx.arc(x2, y2, size.width, 0, Math.PI * 2, false)
  ctx.stroke()
  // ctx.fill()
}
