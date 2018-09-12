import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.scss';
import { CinquanteLieuxApp } from './pages/CinquanteLieux';
import { EteArchiApp } from './pages/EteArchi';
import { IleDeFranceApp } from './pages/IleDeFrance';
import { GenieDesLieuxApp } from './pages/GenieDesLieux';
import Home from './pages/Home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact component={Home} path="/" />
            <Route component={EteArchiApp} path="/ete-archi" />
            <Route component={IleDeFranceApp} path="/ile-de-france" />
            <Route component={GenieDesLieuxApp} path="/genie-des-lieux" />
            <Route component={CinquanteLieuxApp} path="/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie" />
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
