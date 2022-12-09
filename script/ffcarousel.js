'use strict';


/**
 * Fade in fade out carousel main class.
 */
function FFCarousel()
{
    this.nextSlide = null;
    this.currentSlide = null;
    this.carousel = document.querySelector('.ffcarousel');
    this.carousel.addEventListener('transitionend', this.carouselTransitionEndCB.bind(this));
    this.init();
}

/**
 * Callback to be executed when a slide has finished the transition.
 * 
 * @param {Event} event The event generated when the transition has ended.
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
        this.showCurrentSlide(true);
    }
};

/**
 * Calls to initialization functions.
 */
FFCarousel.prototype.init = function ()
{
    this.setIndexes();
};

/**
 * Hides the current slide and shows the slide with number 'slideNumber'.
 * 
 * @param {Number} slideNumber
 * @param {bool} animate True if the slides should be hide and shown applying a fade in/fade out effect.
 */
FFCarousel.prototype.gotoSlide = function (slideNumber, animate = true)
{
    this.nextSlide = this.carousel.querySelector('[data-carousel-item="' + slideNumber + '"]');
    this.hideCurrentSlide(animate);
    
    if (!animate)
    {
        this.currentSlide = this.nextSlide;
        this.showCurrentSlide(false);
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
    const carouselChildren = this.carousel.children; //TODO, perform a query of the carousel items.
    for (let i = 0; i < carouselChildren.length; ++i)
    {
        carouselChildren[i].dataset.carouselItem = i;
    }
};
