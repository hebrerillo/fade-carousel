describe('Fading carousel', function ()
{
    beforeEach(function ()
    {
        this.opaqueClass = 'fcarousel-item--opaque';
        this.itemsClass = 'fcarousel-item';
        jasmine.getFixtures().fixturesPath = fixturePath;
        loadFixtures(carouselFixture);
    });

    //testing basic funcionality
    describe('basic', function ()
    {
        beforeEach(function ()
        {
            this.options = {
                intervalDelay: 0
            };
            this.fcarousel = new FCarousel(this.options);
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
        });

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

    describe('interval', function ()
    {
        it('should show all the slides when playing an interval', function ()
        {
            let options = {
                itemsClass: this.itemsClass,
                opaqueClass: this.opaqueClass,
                fadeInDuration: 50,
                intervalDelay: 50
            };

            checkAllSlidesAreShowedInAnInterval(options);
        });

        it('should show all the slides when playing an interval which duration is smaller than the fade-in effect', function ()
        {
            let options = {
                itemsClass: this.itemsClass,
                opaqueClass: this.opaqueClass,
                fadeInDuration: 50,
                intervalDelay: 10  //Forcing the interval delay to be reduced to the 'fadeInDuration'
            };

            checkAllSlidesAreShowedInAnInterval(options);
        });
        
        it('should execute all callbacks when playing an interval', function (done)
        {
            const callback = function(index, itemsArray)
            {
                const dataIndex = Number(itemsArray[index].dataset.index);
                expect(dataIndex).toBe(index);
                if (index === (itemsArray.length - 1))
                {
                    done();
                }
            };

            let options = {
                fadeInDuration: 50,
                intervalDelay: 50,
                onstart: callback
            };

            new FCarousel(options);
        });

        it('should execute a callback when going to a specific slide', function ()
        {
            const slideToGo = 1;
            const callback = function(index)
            {
                debugger;
                expect(index).toBe(slideToGo);
            };

            let options = {
                intervalDelay: 0,
                onstart: callback
            };

            let carousel = new FCarousel(options);
            carousel.gotoSlide(slideToGo, false);
        });
        
    });

});
