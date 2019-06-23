"use strict"

// ADD to CART
export function addToCart(book){
    return {
        type:"ADD_TO_CART", 
        payload:book
    }
}