import React from 'react'
import img from'../../assets/IMG-20240903-WA0002.jpg'
import img1 from'../../assets/IMG-20240903-WA0001.jpg'
import img3 from'../../assets/IMG-20240903-WA0003.jpg'
import img4 from'../../assets/IMG-20240903-WA0004.jpg'

import Slider from 'react-slick';
export default function FirstSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
      };
  return ( 
    <div className='w-[80%] my-10   mx-auto  flex justify-between '>
      
<div className='w-2/3 '>
<Slider {...settings}   >
<img src={img1 } className='w-full h-[400px] object-fill'  alt="" />
<img src={img} className='w-full h-[400px] object-fill'  alt="" />

</Slider>


</div>


<div className='w-1/3'>
<img src={img3} alt="" />
<img src={img4} alt="" />

</div>
    </div>
  )
}
