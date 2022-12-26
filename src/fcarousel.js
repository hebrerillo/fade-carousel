'use strict';

/**
 * A carousel that shows and hides slides applying a fade-in/fade-out effect. 
 * 
 * @param {Object} options An object with initialization options for the carousel.
 * @param {string} options.carousel [options.carousel='carousel'] The CSS selector of the carousel container.
 * @param {string} options.itemsClass [options.itemsClass='fcarousel-item'] The CSS selector of the carousel items.
 * @param {string} options.opaqueClass [options.opaqueClass='fcarousel-item--opaque'] The CSS selector that will make the carousel items opaque and visible.
 * @param {string} options.fadeinDuration [options.fadeinDelay=300] Specifies the duration over the fades effects should occur, in milliseconds.
 */
function FCarousel(options = {})
{
    let carousel = document.querySelector(options.carousel || '#carousel');
    let itemsClass = options.itemsClass || 'fcarousel-item';
    let opaqueClass = options.opaqueClass || 'fcarousel-item--opaque';
    let fadeInDelay = options.fadeInDuration || 300;
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
            carousel.children[i].style.transitionDuration = fadeInDelay + 'ms';
        }
    }

    /**
     * Shows the slide with index 'slideNumber' and hides the rest of the slides.
     * @param {number} slideNumber The number of the slide to be shown.
     */
    function showSlideNumber(slideNumber)
    {
        for(let i = 0; i < carousel.children.length; ++i)
        {
            if (i === slideNumber)
            {
                carousel.children[slideNumber].classList.add(opaqueClass);
            }
            else
            {
                carousel.children[i].classList.remove(opaqueClass);
            }
        }
    }

    /**
     * From a desired slideNumber, calculates the proper slide number.
     * 
     * @param {number} slideNumber The desired next slide number.
     * @returns {Number} The actual next slide number
     */
    function getActualSlideNumber(slideNumber)
    {
        slideNumber = Number(slideNumber);
        if (slideNumber >= carousel.children.length)
        {
            return 0;
        }
        else if (slideNumber < 0)
        {
            return carousel.children.length - 1;
        }

        return slideNumber;
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
        currentSlideNumber = getActualSlideNumber(slideNumber);
        showSlideNumber(currentSlideNumber);
    }

    /**
     * Shows the previous slide.
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