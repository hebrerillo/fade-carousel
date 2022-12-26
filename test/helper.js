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
    itemsArray.forEach((item, index)=>
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
