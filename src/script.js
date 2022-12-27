'use strict';

function UnderlineSlide()
{
    this.navigationMenu = document.querySelector('.nav');
    this.list = this.navigationMenu.querySelector('.nav__list');
    this.underline = this.navigationMenu.querySelector('.nav__underline');
    this.list.addEventListener('click', this.gotoMenuItemCB.bind(this));
    let carouselOptions =
            {
                onstart: this.moveUnderlineByIndex.bind(this),
                intervalDelay: 6000,
                fadeInDuration: 500
            };
    this.carousel = new FCarousel(carouselOptions);
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
UnderlineSlide.prototype.init = function ()
{
    this.setIndexes();
    this.moveUnderlineByIndex(0, false);
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
    this.carousel.gotoSlide(menuItemElement.dataset.carouselTargetItem);
};

UnderlineSlide.prototype.moveUnderlineByIndex = function (menuItemIndex, animate = true)
{
    if (!animate)
    {
        this.underline.style.transition = 'none';
    }
    const menuItemElement = this.list.querySelector('.nav__list__link[data-index="' + menuItemIndex + '"]');
    this.moveUnderline(menuItemElement);

    if (!animate)
    {
        this.underline.offsetHeight;
        this.underline.style.transition = '';
    }
};

/**
 * Slides the underline 'this.underline' to the menu item 'menuItemElement'.
 * @param {HTMLElement} menuItemElement The menu item where the underline will slide to.
 */
UnderlineSlide.prototype.moveUnderline = function (menuItemElement)
{
    this.list.querySelector('.nav__list__link--active').classList.remove('nav__list__link--active');
    this.underline.style.transform = 'translateX(' + (menuItemElement.offsetLeft + 'px') + ')';
    this.underline.style.width = menuItemElement.offsetWidth + 'px';
    menuItemElement.classList.add('nav__list__link--active');
};

UnderlineSlide.prototype.getCarousel = function()
{
  return this.carousel;  
};

const underline = new UnderlineSlide();