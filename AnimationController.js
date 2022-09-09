const imgLocations = [
  "assets/lichens/1 CF012159c28x20bitmap100_RGB.png",
  "assets/lichens/2 CF012203c28x20bitmap100_RGB.png",
  "assets/lichens/3 CF012137c28x20bitmap100_RGB.png",
  "assets/lichens/4 CF012173c28x20bitmap100_RGB.png",
  "assets/lichens/5 CF012123c28x20bitmap100_RGB.png",
  "assets/lichens/6 CF012167c28x20bitmap100_RGB.png",
  "assets/lichens/7 CF012178c28x20bitmap100_RGB.png",
  "assets/lichens/8 CF012126c28x20bitmap100_RGB.png",
  "assets/lichens/9 CF012155c28x20bitmap100_RGB.png",
  "assets/lichens/10 CF012208c28x20bitmap100_RGB.png",
  "assets/lichens/11 CF012186c28x20bitmap100_RGB.png",
  "assets/lichens/12 CF012130c28x20bitmap100_RGB.png",
  "assets/lichens/CF012123c28x20bitmap100_RGB_no background.png"
]
// TODO: Add some identifier that indicates which elements have been clicked / can be clicked
// TODO: Make the clicked img show a larger version of the image in the modal
// TODO: add some lorem ipsum text to the modals

// NOTE: Whent he animate button is pressed multiple times it speeds up the animation.

function initialAnimation() {
  // Makes mesh logo fade out and animatedImages fade in.
  console.log("initialAnimation()")
  const container = document.getElementById("container")
  container.style.opacity = "0"
  const meshLogo = document.getElementById("mesh-logo")
  meshLogo.style.display = "block"
  meshLogo.style.opacity = "1"

  // Wait 1 second before starting the fade.
  let initialWait = false
  function wait() {
    initialWait = true
    console.log("done waiting")
  }
  let x = setInterval(wait, 1000)
  clearInterval(x)
  let fadeCount = 0
  // let transitionDone = false
  let transitionId = setInterval(fadeTransition, 20)
  function fadeTransition() {
    console.log("fadeTransition() started")
    if (fadeCount < 100) { 
      console.log("fade count: " + fadeCount)
      console.log(container.style.opacity)
      // meshLogo.style.opacity = "0.5"
      let currentMeshOpacity = parseFloat(meshLogo.style.opacity) - 0.01
      let currentContainerOpacity = parseFloat(container.style.opacity) + 0.01
      meshLogo.style.opacity = currentMeshOpacity.toString()
      container.style.opacity = currentContainerOpacity.toString()
      fadeCount += 1
    } else {
      meshLogo.style.display = "none"
      console.log("containerOpacity: " + container.style.opacity)
      console.log("transition done")
      
      clearInterval(transitionId)

    }
  }
  

  // if (initialWait) {
  //   console.log("initialWait loop")
  //   // clearInterval(x)
  //   if (transitionDone) {
  //     clearInterval(transitionId)
  //   }
  // }

}



