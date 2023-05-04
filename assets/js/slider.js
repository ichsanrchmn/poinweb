// currentSlideID = 1;

// sliderElement = document.getElementById('slider');
// totalSlides = sliderElement.childElementCount;

// function next() {
// 	if (currentSlideID < totalSlides)
// 	currentSlideID++;
// 	showSlide()
// }

// function prev() {
// 	if (currentSlideID > 1)
// 	currentSlideID--;
// 	showSlide()
// }

// function showSlide() {
//   slides = document.getElementById('slider').getElementsByTagName('li')
//   for (let i = 0; i < totalSlides; i++) {
//     const element = slides[i];
//     if (currentSlideID===i+1) {
//       element.classList.remove('hidden');
// 			element.classList.add('ease-in-out');
//     } else {
//       element.classList.add('hidden');
//     }
//   }
// }

let counter = 1;
setInterval(function () {
  document.getElementById("nav" + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 4000);
