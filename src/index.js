import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Home from './pages/Home';
import { EteArchiListContainer  } from './pages/EteArchiList';
import { EteArchiDetailsContainer } from './pages/EteArchiDetails';

import eteArchiApp from './reducers'

const store = createStore(
    eteArchiApp,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact component={Home} path="/"></Route>
                <Route exact component={EteArchiListContainer} path="/ete-archi"></Route>
                <Route component={EteArchiDetailsContainer} path="/ete-archi/:id"></Route>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
