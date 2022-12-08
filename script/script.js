'use strict';

/**
 * Fade in fade out carousel main class.
 */
function FFCarousel()
{
    this.nextSlide = null;
    this.currentSlide = null;
    this.carousel = document.querySelector('.ffcarousel');
    this.navigationMenu = document.querySelector('.nav');
    this.list = this.navigationMenu.querySelector('.nav__list');
    this.underline = this.navigationMenu.querySelector('.nav__underline');
    this.list.addEventListener('click', this.gotoMenuItemCB.bind(this));
    this.init();
}

/**
 * Calls to some initialization functions.
 */
FFCarousel.prototype.init = function ()
{
    this.setIndexes();
    this.gotoMenuItem(this.list.querySelector('.nav__list__link'), false);
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
    this.hideCurrentSlide(false); //TODO change
    
    if (!animate || true) //TODO change
    {
        this.currentSlide = this.nextSlide;
        this.showCurrentSlide(false); //TODO change
    }
};

/**
 * Shows the current slide.
 * 
 * @param {bool} animate True if the slide should be shown applying a fade in effect.
 */
FFCarousel.prototype.showCurrentSlide = function(animate = true)
{
    if (!this.currentSlide)
    {
        return;
    }

    if (!animate)
    {
        this.currentSlide.style.transition = 'none';
    }

    this.currentSlide.classList.add('ffcarousel_item--display');
    this.currentSlide.classList.add('ffcarousel_item--opaque');

    if (!animate)
    {
        this.currentSlide.style.transition = '';
        this.currentSlide.offsetHeight;
    }
};

/**
 * Hides the current slide.
 * 
 * @param {bool} animate True if the slide should be hidden applying a fade out effect.
 */
FFCarousel.prototype.hideCurrentSlide = function(animate = true)
{
    if (!this.currentSlide)
    {
        return;
    }

    if (!animate)
    {
        this.currentSlide.style.transition = 'none';
    }

    this.currentSlide.classList.remove('ffcarousel_item--opaque');

    if (!animate)
    {
        this.currentSlide.style.transition = '';
        this.currentSlide.offsetHeight;
        this.currentSlide.classList.remove('ffcarousel_item--display');
    }
};

/**
 * Sets the necessary indexes in the menu items and in the target carousel childs
 * 
 */
FFCarousel.prototype.setIndexes = function ()
{
    const carouselChildren = this.carousel.children;
    const menuChildren = this.list.querySelectorAll('.nav__list__link');

    if (menuChildren.length !== carouselChildren.length)
    {
        console.error("FFCarousel.prototype.setIndexes - The number of carousel items and the number of menu items are different");
        return;
    }

    for (let i = 0; i < menuChildren.length; ++i)
    {
        carouselChildren[i].dataset.carouselItem = i;
        menuChildren[i].dataset.carouselTargetItem = i;
    }
};

/**
 * The callback executed when a list item is clicked
 * 
 * @param {Event} event The event generated.
 */
FFCarousel.prototype.gotoMenuItemCB = function (event)
{
    const clickedAnchor = event.target.closest('.nav__list__link');
    if (!clickedAnchor)
    {
        return;
    }

    this.gotoMenuItem(clickedAnchor);
};

/**
 * Slides the underline to the list item 'menuItemElement'
 * 
 * @param {HTMLElement} menuItemElement The list item where the underline will slide to.
 * @param {bool} animate If true, the 'slide' effect is performed. If false, there will be no effect.
 */
FFCarousel.prototype.gotoMenuItem = function (menuItemElement, animate = true)
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
    this.gotoSlide(menuItemElement.dataset.carouselTargetItem, animate);
    if (!animate)
    {
        this.underline.offsetHeight;
        this.underline.style.transition = '';
}
};

new FFCarousel();
