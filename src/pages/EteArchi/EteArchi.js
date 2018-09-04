import React from 'react';

// components
import PaginatedCardList from '../../components/PaginatedCardList';
import {LocationCard} from '../../components/LocationCard';
import {PageLayout} from '../../components/PageLayout';

// page components
import { EteArchiSpinnerSidebar, EteArchiListSidebarContainer, EteArchiDetailsSidebar } from './components/EteArchiSidebars';
import {getImageUrl} from './eteArchiUtils';

// 3rd part components
import { Marker } from 'react-leaflet';

// redux
import { connect } from 'react-redux';
import { fetchLocationsIfNeeded } from '../../actions';
import { INITIAL_PAGE_STATE } from '../../reducers';

// other libs
import L from 'leaflet';

import './EteArchi.css';

export const PAGE_NAME = 'EteArchi';


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

export class EteArchiList extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToDetails = this.navigateToDetails.bind(this);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchLocationsIfNeeded(PAGE_NAME, 'https://jmorel.opendatasoft.com/api/v2/catalog/datasets/ete-archi/exports/json'));

    }

    navigateToDetails(date) {
        return () => {
            this.props.history.push(`/ete-archi/${date}`);
        }
    }

    render() {
        const { locations, isFetching, match } = this.props;
        const currentLocation = !isFetching && match.params.id && locations.find(location => location.date = match.params.id);

        let sidebar;
        if (isFetching) {
            sidebar = <EteArchiSpinnerSidebar/>
        } else if (currentLocation) {
            sidebar = <EteArchiDetailsSidebar currentLocation={currentLocation}/>;
        } else {
            sidebar = <EteArchiListSidebarContainer/>;
        }

        const markers = locations
            .filter(location => location.coordonnees)
            .map(location =>
                <Marker key={location.date}
                    position={location.coordonnees}
                    icon={buildMarkerIcon(location, currentLocation && currentLocation.date !== location.date)}
                    onClick={this.navigateToDetails(location.date)} />
            );
        return <PageLayout
            sidebar={sidebar}
            markers={markers}
            defaultPosition={[51.505, -0.09]}
            defaultZoom={7} />
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...(state[PAGE_NAME] || INITIAL_PAGE_STATE),
    history: ownProps.history,
});

export const EteArchiListContainer = connect(mapStateToProps)(EteArchiList);
