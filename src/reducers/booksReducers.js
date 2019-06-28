"use strict"

// BOOKS REDUCERS
export function booksReducers(state={
    books:[]
}, action){
    switch(action.type){
        case "GET_BOOKS":
            // let books = state.books.concat(action.payload)
            return {...state, books:[...action.payload]}
            break;

        case "POST_BOOK":
            // let books = state.books.concat(action.payload)
            return {...state, books:[...state.books, ...action.payload], msg:'Saved! Click to cuntinue', style:"success", validation:'success'}
            break;
        
        case "POST_BOOK_REJECTED":
            // let books = state.books.concat(action.payload)
            return {...state, msg:'Please try again.', style:'danger', validation:'error'}
            break;

        case "RESET_BUTTON":
            // let books = state.books.concat(action.payload)
            return {...state, msg:null, style:'primary', validation:null}
            break;

        case "DELETE_BOOK":
            // Create a copy of the current array of books
            const currentBookToDelete = [...state.books]
            // Determine at which index in books array is the book to be deleted
            const indexToDelete = currentBookToDelete.findIndex(function(book){
                return book._id == action.payload;
            })
            // use slice to remove the book at the specified index
            return {books:[...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]}
            break;

        case "UPDATE_BOOK":
            // Create a copy of the current array of books
            const currentBookToUpdate = [...state.books]
            // Determine at which index in books array is the book to be updated
            const indexToUpdate = currentBookToUpdate.findIndex(function(book){
                return book._id === action.payload._id;
            })
            // Create a new book object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat methods to
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title,
                description: action.payload.description
            }    
            // logs the newBookToUpdate variable
            console.log("what is it newBookToUpdate", newBookToUpdate);
            // use slice to remove the book at the specified index, replace with the new object and concatenate
            return {books:[...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]}
            break;
    }
    return state;
}