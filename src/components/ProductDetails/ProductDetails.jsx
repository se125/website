"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react"

import React,{useEffect,useState,useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios  from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';
// import Categories from './../Category/Categories';
import Slider from "react-slick";

export default function ProductDetails() {


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
  let { addProductToCart } = useContext(CartContext)
  let {id,category }=useParams()


  const [relatedProduct, setrelatedProduct] = useState([])
    async function addToCart(id) {

        // setloading(true)
        // setcurrentId(id)
            let response = await addProductToCart(id)
          
            if (response.data.status == "success") {
        
        // setloading(false)
              console.log(response.data.message);
              toast.success(response.data.message)
        
            }else{
              
        // setloading(false)
              toast.error(response.data.message)
            }
        
          }
   
    console.log(id);
    const [product, setproduct] = useState(null)
 async   function ProductInfo(id) {


axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
.then((res)=>{
    console.log(res.data.data);
    setproduct(res.data.data)
})
.catch((err)=>{
    console.log(err);
    
})
        
    }
    async   function ProductCategory() {


        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res)=>{
            let related=res.data.data.filter((product)=>product.category.name==category)
            console.log(related);
            // setproduct(res.data.data)
            setrelatedProduct(related)
        })
        .catch((err)=>{
            console.log(err);
            
        })
                
            }
    useEffect(()=>{
        ProductInfo(id)
        ProductCategory()
    },[id,category])
  return (
    <>







<div className='sm:flex sm:flex-nowrap   sm:justify-center sm:items-center            p-4   flex justify-between items-center'>
<div className='sm:w-full md:w-1/4 object-cover'>
{/* <img src={product?.imageCover} alt="ProductDetails" /> */}
<Slider {...settings}>
    {product?.images.map((src)=>
    <img src={src} alt="" />
    )}
</Slider>

</div>
<div className='sm:w-full md:w-3/4 p-4'>

<h3 className='font-semibold sm:text-sm md:text-xl'>{product?.title}</h3>
<h4 className='text-gray-600'>{product?.description}</h4>
<h4>{product?.category.name}</h4>
<div className=' flex justify-between items-center'>
<span>{product?.price} EGP</span>
<span><i className='fas fa-star text-yellow-200'></i>{product?.ratingsAverage}</span>
</div>
<button onClick={() => addToCart(product.id)}  className='bg-emerald-600 text-white p-1 text-center w-full rounded-md my-2 btn'> 
Add To Cart</button> 
</div>

</div>



<div className='md:flex flex-wrap'>
{relatedProduct.length> 0? relatedProduct?.map((product)=> <div key={product.id} className=' my-5 sm:w-full md:w-1/2 lg:w-1/3  xl:w-1/6'> 

<div className='product'>
<Link to={`/productdetails/${product.id}/${product.category.name}`}>
<img src={product?.imageCover} className='w-full' alt="" />


<h3 className='text-[#4FA74F]'>{product?.category.name}</h3>
              <h3 className=''>{product?.title.split(" ").slice(0, 2).join(" ")}</h3>


              <div className='row justify-between'>
                <span>{product.price}EGP</span>
                <div className='row justify-between items-center'>
                  <i className='fas fa-star text-yellow-200'></i>
                  <span className='me-2'>{product?.ratingsAverage}</span>

                </div>

</div>
</Link>
</div>

</div>):null}
</div>

    </>
  )
}
