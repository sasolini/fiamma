(function () {
  function scrollHorizontally(e) {
    setScroll(e);
    calcSlideIndexBoxOffset();
  }

  function setScroll(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.documentElement.scrollLeft -= delta * 80;
    document.body.scrollLeft -= delta * 80;
    e.preventDefault();
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
