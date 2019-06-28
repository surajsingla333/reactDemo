"use strict"

export function cartReducers(state={cart:[]}, action) {
    switch(action.type){

        case "GET_CART":
            return{...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).quantity}

        case "ADD_TO_CART":
            return {...state, cart:action.payload,
            totalAmount: totals(action.payload).amount,
            totalQty: totals(action.payload).quantity
            };
            break;

        case "DELETE_CART_ITEM":
            return {...state, cart:action.payload,
            totalAmount: totals(action.payload).amount,
            totalQty: totals(action.payload).quantity};
            break;

        case "UPDATE_CART":
           
            // // console.log("\n\n\nIN UPDATING CART\n\n\n\n");
            // // Create a copy of the current array of books
            // const currentBookToUpdate = [...state.cart]
            // // Determine at which index in books array is the book to be updated
            // const indexToUpdate = currentBookToUpdate.findIndex(function(book){
            //     return book._id === action._id;
            // })

            // const newBookToUpdate = {
            //     ...currentBookToUpdate[indexToUpdate],
            //     quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
            // }    

            // let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]

            // console.log("\n\n\nLEAVIN  G UPDATING CART\n\n\n\n");

            return {...state, cart:action.payload,
            totalAmount: totals(action.payload).amount,
            totalQty: totals(action.payload).quantity}
            break;
    }
    return state
}

// CALCULATE TOTAL
export function totals(payloadArr){
    const totalAmount = payloadArr.map(function(cartArr){
        return cartArr.price * cartArr.quantity;
    }).reduce(function(a,b) {
        return a+b;
    }, 0);

    const totalQty = payloadArr.map(function(qty){
        return qty.quantity;
    }).reduce(function(a,b) {
        return a+b;
    }, 0);

    return {amount:totalAmount.toFixed(2), quantity: totalQty}
}