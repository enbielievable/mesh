const imgData = [
  {
    imgSrc: "assets/lichens/1 CF012159c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012159_no background.png",
    title: "Cladonia fimbriata, Black Mountains, South Wales, 011111100110111101000010"
  },
  {
    imgSrc: "assets/lichens/2 CF012203c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012203_no background.png",
    title: "Ramalina fastigiata, Pentyrch Woodland, South Wales, 011110100111010101011110"
  },
  {
    imgSrc: "assets/lichens/3 CF012137c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012137_no background.png",
    title: "Flavoparmelia caperata, Wenallt Forest, South Wales, 011110110111110001100111"
  },
  {
    imgSrc: "assets/lichens/4 CF012173c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012173_no background.png",
    title: "Xanthoria parietina, Gower, South Wales, 110011101001010000000000"
  },
  {
    imgSrc: "assets/lichens/5 CF012123c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012123_no background.png",
    title: "Hypogymnia physodes, Balck Mountains, South Wales, 010100110101011101000001"
  },
  {
    imgSrc: "assets/lichens/6 CF012167c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012167_no background.png",
    title: "Squamarina cartilaginea, Gower, South Wales, 100110001000101001101011"
  },
  {
    imgSrc: "assets/lichens/7 CF012178c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012178_no background.png",
    title: "Parmotrema perlatum, Bute Park, South Wales, 100001101000100101101111"
  },
  {
    imgSrc: "assets/lichens/8 CF012126c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012126_no background.png",
    title: "Peltigera membranacea, Black Mountains, South Wales, 110011011011000110100110"
  },
  {
    imgSrc: "assets/lichens/9 CF012155c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012155_no background.png",
    title: "Cladonia portentosa, Western Valleys, South Wales, 110000011011011010011010"
  },
  {
    imgSrc: "assets/lichens/10 CF012208c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012208_no background.png",
    title: "Evernia prunastri, Wenallt Forest, South Wales, 101000001001111010000011"
  },
  {
    imgSrc: "assets/lichens/11 CF012186c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012186_no background.png",
    title: "Ramalina farinacea, Black Mountains, South Wales, 100000010111111101101011"
  },
  {
    imgSrc: "assets/lichens/12 CF012130c28x20bitmap100_RGB.png",
    imgNoBg: "assets/noBg/CF012130_no background.png",
    title: "Usnea articulata, Wenallt Forest, South Wales, 010110110101110001001010"
  },
]


// TODO: Add some identifier that indicates which elements have been clicked / can be clicked
// TODO: figure out why when it's not max sized, the mesh logo's display is scewed in a different way.

// NOTE: Whent he animate button is pressed multiple times it speeds up the animation.

function initialAnimation() {
  // Makes mesh logo fade out and animatedImages fade in.
  // console.log("initialAnimation()")
  const container = document.getElementById("container")
  container.style.opacity = "0"
  const meshLogo = document.getElementById("mesh-logo")
  meshLogo.style.display = "block"
  meshLogo.style.opacity = "1"

  // Wait 1 second before starting the fade.
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
    // console.log("fadeTransition() started")
    if (fadeCount < 100) {
      // console.log("fade count: " + fadeCount)
      // console.log(container.style.opacity)
      // meshLogo.style.opacity = "0.5"
      let currentMeshOpacity = parseFloat(meshLogo.style.opacity) - 0.01
      let currentContainerOpacity = parseFloat(container.style.opacity) + 0.01
      meshLogo.style.opacity = currentMeshOpacity.toString()
      container.style.opacity = currentContainerOpacity.toString()
      fadeCount += 1
    } else {
      meshLogo.style.display = "none"
      // meshLogo.style.opacity = "1"
      // container.style.opacity = "0"
      // console.log("containerOpacity: " + container.style.opacity)
      // console.log("transition done")

      clearInterval(transitionId)

    }
  }
}



