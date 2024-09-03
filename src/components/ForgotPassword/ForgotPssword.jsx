import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios  from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'


export default function ForgotPassword() {

    function HandleForgot(values) {
        console.log(values);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
        .then((res)=>{
            console.log(res);
            
        })
        
    }

    
  let valid = Yup.object().shape({
      
    email: Yup.string().email().required("email is reqiured"),

  
  })

    let Formik=useFormik({
        initialValues:{
            email:""
        },
        validationSchema:valid,
        onSubmit:HandleForgot,
    })
  return (
<>
<div className='shadow-md p-8  my-8'>
<form className="w-[75%] mx-auto" onSubmit={Formik.handleSubmit} >

<div className="mb-5">
  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
  <input 
      onChange={Formik.handleChange}
      onBlur={Formik.handleBlur}
      value={Formik.values.email}
      name='email'
  type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
</div>
{Formik.errors.email &&Formik.touched.email ? <div className='bg-red-300'>
      <h3 className='text-red-700 p-2'>{Formik.errors.email}</h3>
    </div> : null}




 <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
submit
  </button> 





</form> 
</div>
</>
  )
}
