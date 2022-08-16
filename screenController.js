
// CLICK TO DRAG 
// TODO: make it so you don't highlight random things when scrolling

// SCREEN SIZING
// TODO: make this resize when the window gets re sized

// NOTE: the "view" other than just a starting location. Which means it doesn't need to have
//       any sort of element associated with, just choordiantes. 
// console.log(innerHeight)
// console.log(innerWidth)

// scrollArea size
// let maxHeight = innerHeight * 3
// let maxWidth = innerWidth * 3 

let maxHeight = 5000
let maxWidth = 5000
// view sizes
let viewHeight = innerHeight
let viewWidth = innerWidth

// Set sizes
// let scrollArea = document.querySelector('#container')
// // let view = document.querySelector('#view')

// scrollArea.setAttribute("style", `height: ${maxHeight}px; width:${maxWidth}px`)
// view.setAttribute("style", `height: ${viewHeight}px; width: ${viewWidth}px`)

// scroll to the middle
// window.scrollTo(viewWidth, viewHeight);

// NOTE:
//  - The scrollX and scrollY of the element default to 0/0 (top left)
//  - When the view gets set to the middle, I think it needs to be done with these instead of the window


// get scroll area
let ele = document.getElementById('container')

ele.scrollTo(50, 50)

// scroll to middle
// ele.scrollTo(viewWidth, viewHeight)
// set default attributes
let mouseDown = false
let pos = {
  mouseX: 0,
  mouseY: 0,
  x: 0,
  y: 0,
  top: 0,
  y: 0,
}
const mouseDownHandler = function (event) {
  
  mouseDown = true
  pos.mouseX = event.clientX
  pos.mouseY = event.clientY
  console.log("mouseDownHandler pos: ")
  // console.log(pos)
  console.log(ele)
  // window.scrollTo(500,500)
    console.log(ele.scrollTop)
    console.log(ele.scrollLeft)
    // ele.scrollTo(500,500)
    // ele.scrollTop += 50
    // ele.scrollLeft += 50
    
}

const mouseUpHandler = function (event) {
  mouseDown = false
  pos.x = event.clientX
  pos.y = event.clientY
}

const mouseMoveHandler = function (event) {
  if(mouseDown){
    let dx = event.clientX - pos.mouseX
    let dy = event.clientY - pos.mouseY
    // let xMove = ele.scrollLeft - event.clientX
    // let yMove = ele.scrollTop - event.clientY
    // console.log(ele.scrollTop)
    // console.log(ele.scrollLeft)
    ele.scrollLeft -= dx
    ele.scrollTop -= dy
  }
  
}

ele.addEventListener("mousedown", mouseDownHandler)
ele.addEventListener("mouseup", mouseUpHandler)
ele.addEventListener("mousemove", mouseMoveHandler)