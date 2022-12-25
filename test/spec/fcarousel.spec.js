describe('Fading carousel', function ()
{
    //Basic specs when the carousel is first instantiated.
    describe('basic', function ()
    {
        beforeEach(function ()
        {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(carouselFixture);
            this.fcarousel = new FCarousel();
        });

        it('should return 0 as the current slide', function ()
        {
            expect(this.fcarousel.getCurrentSlideIndex()).toBe(0);
        });

        it('should hide all slides except the first one', function ()
        {
            document.querySelectorAll('.fcarousel-item').forEach((carouselItem, index) => {
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
    });
});
