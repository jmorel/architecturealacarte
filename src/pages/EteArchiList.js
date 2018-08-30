import React from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, Marker } from 'react-leaflet';

import Footer from '../components/Footer';
import { ListHeader } from '../components/Header';
import PaginatedCardList from '../components/PaginatedCardList';

import './EteArchiList.css';
import '../components/Header.css';
import 'leaflet/dist/leaflet.css';
import { fetchLocationsIfNeeded } from '../actions';


export class EteArchiList extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchLocationsIfNeeded('https://jmorel.opendatasoft.com/api/v2/catalog/datasets/ete-archi/exports/json'));
    }

    render() {
        const {locations, history} = this.props;

        function navigateToDetails(location) {
            return () => {
                history.push(`/ete-archi/${location.getId()}`);
            }
        }

        return (
            <div className="EteArchi">
                <div className="Sidebar">
                    <ListHeader title="L'ete archi de David Abittan" />
                    <div className="Sidebar-content">
                        <p>
                            Durant l’été, <a href="">David Abittan</a> nous emmène chaque semaine sur <a href="">France Inter</a> à la découverte de toutes les époques de l’architecture de France.
                            </p>
                        <PaginatedCardList locations={locations}
                            onCardClick={navigateToDetails} />
                    </div>
                    <Footer />
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
                                icon={location.markerIcon}
                                onClick={navigateToDetails(location)} />
                        )}
                    </Map>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    locations: state.locations,
    history: ownProps.history,
});

export const EteArchiListContainer = connect(mapStateToProps)(EteArchiList);
