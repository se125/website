import React,{useState,useContext} from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios  from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context-user/UserContext'



export default function Login() {
  let {UserLogin,setUserLogin}=useContext(UserContext)
const [Loading, setLoading] = useState(false)
  // let{UserToken,setUserToken}=useContext(userContext)
const [apierror, setapierror] = useState(null)
let Navigate=useNavigate()







  function handleLogin(values) {
setLoading(true)

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)

    .then((res)=>{
      setLoading(false)

      if (res.data.message=="success") {
 
          console.log(res);
          // console.log(res);
          // setUserToken(res.data.token)
  
          localStorage.setItem("usertoken",res.data.token)
          setUserLogin(res.data.token)
          Navigate("/")
        
      
    }
     
    })
    .catch((err)=>{
      setLoading(false)
      // console.log(err.response.data.message);

      setapierror(err?.response?.data?.message)
      
    })
    
  }


  let valid = Yup.object().shape({
      
        email: Yup.string().email().required("email is reqiured"),
   
        password: Yup.string().matches(/^[a-zA-z0-9]{6,10}$/, "Password should be between 6 to 10 char").required("password is required"),
      
      })

      let formik=useFormik({
        initialValues:{
     
          email:"",

          password:"",
 
        },
 validationSchema:valid,
        onSubmit:handleLogin
      })



  return (
   <>
   
   
{apierror?<h2 className='bg-red-500 text-black text-center p-3  w-1/4 mx-auto my-3'> 

  {apierror}
</h2>:null
}
<form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>

  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        name='email'
    type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>
  {formik.errors.email && formik.touched.email ? <div className='bg-red-300'>
      <h3 className='text-red-700 p-2'>{formik.errors.email}</h3>
    </div> : null}

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
      name='password'
     type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>

  {formik.errors.password && formik.touched.password ? <div className='bg-red-300'>
      <h3 className='text-red-700 p-2'>{formik.errors.password}</h3>
    </div> : null}

 

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {Loading?<i className='fas fa-spinner fa-spin'></i>:"submit"}
    </button>



<div className='flex justify-between items-center text-black'>
  
<Link to={"/Register"}>
<p className=' my-3'> don't have account ? signUp Now</p>
</Link>
<Link to={"/forgotpassword"}>
<p className=' my-3'> ForgotPassword?</p>
</Link>
</div>
</form>


   
   </>
  )
}
