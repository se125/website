import React from 'react'
import { useEffect, useState } from 'react';
import axios from'axios';
import Products from './../Products/Products';

export default function Categories() {
  const [caterios, setcaterios] = useState([])
function GetALLCategory() {
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then((res)=>{
    // console.log(res.data.data);
    setcaterios(res.data.data)
    
  }).catch((err)=>{
    console.log(err);
    
  })
  




}



useEffect(()=>{
  GetALLCategory()

},[])
  return (
    <>
   <div className='my-5'>
    <div className='row gab-6  justify-between'>
    {caterios.map((cate)=><>
<div key={cate.id} className='w-[32%] border mb-4 rounded-md'  >
 <div>
 <img src={cate?.image} className='w-full h-[350px]  object-fill' alt="" />
 </div>
 <div className='py-8 text-center text-emerald-600'>
  <h1>{cate.name}</h1>
 </div>
</div>

  
    
    
    </>


    

    )}
      </div>

</div>
    </>
  )


}
