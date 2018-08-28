import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';

import { DetailsHeader } from '../components/Header';
import { EteArchiLocation } from '../models/Location';

import './EteArchiDetails.css';

export class EteArchiDetailsContainer extends React.Component {
    state = {
        locations: [],
    }

    componentDidMount() {
        axios
            .get('https://jmorel.opendatasoft.com/api/v2/catalog/datasets/ete-archi/exports/json')
            .then(res => {
                const locations = res.data.map(locationData => new EteArchiLocation(locationData));
                this.setState({
                    locations: locations,
                });
            })
    }

    render() {
        const currentLocation = this.state.locations.filter(location => location.getId() === this.props.match.params.id)[0];
        return (
            <EteArchiDetails locations={this.state.locations}
                currentLocation={currentLocation}
                history={this.props.history} />

        )
    }
}

export function EteArchiDetails({ locations, currentLocation, history }) {
    function navigateToList() {
        history.push('/ete-archi');
    }

    function navigateToDetails(location) {
        return () => {
            history.push(location.getDetailsUrl());
        }
    }

    return (
        <div className="EteArchi">
            <div className="Sidebar">
                <DetailsHeader location={currentLocation}
                    navigateToList={navigateToList} />
                <div className="Sidebar-content">
                    <p>
                        {currentLocation.data.description}
                    </p>
                    <p>
                        <a href={currentLocation.data.podcast}>Ecouter l'épisode</a>
                    </p>
                    <p>
                        Crédits photos: {currentLocation.getImageCredits()}
                    </p>
                </div>
            </div>
            <main>
                <Map center={[51.505, -0.09]} zoom={7}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {locations.filter(location => location.getLatLon()).map(location =>
                        <Marker key={location.getId()}
                            position={location.getLatLon()}
                            icon={location.getId() === currentLocation.getId() ? location.markerIcon : location.collapsedMarkerIcon}
                            onClick={navigateToDetails(location)} />
                    )}
                </Map>
            </main>
        </div>
    )
}
