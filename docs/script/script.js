'use strict';

//Side carousel
(function ()
{
    let sideCarouselOptions = {
        carousel: '#sideCarousel',
        side: 'right',
        intervalDelay: 4000,
        fadeInDuration: 2000,
        onstart: selectDot
    };

    let carousel = new FCarousel(sideCarouselOptions);
    
    let $dotsContainer = $('.dots');
    $dotsContainer.click((event)=>
    {
       const dot = event.target.closest('.dot');
       if (!dot)
       {
           return;
       }       
       carousel.gotoSlide(+dot.dataset.index);

    });

    function selectDot(dotIndex)
    {
        $dotsContainer.find('.dot').each((index, element)=>
        {
            if (dotIndex === index)
            {
                $(element).addClass('dot--selected');
            }
            else
            {
                $(element).removeClass('dot--selected');
            }
        });
    }
    
})();

