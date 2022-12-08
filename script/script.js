'use strict';

function SlideUnderline()
{
    this.carousel = document.querySelector('.ffcarousel');
    this.navigationMenu = document.querySelector('.nav');
    this.list = this.navigationMenu.querySelector('.nav__list');
    this.underline = this.navigationMenu.querySelector('.nav__underline');
    this.list.addEventListener('click', this.gotoMenuItemCB.bind(this));
    this.gotoMenuItem(this.list.querySelector('.nav__list__link'), false);
    this.setIndexes();
}

/**
 * Sets the necessary indexes in the menu items and in the target carousel childs
 * 
 */
SlideUnderline.prototype.setIndexes = function()
{
    const carouselChildren = this.carousel.children;
    const menuChildren = this.list.querySelectorAll('.nav__list__link');
    
    if (menuChildren.length !== carouselChildren.length)
    {
        console.error("SlideUnderline.prototype.setIndexes - The number of carousel items and the number of menu items are different");
        return;
    }
    
    for(let i = 0; i < menuChildren.length; ++i)
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
SlideUnderline.prototype.gotoMenuItemCB = function (event)
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
SlideUnderline.prototype.gotoMenuItem = function (menuItemElement, animate = true)
{
    if (!menuItemElement)
    {
        console.error("SlideUnderline.gotoMenuItem - No menu item!");
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
    
    if (!animate)
    {
        this.underline.offsetHeight;
        this.underline.style.transition = '';
    }
};

new SlideUnderline();
