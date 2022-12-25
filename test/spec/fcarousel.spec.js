describe('Fading carousel', function ()
{
    //Basic specs for the carousel.
    describe('basic', function ()
    {
        beforeEach(function ()
        {
            this.fcarousel = new FCarousel({});
        });

        it('should return 0 as the current slide when the carousel is just instantiated', function ()
        {
            expect(this.fcarousel.getCurrentSlideIndex()).toBe(0);
        });
    });
});