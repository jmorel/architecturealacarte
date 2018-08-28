import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Home from './pages/Home';
import { EteArchiListContainer } from './pages/EteArchiList';
import { EteArchiDetailsContainer } from './pages/EteArchiDetails';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact component={Home} path="/"></Route>
            <Route exact component={EteArchiListContainer} path="/ete-archi"></Route>
            <Route component={EteArchiDetailsContainer} path="/ete-archi/:id"></Route>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
