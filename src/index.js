import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Home from './pages/Home';
import EteArchi from './pages/EteArchi';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact component={Home} path="/"></Route>
            <Route component={EteArchi} path="/ete-archi"></Route>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
