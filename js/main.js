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
  slide8: {
    slide: document.getElementsByClassName('slide8')[0],
    items: {
      topPhoto: document.getElementById('js-top-photo'),
      bottomPhoto: document.getElementById('js-bottom-photo'),
      star: document.getElementById('js-star'),
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
  const slideStart = slide.offsetLeft;
  const slideEnd = slideStart + slide.offsetWidth;

  return { slide, slideStart, slideEnd };
};

const calcSlideIndexBoxOffset = slideClassName => {
  const margin = 300;
  const scrollX = window.scrollX;
  const { slide, slideStart, slideEnd } = getSlidePosition(slideClassName);
  const box = UI[`${slideClassName}`].box;
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

  // console.log(currentCenterPositionPercent);

  return {
    currentPositionPercent,
    currentCenterPositionPercent,
    halfWindowWidth,
  };
};

const setItemScale = (edge, center) => {
  const { currentCenterPositionPercent } = getSlideCenterViewPercen('slide3');
  const itemScale = center - edge;

  if (
    currentCenterPositionPercent > edge &&
    currentCenterPositionPercent < center
  ) {
    const scale = ((currentCenterPositionPercent - edge) / itemScale).toFixed(
      2
    );
    return `scale(${scale})`;
  } else if (currentCenterPositionPercent > center) {
    return `scale(1)`;
  } else if (currentCenterPositionPercent < edge) {
    return `scale(0.2)`;
  }
};

const Slide3Animation = () => {
  const { articleOne, articleTwo, articleThree } = UI.slide3.items;
  articleOne.style.transform = setItemScale(38, 55);
  articleTwo.style.transform = setItemScale(48, 71);
  articleThree.style.transform = setItemScale(58, 85);
};

const setItemSlide = (edge, center, startPosition, endPosition) => {
  const { currentCenterPositionPercent } = getSlideCenterViewPercen('slide8');
  const itemScale = center - edge;
  const movePercent = endPosition - startPosition;

  if (
    currentCenterPositionPercent > edge &&
    currentCenterPositionPercent < center
  ) {
    const scale = ((currentCenterPositionPercent - edge) / itemScale).toFixed(
      2
    );
    return `translate(${startPosition + scale * movePercent}%, 0)`;
  } else if (currentCenterPositionPercent >= center) {
    return `translate(${endPosition}%, 0)`;
  } else if (currentCenterPositionPercent <= edge) {
    return `translate(${startPosition}%, 0)`;
  }
};

const setItemRotation = (
  edge,
  center,
  startPosition,
  endPosition,
  rotation
) => {
  const { currentCenterPositionPercent } = getSlideCenterViewPercen('slide8');
  const itemScale = center - edge;

  if (
    currentCenterPositionPercent > edge &&
    currentCenterPositionPercent < center
  ) {
    const scale = Math.ceil(
      ((currentCenterPositionPercent - edge) / itemScale) * rotation
    );
    return `rotate(${startPosition + scale}deg)`;
  } else if (currentCenterPositionPercent >= center) {
    return `rotate(${endPosition}deg)`;
  } else if (currentCenterPositionPercent <= edge) {
    return `rotate(${startPosition}deg)`;
  }
};

const Slide8Animation = () => {
  const { topPhoto, bottomPhoto, star } = UI.slide8.items;
  topPhoto.style.transform = setItemSlide(60, 66, 0, -110);
  bottomPhoto.style.transform = setItemSlide(60, 66, 0, 120);
  star.style.transform = `${setItemSlide(0, 21, -142, 0)} ${setItemRotation(
    0,
    24,
    -180,
    0,
    180
  )}`;
};

(function () {
  function initAll(e) {
    setScroll(e);
    calcSlideIndexBoxOffset('slide3');
    Slide3Animation();
    Slide8Animation();
    handleMachineSelector();
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

  function handleMachineSelector() {
    var wrapper = document.querySelector('.machines-wrapper');
    var machines = document.querySelectorAll('.machines-wrapper .machine');

    machines.forEach(function (machine) {
      machine.addEventListener('mouseenter', function () {
        wrapper.classList.add(machine.dataset.target);
      });
      machine.addEventListener('mouseleave', function () {
        wrapper.classList.remove(machine.dataset.target);
      });
    });
  }
})();
