"use strict"
import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE COMBINED
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers'

// COMBINE THE REDUCERS HERE
export default combineReducers({
    books: booksReducers,
    cart: cartReducers
})