import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useProducts() {
    function GetProducts() {

    
        
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)

        
    }
    let ProductInfo=useQuery({
        queryKey:['RecentProduct'],
        queryFn:GetProducts,
        select:(data)=>data?.data?.data

    })
    return ProductInfo
}