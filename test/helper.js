/**
 * Checks that the carousel item with index 'childIndex' is opaque, and the rest of the 
 * carousel items are not.
 * 
 * @param {type} itemsArray
 * @param {type} childIndex
 * @param {type} opaqueClass
 * @param {type} itemsClass
 */
function checkCarouselItemIsOpaque(itemsArray, childIndex, opaqueClass, itemsClass)
{
    itemsArray.forEach((item, index) =>
    {
        expect(item.classList.contains(itemsClass)).toBe(true);
        if (index === childIndex)
        {
            expect(item.classList.contains(opaqueClass)).toBe(true);
        }
        else
        {
            expect(item.classList.contains(opaqueClass)).toBe(false);
        }
    });
}

/**
 * When autoplaying an interval of slides, makes sure all the slides are shown.
 * 
 * @param {Object} options Some options for the carousel
 */
function checkAllSlidesAreShowedInAnInterval(options)
{
    new FCarousel(options);
    let carouselItems = Array.from(document.querySelectorAll(options.itemsClass));
    let promise = null;
    carouselItems.forEach(async (_, index) =>
    {
        promise = new Promise((resolve, _) =>
        {
            //Adding ten milliseconds to make sure the correct slide has enough time to be shown
            setTimeout(resolve, options.fadeInDuration + 10);
        });

        await promise.then(() =>
        {
            checkCarouselItemIsOpaque(carouselItems, index + 1, options.opaqueClass, options.itemsClass);
        });
    });
}