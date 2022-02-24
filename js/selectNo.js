// 변경해야 할 이미지들의 소스를 배열로 생성
const buttons = document.querySelectorAll('.button');
const rightArrow = document.querySelector('#rightarrow');
const leftArrow = document.querySelector('#leftarrow');
let pic = document.querySelector('#pic');

pic.setAttribute('src', images[0]); // 초기 이미지 지정
// 이미지 하단 버튼 클릭 시 이미지 변경
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    pic.setAttribute('src', images[i]);
  }; // i번째 버튼 클릭 시 이미지의 소스를 images 배열의 i번째 소스로 변경
}

// 우측 화살표 버튼 클릭 시 이미지 변경
rightArrow.addEventListener('click', function () {
  for (let i = 0; i < images.length; i++) {
    console.log(i);
    if (pic.getAttribute('src') === images[i]) {
      // 현재 이미지 = i번째 이미지일때
      if (i === images.length - 1) {
        pic.setAttribute('src', images[0]);
        break; // 현재 마지막 이미지라면 버튼 클릭 시 첫 번째 이미지로 이동
      } else {
        pic.setAttribute('src', images[i + 1]); // 그 외라면 다음 이미지(i+1번째)로 이동
        document.getElementById('leftarrow').style.visibility = 'visible';
        break;
      }
    }
  }
});

// 좌측 화살표 버튼 클릭 시 이미지 변경
leftArrow.addEventListener('click', function () {
  for (let i = 0; i < images.length; i++) {
    console.log('왼쪽' + i);
    if (pic.getAttribute('src') === images[i]) {
      // 현재 이미지 = i번째 이미지일때
      if (i === 0) {
        pic.setAttribute('src', images[images.length - 1]);
        break; // 현재 첫 번째 이미지라면 버튼 클릭 시 마지막 이미지로 이동
      } else {
        pic.setAttribute('src', images[i - 1]); // 그 외라면 다음 이미지(i-1번째)로 이동
        break;
      }
    }
  }
});
