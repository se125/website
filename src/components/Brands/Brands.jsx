import React,{useEffect,useState} from 'react'
import axios from 'axios'
"use client";

import { Button, Modal } from "flowbite-react";

export default function Brands() {

  const [order, setorder] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [ordermodel, setordermodel] = useState(null)
  const [model, setmodel] = useState(null)
  function allBrands() {
    
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>{

      if (res.data.statusText="OK") {
        setorder(res.data.data)
        console.log(res.data.data);
      }
      
    }).catch((err)=>{
      console.log(err);
      
    })

    
  }
function modelid(id){
  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  .then((res)=>{
    console.log(res.data.data)  
    setmodel(res.data.data)  
  }).catch((err)=>{
    console.log(err);
    
  })
  
}


  useEffect(()=>{
    allBrands()
  },[])
  return (
    <>
 <div className='my-8'>
 <div className='text-emerald-500 my-5 text-center text-3xl font-semibold'>
<h1 >AllBrands</h1>
      
    </div>

<div className='row justify-between' >
{order?.map((ord)=><div key={ord._id} className='w-[22.5%] border my-4 rounded-md hover:shadow-lg hover:shadow-emerald-500'>

 <div onClick={() =>{
  modelid(ord._id)
   setOpenModal(true)}}>
 <img src={ord.image} className='w-full' alt="" />

<h1 className='text-center my-4 '>{ord?.name
}</h1>
 </div>
</div>)}
</div>
 </div>


    





  
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 flex justify-between items-center">
        <div className='W-1/2 py-4'>
          <h1 className='text-3xl font-semibold text-[#4FA74F]'>{model?.name}</h1>
          <h4>{model?.slug}</h4>
        </div>
<div className='w-1/2'>
  <img src={model?.image} className='w-full' alt="" />
</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
  


    </>
  )

}
