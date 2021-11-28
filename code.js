
const step2Title = document.querySelector('.step2Title');

// code stolen/modified from internet for scrambling the title to 'Murder'
// https://codemyui.com/decryption-effect-click/
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

///////////////////////////////////


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
    $('body').css('background-color', "#f2a096");
    $('.altblock').css('background-color', '#a83e32');
    $('#header_container').css('background-color', '#a83e32');
    $('#hs_submit').css('background-color', '#f2a096');
    $('#sidebar').css('color', "#444444");

    // what are those filters for? 
    // answer: the images/logo come in one color, but i want to change their colour to something else
    // so i use a filter to change it, using this codepen to generate the filters
    // https://codepen.io/sosuke/pen/Pjoqqp
    $('.nav_item .nav_icon').css('filter', "brightness(0) saturate(100%) invert(0%) sepia(10%) saturate(1751%) hue-rotate(322deg) brightness(99%) contrast(87%)");
    $('.nav_item .nav').css('color', "#111")
    $('.sp_helpful_icon_star').css('filter', "brightness(0) saturate(100%) invert(25%) sepia(47%) saturate(2746%) hue-rotate(343deg) brightness(89%) contrast(79%)")
  }, 4500)

  setTimeout(() => {
    showAlert();
  }, 10500)
}

function getFrameID(id){
  var elem = document.getElementById(id);
  if (elem) {
      if(/^iframe$/i.test(elem.tagName)) return id; //Frame, OK
      // else: Look for frame
      var elems = elem.getElementsByTagName("iframe");
      if (!elems.length) return null; //No iframe found, FAILURE
      for (var i=0; i<elems.length; i++) {
         if (/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com(\/|$)/i.test(elems[i].src)) break;
      }
      elem = elems[i]; //The only, or the best iFrame
      if (elem.id) return elem.id; //Existing ID, return it
      // else: Create a new ID
      do { //Keep postfixing `-frame` until the ID is unique
          id += "-frame";
      } while (document.getElementById(id));
      elem.id = id;
      return id;
  }
  // If no element, return null.
  return null;
}



/// youtube iframe event listeners... so complicated for wat

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('step2YoutubePlayer', {
    events: {
      'onReady': onPlayerReady,
    }
  })

  player.addEventListener("onReady", "onPlayerReady");
}

// This function will be called when the API is fully loaded
var timer;
function onPlayerReady(e) {
  clearInterval(timer);

  // check the video time every 1 second.
  timer = setInterval(() => {
    const curVideoTime = player.playerInfo.currentTime || 0;

    // once it reaches the part jun is about to be murdered by dania, start edgifying the site
    if (curVideoTime >= 30 && curVideoTime <= 33) {
      edgify();
      clearInterval(timer);
    }
  }, 1000)
}

// Load YouTube Frame API
(function() { // Closure, to not leak to the scope
  var s = document.createElement("script");
  s.src =  "https://www.youtube.com/player_api";
  var before = document.getElementsByTagName("script")[0];
  before.parentNode.insertBefore(s, before);
})();
