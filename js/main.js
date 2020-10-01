'use strict';

const UI = {
  slide3: {
    slide: document.getElementsByClassName('slide3')[0],
    box: function () {
      return this.slide.getElementsByClassName('slide-index-box')[0];
    },
    items: {
      articleOne: document.getElementById('article-one'),
      articleTwo: document.getElementById('article-two'),
      articleThree: document.getElementById('article-three'),
    },
  },
};

const setScroll = e => {
  e = window.event || e;
  const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
  document.documentElement.scrollLeft -= delta * 60;
  document.body.scrollLeft -= delta * 60;
};

const getSlidePosition = slideClassName => {
  const { slide } = UI[`${slideClassName}`];
  // const slide = document.getElementsByClassName(slideClassName)[0];
  const slideStart = slide.offsetLeft;
  const slideEnd = slideStart + slide.offsetWidth;

  return { slide, slideStart, slideEnd };
};

const calcSlideIndexBoxOffset = slideClassName => {
  const margin = 300;
  const scrollX = window.scrollX;
  const { slide, slideStart, slideEnd } = getSlidePosition(slideClassName);
  const box = UI[`${slideClassName}`].box;
  // const box = slide.getElementsByClassName('slide-index-box')[0];
  const boxOffset = box.offsetLeft;

  if (scrollX > slideStart + boxOffset && scrollX < slideEnd && boxOffset > 0) {
    box.style.marginLeft = `0px`;
  }

  if (
    scrollX > slideStart &&
    boxOffset === 0 &&
    scrollX < slideStart + margin
  ) {
    box.style.marginLeft = `${margin}px`;
  }
};

const getSlideCenterViewPercen = slideClassName => {
  const halfWindowWidth = window.innerWidth / 2;
  let currentPositionPercent = 0;
  let currentCenterPositionPercent = 0;
  const { slideStart, slideEnd } = getSlidePosition(slideClassName);

  if (scrollX > slideStart - halfWindowWidth && scrollX < slideEnd) {
    const slideWidth = slideEnd - slideStart;
    const currentPosition = scrollX - slideStart;
    const currentCenterPosition = scrollX + halfWindowWidth - slideStart;

    currentPositionPercent = ((currentPosition / slideWidth) * 100).toFixed(2);
    currentCenterPositionPercent = (
      (currentCenterPosition / slideWidth) *
      100
    ).toFixed(2);
  }

  console.log(currentCenterPositionPercent);

  return {
    currentPositionPercent,
    currentCenterPositionPercent,
    halfWindowWidth,
  };
};

const setItemScale = (edge, center, item) => {
  const { currentCenterPositionPercent } = getSlideCenterViewPercen('slide3');
  const articleOneScale = center - edge;

  if (
    currentCenterPositionPercent > edge &&
    currentCenterPositionPercent < center
  ) {
    const scale = (
      (currentCenterPositionPercent - edge) /
      articleOneScale
    ).toFixed(2);
    item.style.transform = `scale(${scale})`;
  } else if (currentCenterPositionPercent > center) {
    item.style.transform = `scale(1)`;
  } else if (currentCenterPositionPercent < edge) {
    item.style.transform = `scale(0.2)`;
  }
};

const Slide3DocAnimation = () => {
  const { articleOne, articleTwo, articleThree } = UI.slide3.items;
  setItemScale(38, 55, articleOne);
  setItemScale(48, 71, articleTwo);
  setItemScale(58, 85, articleThree);
};

(function () {
  function initAll(e) {
    setScroll(e);
    calcSlideIndexBoxOffset('slide3');
    Slide3DocAnimation();
  }

  if (window.addEventListener) {
    // IE9, Chrome, Safari, Opera
    window.addEventListener('mousewheel', initAll, false);
    // Firefox
    window.addEventListener('DOMMouseScroll', initAll, false);
  } else {
    // IE 6/7/8
    window.attachEvent('onmousewheel', initAll);
  }
})();

// let Slide3Documents;
// let prevRatio = 0.0;
// let scaleRatio = 'scale(ratio);';
// let decreasingColor = 'rgba(190, 40, 40, ratio)';

// const articleOne = document.querySelector('#article-one');
// const articleTwo = document.querySelector('#article-two');
// const articleThree = document.querySelector('#article-three');

// // Set things up
// window.addEventListener(
//   'load',
//   event => {
//     Slide3Documents = document.querySelector('#slide3-documents');
//     createObserver();
//   },
//   false
// );

// function buildThresholdList() {
//   let thresholds = [];
//   let numSteps = 100;

//   for (let i = 1.0; i <= numSteps; i++) {
//     let ratio = i / numSteps;
//     thresholds.push(ratio);
//   }

//   thresholds.push(0);
//   console.log(thresholds);
//   return thresholds;
// }

// function createObserver() {
//   let observer;

//   let options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: buildThresholdList(),
//   };

//   observer = new IntersectionObserver(handleIntersect, options);
//   observer.observe(Slide3Documents);
// }

// function round5(x) {
//   return Math.ceil(x / 5) * 5;
// }

// function handleIntersect(entries, observer) {
//   entries.forEach(entry => {
//     const position = Math.ceil(entry.intersectionRatio * 100);
//     // console.log(position);

//     if (position < 15) {
//       articleOne.style.transform = `scale(0.20)`;
//     } else if (position < 20) {
//       articleOne.style.transform = `scale(0.35)`;
//     } else if (position < 25) {
//       articleOne.style.transform = `scale(0.50)`;
//     } else if (position < 30) {
//       articleOne.style.transform = `scale(0.75)`;
//       articleTwo.style.transform = `scale(0.20)`;
//     } else if (position < 40) {
//       articleOne.style.transform = `scale(1)`;
//       articleTwo.style.transform = `scale(0.35)`;
//     } else if (position < 50) {
//       articleTwo.style.transform = `scale(0.50)`;
//     } else if (position < 55) {
//       articleTwo.style.transform = `scale(0.75)`;
//     } else if (position < 60) {
//       articleTwo.style.transform = `scale(0.1)`;
//     } else if (position < 65) {
//     } else if (position < 70) {
//     } else if (position < 75) {
//     } else if (position < 80) {
//     } else if (position < 85) {
//     } else if (position < 90) {
//     } else if (position < 95) {
//     } else if (position < 100) {
//     }

//     prevRatio = entry.intersectionRatio;
//   });
// }
