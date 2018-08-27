import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

import Footer from '../components/Footer';
import Header from '../components/Header';
import PaginatedCardList from '../components/PaginatedCardList';

import './EteArchi.css';
import '../components/Header.css';
import 'leaflet/dist/leaflet.css';

class EteArchi extends Component {
    state = {
        records: []
    }

    componentDidMount() {
        axios
            .get('https://jmorel.opendatasoft.com/api/v2/catalog/datasets/ete-archi/exports/json')
            .then(res => {
                this.setState({ records: res.data });
            })
    }

    render() {
        return (
            <div className="EteArchi">
                <div className="Sidebar">
                    <Header title="L'ete archi de David Abittan" homeLink={true} />
                    <div className="Sidebar-content">
                        <p>
                            Durant l’été, <a href="">David Abittan</a> nous emmène chaque semaine sur <a href="">France Inter</a> à la découverte de toutes les époques de l’architecture de France.
                        </p>
                        <PaginatedCardList items={this.state.records}></PaginatedCardList>
                    </div>
                    <Footer />
                </div>
                <main>
                    <Map center={[51.505, -0.09]} zoom={13}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                        </Marker>
                    </Map>
                </main>
            </div>
        )
    }
}

export default EteArchi;