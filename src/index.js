import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import { CinquanteLieuxContainer } from './pages/CinquanteLieux/CinquanteLieux';
import { EteArchiApp } from './pages/EteArchi/EteArchi';
import Home from './pages/Home/Home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact component={Home} path="/"></Route>
            <Route component={EteArchiApp} path="/ete-archi"></Route>
            <Route component={CinquanteLieuxContainer} path="/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie"></Route>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
