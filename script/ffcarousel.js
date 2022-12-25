'use strict';

/**
 * Fade in fade out carousel main class.
 * 
 * @param {String} carouselClass The class selector of the carousel
 * @param {Object} options An object with initialization options.
 */
function FFCarousel(carouselClass, options = {})
{
    this.nextSlide = null;
    this.currentSlide = null;
    this.delay = options.delay; //The time out for the fade in/fade out effect, in milliseconds
    this.intervalID = null;
    this.fading = false; //Whether there is a fade in/fade out animation in progress.
    this.carousel = document.querySelector(carouselClass);
    if (this.carousel)
    {
        this.carousel.addEventListener('transitionend', this.carouselTransitionEndCB.bind(this));
        this.init();
    }
}

/**
 * Calls to initialization functions.
 * 
 */
FFCarousel.prototype.init = function ()
{
    this.setIndexes();
    this.gotoSlide(0, false, false);
    this.setInterval();
};

/**
 * Initializes the interval to execute the fade in/fade out effect every 'this.delay' milliseconds.
 */
FFCarousel.prototype.setInterval = function ()
{
    if (this?.delay > 0 && this.intervalID === null)
    {
        this.intervalID = window.setInterval(this.slideIntervalCB.bind(this), this.delay);
    }
};

/**
 * Cancels the fade in/fade out effect interval.
 */
FFCarousel.prototype.cancelInterval = function () 
{
    if (this.intervalID !== null)
    {
        window.clearInterval(this.intervalID);
        this.intervalID = null;
    }
};

/**
 * Callback function that will be executed when the interval times out.
 */
FFCarousel.prototype.slideIntervalCB = function ()
{
    if (this.currentSlide === null)
    {
        return;
    }

    const currentSlideNumber = (+this.currentSlide.dataset.carouselItem);
    const nextSlideNumber = currentSlideNumber >= (this.carousel.children.length - 1) ? 0 : currentSlideNumber + 1;
    this.gotoSlide(nextSlideNumber, true, false);
};

/**
 * Callback to be executed when a slide has finished the transition.
 * 
 * @param {Event} event The event generated when the transition ended.
 */
FFCarousel.prototype.carouselTransitionEndCB = function (event)
{
    const targetSlide = event.target.closest('.ffcarousel_item');
    if (!targetSlide)
    {
        return;
    }
    
    if (!targetSlide.classList.contains('ffcarousel_item--opaque'))
    {
        targetSlide.classList.remove('ffcarousel_item--display');
        this.currentSlide = this.nextSlide;
        this.nextSlide = null;
        this.showCurrentSlide(true);
    }
    else
    {
        this.fading = false;
    }
};

/**
 * Hides the current slide and shows the slide with number 'slideNumber'.
 * 
 * @param {Number} slideNumber
 * @param {bool} animate True if the slides should be hide and shown applying a fade in/fade out effect.
 * @param {bool] cancelInterval True if the auto play for the carousel should be canceled, false otherwise. In case it is cancelled, the function 
 *               will reenable the interval before exiting.
 */
FFCarousel.prototype.gotoSlide = function (slideNumber, animate = true, cancelInterval = true)
{
    if (this.fading)
    {
        return;
    }

    this.nextSlide = this.carousel.querySelector('[data-carousel-item="' + slideNumber + '"]');
    if (this.nextSlide === this.currentSlide)
    {
        return;
    }

    if (cancelInterval)
    {
        this.cancelInterval();
    }
    
    if (!animate)
    {
        this.currentSlide = this.nextSlide;
        this.hideCurrentSlide(false);
        this.showCurrentSlide(false);
    }
    else
    {
        this.fading = true;
        this.hideCurrentSlide(true);
    }
    
    if (cancelInterval)
    {
        this.setInterval();
    }
};

/**
 * Shows the current slide.
 * 
 * @param {bool} fadeIn True if the slide should be shown applying a fade-in effect.
 */
FFCarousel.prototype.showCurrentSlide = function(fadeIn = true)
{
    if (!this.currentSlide)
    {
        return;
    }

    if (fadeIn)
    {
        this.currentSlide.style.transition = 'none';
    }

    this.currentSlide.classList.add('ffcarousel_item--display');

    if (fadeIn)
    {
        this.currentSlide.style.transition = '';
        this.currentSlide.offsetHeight;
    }
    this.currentSlide.classList.add('ffcarousel_item--opaque');
};

/**
 * Hides the current slide.
 * 
 * @param {bool} fadeOut True if the slide should be hidden applying a fade out effect.
 */
FFCarousel.prototype.hideCurrentSlide = function(fadeOut = true)
{
    if (!this.currentSlide)
    {
        return;
    }

    if (!fadeOut)
    {
        this.currentSlide.style.transition = 'none';
    }

    this.currentSlide.classList.remove('ffcarousel_item--opaque');

    if (!fadeOut)
    {
        this.currentSlide.style.transition = '';
        this.currentSlide.offsetHeight;
        this.currentSlide.classList.remove('ffcarousel_item--display');
    }
};

/**
 * Sets the necessary data indexes in the target carousel childs
 * 
 */
FFCarousel.prototype.setIndexes = function ()
{
    const carouselChildren = this.carousel.children;
    for (let i = 0; i < carouselChildren.length; ++i)
    {
        carouselChildren[i].dataset.carouselItem = i;
    }
};
