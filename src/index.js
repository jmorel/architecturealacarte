import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import { CinquanteLieuxContainer } from './pages/CinquanteLieux/CinquanteLieux';
import { EteArchiContainer } from './pages/EteArchi/EteArchi';
import Home from './pages/Home/Home';
import { handleActions } from './reducers';
import registerServiceWorker from './registerServiceWorker';



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
                <Route component={EteArchiContainer} path="/ete-archi"></Route>
                <Route component={CinquanteLieuxContainer} path="/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie"></Route>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
