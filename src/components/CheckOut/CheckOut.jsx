import React,{useState,useContext} from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios  from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context-user/UserContext'
import { CartContext } from '../Context/CartContext'



export default function CheckOut() {
  let {UserLogin,setUserLogin}=useContext(UserContext)
const [Loading, setLoading] = useState(false)
  // let{UserToken,setUserToken}=useContext(userContext)
const [apierror, setapierror] = useState(null)
let Navigate=useNavigate()


let formik=useFormik({
    initialValues:{
 
    
    "details": "",
    "phone": "",
    "city": ""
    
    },
// validationSchema:valid,
    onSubmit : () =>
        handleChackOut(`66d4b51677324bf5fe4049ed`, `http://localhost:5175`)
  })


let {checkout} = useContext(CartContext)


 async function handleChackOut(cartId, url) {
  let data = await checkout(cartId, url, formik.values)
console.log(data);

//   console.log(data.session.url); 
window.location.href = data.data.session.url
  
    
    
  }


  let valid = Yup.object().shape({
      
        details:Yup.string().required("datails is required"),
        phone:Yup.string().required("phone is required"),
        city:Yup.string().required("city is required")
      })

      


  return (
   <>
   
   
{apierror?<h2 className='bg-red-500 text-black text-center p-3  w-1/4 mx-auto my-3'> 

  {apierror}
</h2>:null
}
<form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>

  <div className="mb-5">
    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
    <input 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.details}
        name='details'
    type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>
  {formik.errors.details && formik.touched.details ? <div className='bg-red-300'>
      <h3 className='text-red-700 p-2'>{formik.errors.details}</h3>
    </div> : null}

  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
    <input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.phone}
      name='phone'
     type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>

  {formik.errors.phone && formik.touched.phone ? <div className='bg-red-300'>
      <h3 className='text-red-700 p-2'>{formik.errors.phone}</h3>
    </div> : null}
    <div className="mb-5">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
    <input 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.city}
        name='city'
    type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>
  {formik.errors.city && formik.touched.city ? <div className='bg-red-300'>
      <h3 className='text-red-700 p-2'>{formik.errors.city}</h3>
    </div> : null}

 

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {Loading?<i className='fas fa-spinner fa-spin'></i>:"submit"}
    </button>

</form>


   
   </>
  )
}
