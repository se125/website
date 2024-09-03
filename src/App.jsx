import { Children, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart';
import WishList from './components/WishList/WishList';
import Categories from './components/Category/Categories';
import Brands from './components/Brands/Brands';
import { UserContextProvider } from './components/Context-user/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Products from './components/Products/Products';
import CartContextProvider from './components/Context/CartContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast, { Toaster } from 'react-hot-toast'
import WishListContextProvider from './components/Context/WishListContext'
import ProductDetails from './components/ProductDetails/ProductDetails'
import ForgotPassword from './components/ForgotPassword/ForgotPssword'
import CheckOut from './components/CheckOut/CheckOut'
import AllOrders from './components/AllOrders/AllOrders';
import Notfound from './components/NotFound/Notfound';


let query = new QueryClient()


let x = createBrowserRouter([{
  path: "", element: <Layout />, children: [
    { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: "login", element:<Login /> },
    { path: "register", element: <Register /> },
    { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute>},
    { path: "wishList", element:<ProtectedRoute><WishList /></ProtectedRoute>  },
    { path: "products", element:<ProtectedRoute> <Products /> </ProtectedRoute>},
    { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
    { path: "brands", element:<ProtectedRoute><Brands /></ProtectedRoute>  },
    { path: "forgotpassword", element: <ForgotPassword /> },
    { path: "CheckOut", element: <CheckOut/> },
      {path:"allorders",element:<AllOrders/>},
    { path: "productdetails/:id/:category", element: <ProductDetails /> },
         {path:"*",element:<Notfound/>}
  ]



}])


function App() {


  return (
    <>




      <UserContextProvider>
        <CartContextProvider>
          <WishListContextProvider>


            <QueryClientProvider client={query}>
              <RouterProvider router={x}></RouterProvider>
              <Toaster />
            </QueryClientProvider>
          </WishListContextProvider>
        </CartContextProvider>
      </UserContextProvider>





    </>
  )
}

export default App
