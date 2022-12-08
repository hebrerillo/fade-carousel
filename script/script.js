'use strict';

function SlideUnderline()
{
    this.navigationMenu = document.querySelector('.navigation-menu');
    this.list = this.navigationMenu.querySelector('ul');
    this.underline = this.navigationMenu.querySelector('.navigation-menu__underline');
    this.list.addEventListener('click', this.gotoMenuItemCB.bind(this));
    this.gotoMenuItem(this.list.firstElementChild, false);
}

/**
 * The callback executed when a list item is clicked
 * 
 * @param {Event} event The event generated.
 */
SlideUnderline.prototype.gotoMenuItemCB = function (event)
{
    const clickedAnchor = event.target.closest('.navigation-menu__list__item__link');
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
    if (!animate)
    {
        this.underline.style.transition = 'none';
    }
    
    this.underline.style.transform = 'translateX(' + (menuItemElement.offsetLeft + 'px') + ')';
    this.underline.style.width = menuItemElement.offsetWidth + 'px';

    if (!animate)
    {
        this.underline.offsetHeight;
        this.underline.style.transition = '';
    }
};

new SlideUnderline();
