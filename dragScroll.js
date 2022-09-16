// CLICK TO DRAG 
// TODO: Make it so when the mouse leaves the window while depressed it doesn't maintain the click
// TODO: Make it so when you drag on an image it doesn't read depressing the mose
//       For the image problem, making it so they are just div's with a background image might fix it.
// SCREEN SIZING
// TODO: make this resize when the window gets re sized

// NOTE: the "view" other than just a starting location. Which means it doesn't need to have
//       any sort of element associated with, just choordiantes. 
// console.log(innerHeight)
// console.log(innerWidth)

// NOTE: container has to be smaller than view or the scrolling won't work.
//       i'm going to need to flip that in the code. so view is smaller than container
//       the animations still need to target the container so they can be searched for.
//       
let body = document.getElementById("body")
let viewHeight = innerHeight - 25
let viewWidth = body.clientWidth - 25
// scrollArea size
let maxHeight = (viewHeight * 3)
let maxWidth = (viewHeight  * 3)

// let maxHeight = 750
// let maxWidth = 750
// view sizes

console.log("height: ")
console.log(viewHeight + "/" + window.innerHeight)
console.log("width: ")
console.log(viewWidth + "/" + window.innerWidth)
// console.log("self.innerHeight: " + self.innerHeight)
// console.log(parent.innerHeight);
// console.log(top.innerHeight);


// Set sizes
let scrollArea = document.querySelector('#container')
let view = document.querySelector('#view')

scrollArea.setAttribute("style", `height: ${maxHeight}px; width:${maxWidth}px`)
view.setAttribute("style", `height: ${viewHeight}px; width: ${viewWidth}px`)

// center the screen in the container.
view.scrollLeft = viewWidth
view.scrollTop = viewHeight
// scroll to the middle
// window.scrollTo(viewWidth, viewHeight);

// NOTE:
//  - The scrollX and scrollY of the element default to 0/0 (top left)
//  - When the view gets set to the middle, I think it needs to be done with these instead of the window


// get scroll area
// let ele = document.getElementById('container')
// TODO: make it so this isn't just "passed off"


let ele = scrollArea
// NOTE: all of the on click things are applied to the view. but the element that gets scrolled is still container.
// let ele = document.getElementById('view')

// ele.scrollTo(50, 50)

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

}

const mouseUpHandler = function (event) {
  mouseDown = false
  pos.x = event.clientX
  pos.y = event.clientY
}

const mouseMoveHandler = function (event) {
  if (mouseDown) {
    let dx = event.clientX - pos.mouseX
    let dy = event.clientY - pos.mouseY
    // view.scrollLeft -= (dx / 25)
    // view.scrollTop -= (dy / 25)
    view.scrollLeft -= dx * 0.05
    view.scrollTop -= dy * 0.05
  }

}

ele.addEventListener("mousedown", mouseDownHandler)
ele.addEventListener("mouseup", mouseUpHandler)
ele.addEventListener("mousemove", mouseMoveHandler)