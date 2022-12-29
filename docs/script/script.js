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
    
    let dotsContainer = document.querySelector('.dots');
    dotsContainer.addEventListener('click', (event)=>
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
        dotsContainer.querySelectorAll('.dot').forEach((dotElement, index)=>
        {
            if (dotIndex === index)
            {
                dotElement.classList.add('dot--selected');
            }
            else
            {
                dotElement.classList.remove('dot--selected');
            }
        });
    }
    
})();

