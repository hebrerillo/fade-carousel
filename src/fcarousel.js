'use strict';

/**
 * A carousel that shows and hides slides applying a fade-in/fade-out effect.
 * 
 * @param {Object} options An object with initialization options for the carousel.
 * @param {string} options.carousel [options.carousel='carousel'] The CSS selector of the carousel container.
 * @param {string} options.fadeInDuration [options.fadeinDelay=300] Specifies the duration over the fades effects should occur, in milliseconds.
 * @param {string} options.intervalDelay [options.intervalDelay=2000] specifies the duration to wait before moving to the next slide. If you do not want an autoplay of slides,
 *                 just pass 0. If the interval delay is less than 'fadeInDuration', then its value will be reduced to 'fadeInDuration'.
 * @param {function} options.onstart [options.onstart=null] Specifies a callback function that will be executed everytime before the carousel goes to a specific slide.
 */
function FCarousel(options = {})
{
    let carousel = document.querySelector(options.carousel || '#carousel');
    let itemsClass = 'fcarousel-item';
    let opaqueClass = 'fcarousel-item--opaque';
    let fadeInDuration = options.fadeInDuration || 1000;
    let onstart = options.onstart || null;
    let currentSlideNumber = null;
    let intervalDelay = calculateActualIntervalDelay(options.intervalDelay, fadeInDuration);
    let intervalID = null;

    init();

    /**
     * Performs some initialization stuff.
     * 
     */
    function init()
    {
        carousel.style.position = 'relative';
        styleItems();
        gotoSlide(0, false, false);
    }

    /**
     * Starts the autoplaying of slides every 'intervalDelay' milliseconds.
     */
    function startInterval()
    {
        if (intervalDelay <= 0 || intervalID)
        {
            return;
        }

        intervalID = window.setInterval(gotoNextSlide.bind(this), intervalDelay);
    }

    function cancelInterval()
    {
        if (intervalID)
        {
            window.clearInterval(intervalID);
            intervalID = null;
        }
    }

    /**
     * Calculates the interval delay before starting the autoplay of slides, taking into accout that
     * the interval delay cannot be smaller than the duration of the fade-in animation.
     * 
     * @param {Number} intervalDelay The desired interval delay of slides.
     * @param {Number} fadeInDuration The duration of the fade-in animation
     * @returns {Number} The actual interval delay.
     */
    function calculateActualIntervalDelay(intervalDelay, fadeInDuration)
    {
        intervalDelay = intervalDelay ?? 1000;

        if (intervalDelay > 0 && intervalDelay < fadeInDuration)
        {
            return fadeInDuration;
        }
        else if (options.intervalDelay > 0)
        {
            return intervalDelay;
        }

        return intervalDelay;
    }

    /**
     * Adds classes and inline styles to all the children of the carousel.
     */
    function styleItems()
    {
        for(let i = 0; i < carousel.children.length; ++i)
        {
            carousel.children[i].classList.add(itemsClass);
            carousel.children[i].style.transitionDuration = fadeInDuration + 'ms';
        }
    }

    /**
     * Shows the slide with index 'slideNumber' and hides the rest of the slides.
     * @param {number} slideNumber The number of the slide to be shown.
     * @param {boolean} doOnStartCallback Whether the 'onstart' callback should be executed.
     */
    function showSlideNumber(slideNumber, doOnStartCallback = true)
    {        
        if (onstart && doOnStartCallback)
        {
            onstart(currentSlideNumber, Array.from(carousel.children));
        }

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
     * @param {boolean} doTransition Whether there should be a transition effect.
     * @param {boolean} doOnStartCallback Whether the 'onstart' callback should be executed.
     */
    function gotoSlide(slideNumber, doTransition = true, doOnStartCallback = true)
    {
        cancelInterval();
        slideNumber = Number(slideNumber);
        if (slideNumber === currentSlideNumber)
        {
            startInterval();
            return;
        }

        currentSlideNumber = getActualSlideNumber(slideNumber);
        if (!doTransition)
        {
            carousel.children[currentSlideNumber].style.transition = 'none';
        }

        showSlideNumber(currentSlideNumber, doOnStartCallback);

        if (!doTransition)
        {
            carousel.children[currentSlideNumber].offsetHeight;
            carousel.children[currentSlideNumber].style.transition = '';
            carousel.children[currentSlideNumber].style.transitionDuration = fadeInDuration + 'ms';
        }
        startInterval();
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