function AnimationElementsFactory(data, container) {
  // NOTE: I don't know if this should keep a list of elements, or if it should just queery them
  //       for the animation. I think it still just needs one queery. 
  //       If other things get added it might try and animate them as well

  // Create a AnimationEntity of the boarderless lichen image
  // create associated Modal

  // data.title // Tittle of the image
  // data.imgSrc // Image source with backgroung
  // data.imgNoBg // Image wihtout background for animation entity

  let childs = []
  // NOTE: these include all padding and everything, while it doesn't matter now
  //       it might in the future.
  let maxHeight = container.offsetHeight // For the child class
  let maxWidth = container.offsetWidth
  console.log(maxHeight)
  console.log(maxWidth)


  function createModalContent(imgSrc, modalId, title) {
    let modal = document.createElement("div")
    modal.setAttribute("class", "modal")
    modal.setAttribute("id", modalId)


    let modalContent = document.createElement("div")
    modalContent.setAttribute("class", "modal-content")
    // close button
    let modalClose = document.createElement("span")
    modalClose.setAttribute("class", "close")
    modalClose.appendChild(document.createTextNode('\u2718'))
    modalClose.onclick = function () {
      // TODO: make this freeze the background animation?
      // console.log("modalClose activated")
      let modal = document.getElementById(modalId)
      modal.style.display = "none"

    }
    // Add close button to modal
    modalContent.appendChild(modalClose)
    
    // Modal Image
    let modalImg = document.createElement("img")
    modalImg.setAttribute("src", imgSrc)
    modalImg.setAttribute("class", "modal-img")
    modalContent.appendChild(modalImg)
    
    // Image title
    let modalText = document.createElement("p")
    modalText.setAttribute("class", "modal-text")
    modalText.innerHTML = title
    modalContent.appendChild(modalText)

    modal.appendChild(modalContent)
    return modal
  }


  function createAnimationElement(data, id) {
    // data.imgSrc -> the src to the image with a background
    // data.imgNoBg -> src of image with no background
    // data.title -> tittle of the image

    // TODO: add images and onclicks to be assigned here
    // let randomPos = getRandomPosition(maxHeight, maxWidth)
    // CONTAINER
    let animationDiv = document.createElement("div")
    animationDiv.setAttribute("class", "animate")


    // IMAGE
    let imgTag = document.createElement("img")
    imgTag.setAttribute("src", data.imgNoBg) // TODO: make this a propper object not just info from an array.
    imgTag.setAttribute("class", "image")
    imgTag.setAttribute("id", id)
    imgTag.onclick = function () { // display modal on click
      let modal = document.getElementById(modalId)
      modal.style.display = "block"
    }
    let modalId = "m" + id
    let modal = createModalContent(data.imgSrc, modalId, data.title)
    // console.log("modal: ")
    // console.log(modal)
    // console.log("***")



    // modal.appendChild(modalContent)
    animationDiv.appendChild(imgTag)
    container.appendChild(animationDiv)
    container.appendChild(modal)
    // TODO: figure out maxHeight, maxWidth, stuff
    let animationElement = new AnimationEntity(maxHeight, maxWidth, animationDiv)
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


class AnimationController {
  constructor(container, animationEntities) {
    // At this point animation list could be litterally any list it requires no extra data.
    this.container = container
    this.childElements = animationEntities // creates all the children to be animated.
    // console.log(this.childElements)
  }

  animate() {
    // console.log("Animation() called")
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
  constructor(parentHeight, parentWidth, element) {
    this.element = element
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
    // console.log(topMove)
    if (topMove > this._parentHeight || topMove <= 0) {
      // console.log("ITS TO HIGH")
      this.resetLoop()
    }
    if (leftMove > this._parentWidth || leftMove <= 0) {
      // console.log("it's to over")
      this.resetLoop()
    }
    // if(topMove >= this._parentHeight || topMove <= 0 || leftmove >= this._parentWidth || leftMove <= 0){
    //   console.log("Element trying to go out of bounds!!")
    // }
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


const articleParent = document.getElementById("article-wrapper")
const articleButton = document.getElementById("article-button")
const articleContainer = document.getElementById("article-container")

// const articleClose = document.getElementById("close-articles")
// const articleButtonLeft = document.getElementById("button-left")
// const articleButtonRight = document.getElementById("button-right")
let currentArticle = 0

function openArticles() {
  articleContainer.style.display = "block"
  articleParent.style.display = "block"
  articleParent.children[currentArticle].style.display = "block"
}
function closeArticles () {
  articleContainer.style.display = "none"
  articleParent.style.display = "none"
  articleParent.children[currentArticle].style.display = "none"
}


function leftButtonOnClick() {
  // Hide current article
  console.log(`currentArticle: ${currentArticle}`)
  articleParent.children[currentArticle].style.display = "none"
  if(currentArticle === 0){
    currentArticle = articleParent.childElementCount - 1 // This should be right?
  } else {
    currentArticle -= 1
  }
  articleParent.children[currentArticle].style.display = "block"
}

function rightButtonOnClick() {
  console.log(`currentArticle: ${currentArticle}`)
  articleParent.children[currentArticle].style.display = "none"
  if(currentArticle === articleParent.childElementCount -1 ) {
    currentArticle = 0
  } else {
    currentArticle += 1
  }
  articleParent.children[currentArticle].style.display = "block"
}

// articleButtonLeft.onclick = leftButton
// articleButtonRight.onclick = rightButton
// articleClose.onclick = closeArticles
const leftButtons = document.getElementsByClassName("button-left")
const rightButtons = document.getElementsByClassName("button-right")
const articleCloseButtons = document.getElementsByClassName("close-articles")

console.log("rightButtons")
console.log(rightButtons)
console.log("leftButtons")
console.log(leftButtons)

function addOnClicks(elements, onclick){
  console.log("addOnClicks() called")
  for(let i = 0; i < elements.length; i++) {
    elements[i].onclick = onclick
    console.log("adding onclick to: ")
    console.log(elements[i])
  }
}
addOnClicks(leftButtons, leftButtonOnClick)
addOnClicks(rightButtons, rightButtonOnClick)
addOnClicks(articleCloseButtons, closeArticles)

articleButton.onclick = openArticles


function createNegativeModal() {
  let modal = document.createElement("div")
  modal.setAttribute("class", "modal")
  
  const modalId = "sm0"
  modal.setAttribute("id", modalId)

  let modalContent = document.createElement("div")
  modalContent.setAttribute("class", "modal-content")

  let modalClose = document.createElement("span")
  modalClose.setAttribute("class", "close")
  modalClose.appendChild(document.createTextNode('\u2718'))
  modalClose.onclick = function () {
    let modal = document.getElementById(modalId)
    modal.style.display = "none"
  }

  let imgWrapper = document.createElement("div")
  imgWrapper.setAttribute("class", "negative-img-wrap")
  imgWrapper.setAttribute("id", "negImgWrap")




  let modalImg = document.createElement("img")
  modalImg.setAttribute("id", "negImg")
  modalImg.setAttribute("src", "assets/negatives/DSCF0781_neg.png")
  modalImg.setAttribute("class", "negative-img")



  modalContent.appendChild(modalClose)

  imgWrapper.appendChild(modalImg)
  modalContent.appendChild(imgWrapper)
  modal.appendChild(modalContent)

  document.getElementById("view").appendChild(modal)
}

function dispalyNegativeModal () {
  const modal = document.getElementById("sm0")
  modal.style.display = "block"
}
createNegativeModal()
document.getElementById("negative-modal-button").onclick = dispalyNegativeModal

let negativeImgModal = document.getElementById("negImgWrap")
const xView = document.getElementById("view")
// negativeImgModal.style.width = xView.style.width
negativeImgModal.style.height = xView.style.height


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



// initialAnimation()
const container = document.getElementById("container")
const animationEntities = AnimationElementsFactory(imgData, container)
let AnimationHandler = new AnimationController(container, animationEntities)
AnimationHandler.animate()
