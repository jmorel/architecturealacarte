import L from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchLocationsIfNeeded } from '../../actions';
import { PageLayout } from '../../components/PageLayout';
import { EteArchiDetailsSidebarContainer } from './components/EteArchiDetailsSidebar';
import { EteArchiListSidebarContainer } from './components/EteArchiListSidebar';
import { EteArchiSpinnerSidebar } from './components/EteArchiSpinnerSidebar';
import { COORDINATES_PROP_NAME, DATASET_URL, getImageUrl, ID_PROP_NAME, mapStateToProps, SECTION_NAME } from './eteArchiUtils';

function buildMarkerIcon(location, collapsed) {
    const image = location.image;
    const iconRadius = 50;
    const ratio = Math.min(image.width / iconRadius, image.height / iconRadius);
    const iconHeight = image.height / ratio;
    const iconWidth = image.width / ratio;
    return L.divIcon({
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        className: collapsed ? 'CollapsedMarkerIcon' : 'MarkerIcon',
        html: `<img src="${getImageUrl(location)}" alt="${location.titre}" width="${iconWidth}" height="${iconHeight}">`
    })
};

export class EteArchi extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToDetails = this.navigateToDetails.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchLocationsIfNeeded(SECTION_NAME, ID_PROP_NAME, COORDINATES_PROP_NAME, DATASET_URL));
    }

    navigateToDetails(date) {
        return () => {
            this.props.history.push(`/ete-archi/${date}`);
        }
    }

    render() {
        const { locations, currentLocation, isFetching } = this.props;

        const sidebar = isFetching ? <EteArchiSpinnerSidebar/> : (
            <div>
                <Route path="/ete-archi" exact component={EteArchiListSidebarContainer}></Route>
                <Route path="/ete-archi/:id" component={EteArchiDetailsSidebarContainer}></Route>
            </div>
        )

        const markers = locations.withCoordinatesIds
            .map(id => locations.byId[id])
            .map(location =>
                <Marker key={location.date}
                    position={location.coordonnees}
                    icon={buildMarkerIcon(location, currentLocation && currentLocation.date !== location.date)}
                    onClick={this.navigateToDetails(location.date)} />
            );
        return <PageLayout
            sidebar={sidebar}
            markers={markers}
            defaultPosition={[46.596170, 2.387703]}
            defaultZoom={6} />
    }
}

export const EteArchiContainer = connect(mapStateToProps)(EteArchi);
