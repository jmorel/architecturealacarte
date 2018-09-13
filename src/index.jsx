import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './index.scss';
import { CinquanteLieuxApp } from './pages/CinquanteLieux';
import { EteArchiApp } from './pages/EteArchi';
import { IleDeFranceApp } from './pages/IleDeFrance';
import { GenieDesLieuxApp } from './pages/GenieDesLieux';
import Home from './pages/Home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Redirect from="/ete-archi.html" to="/ete-archi" />
            <Redirect from="/genie-des-lieux.html" to="/genie-des-lieux" />
            <Redirect from="/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie.html" to="/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie" />
            <Redirect from="/journees-du-patrimoine-2015.html" to="/" />
            <Redirect from="/journees-du-patrimoine-2016.html" to="/" />
            <Redirect from="/journees-du-patrimoine-2017.html" to="/" />

            <Route exact component={Home} path="/" />
            <Route component={EteArchiApp} path="/ete-archi" />
            <Route component={IleDeFranceApp} path="/ile-de-france" />
            <Route component={GenieDesLieuxApp} path="/genie-des-lieux" />
            <Route component={CinquanteLieuxApp} path="/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie" />

        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
