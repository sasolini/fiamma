(function () {
  function scrollHorizontally(e) {
    setScroll(e);
    calcSlideIndexBoxOffset();
  }

  function setScroll(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.documentElement.scrollLeft -= delta * 60;
    document.body.scrollLeft -= delta * 60;
    // e.preventDefault();
  }

  function calcSlideIndexBoxOffset() {
    const scrollY = window.scrollY;

    const slide = document.getElementsByClassName('slide3')[0];
    const box = slide.getElementsByClassName('slide-index-box')[0];

    const slideOffset = slide.offsetLeft;
    const boxOffset   = box.offsetLeft;
    const margin  = boxOffset - slideOffset;

    if (scrollY > slideOffset && margin > 0) {
      const newMargin = margin - (scrollY - slideOffset);
        slide.style.marginLeft = `${newMargin}px`;
    }
  }

  if (window.addEventListener) {
    // IE9, Chrome, Safari, Opera
    window.addEventListener('mousewheel', scrollHorizontally, false);
    // Firefox
    window.addEventListener('DOMMouseScroll', scrollHorizontally, false);
  } else {
    // IE 6/7/8
    window.attachEvent('onmousewheel', scrollHorizontally);
  }

})();

let Slide3Documents;
let prevRatio = 0.0;
let scaleRatio = 'scale(ratio);';
let decreasingColor = 'rgba(190, 40, 40, ratio)';

const articleOne = document.querySelector('#article-one');
const articleTwo = document.querySelector('#article-two');
const articleThree = document.querySelector('#article-three');

// Set things up
window.addEventListener(
  'load',
  event => {
    Slide3Documents = document.querySelector('#slide3-documents');
    createObserver();
  },
  false
);

function buildThresholdList() {
  let thresholds = [];
  let numSteps = 100;

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  console.log(thresholds);
  return thresholds;
}

function createObserver() {
  let observer;

  let options = {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList(),
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(Slide3Documents);
}

function round5(x) {
  return Math.ceil(x / 5) * 5;
}

function handleIntersect(entries, observer) {
  entries.forEach(entry => {
    const position = Math.ceil(entry.intersectionRatio * 100);
    console.log(position);

    if (position < 15) {
      articleOne.style.transform = `scale(0.20)`;
    } else if (position < 20) {
      articleOne.style.transform = `scale(0.35)`;
    } else if (position < 25) {
      articleOne.style.transform = `scale(0.50)`;
    } else if (position < 30) {
      articleOne.style.transform = `scale(0.75)`;
      articleTwo.style.transform = `scale(0.20)`;
    } else if (position < 40) {
      articleOne.style.transform = `scale(1)`;
      articleTwo.style.transform = `scale(0.35)`;
    } else if (position < 50) {
      articleTwo.style.transform = `scale(0.50)`;
    } else if (position < 55) {
      articleTwo.style.transform = `scale(0.75)`;
    } else if (position < 60) {
      articleTwo.style.transform = `scale(0.1)`;
    } else if (position < 65) {
    } else if (position < 70) {
    } else if (position < 75) {
    } else if (position < 80) {
    } else if (position < 85) {
    } else if (position < 90) {
    } else if (position < 95) {
    } else if (position < 100) {
    }

    prevRatio = entry.intersectionRatio;
  });
}
