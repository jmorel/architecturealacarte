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
import { EteArchiListContainer  } from './pages/EteArchi/EteArchi';
import { CinquanteLieuxContainer } from './pages/CinquanteLieux/CinquanteLieux';

import {handleActions} from './reducers'

const store = createStore(
    handleActions,
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
                <Route component={EteArchiListContainer} path="/ete-archi/:id"></Route>

                <Route exact component={CinquanteLieuxContainer} path="/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie"></Route>
                <Route component={CinquanteLieuxContainer} path="/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/:id"></Route>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
