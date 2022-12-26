describe('Fading carousel', function ()
{
    beforeEach(function ()
    {
        jasmine.getFixtures().fixturesPath = fixturePath;
        loadFixtures(carouselFixture);
        this.opaqueClass = 'fcarousel-item--opaque';
        this.itemsClass = 'fcarousel-item';
        this.fcarousel = new FCarousel(
                {
                    itemsClass: this.itemsClass,
                    opaqueClass: this.opaqueClass
                }
        );
        this.carouselItems = Array.from(document.querySelectorAll('.fcarousel-item'));
    });

    it('should hide all slides except the first one', function ()
    {
        checkCarouselItemIsOpaque(this.carouselItems, 0, this.opaqueClass, this.itemsClass);
    });
    
    it('should show the first slide when trying to go to a slide number greater than the number of slides', function ()
    {
        this.fcarousel.gotoSlide(4000);
        checkCarouselItemIsOpaque(this.carouselItems, 0, this.opaqueClass, this.itemsClass);
    });
    
    it('should show the last slide when trying to go to a slide negative number', function ()
    {
        this.fcarousel.gotoSlide(-3);
        checkCarouselItemIsOpaque(this.carouselItems, this.carouselItems.length - 1, this.opaqueClass, this.itemsClass);
    })
    
    it('should show the desired slide number', function ()
    {
        this.fcarousel.gotoSlide(3);
        checkCarouselItemIsOpaque(this.carouselItems, 3, this.opaqueClass, this.itemsClass);
    });
    
    it('should show the next desired slide', function ()
    {
        this.fcarousel.gotoNextSlide();
        checkCarouselItemIsOpaque(this.carouselItems, 1, this.opaqueClass, this.itemsClass);
    });

    it('should show the previous desired slide', function ()
    {
        this.fcarousel.gotoPreviousSlide();
        checkCarouselItemIsOpaque(this.carouselItems, this.carouselItems.length - 1, this.opaqueClass, this.itemsClass);
    });

    it('should retain the current slide when trying to show the current slide', function ()
    {
        checkCarouselItemIsOpaque(this.carouselItems, 0, this.opaqueClass, this.itemsClass);
        this.fcarousel.gotoSlide(0);
        checkCarouselItemIsOpaque(this.carouselItems, 0, this.opaqueClass, this.itemsClass);
    });
});
