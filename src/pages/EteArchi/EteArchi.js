import L from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { fetchLocations } from '../../actions';
import { PageLayout } from '../../components/PageLayout';
import { EteArchiDetailsSidebarContainer } from './components/EteArchiDetailsSidebar';
import { EteArchiListSidebarContainer } from './components/EteArchiListSidebar';
import { EteArchiSpinnerSidebar } from './components/EteArchiSpinnerSidebar';
import { getImageUrl } from './eteArchiUtils';
import { createSubStore } from '../../store';
import { Provider } from 'react-redux';
import { currentLocationSelector, isFetchingSelector, filteredLocationsWithCoordinatesSelector } from '../../selectors';

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
        document.title = 'L\'été Archi | Architecture à la carte';
        this.props.dispatch(fetchLocations());
    }

    navigateToDetails(date) {
        return () => {
            this.props.history.push(`/ete-archi/${date}`);
        }
    }

    render() {
        const { locationsWithCoordinates, currentLocation, isFetching } = this.props;

        const sidebar = isFetching ? <EteArchiSpinnerSidebar /> : (
            <div>
                <Route path="/ete-archi" exact component={EteArchiListSidebarContainer}></Route>
                <Route path="/ete-archi/:id" component={EteArchiDetailsSidebarContainer}></Route>
            </div>
        )

        const markers = locationsWithCoordinates.map(location =>
                <Marker key={location.date}
                    position={location.coordonnees}
                    icon={buildMarkerIcon(location, currentLocation && currentLocation !== location)}
                    onClick={this.navigateToDetails(location.date)} />
            );
        return <PageLayout
                    sidebar={sidebar}
                    markers={markers}
                    defaultPosition={[46.596170, 2.387703]}
                    defaultZoom={6} />
    }
}


const mapStateToProps = (state) => ({
    locationsWithCoordinates: filteredLocationsWithCoordinatesSelector(state),
    currentLocation: currentLocationSelector(state),
    isFetching: isFetchingSelector(state),
});

const EteArchiContainer = connect(mapStateToProps)(EteArchi);

const EteArchiContainerWithRouter = withRouter(EteArchiContainer);

export class EteArchiApp extends React.Component {
    constructor(props) {
        super(props);
        this.store = createSubStore(
            'date',
            'coordonnees',
            ['titre', 'description'],
            [{
                title: 'Saison',
                prop: 'saison',
                sort: '-value',
            }],
            'https://jmorel.opendatasoft.com/api/v2/catalog/datasets/ete-archi/exports/json');
    }

    render() {
        return (
            <Provider store={this.store}>
                <EteArchiContainerWithRouter />
            </Provider>
        )
    }
}
