const URL = 'https://teachablemachine.withgoogle.com/models/QV6YipTzp/';

let model, webcam, labelContainer, maxPredictions;

async function init() {
  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  labelContainer = document.getElementById('label-container');
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    var element = document.createElement('div');
    element.classList.add('d-flex');
    labelContainer.appendChild(element);
  }
}
async function predict() {
  var image = document.getElementById('face-image');
  const prediction = await model.predict(image, false);
  // 크기 비교 ( 가장 큰 값이 위로 가도록 )
  prediction.sort(
    (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
  );
  var myType,
    imagelink = $('.file-upload-image').attr('src');
  console.log(imagelink);
  switch (prediction[0].className) {
    case 'deer':
      $(function () {
        $('.imgWrap').hide();
        $('#result-message').load('deerResult.html');
      });
      break;
    case 'fox':
      $(function () {
        $('.imgWrap').hide();
        $('#result-message').load('foxResult.html');
      });
      break;
    case 'squirrel':
      $(function () {
        $('.imgWrap').hide();
        $('#result-message').load('squirrelResult.html');
      });
      break;
    case 'tiger':
      $(function () {
        $('.imgWrap').hide();
        $('#result-message').load('tigerResult.html');
      });
      break;
    case 'bear':
      $(function () {
        $('.imgWrap').hide();
        $('#result-message').load('bearResult.html');
      });
      break;
    default:
      $(function () {
        $('.imgWrap').hide();
        $('#result-message').load('bearResult.html');
      });
  }
  var barWidth;
  for (let i = 0; i < maxPredictions; i++) {
    if (prediction[i].probability.toFixed(2) > 0.1) {
      barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + '%';
    } else if (prediction[i].probability.toFixed(2) >= 0.01) {
      barWidth = '3%';
    } else {
      barWidth = '2%';
    }
    var labelTitle;
    switch (prediction[i].className) {
      case 'deer':
        labelTitle = '대륙사슴상';
        break;
      case 'fox':
        labelTitle = '여우상';
        break;
      case 'squirrel':
        labelTitle = '하늘다람쥐상';
        break;
      case 'tiger':
        labelTitle = '호랑이상';
        break;
      case 'bear':
        labelTitle = '반달가슴곰상';
        break;
      default:
        labelTitle = '알수없음';
    }
    var label =
      "<div class='animal-label d-flex align-items-center'>" +
      labelTitle +
      '</div>';
    var bar =
      "<div class='bar-container position-relative container'><div class='" +
      prediction[i].className +
      "-box'></div><div class='d-flex justify-content-center align-items-center " +
      prediction[i].className +
      "-bar' style='width: " +
      barWidth +
      "'><span class='d-block percent-text'>" +
      Math.round(prediction[i].probability.toFixed(2) * 100) +
      '%</span></div></div>';
    labelContainer.childNodes[i].innerHTML = label + bar;
  }
  //
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('.image-upload-wrap').hide();
      $('.result-page').hide();
      // 사진 업로드 하면 사진 올릴 수 있는 부분 안보이게
      $('#loading').show();
      $('.file-upload-image').attr('src', e.target.result);
      // 올린 이미지 src를 file-upload-image에 넣어줌
      $('.file-upload-content').show();
      $('.image-title').html(input.files[0].name);
    };
    reader.readAsDataURL(input.files[0]);
    // 모델을 불러오고 모델이 다 불러지고 난 뒤, 예측실행
    init().then(function () {
      // then 실행되고 난 뒤 function()실행됨
      // console.log("모델 실행");
      predict();
      $('#loading').hide();
      $('.file-upload-content').hide();
      $('#result-page').show();
      $('.upload-image').hide();
    });
  } else {
    removeUpload();
  }
}
function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
  $('.result-page').hide();
}
$('.image-upload-wrap').bind('dragover', function () {
  $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
  $('.image-upload-wrap').removeClass('image-dropping');
});
