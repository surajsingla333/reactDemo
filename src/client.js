// "use strict"

// //React
// import React from 'react';
// import {render} from 'react-dom';
// import {Provider} from 'react-redux';
// //React-Router
// import {BrowserRouter as Router} from 'react-router-dom';

// import {applyMiddlewarem, createStore, applyMiddleware} from 'redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

// // IMPORT COMBINED REDUCERS
// import reducers from './reducers/index'

// // IMPORT ACTIONS
// import {addToCart} from './actions/cartActions'
// // import {postBooks, deleteBooks, updateBooks} from './actions/booksActions'

// // STEP 1 create store
// const middleware = applyMiddleware(thunk, logger);

// const initialState = window.INITIAL_STATE;

// const store = createStore(reducers, initialState, middleware);

// // import BooksList from './components/pages/booksList';
// // import BooksForm from './components/pages/booksForm';
// // import Cart from './components/pages/cart';
// // import Main from './main';

// import routes from './routes'

// const Routes = (
//     <Provider store={store}>
//         {/* <Router>
//             <Main />
//             <Switch>
//                 <Route path='/' exact component={BooksList}/>
//                 <Route path='/admin' component={BooksForm}/>
//                 <Route path='cart' component={Cart}/>
//             </Switch>
//         </Router> */}
//         {routes}
//     </Provider>
// )



// render(
//     Routes, document.getElementById('app')
// )


"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// REACT-ROUTER
import {BrowserRouter} from 'react-router-dom';
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
// STEP 1 create the store
const middleware =applyMiddleware(thunk, logger);
// WE WILL PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE;
const store = createStore(reducers,initialState, middleware);

import routes from './routes'
const Routes = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);