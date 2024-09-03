import React,{useState,useEffect} from 'react'
import Slider from "react-slick";
import axios from 'axios';
import Categories from './../Category/Categories';
export default function SecondSlider() {
const [Categories, setCategories] = useState([])
var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
  };
    function GetSlider() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((res)=>{
            console.log(res)
            setCategories(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
    useEffect(()=>{
        GetSlider()
    },[])
  return (
    <>
    <h2 className='my-4 text-gray-600 capitalize font-semibold'>Shop populer Catergories</h2>
    <Slider {...settings}>


{Categories?.map((src)=>

<div key={src._id } className='my-8'>
    <img src={src?.image
} className='w-full h-[350px]' alt="" />
    <h2>{src.name}</h2>
</div>
)}

    </Slider>
    </>
  )
}
