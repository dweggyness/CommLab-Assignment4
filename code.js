
const step2Title = document.querySelector('.step2Title');

var dictionary = "0123456789qwertyuiopasdfghjklzxcvbnm!?></\a`~+*=@#$%".split('');

var ran = function() {
 return Math.floor(Math.random() * dictionary.length)
}

var ranString = function(amt) {
  var string = '';
  for(var i = 0; i < amt; i++) {
    string += dictionary[ran()];
  }
  return string;
}

var startScramble = function(str) {
  var count = str.length;
  var delay = 80;
  var letterDelay = 15;
  
  step2Title.innerHTML = '';
  
  var gen = setInterval(function() {
    step2Title.setAttribute('data-before', ranString(count));
    step2Title.setAttribute('data-after', ranString(count));
    if(delay > 0) {
      delay--;
    }
    else {
      if (letterDelay <= 0) {
        letterDelay = 10;
        if(count < str.length) {
          step2Title.innerHTML += str[str.length - count-1];
        }
        count--;
        if(count === -1) {
          clearInterval(gen);
        }
      } else {
        letterDelay--;
      }
    }
  }, 32);
}



// show alert modal, lock user out of doing anything until they press OK
function showAlert() {
  $('.overlay').css('display', 'block')
  $('.warning_container').css('display', 'flex')
  $('body').css('overflow', 'hidden') // no scrolling

  // illusion of choice
  $('#warningContainerButton1').on('click', () => {
    closeAlert();
  })

  $('#warningContainerButton2').on('click', () => {
    closeAlert();
  })
}

// once user closes the alert, make step 3 visible
function closeAlert() {
  $('.overlay').css('display', 'none')
  $('.warning_container').css('display', 'none')
  $('body').css('overflow', 'visible') // no scrolling

  $('.step3Container').css('display', 'block');
}

// applies a bunch of css stuff to the entire site to make it edgy
function edgify() {
  startScramble('MURDER'); // scrambiles the title of step 2 to 'MRUDER'

  // want to change the css only after the text is unscrambled
  setTimeout(() => {
    $('body').css('color', '#333333');
    $('body').css('background-color', "salmon");
    $('.altblock').css('background-color', '#a83e32');
    $('#header_container').css('background-color', '#a83e32');
    $('#hs_submit').css('background-color', 'salmon');
    $('#sidebar').css('color', "#444444");
    $('.nav_item .nav_icon').css('filter', "brightness(0) saturate(100%) invert(0%) sepia(10%) saturate(1751%) hue-rotate(322deg) brightness(99%) contrast(87%)");
    $('.nav_item .nav').css('color', "#111")
    $('.sp_helpful_icon_star').css('filter', "brightness(0) saturate(100%) invert(25%) sepia(47%) saturate(2746%) hue-rotate(343deg) brightness(89%) contrast(79%)")
  }, 4500)

  setTimeout(() => {
    showAlert();
  }, 10500)
}


function init() {
  console.log('hi');

  setTimeout(() => edgify(), 5000);
}

init();