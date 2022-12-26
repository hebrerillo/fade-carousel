describe('Fading carousel', function ()
{
    beforeEach(function ()
    {
        jasmine.getFixtures().fixturesPath = fixturePath;
        loadFixtures(carouselFixture);
        this.fcarousel = new FCarousel(
                {
                    itemsClass: 'fcarousel-item',
                    opaqueClass: 'fcarousel-item--opaque'
                }
        );
        this.carouselItems = Array.from(document.querySelectorAll('.fcarousel-item'));
    });

    it('should hide all slides except the first one', function ()
    {
        this.carouselItems.forEach((carouselItem, index) => {
            expect(carouselItem.classList.contains('fcarousel-item')).toBe(true);
            if (index === 0)
            {
                expect(carouselItem.classList.contains('fcarousel-item--opaque')).toBe(true);
            }
            else
            {
                expect(carouselItem.classList.contains('fcarousel-item--opaque')).toBe(false);
            }
        });
    });
    
    it('should show the first slide when trying to go to a negative slide number or beyond the number of slides', function ()
    {
        this.fcarousel.gotoSlide(4000);
        expect(this.carouselItems[0].classList.contains('fcarousel-item--opaque')).toBe(true);
        this.fcarousel.gotoSlide(-3);
        expect(this.carouselItems[0].classList.contains('fcarousel-item--opaque')).toBe(true);
    });
    
    it('should show the desired slide number', function ()
    {
        this.fcarousel.gotoSlide(3);
        expect(this.carouselItems[3].classList.contains('fcarousel-item--opaque')).toBe(true);
    });
});
