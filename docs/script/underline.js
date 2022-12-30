'use strict';

(function(){

/**
 * A functionality that slides an underline to the different options of a menu. It also uses a carousel.
 */
function UnderlineSlide()
{
    this.navigationMenu = document.querySelector('.nav');
    this.list = this.navigationMenu.querySelector('.nav__list');
    this.underline = this.navigationMenu.querySelector('#underline');
    this.underline.addEventListener('transitionend', this.underlineTransitionEnd.bind(this));
    this.list.addEventListener('click', this.gotoMenuItemCB.bind(this));
    this.navigationMenu.querySelector('.left-button').addEventListener('click', this.gotoPreviousSlide.bind(this));
    this.navigationMenu.querySelector('.right-button').addEventListener('click', this.gotoNextSlide.bind(this));
    let carouselOptions =
            {
                carousel: '#regularCarousel',
                onstart: this.moveUnderlineByIndex.bind(this),
                intervalDelay: 4500,
                fadeInDuration: 1200
            };
    this.carousel = new FCarousel(carouselOptions);
    this.gotoMenuItem(this.list.querySelector('.nav__list__item'), false);
}

/**
 * Goes to the next slide.
 */
UnderlineSlide.prototype.gotoNextSlide = function ()
{
    this.carousel.gotoNextSlide();
};

/**
 * Goes to the previous slide.
 */
UnderlineSlide.prototype.gotoPreviousSlide = function ()
{
    this.carousel.gotoPreviousSlide();
};

/**
 * The callback that is executed when a list item is clicked
 * 
 * @param {Event} event The event generated.
 */
UnderlineSlide.prototype.gotoMenuItemCB = function (event)
{
    const clickedAnchor = event.target.closest('.nav__list__item');
    if (!clickedAnchor)
    {
        return;
    }

    this.gotoMenuItem(clickedAnchor);
};

/**
 * Callback that is executed each time the carousel goes to a new slide.
 * 
 * @param {Number} index The index of the new slide to go to.
 */
UnderlineSlide.prototype.moveUnderlineByIndex = function(index)
{
    const htmlLiElement = this.list.querySelector('[data-list-item-index="' + index + '"]');
    this.moveUnderline(htmlLiElement);
};

/**
 * Slides the underline to the list item 'menuItemElement'
 * 
 * @param {HTMLElement} menuItemElement The list item where the underline will slide to.
 * @param {bool} animate If true, the 'slide' effect is performed. If false, there will be no effect.
 */
UnderlineSlide.prototype.gotoMenuItem = function (menuItemElement, animate = true)
{
    this.carousel.gotoSlide(menuItemElement.dataset.listItemIndex, animate);
};

/**
 * Detaches the underline from its current HTML container, getting its width and left values.
 */
UnderlineSlide.prototype.detachUnderline = function()
{
    if (this.underline.style.position === 'absolute')
    {
        return;
    }

    const currentUnderlineHolder = this.underline.closest('[data-list-item-index]');
    this.underline.style.transition = 'none';
    this.underline.style.position = 'absolute';
    this.underline.style.left = currentUnderlineHolder.offsetLeft + 'px';
    this.underline.style.width = currentUnderlineHolder.offsetWidth + 'px';
    this.underline.offsetHeight;
    this.underline.style.transition = '';
};

/**
 * Slides the underline 'this.underline' to the menu item 'menuItemElement'.
 * @param {HTMLElement} menuItemElement The menu item where the underline will slide to.
 */
UnderlineSlide.prototype.moveUnderline = function (menuItemElement)
{
    this.list.querySelector('.nav__list__link--active').classList.remove('nav__list__link--active');
    menuItemElement.querySelector('.nav__list__link').classList.add('nav__list__link--active');
    
    this.detachUnderline();

    this.underline.dataset.currentParentIndex = menuItemElement.dataset.listItemIndex;
    this.underline.style.left = menuItemElement.offsetLeft + 'px';
    this.underline.style.width = menuItemElement.offsetWidth + 'px';
};

/**
 * Inserts the underline into the parent specified in its 'current-parent-index' attribute
 */
UnderlineSlide.prototype.insertUnderlineIntoNewParent = function()
{
    const newUnderlineParent = this.list.querySelector('.nav__list__item[data-list-item-index="' + this.underline.dataset.currentParentIndex + '"] .nav__list__underline_holder');
    newUnderlineParent.appendChild(this.underline);
    this.underline.style.position = 'static';
    this.underline.style.left = '0';
    this.underline.style.width = 'auto';
};

/**
 * To be executed when the transition ends to insert the underline in its new parent.
 * 
 * @param {event} event The event triggered when the transition ends.
 */
UnderlineSlide.prototype.underlineTransitionEnd = function(event)
{
    if (event.propertyName === 'left') 
    {
        this.insertUnderlineIntoNewParent();
    }
};

new UnderlineSlide();

})();