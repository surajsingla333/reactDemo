// "use strict"
// import axios from 'axios';
// // var axios = require('axios')
// import React from 'react';
// // var React = require('react')
// import {createStore} from 'redux';
// // var createStore = require('redux').createStore;
// import {Provider} from 'react-router';
// // var Provider = require('react-router').Provider;
// import{renderToString} from 'react-dom/server';
// // var renderToString = require('react-dom/server').renderToString
// // import {match, RouterContext} from 'react-router';
// import {StaticRouter} from 'react-router-dom';
// // var match  = require('react-router').match
// // var RouterContext  = require('react-router').RouterContext

// import reducers from './src/reducers/index'
// // var reducers = require('./src/reducers/index').combineReducers
// import routes from './src/routes'
// // var routes = require('./src/routes').routes

// function handleRender(req, res){
//     axios.get('http://localhost:3001/books').then(function(response){
//         // var myHtml = JSON.stringify(response.data);
//         // res.render('index', {myHtml});

//         // STEP-1 CREATE A REDUX STORE ON THE SERVER
//         const store = createStore(reducers, {'books':{'books':response.data}})

//         // STEP-2 GET INITIAL STATE FROM THE STORE
//         const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');

//         // STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTs AND DEFINE WHAT TO DO WITH THEM
        
//         const context = {};

//         console.log("How context looks like? ", context.url);
//             const reactComponent = renderToString(
//               <Provider store={store}>
//                 <StaticRouter
//                   location={req.url}
//                   context={context}>
//                   {routes}
//                 </StaticRouter>
//               </Provider>
//             );

//             if (context.url) {
//               // can use the `context.status` that
//               // we added in RedirectWithStatus
//               redirect(context.status, context.url)
//             } else {
//               res.status(200).render('index', {reactComponent, initialState})
//             }
//         // const Routes = {
//         //     routes:routes,
//         //     location: req.url
//         // }

//         // match(Routes, function(error, redirect, props){
//         //     if(error){
//         //         res.status(500).send("Error fullfillinf the request");
//         //     } else if(redirect){
//         //         res.status(301, redirect.pathname + redirect.search)
//         //     } else if(props){
//         //         const reactComponent = renderToString(
//         //             <Provider store={store}>
//         //                 <RouterContext {...props}/>
//         //             </Provider>
//         //         )
//         //         res.status(200).render('index', {reactComponent, initialState})
//         //     } else {
//         //         res.status(404).send('Not Found')
//         //     }
//         // })

//     }).catch(function(err){
//         console.log('#Initial Server-side rendering error', err);
//     })
// }

// module.exports = handleRender;


"use strict"
import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

// REACT-ROUTER 4 CHANGES
//import {match, RouterContext} from 'react-router';
import {StaticRouter} from 'react-router-dom';
//import { renderToString } from 'react-router-server';

import reducers from './src/reducers/index';
import routes from './src/routes';

function handleRender(req, res){
  axios.get('http://localhost:3001/books')
    .then(function(response){
        // var myHtml = JSON.stringify(response.data);
        // res.render('index', {myHtml});

        // STEP-1 CREATE A REDUX STORE ON THE SERVER
        const store = createStore(reducers, {"books":{"books":response.data}})
        // STEP-2 GET INITIAL STATE FROM THE STORE
        const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
        // STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTs AND DEFINE WHAT TO DO WITH THEM
        const context = {};
        console.log("How context looks like? ", context.url);
            const reactComponent = renderToString(
              <Provider store={store}>
                <StaticRouter
                  location={req.url}
                  context={context}>
                  {routes}
                </StaticRouter>
              </Provider>
            );

            if (context.url) {
              // can use the `context.status` that
              // we added in RedirectWithStatus
              redirect(context.status, context.url)
            } else {
              res.status(200).render('index', {reactComponent, initialState})
            }

      })
      .catch(function(err){
        console.log('#Initial Server-side rendering error', err);
      })
    }

module.exports = handleRender
