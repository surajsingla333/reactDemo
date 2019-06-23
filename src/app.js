"use strict"
import {applyMiddlewarem, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index'

// IMPORT ACTIONS
import {addToCart} from './actions/cartActions'
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions'

// STEP 1 create store
const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);

// store.subscribe(function(){
//     console.log('current state is ', store.getState());
//     // console.log('current price', store.getState()[0].price);
// })


// STEP 2 create and dispatch actions
store.dispatch(postBooks(
    [{
        id: 1,
        title: 'this is the book title',
        description: 'this is the book description',
        price: 55.5
    },
    {
        id: 2,
        title: 'this is the second book title',
        description: 'this is the second book description',
        price: 51.5
    }]
));

// DELETE a book
store.dispatch(deleteBooks(
    {id:1}
));

// UPDATE a book
store.dispatch(updateBooks(
    {
        id: 2,
        title: 'this is the second book NEW title',
        description: 'this is the second book NEW description'
    }
));


// --->> CART ACTIONS <<---

// ADD to cart
store.dispatch(addToCart([{id:2}]));