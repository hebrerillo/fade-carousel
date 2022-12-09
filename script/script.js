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

function UnderlineSlide()
{
    this.navigationMenu = document.querySelector('.nav');
    this.list = this.navigationMenu.querySelector('.nav__list');
    this.underline = this.navigationMenu.querySelector('.nav__underline');
    this.list.addEventListener('click', this.gotoMenuItemCB.bind(this));
    this.carousel = new FFCarousel();
    this.init();
}

/**
 * The callback executed when a list item is clicked
 * 
 * @param {Event} event The event generated.
 */
UnderlineSlide.prototype.gotoMenuItemCB = function (event)
{
    const clickedAnchor = event.target.closest('.nav__list__link');
    if (!clickedAnchor)
    {
        return;
    }

    this.gotoMenuItem(clickedAnchor);
};

/**
 * Perform some initialization.
 */
UnderlineSlide.prototype.init = function()
{
    this.setIndexes();
    this.gotoMenuItem(this.list.querySelector('.nav__list__link'), false);
};

/**
 * Sets the necessary indexes in the menu items.
 * 
 */
UnderlineSlide.prototype.setIndexes = function ()
{
    this.list.querySelectorAll('.nav__list__link').forEach((element, index) => 
    {
        element.dataset.carouselTargetItem = index;
    });
};

/**
 * Slides the underline to the list item 'menuItemElement'
 * 
 * @param {HTMLElement} menuItemElement The list item where the underline will slide to.
 * @param {bool} animate If true, the 'slide' effect is performed. If false, there will be no effect.
 */
UnderlineSlide.prototype.gotoMenuItem = function (menuItemElement, animate = true)
{
    if (!menuItemElement)
    {
        console.error("FFCarousel.gotoMenuItem - No menu item!");
        return;
    }

    if (!animate)
    {
        this.underline.style.transition = 'none';
    }

    this.list.querySelector('.nav__list__link--active').classList.remove('nav__list__link--active');
    this.underline.style.transform = 'translateX(' + (menuItemElement.offsetLeft + 'px') + ')';
    this.underline.style.width = menuItemElement.offsetWidth + 'px';
    menuItemElement.classList.add('nav__list__link--active');
    this.carousel.gotoSlide(menuItemElement.dataset.carouselTargetItem, animate);
    if (!animate)
    {
        this.underline.offsetHeight;
        this.underline.style.transition = '';
    }
};

new UnderlineSlide();