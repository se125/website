import React,{useContext} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { UserContext } from '../Context-user/UserContext'

// import { Button, Navbar } from "flowbite-react";
export default function Navbar() {

let{UserLogin,setUserLogin}=useContext(UserContext)
  
  let Navigate=useNavigate()
  function signOut() {
    setUserLogin(null)
    localStorage.removeItem("usertoken")
    Navigate("/login")
    
  }
  return (
  <>

  <div className='bg-gray-50 fixed top-0 left-0 right-0 z-50' >

    <div className='conatiner1 py-5 '>
<div className='flex flex-wrap justify-between items-center'>
<div className='flex justify-between items-center'>
  <i className='fas fa-cart-shopping text-emerald-600 text-2xl'></i>
  <h1 className='text-2xl font-semibold'>fresh cart</h1>
</div>

{UserLogin?
<>
<div >
  <NavLink className="p-2" to="">Home</NavLink>
  <NavLink className="p-2" to="cart">Cart</NavLink>
  <NavLink className="p-2" to="wishList">WishList</NavLink>
  <NavLink className="p-2" to="products">Products</NavLink>
  <NavLink className="p-2" to="categories">Catergories</NavLink>
  <NavLink className="p-2" to="brands">Brands</NavLink>
</div></>:null}
<div>

{UserLogin?<span className='cursor-pointer' onClick={()=>{
  signOut()
}}>SignOut</span>:<>
<NavLink className="p-2" to='login'>Login</NavLink>
<NavLink className="p-2" to='register'>Register</NavLink>
</>}


</div>

</div>
    </div>
     
  </div>
  </>

  
  )
}
