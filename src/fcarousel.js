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
    let currentSlideNumber = null;
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
        for(let i = 0; i < carousel.children.length; ++i)
        {
            carousel.children[i].classList.add(itemsClass);
        }
    }

    /**
     * Hides the current slide and shows the slide with number 'slideNumber'.
     * If 'slideNumber' is greater than the number of elements in the carousel or is negative, it will default to
     * the first slide.
     * 
     * @param {number} slideNumber The number of the slide to be shown.
     */
    function gotoSlide(slideNumber)
    {
        if (slideNumber >= carousel.children.length)
        {
            currentSlideNumber = 0;
        }
        else if (slideNumber < 0)
        {
            currentSlideNumber = carousel.children.length - 1;
        }
        else
        {
            currentSlideNumber = slideNumber;
        }

        for(let i = 0; i < carousel.children.length; ++i)
        {
            if (i === currentSlideNumber)
            {
                carousel.children[currentSlideNumber].classList.add(opaqueClass);
            }
            else
            {
                carousel.children[i].classList.remove(opaqueClass);
            }
        }
    }

    /**
     * 
     */
    function gotoPreviousSlide()
    {
        gotoSlide(currentSlideNumber - 1);
    }

    /**
     * Shows the next slide.
     */
    function gotoNextSlide()
    {
        gotoSlide(currentSlideNumber + 1);
    }

    return {
      'gotoSlide' : gotoSlide,
      'gotoNextSlide' : gotoNextSlide,
      'gotoPreviousSlide' : gotoPreviousSlide
    };
}