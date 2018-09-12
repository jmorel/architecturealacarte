import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { fetchLocations } from '../actions';
import { coordinatesPropSelector, currentLocationSelector, datasetIdSelector, defaultPositionSelector, defaultZoomSelector, filteredLocationsWithCoordinatesSelector, idPropSelector, imagePropSelector, isFetchingSelector, listUrlSelector, pageTitleSelector } from '../selectors';
import { buildMarkerIcon } from '../utils';
import { ListSidebarContainer } from './ListSidebar';
import { PageLayout } from './PageLayout';
import { SpinnerSidebarContainer } from './SpinnerSidebar';

export class Page extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToDetails = this.navigateToDetails.bind(this);
    }

    componentDidMount() {
        const { PAGE_TITLE } = this.props;
        document.title = `${PAGE_TITLE} | Architecture à la carte`;
        this.props.dispatch(fetchLocations());
    }

    navigateToDetails(id) {
        return () => {
            this.props.history.push(`${this.props.LIST_URL}/${id}`);
        };
    }

    render() {
        const {
            // conf
            LIST_URL,
            DEFAULT_POSITION,
            DEFAULT_ZOOM,
            ID_PROP,
            COORDINATES_PROP,
            IMAGE_PROP,
            DATASET_ID,

            // app data
            locationsWithCoordinates,
            currentLocation,
            isFetching,

            // props
            ListSidebarComponent,
            DetailsSidebarComponent,
            SpinnerSidebarComponent,
        } = this.props;


        const sidebar = isFetching ? <SpinnerSidebarComponent /> : (
            <div>
                <Route path={LIST_URL} exact component={ListSidebarComponent} />
                <Route path={`${LIST_URL}/:id`} component={DetailsSidebarComponent} />
            </div>
        );

        const markers = locationsWithCoordinates.map(location => (
            <Marker
                key={location[ID_PROP]}
                position={location[COORDINATES_PROP]}
                icon={buildMarkerIcon(DATASET_ID, location[IMAGE_PROP], currentLocation && currentLocation !== location)}
                onClick={this.navigateToDetails(location[ID_PROP])}
            />
        ));
        return (
            <PageLayout
                sidebar={sidebar}
                markers={markers}
                defaultPosition={DEFAULT_POSITION}
                defaultZoom={DEFAULT_ZOOM}
            />
        );
    }
}

Page.propTypes = {
    PAGE_TITLE: PropTypes.string.isRequired,
    LIST_URL: PropTypes.string.isRequired,
    ID_PROP: PropTypes.string.isRequired,
    IMAGE_PROP: PropTypes.string.isRequired,
    DATASET_ID: PropTypes.string.isRequired,
    COORDINATES_PROP: PropTypes.string.isRequired,
    DEFAULT_ZOOM: PropTypes.number.isRequired,
    DEFAULT_POSITION: PropTypes.arrayOf(PropTypes.number).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    locationsWithCoordinates: PropTypes.array.isRequired,
    currentLocation: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    ListSidebarComponent: PropTypes.element,
    DetailsSidebarComponent: PropTypes.element.isRequired,
    SpinnerSidebarComponent: PropTypes.element,
};

Page.defaultProps = {
    SpinnerSidebarComponent: SpinnerSidebarContainer,
    ListSidebarComponent: ListSidebarContainer,
};

const mapStateToProps = (state, ownProps) => ({
    // conf
    LIST_URL: listUrlSelector(state),
    DEFAULT_POSITION: defaultPositionSelector(state),
    DEFAULT_ZOOM: defaultZoomSelector(state),
    ID_PROP: idPropSelector(state),
    COORDINATES_PROP: coordinatesPropSelector(state),
    IMAGE_PROP: imagePropSelector(state),
    DATASET_ID: datasetIdSelector(state),
    PAGE_TITLE: pageTitleSelector(state),

    // app data
    locationsWithCoordinates: filteredLocationsWithCoordinatesSelector(state),
    currentLocation: currentLocationSelector(state),
    isFetching: isFetchingSelector(state),
    ...ownProps,
});

export const PageContainer = connect(mapStateToProps)(Page);
export const PageContainerWithRouter = withRouter(PageContainer);

