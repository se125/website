import React, { useContext, useState } from 'react'
import { useProducts } from '../../Hooks/useProduct'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import { json, Link } from 'react-router-dom';

export default function RecentProduct() {
  let { data, isError, isLoading } = useProducts()
  // console.log(data);
let{AddToWishList,DeleteMyProduct}=useContext(WishListContext)
  let { addProductToCart } = useContext(CartContext)
const [searchCon, setsearchCon] = useState([])
  const [loading, setloading] = useState(false)
const [currentId, setcurrentId] = useState(0)
const [wish, setwish] = useState(localStorage.getItem("wish")?localStorage.getItem("wish"):null)
  async function addToCart(id) {

setloading(true)
setcurrentId(id)
    let response = await addProductToCart(id)
  
    if (response.data.status == "success") {

setloading(false)
      console.log(response.data.message);
      toast.success(response.data.message)

    }else{
      
setloading(false)
      toast.error(response.data.message)
    }

  }


async function deleteHeart(id) {

  let res=await DeleteMyProduct(id)
  if (res.data.status==  "success") {
    setwish(res.data.data)
    localStorage.setItem("wish",JSON.stringify(res.data.data))
    toast.success(res.data.message)
    console.log(res);
  }else{
    setwish(res.data.data)
    localStorage.de("wish",JSON.stringify(res.data.data))
    toast.success(res.data.message)
    console.log(res);
  }
  
}
  async function AddProducttowishlist(id) {
let res=await AddToWishList(id)
// currentId(id)
if (res.data.status==  "success") {
  setwish(res.data.data)
  localStorage.setItem("wish",JSON.stringify(res.data.data))
  toast.success(res.data.message)
  console.log(res);
}else{
  toast.error(res.data.message)
}

    
  }

  async  function search(value) {
    console.log(value);
    let val=value.toLowerCase()
   
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
        let related=res.data.data.filter((product)=>product.title.toLowerCase().includes(val))
        console.log(related);
        setsearchCon(related)
        
    })
    .catch((err)=>{
        console.log(err);
    })
  
              
          }
    
    
  


  // console.log(data);

  if (isLoading) {
    return <>
      <div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0 row justify-center items-center'>
        <div className=''>
          <i className='fas fa-spinner fa-spin text-white text-center'></i>
        </div>

      </div>

    </>

  }
  return (
    <>
    <form className="w-[75%] mx-auto" onKeyUp={(e)=>{
      search(e.target.value)
    }}> 
  <input type="email" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SearchByName" />
</form>
      <div className='my-5 pb-8'>
        <div className='flex flex-wrap gap-5'>
  
          {searchCon.length==0?data?.map((product) => <div key={product.id} className='product  sm:w-[46%] md:w-[30%] lg:w-[23%] hover:shadow-lg hover:shadow-[#198754] p-5'>

<div  >
  <Link to={`/productdetails/${product.id}/${product.category.name}`}>
  <img src={product.imageCover} className='object-cover w-full' alt="Product" />

  <h3 className='text-[#4FA74F]'>{product?.category.name}</h3>
  <h3 className=''>{product?.title.split(" ").slice(0, 2).join(" ")}</h3>


  <div className='row justify-between'>
    <span>{product.price}EGP</span>
    <div className='row justify-between items-center'>
      <i className='fas fa-star text-yellow-200'></i>
      <span>{product?.ratingsAverage}</span>

    </div>

  </div>
  </Link>
</div>


<div className='flex justify-end items-center my-2'                         onClick={()=>{ wish?.includes(product.id)?deleteHeart(product.id):AddProducttowishlist(product.id)}}>

{wish?.includes(product?.id)?  <i className='fas fa-heart cursor-pointer text-red-600 '></i>:  <i className='fas fa-heart cursor-pointer'></i>}
</div>



<button onClick={() => addToCart(product?.id)} className='bg-emerald-600 text-white p-1 text-center w-[75%] rounded-md my-2 btn'>
  {loading && currentId == product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add To Cart"}</button>

</div>

):searchCon?.map((product) =>                <><div key={product.id} className='product  sm:w-[46%] md:w-[30%] lg:w-[23%] hover:shadow-lg hover:shadow-[#198754] p-5'>

<div  >
  <Link to={`/productdetails/${product.id}/${product.category.name}`}>
  <img src={product.imageCover} className='object-cover w-full' alt="Product" />

  <h3 className='text-[#4FA74F]'>{product?.category.name}</h3>
  <h3 className=''>{product?.title.split(" ").slice(0, 2).join(" ")}</h3>


  <div className='row justify-between'>
    <span>{product.price}EGP</span>
    <div className='row justify-between items-center'>
      <i className='fas fa-star text-yellow-200'></i>
      <span>{product?.ratingsAverage}</span>

    </div>

  </div>
  </Link>
</div>


<div className='flex justify-end items-center my-2'    onClick={()=>{ wish?.includes(product.id)?deleteHeart(product.id):AddProducttowishlist(product.id)}}>
{wish?.includes(product?.id)?  <i className='fas fa-heart cursor-pointer text-red-600 '></i>:  <i className='fas fa-heart cursor-pointer'></i>}

</div>



<button onClick={() => addToCart(product.id)} className='bg-emerald-600 text-white p-1 text-center w-[75%] rounded-md my-2 btn'>
  {loading && currentId == product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add To Cart"}</button>

</div></>          )}
        </div>
      </div>
    </>
  )
}