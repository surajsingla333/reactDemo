"use strict"
import axios from 'axios'
// import superagent from 'superagent'
// const axios = require('axios');

// GET BOOKS
export function getBooks(){
    return function(dispatch){
        axios.get('/api/books').then(function(response){
            // console.log("\n\Getting THE BOOK\n\n")
            dispatch({type:'GET_BOOKS', payload: response.data})
        }).catch(function(err){
            // console.log("\n\nERROR POSTING THE BOOK\n\n")
            dispatch({type:"GET_BOOKS_REJECTED", payload:err})
        })
    }
}

// POST BOOKS
export function postBooks(book){
    return function(dispatch){
        axios.post('/api/books', book).then(function(response){
            // console.log("\n\nPOSTING THE BOOK\n\n")
            dispatch({type:'POST_BOOK', payload: response.data})
        }).catch(function(err){
            // console.log("\n\nERROR POSTING THE BOOK\n\n")
            dispatch({type:"POST_BOOK_REJECTED", payload:"Error while posting a new book."})
        })
    }
}

// DELETE BOOKS
export function deleteBooks(id){
    return function(dispatch){
        axios.delete("/api/books/"+id).then(function(response){
            dispatch({type:"DELETE_BOOK", payload:id})
        }).catch(function(err){
            // console.log("\n\nERROR POSTING THE BOOK\n\n")
            dispatch({type:"DELETE_BOOK_REJECTED", payload:err})
        })
    }
}

// UPDATE BOOKS
export function updateBooks(book){
    return {
        type:"UPDATE_BOOK", 
        payload:book
    }
}

// RESET FORM BUTTON
export function resetButton(){
    return {
        type:"RESET_BUTTON", 
    }
}