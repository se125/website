import React,{useContext,  useEffect,useState} from 'react'
import { WishListContext } from '../Context/WishListContext'
import { CartContext } from './../Context/CartContext';

import toast, { Toaster } from 'react-hot-toast';
export default function WishList() {
  let {getLoggedToWishList,DeleteMyProduct}=useContext(WishListContext)
  const [Wish, setWish] = useState([])
  let { addProductToCart } = useContext(CartContext)
  
  async function addToCart(id) {

        let response = await addProductToCart(id)
      
        if (response.data.status == "success") {
    
    
       
          toast.success(response.data.message)
    
        }else{
          

          toast.error(response.data.message)
        }
    
      }
async function DeleteProduct(id) {
  let res=await DeleteMyProduct(id)

  if (res.data.status=="success") {
    console.log (res.data.data);
setWish(res.data.data)

  
  
}
}
  async function WishList() {
    let res=await getLoggedToWishList()
    if (res.data.status=="success") {
      console.log (res.data.data);
setWish(res.data.data)

      
    }else{
      console.log("errror")
    }
    

    
  }

  useEffect(()=>{
    WishList() 

  },[Wish])


  return (
   <>
   
{Wish.length==0?<><div className='text-center font-bold w-full shadow-md text-2xl h-10 py-20 '>
  <h1 className='ms-3'>Wishlist Is Empty</h1></div></>:
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
  {Wish?.map((product)=>    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td  className="p-4">
          <img src={product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      {product.title}
        </td>
       
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price}
        </td>
        <td className="px-6 py-4" key={product._id}>
          <span href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer" onClick={()=>{
            DeleteProduct(product?._id)
          }}>Remove</span>
        </td>

        <td>

          <button className='border-emerald-400 border-2 rounded-md p-3 text-black' onClick={()=>{
            addToCart(product._id)
          }}>Add to cart</button>
        </td>
      </tr>)}

    </tbody>
  </table>
</div>
  }


   </>
  )
}
