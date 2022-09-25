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
let viewHeight = innerHeight 
let viewWidth = body.clientWidth 
// scrollArea size
let maxHeight = viewHeight  * 3
let maxWidth = viewWidth   * 2

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

//TODO: fix this hacky way to set aricle height.
let articles = document.getElementsByClassName("article")
for (i = 0; i < articles.length; i++){
  articles[i].setAttribute("style", `height: ${viewHeight}px;`)
}

// get scroll area
// let ele = document.getElementById('container')
// TODO: make it so this isn't just "passed off"


class Letter {
  constructor(letter) {
    this.letter = letter
    this._currentOpacity = 0
    this.done = false
  }
  get currentOpacity() {
    return this._currentOpacity.toFixed(2)
  }

  increaseOpacity() {
    console.log("increaseOpacity triggered")
    if(this.currentOpacity < 1){
      // NOTE: Opacity increase amount
      this._currentOpacity += 0.1
      this.letter.style.opacity = this.currentOpacity.toString()
    } else {
      this.done = true
    }
  }
}


class BackgroundTextAnimationController {
  // TODO: Center the text in the middle of the view
  constructor(textContainerId, textElementId) {
    this.textContainerId = textContainerId
    this.textElementId = textElementId
    this.letters = this.separateText()

  }
  separateText() {
    // Letter Factory
    // This function separates the background text into their own elements so they can idividually be altered
    let bgTextP = document.getElementById(this.textElementId)
    let bgText = bgTextP.innerHTML
    let bgTextContainer = document.getElementById(this.textContainerId)
    let letters = []
    for (let i = 0; i < bgText.length; i++) {
      // console.log("in the loop")
      let l = document.createElement("span")
      l.setAttribute("class", "letter")
      l.innerText = bgText[i]
      l.style.opacity = "0"
      let letter = new Letter(l)
      bgTextContainer.appendChild(l)
      letters.push(letter)
    }
    bgTextP.remove()
    // return bgTextContainer
    return letters
  }


  selectLetter() {
    const count = this.letters.length
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    return getRandomInt(count)
  }

  increaseRandomLetterOpacity(){
    let letterPos = this.selectLetter()
    let selectedLetter = this.letters[letterPos]
    selectedLetter.increaseOpacity()
    if(selectedLetter.done){
      // remove the letter from the array
      // NOTE: it does not get removed untill it's selected again at max
      this.letter.splice(letterPos, 1)
    }
  }
}

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

const BgTextController = new BackgroundTextAnimationController("text-container", "bg-text")

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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

const scrollHandler = function () {
  // lastKnownScrollPosition = window.scrollY;
  setTimeout(BgTextController.increaseRandomLetterOpacity(), 10)
}

view.addEventListener("scroll", scrollHandler)

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

view.addEventListener("mouseout", () => {
  mouseDown = false
})
ele.addEventListener("mousedown", mouseDownHandler)
ele.addEventListener("mouseup", mouseUpHandler)
ele.addEventListener("mousemove", mouseMoveHandler)



