
// CLICK TO DRAG 
// TODO: make it so you don't highlight random things when scrolling

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

// scrollArea size
// let maxHeight = innerHeight // * 3
// let maxWidth = innerWidth  // * 3 

let maxHeight = 750
let maxWidth = 750
// view sizes
let viewHeight = innerHeight
let viewWidth = innerWidth

// Set sizes
let scrollArea = document.querySelector('#container')
// // let view = document.querySelector('#view')

scrollArea.setAttribute("style", `height: ${maxHeight}px; width:${maxWidth}px`)
// view.setAttribute("style", `height: ${viewHeight}px; width: ${viewWidth}px`)

// scroll to the middle
// window.scrollTo(viewWidth, viewHeight);

// NOTE:
//  - The scrollX and scrollY of the element default to 0/0 (top left)
//  - When the view gets set to the middle, I think it needs to be done with these instead of the window


// get scroll area
// let ele = document.getElementById('container')
// TODO: make it so this isn't just "passed off"
let ele = scrollArea

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

// TODO: make the scrolling less sensitive.
const mouseMoveHandler = function (event) {
  if (mouseDown) {
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


// ANIMATIONS

// max size of the animation area.
let maxTop;
let maxLeft;


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomPosition(maxHeight, maxWidth) {
  // TODO: make this just queery container dimensions?
  // NOTE: if resized how to handle updating all of the positions
  //       (?) should i even worry about resizing.
  let loc = {
    top: getRandomInt(maxHeight),
    left: getRandomInt(maxWidth)
  }
  return loc
}

function makeElems() {
  // NOTE: the location information and stuff probably needs to be passed around as an object for all the animation parts
  let loc = getRandomPosition(maxHeight, maxWidth)
  let newElement = document.createElement("div")
  newElement.setAttribute("id", "animate")
  newElement.setAttribute("style", `top: ${loc.top}px; left: ${loc.left}px;`)
  newElement.appendChild(document.createTextNode("animate me :)"))
  return newElement
}

function addElem() {
  const aContainer = document.getElementById("container")
  aContainer.appendChild(makeElems())
  // console.log(aContainer)
}
// TODO: move this so it's not just called randomly in the javascript.
addElem()

function randomMove() {
  // Max distance it can move in one direction before a reroll.
  function posOrNeg() {
    if (getRandomInt(2) === 0) {
      return "-"
    } else {
      return "+"
    }
  }
  let maxDistance = getRandomInt(50)
  // if 0 negative if 1 positive.
  let xDirectoion = posOrNeg()
  let yDirection = posOrNeg()

  return {
    maxDist: maxDistance,
    xDir: xDirectoion,
    yDir: yDirection
  }
}

function makePosOrNeg(int, dir) {
  // Takes  a number and either a + or - string
  if (dir === "-") {
    return -Math.abs(int)
  } else {
    return Math.abs(int)
  }
}
function stripPx(str) {
  // TODO: add some sort of error checking for this.
  return Number(str.slice(0, -2))
}
function randomMoveAnimation() {
  // TODO: figure out a better way so it doesn't just go to the 4 corners.
  // TODO: Make the it not so the animated object(s) can't leave the container.
  let id = null
  const elem = document.getElementById("animate")
  let startTop = stripPx(elem.style.top)
  let startLeft = stripPx(elem.style.left)
  let pos = 0
  let move = randomMove()
  clearInterval(id)
  id = setInterval(animate, 5)
  function animate() {
    if (pos === move.maxDist) {
      // RESET THE ANIMATION SO IT CHANGES DIRECTION
      // clearInterval(id)
      pos = 0
      startTop = startTop = stripPx(elem.style.top)
      startLeft = stripPx(elem.style.left)
      move = randomMove()
    } else {
      console.log("else")
      pos++
      let topMove = startTop + makePosOrNeg(pos, move.yDir)
      let leftMove = startLeft + makePosOrNeg(pos, move.xDir)
      elem.style.top = topMove + "px"
      elem.style.left = leftMove + "px"
      console.log("top: " + topMove)
      console.log("left: " + leftMove)
      console.log(pos)

    }

  }

}
// TODO: figure out how to make stuff not just go in a straight line
function myMove() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
} 