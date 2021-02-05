$(function() {
  const d = new Date(); 
  const hours = d.getHours();
  const night = hours >= 19 || hours <= 7; // between 7pm and 7am
  const body = document.querySelector('body');
  const toggle = document.getElementById('toggle');
  const input = document.getElementById('switch');

  if (!night) {
    input.checked = true;
    body.classList.add('night');
  }

  toggle.addEventListener('click', function() {
    const isChecked = input.checked;
    if (isChecked) {
      body.classList.remove('night');
    } else {
      body.classList.add('night');
    }
  });

  const introHeight = document.querySelector('.intro').offsetHeight;
  const topButton = document.getElementById('top-button');
  const $topButton = $('#top-button');
  ///////////////////Custom-delete////////////////////////
  var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://404.whyshock.com/404.jpeg");
xhr.setRequestHeader("Origin", "https://www.whyshock.com");
xhr.setRequestHeader("Cookie", "CloudFront-Expires=1612527208; CloudFront-Key-Pair-Id=APKAI62HOS25E6VK22JQ; CloudFront-Signature=Ir55KhwteJ8MtMoQcp3XQi-xFGaTEOWubnDDkUp2aNpql2iW2TV1-i6DuvKjOg00Ijte-i2pTyE1nk2rzmZ3RDFCQXN4bmmfhFone2k47VFI1bq6cijmv30TqrSSXYk2Pyb-1uzro-GUaLAAbf~AdGkzgN95rSy-7h74ycby0B5Ip0WeMYYvmJTx~ifg8srC4oJK5UQFuctiQyPOBzISHUpMTpGhYN~ZC-gY7aVZMvBnYKNsTe~mNCCSaWjBeRsXkAQ2xeh3iKlux2HsOgsyWiz8ISBxvODwVToal3CWuvKmATSUPQH04SD0GaRIJyLobX40IGXpSOlZ0ExgiBpzSw__");

xhr.send();
  /////////////////////////////////////////////////////////

  window.addEventListener(
    'scroll',
    function() {
      if (window.scrollY > introHeight) {
        $topButton.fadeIn();
      } else {
        $topButton.fadeOut();
      }
    },
    false
  );

  topButton.addEventListener('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  const hand = document.querySelector('.emoji.wave-hand');

  function waveOnLoad() {
    hand.classList.add('wave');
    setTimeout(function() {
      hand.classList.remove('wave');
    }, 2000);
  }

  setTimeout(function() {
    waveOnLoad();
  }, 1000);

  hand.addEventListener('mouseover', function() {
    hand.classList.add('wave');
  });

  hand.addEventListener('mouseout', function() {
    hand.classList.remove('wave');
  });

  window.sr = ScrollReveal({
    reset: false,
    duration: 600,
    easing: 'cubic-bezier(.694,0,.335,1)',
    scale: 1,
    viewFactor: 0.3,
  });

  sr.reveal('.background');
  sr.reveal('.skills');
  sr.reveal('.experience', { viewFactor: 0.2 });
  sr.reveal('.featured-projects', { viewFactor: 0.1 });
  sr.reveal('.other-projects', { viewFactor: 0.05 });
}); 
