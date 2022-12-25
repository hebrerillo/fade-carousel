'use strict';

/**
 * A carousel that shows and hides slides applying a fade-in/fade-out effect. 
 * 
 * @param {Object} options An object with initialization options for the carousel.
 * @param {string} options.carousel [options.carousel='carousel'] The CSS selector of the carousel container.
 * @param {string} options.itemsClass [options.itemsClass='fcarousel-item'] The CSS selector of the carousel items.
 * @param {string} options.opaqueClass [options.opaqueClass='fcarousel-item--opaque'] The CSS selector that will make the carousel items opaque and visible.
 */
function FCarousel(options = {})
{
    let carousel = document.querySelector(options.carousel || '#carousel');
    let itemsClass = options.itemsClass || 'fcarousel-item';
    let opaqueClass = options.opaqueClass || 'fcarousel-item--opaque';
    let items = carousel.children;
    
    let currentSlideIndex = 0;
    
    init();
    
    function init()
    {
        carousel.style.position = 'relative';
        goto(0);
    }
    
    function goto(slideNumber)
    {
        items[slideNumber].classList.add(opaqueClass);
    }
    
    function getCurrentSlideIndex()
    {
        return currentSlideIndex;
    }
    
    return {
      'getCurrentSlideIndex' : getCurrentSlideIndex
    };
}