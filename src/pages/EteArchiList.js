import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';

import Footer from '../components/Footer';
import {ListHeader} from '../components/Header';
import PaginatedCardList from '../components/PaginatedCardList';
import {EteArchiLocation} from '../models/Location';

import './EteArchiList.css';
import '../components/Header.css';
import 'leaflet/dist/leaflet.css';


class EteArchiList extends Component {
    state = {
        locations: []
    }

    componentDidMount() {
        axios
            .get('https://jmorel.opendatasoft.com/api/v2/catalog/datasets/ete-archi/exports/json')
            .then(res => {
                const locations = res.data.map(locationData => new EteArchiLocation(locationData));
                this.setState({ locations: locations });
            })
    }


    render() {
        const history = this.props.history;
        function navigateToDetails(location) {
            return () => {
                history.push(`/ete-archi/${location.getId()}`);
            }
        }
        return (
            <div className="EteArchi">
                <div className="Sidebar">
                    <ListHeader title="L'ete archi de David Abittan"/>
                    <div className="Sidebar-content">
                        <p>
                            Durant l’été, <a href="">David Abittan</a> nous emmène chaque semaine sur <a href="">France Inter</a> à la découverte de toutes les époques de l’architecture de France.
                        </p>
                        <PaginatedCardList locations={this.state.locations}
                        onCardClick={navigateToDetails}/>
                    </div>
                    <Footer />
                </div>
                <main>
                    <Map center={[51.505, -0.09]} zoom={7}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        {this.state.locations.filter(location => location.getLatLon()).map(location =>
                            <Marker key={location.getId()}
                                position={location.getLatLon()}
                                icon={location.imageMarkerIcon}
                                onClick={navigateToDetails(location)} />
                        )}
                    </Map>
                </main>
            </div>
        )
    }
}

export default EteArchiList;