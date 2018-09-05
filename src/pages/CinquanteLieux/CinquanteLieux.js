import L from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { fetchLocationsIfNeeded } from '../../actions';
import { PageLayout } from '../../components/PageLayout';
import { CinquanteLieuxSpinnerSidebar } from './components/CinquanteLieuxSpinnerSidebar';
import { CinquanteLieuxDetailsSidebarContainer } from './components/CinquanteLieuxDetailsSidebar';
import { CinquanteLieuxListSidebarContainer } from './components/CinquanteLieuxListSidebar';
import { SECTION_NAME, ID_PROP_NAME, COORDINATES_PROP_NAME, DATASET_URL, mapStateToProps } from './cinquanteLieuxUtils';
import { Route } from 'react-router-dom';
import './CinquanteLieux.css';

function buildMarkerIcon(location, collapsed) {
    return L.divIcon({
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        className: (collapsed ? 'CollapsedMarkerIcon' : 'MarkerIcon') + ' CinquanteLieux-MarkerIcon--'+location.categorie[0],
    })
};

export class CinquanteLieux extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToDetails = this.navigateToDetails.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchLocationsIfNeeded(SECTION_NAME, ID_PROP_NAME, COORDINATES_PROP_NAME, DATASET_URL));
    }

    navigateToDetails(id) {
        return () => {
            this.props.history.push(`/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/${id}`)
        }
    }

    render() {
        const { locations, isFetching } = this.props;

        const sidebar = isFetching ? <CinquanteLieuxSpinnerSidebar /> : (
            <div>
                <Route path="/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie" exact component={CinquanteLieuxListSidebarContainer}></Route>
                <Route path="/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/:id" component={CinquanteLieuxDetailsSidebarContainer}></Route>
            </div>
        );

        const markers = locations.withCoordinatesIds
            .map(id => locations.byId[id])
            .map(location => (
                <Marker key={location.nom}
                    onClick={this.navigateToDetails(location.nom)}
                    icon={buildMarkerIcon(location, locations.currentId && location.nom !== locations.currentId)}
                    position={location.coordonnees} />
            ));

        return <PageLayout
            sidebar={sidebar}
            markers={markers}
            defaultPosition={[46.596170, 2.387703]}
            defaultZoom={6} />
    }
}

export const CinquanteLieuxContainer = connect(mapStateToProps)(CinquanteLieux);
