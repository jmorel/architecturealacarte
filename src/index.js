import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Home from './pages/Home';
import EteArchiList from './pages/EteArchiList';
import EteArchiDetails from './pages/EteArchiDetails';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact component={Home} path="/"></Route>
            <Route exact component={EteArchiList} path="/ete-archi"></Route>
            <Route component={EteArchiDetails} path="/ete-archi/:date"></Route>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
