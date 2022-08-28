
// FILE DEPRECIATED



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
let maxHeight = innerHeight //* 3
let maxWidth = innerWidth //* 3

// let maxHeight = 750
// let maxWidth = 750
// view sizes
let viewHeight = innerHeight
let viewWidth = innerWidth

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
    let dy = event.clientY - pos.mouseYs
    view.scrollLeft -= (dx / 25)
    view.scrollTop -= (dy / 25)
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
// addElem()


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
    // console.log(-Math.abs(int))
    return -Math.abs(int)
  } else {
    // console.log(Math.abs(int))
    return Math.abs(int)
  }
}
function stripPx(str) {
  // TODO: add some sort of error checking for this.
  return Number(str.slice(0, -2))
}


// TODO: figure out why this doens't work with multiple things in animatin list.

class AnimationController {
  constructor(containerId, animationList) {
    // At this point animation list could be litterally any list it requires no extra data.
    this.container = document.getElementById(containerId)
    this.childElements = this._createAnimationElements(animationList) // creates all the children to be animated.
    console.log(this.childElements)
  }
  _createAnimationElements(a) {
    // NOTE: I don't know if this should keep a list of elements, or if it should just queery them
    //       for the animation. I think it still just needs one queery. 
    //       If other things get added it might try and animate them as well
    console.log("_createAnimationElements() ")
    console.log("a: " + a)
    let childs = []
    // NOTE: these include all padding and everything, while it doesn't matter now
    //       it might in the future.
    let maxHeight = this.container.offsetHeight // For the child class
    let maxWidth = this.container.offsetWidth
    let container = this.container
    function createAnimationElement(id) {
      // TODO: add images and onclicks to be assigned here
      // let randomPos = getRandomPosition(maxHeight, maxWidth)
      let newElement = document.createElement("div")
      newElement.setAttribute("class", "animate")
      newElement.setAttribute("id", id)
      // NOTE: This will probably need to be queeried in the child Class Or changed to be set there.
      // newElement.setAttribute("style", `top: ${randomPos.top}px; left: ${randomPos.left}px;`)
      newElement.appendChild(document.createTextNode("Here I am :)"))
      container.appendChild(newElement)
      let animationElement = new AnimationEntity(null, null, maxHeight, maxWidth, newElement)
      console.log("element created!")
      return animationElement
    }

    for (let i=0; i < a.length; i++) {
      console.log("into the for loop!")
      let id = "a" + i
      let element = createAnimationElement(id)
      childs.push(element) 
      console.log("element pushed!")
    }
    console.log("childs: " + childs)
    return childs
  }

  animate() {
    console.log("Animation() called")
    // TODO: figure out a better way so it doesn't just go to the 4 corners.
    // TODO: Make the it not so the animated object(s) can't leave the container.

    // TODO: Move the pos attribute so it is unique to each element. currently they all just fly off the screen.
    let id = null
    let childElements = this.childElements
    clearInterval(id)
    id = setInterval(animate, 5)
    function animate() {
      // TODO: MAKE THIS NOT FEEL LAGGY!!! async functions might actaully work. I think it doesn't complete the loop fast enough. 
      // TODO: all of this needs to change to target the child class

      childElements.forEach(ele => {
        // console.log(ele)
        if (ele.loopCount === ele.movementData.maxDist) {
          // RESET THE ANIMATION SO IT CHANGES DIRECTION  
          console.log("MAX DISTANCE!!!")
          ele.resetLoop()

        } else {
          ele.animationStep()
        }
      })
    }
  }

}

class AnimationEntity {
  // NOTES: How does this class know about its html parent
  //        does it just get fed it's created html element?
  //        it could get its parent and get its height and width for its location
  constructor(img, onClick, parentHeight, parentWidth, element) {
    this.element = element
    this.img = img
    this.onClick = onClick
    this._parentHeight = parentHeight
    this._parentWidth = parentWidth
    
    this.movementData = this._randomMove() // TODO: switch this so it's not an object and just assigns 3 attributes to the class
    this.loopCount = 0
    // randomly assign position.

    this.element.style.top = this._getRandomInt(this._parentHeight) + "px"
    this.element.style.left = this._getRandomInt(this._parentWidth) + "px"
    // This has to come after the assignment or it braeks
    this.startTop = this._stripPx(this.element.style.top)
    this.startLeft = this._stripPx(this.element.style.left)
    console.log("parentHeight: " + this._parentHeight)
    console.log("rTop: " + this._getRandomInt(this._parentHeight) + "px")
    console.log("rLeft: " + this._getRandomInt(this._parentWidth) + "px")
    console.log("parentWidth: " + this._parentWidth)
  }

  resetLoop() {
    this.startTop = this._stripPx(this.element.style.top)
    this.startLeft = this._stripPx(this.element.style.left)
    this.loopCount = 0
    this.movementData = this._randomMove()
  }

  animationStep() {
    this.loopCount++
    let topMove = this.startTop + this._makePosOrNeg(this.loopCount, this.movementData.yDir)
    let leftMove = this.startLeft + this._makePosOrNeg(this.loopCount, this.movementData.xDir)
    this.element.style.top = topMove + "px"
    this.element.style.left = leftMove + "px"
  }


  _randomMove() {
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

  _makePosOrNeg(int, dir) {
    // Takes  a number and either a + or - string
    if (dir === "-") {
      // console.log(-Math.abs(int))
      return -Math.abs(int)
    } else {
      // console.log(Math.abs(int))
      return Math.abs(int)
    }
  }
  _stripPx(str) {
    // TODO: add some sort of error checking for this.
    return Number(str.slice(0, -2))
  }

  _getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  _getRandomPosition(maxHeight, maxWidth) {
    // TODO: make this just queery container dimensions?
    // NOTE: if resized how to handle updating all of the positions
    //       (?) should i even worry about resizing.
    let loc = {
      top: getRandomInt(maxHeight),
      left: getRandomInt(maxWidth)
    }
    return loc
  }

}

let aData = [1,2]

let AnimationHandler = new AnimationController("container", aData)

