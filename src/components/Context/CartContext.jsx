import axios from "axios";
import { createContext, useEffect } from "react";



export let CartContext = createContext();

export default function CartContextProvider(props) {


    let headers = {
        token: localStorage.getItem("usertoken"),
    }


    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productId }, { headers })
            .then((res) => res)
            .catch((err) => err);
    }

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => {
                // console.log(res);
                return res

            })
            .catch((err) => {
                console.log(err);

            })

    }
    function UpdateCart(ProductId, NewCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`, { count: NewCount }, { headers })
            .then((res) => {
                // console.log(res);
                return res

            })
            .catch((err) => {
                console.log(err);

            })

    }
    function deleteProduct(ProductId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`, { headers })
            .then((res) => {
                // console.log(res);
                return res

            })
            .catch((err) => {
                console.log(err);

            })

    }

    function checkout(cartId, url, formData) {
        return axios
            .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
                shippingAddress: formData
            }, {
                headers, 
            }

            )
            .then((res) => {
                // console.log(res);
                return res

            })
            .catch((err) => {
                console.log(err);

            })

    }



    function DeleteALLProduct() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => {
                // console.log(res);
                return res

            })
            .catch((err) => {
                console.log(err);

            })

    }



    useEffect(() => {
        getLoggedUserCart()
    }, [])

    return <CartContext.Provider value={{ addProductToCart, getLoggedUserCart, UpdateCart, deleteProduct, DeleteALLProduct, checkout }}>
        {props.children}
    </CartContext.Provider>
}