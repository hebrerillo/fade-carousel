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

    init();

    /**
     * Performs some initialization stuff.
     * 
     */
    function init()
    {
        carousel.style.position = 'relative';
        addItemsClass();
        gotoSlide(0);
    }

    /**
     * Adds the class 'itemsClass' to all the children of the carousel.
     */
    function addItemsClass()
    {
        for(let i = 0; i < items.length; ++i)
        {
            items[i].classList.add(itemsClass);
        }
    }

    /**
     * Hides the current slide and shows the slide with number 'slideNumber'.
     * 
     * @param {type} slideNumber The next slide to be shown
     */
    function gotoSlide(slideNumber)
    {
        items[slideNumber].classList.add(opaqueClass);
    }

    return {
      'gotoSlide' : gotoSlide
    };
}