class AnimationController {
  constructor(containerId, animationList) {
    // At this point animation list could be litterally any list it requires no extra data.
    this.container = document.getElementById(containerId)
    this.childElements = this._createAnimationElements(animationList) // creates all the children to be animated.
    // console.log(this.childElements)
  }
  _createAnimationElements(data) {
    // NOTE: I don't know if this should keep a list of elements, or if it should just queery them
    //       for the animation. I think it still just needs one queery. 
    //       If other things get added it might try and animate them as well
    // console.log("_createAnimationElements() ")
    // console.log("a: " + data)
    let childs = []
    // NOTE: these include all padding and everything, while it doesn't matter now
    //       it might in the future.
    let maxHeight = this.container.offsetHeight // For the child class
    let maxWidth = this.container.offsetWidth
    let container = this.container
    function createAnimationElement(elementData, id) {
      // TODO: add images and onclicks to be assigned here
      // let randomPos = getRandomPosition(maxHeight, maxWidth)
      // CONTAINER
      let newElement = document.createElement("div")
      newElement.setAttribute("class", "animate")
      // IMAGE
      let imgTag = document.createElement("img")
      imgTag.setAttribute("src", elementData) // TODO: make this a propper object not just info from an array.
      imgTag.setAttribute("class", "image")
      imgTag.setAttribute("id", id)
      imgTag.onclick = function () { // display modal on click
        let modal = document.getElementById(modalId)
        modal.style.display = "block"
      }
      // Modal
      let modal = document.createElement("div")
      let modalId = "m" + id
      modal.setAttribute("class", "modal")
      modal.setAttribute("id", modalId)

      let modalContent = document.createElement("div")
      modalContent.setAttribute("class", "modal-content")

      // Modal Close
      let modalClose = document.createElement("span")
      modalClose.setAttribute("class", "close")
      modalClose.appendChild(document.createTextNode('\u2718'))
      modalClose.onclick = function () {
        // TODO: make this freeze the background animation?
        // console.log("modalClose activated")
        let modal = document.getElementById(modalId)
        modal.style.display = "none"

      }
      modalContent.appendChild(modalClose)

      // Modal Image
      let modalImg = document.createElement("img")
      modalImg.setAttribute("src", elementData)
      modalImg.setAttribute("class", "modal-img")
      modalContent.appendChild(modalImg)

      // Modal Text
      let modalText = document.createElement("p")
      // TODO: make it get this info from elementData
      modalText.appendChild(document.createTextNode("Yada yada"))
      modalContent.appendChild(modalText)




      modal.appendChild(modalContent)
      newElement.appendChild(imgTag)
      container.appendChild(newElement)
      container.appendChild(modal)
      let animationElement = new AnimationEntity(null, null, maxHeight, maxWidth, newElement)
      // console.log("element created!")
      return animationElement
    }

    // Create elements 
    for (let i = 0; i < data.length; i++) {
      // console.log("into the for loop!")
      let id = "a" + i
      let element = createAnimationElement(data[i], id)
      childs.push(element)
      // console.log("element pushed!")
    }
    // console.log("childs: " + childs)
    return childs
  }

  animate() {
    console.log("Animation() called")
    // NOTE: doing a separate animate function for each element might help with the render.
    // TODO: figure out a better way so it doesn't just go to the 4 corners.
    // TODO: Make the it not so the animated object(s) can't leave the container.
    // TODO: Move the pos attribute so it is unique to each element. currently they all just fly off the screen.
    let id = null
    let childElements = this.childElements
    clearInterval(id)
    // NOTE: 16 is 60fps and 32 is 30fps. It is currently pretty laggy with so many elements
    //       and runs better at 32
    id = setInterval(animate, 16)
    function animate() {
      // TODO: MAKE THIS NOT FEEL LAGGY!!! async functions might actaully work. I think it doesn't complete the loop fast enough. 
      // TODO: all of this needs to change to target the child class

      childElements.forEach(ele => {
        // console.log(ele)
        if (ele.loopCount === ele.movementData.maxDist) {
          // RESET THE ANIMATION SO IT CHANGES DIRECTION  
          // console.log("MAX DISTANCE!!!")
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
    //   console.log("parentHeight: " + this._parentHeight)
    //   console.log("rTop: " + this._getRandomInt(this._parentHeight) + "px")
    //   console.log("rLeft: " + this._getRandomInt(this._parentWidth) + "px")
    //   console.log("parentWidth: " + this._parentWidth)
  }

  resetLoop() {
    this.startTop = this._stripPx(this.element.style.top)
    this.startLeft = this._stripPx(this.element.style.left)
    this.loopCount = 0
    this.movementData = this._randomMove()
  }

  animationStep() {
    this.loopCount++
    // TODO: Make it not call this function every time.
    let topMove = this.startTop + this._makePosOrNeg(this.loopCount, this.movementData.yDir)
    let leftMove = this.startLeft + this._makePosOrNeg(this.loopCount, this.movementData.xDir)
    this.element.style.top = topMove + "px"
    this.element.style.left = leftMove + "px"
  }


  _randomMove() {
    // Max distance it can move in one direction before a reroll.
    let randomInt = this._getRandomInt // TODO: fix shit hacky nonsense
    function posOrNeg() {
      if (randomInt(2) === 0) {
        return "-"
      } else {
        return "+"
      }
    }
    let maxDistance = this._getRandomInt(50)
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

let aData = [1, 2]
initialAnimation()
let AnimationHandler = new AnimationController("container", imgLocations)
AnimationHandler.animate()