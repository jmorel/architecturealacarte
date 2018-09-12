import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt, faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { Mobile, Desktop } from './MediaQueries';
import './PageLayout.scss';
import './Spinner.scss';


library.add(faMapMarkedAlt, faThList);

const MapToggle = ({ onClick, isMapDisplayed }) => (
    <button
        className="PageLayout-mapToggle"
        onClick={onClick}
    >
        <FontAwesomeIcon icon={isMapDisplayed ? faThList : faMapMarkedAlt} />
    </button>
);

MapToggle.propTypes = {
    onClick: PropTypes.func.isRequired,
    isMapDisplayed: PropTypes.bool.isRequired,
};

const MapContainer = ({ defaultPosition, defaultZoom, markers }) => (
    <div className="PageLayout-mapContainer">
        <Map center={defaultPosition} zoom={defaultZoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {markers}
        </Map>
    </div>
);

MapContainer.propTypes = {
    markers: PropTypes.array.isRequired,
    defaultPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
    defaultZoom: PropTypes.number.isRequired,
};

export class PageLayout extends React.Component {
    constructor(props) {
        super(props);
        this.toggleMap = this.toggleMap.bind(this);
        this.state = {
            displayMap: false,
        };
    }

    toggleMap() {
        const { displayMap } = this.state;
        this.setState({ displayMap: !displayMap });
    }

    render() {
        const { sidebar, markers, defaultPosition, defaultZoom } = this.props;
        const { displayMap } = this.state;
        return (
            <div className="PageLayout">
                {sidebar}
                <Mobile>
                    { displayMap && <MapContainer markers={markers} defaultPosition={defaultPosition} defaultZoom={defaultZoom} /> }
                    <MapToggle onClick={this.toggleMap} isMapDisplayed={displayMap} />
                </Mobile>
                <Desktop>
                    <MapContainer markers={markers} defaultPosition={defaultPosition} defaultZoom={defaultZoom} />
                </Desktop>
            </div>
        );
    }
}

PageLayout.propTypes = {
    sidebar: PropTypes.node.isRequired,
    markers: PropTypes.array.isRequired,
    defaultPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
    defaultZoom: PropTypes.number.isRequired,
};
