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
  
  let aData = [1,2]
  
  let AnimationHandler = new AnimationController("container", aData)