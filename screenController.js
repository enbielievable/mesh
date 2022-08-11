const slider = document.querySelector('.parent');
// let slider = document.querySelector(".parent").b
console.log(slider)

let mouseDown = false;
let startX, scrollLeft;
let startY, scrollTop;

let startDragging = function (e) {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  startY = e.pageY - slider.offsetTop
  scrollTop = slider.scrollTop
};
let stopDragging = function (event) {
  mouseDown = false;
};

slider.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if(!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
  const y = e.pageY - slider.offsetTop;
  const yScroll = startY + y
  slider.scrollTop = scrollTOp = yScroll

});

// Add the event listeners
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);