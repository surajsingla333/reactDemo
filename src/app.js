"use strict"

//React
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//React-Router
import {Route, Switch, BrowserRouter as Router, HashRouter} from 'react-router-dom';

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

import BooksList from './components/pages/booksList';
import BooksForm from './components/pages/booksForm';
import Cart from './components/pages/cart';
import Main from './main';

const Routes = (
    <Provider store={store}>
        <Router>
            <Main />
            <Switch>
                <Route path='/' exact component={BooksList}/>
                <Route path='/admin' component={BooksForm}/>
                <Route path='cart' component={Cart}/>
            </Switch>
        </Router>
    </Provider>
)



render(
    Routes, document.getElementById('app')
)

// // STEP 2 create and dispatch actions
// store.dispatch(postBooks(
//     [{
//         id: 1,
//         title: 'this is the book title',
//         description: 'this is the book description',
//         price: 55.5
//     },
//     {
//         id: 2,
//         title: 'this is the second book title',
//         description: 'this is the second book description',
//         price: 51.5
//     }]
// ));

// // DELETE a book
// store.dispatch(deleteBooks(
//     {id:1}
// ));

// // UPDATE a book
// store.dispatch(updateBooks(
//     {
//         id: 2,
//         title: 'this is the second book NEW title',
//         description: 'this is the second book NEW description'
//     }
// ));


// // --->> CART ACTIONS <<---

// // ADD to cart
// store.dispatch(addToCart([{id:2}]));