import { createContext } from "react";

import  axios from 'axios';

export let WishListContext=createContext()


export default function WishListContextProvider(props) {
    let headers = {
        token: localStorage.getItem("usertoken"),
    }

function AddToWishList(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:productId},{headers})
    .then((res)=>res)
    .catch((err)=>err)


}
function getLoggedToWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
    .then((res)=>res)
    .catch((err)=>err)


}

function DeleteMyProduct(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
    .then((res)=>res)
    .catch((err)=>err)


}
    return <WishListContext.Provider value={{AddToWishList,getLoggedToWishList,DeleteMyProduct}}>
{props.children}


    </WishListContext.Provider>
    
}