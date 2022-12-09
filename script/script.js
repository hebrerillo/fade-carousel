'use strict';

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