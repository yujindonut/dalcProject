const buttons = document.querySelectorAll('.button');
const rightArrow = document.querySelector('#rightarrow');
const leftArrow = document.querySelector('#leftarrow');
let pic = document.querySelector('#pic');

pic.setAttribute('src', images[0]);

for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    pic.setAttribute('src', images[i]);
  };
}

rightArrow.addEventListener('click', function () {
  for (let i = 0; i < images.length; i++) {
    console.log(i);
    if (pic.getAttribute('src') === images[i]) {
      if (i === images.length - 1) {
        pic.setAttribute('src', images[0]);
        break;
      } else {
        pic.setAttribute('src', images[i + 1]);
        document.getElementById('leftarrow').style.visibility = 'visible';
        break;
      }
    }
  }
});

leftArrow.addEventListener('click', function () {
  for (let i = 0; i < images.length; i++) {
    console.log('왼쪽' + i);
    if (pic.getAttribute('src') === images[i]) {
      if (i === 0) {
        pic.setAttribute('src', images[images.length - 1]);
        break;
      } else {
        pic.setAttribute('src', images[i - 1]);
        break;
      }
    }
  }
});
