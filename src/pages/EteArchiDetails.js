import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';

import { DetailsHeader } from '../components/Header';
import { EteArchiLocation } from '../models/Location';

import './EteArchiDetails.css';

class EteArchiDetails extends React.Component {
    state = {
        locations: [],
        currentLocation: new EteArchiLocation({image: {url: ''}}),
    }

    componentDidMount() {
        axios
            .get('https://jmorel.opendatasoft.com/api/v2/catalog/datasets/ete-archi/exports/json')
            .then(res => {
                const locations = res.data.map(locationData => new EteArchiLocation(locationData));
                this.setState({
                    locations: locations,
                    currentLocation: locations.filter(location => location.getId() === this.props.match.params.id)[0] || {},
                });
            })
    }

    render() {
        const navigateToList = () => {
            this.props.history.push('/ete-archi');
        }

        return (
            <div className="EteArchi">
                <div className="Sidebar">
                    <DetailsHeader location={this.state.currentLocation}
                                    navigateToList={navigateToList}/>
                    <div className="Sidebar-content">
                        <p>
                            {this.state.currentLocation.data.description}
                        </p>
                        <p>
                            <a href={this.state.currentLocation.data.podcast}>Ecouter l'épisode</a>
                        </p>
                        <p>
                            Crédits photos: {this.state.currentLocation.getImageCredits()}
                        </p>
                    </div>
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
                                    icon={location.getId() === this.state.currentLocation.getId() ? location.imageMarkerIcon : location.simpleMarkerIcon}
                                    onClick={navigateToList}/>
                        )}
                    </Map>
                </main>
            </div>
        )
    }
}

export default EteArchiDetails;