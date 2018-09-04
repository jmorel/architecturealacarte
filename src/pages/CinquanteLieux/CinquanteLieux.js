import React from 'react';

// components
import LocationCard from '../../components/LocationCard';
import { PageLayout } from '../../components/PageLayout';
import { Spinner } from '../../components/Spinner';

// page components
import { CinquanteLieuxDetailsSidebarWithRouter } from './components/CinquanteLieuxDetailsSidebar';
import { CinquanteLieuxListSidebar } from './components/CinquanteLieuxListSidebar';

// 3rd part components
import { Redirect } from 'react-router-dom';
import { Marker } from 'react-leaflet';

// redux
import { connect } from 'react-redux';
import { fetchLocationsIfNeeded } from '../../actions';
import { INITIAL_PAGE_STATE } from '../../reducers';

// other libs
import L from 'leaflet';
import { CinquanteLieuxLocationCard } from './components/CinquanteLieuxLocationCard';

const PAGE_NAME = 'CinquanteLieux';

function PaginatedLocationCardsWithFilters({ locations, history }) {
    return <div>Paginated card list</div>
}


function navigateToList(history) {
    return () => history.push('/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/');
}


function getImageUrl(image) {
    if (image) {
        return `https://jmorel.opendatasoft.com/explore/dataset/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/files/${image.id}/300`;
    }
}

function renderLocationCard(location) {
    return <CinquanteLieuxLocationCard key={location.nom}
        title={location.nom}
        subtitle={location.description}
        category={location.categorie}
        imageUrl={getImageUrl(location.image)} />
}

function buildMarkerIcon(location, collapsed) {
    const image = location.image || { width: 50, height: 50 };
    const iconRadius = 50;
    const ratio = Math.min(image.width / iconRadius, image.height / iconRadius);
    const iconHeight = image.height / ratio;
    const iconWidth = image.width / ratio;
    return L.divIcon({
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        className: collapsed ? 'CollapsedMarkerIcon' : 'MarkerIcon',
        html: `<img src="/toto" alt="${location.titre}" width="${iconWidth}" height="${iconHeight}">`
    })
};

export class CinquanteLieux extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToDetails = this.navigateToDetails.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchLocationsIfNeeded(PAGE_NAME, 'https://jmorel.opendatasoft.com/api/v2/catalog/datasets/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/exports/json'));
    }

    navigateToDetails(id) {
        return () => {
            this.props.history.push(`/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/${id}`)
        }
    }

    render() {
        const { locations, isFetching, match, history } = this.props;
        const currentLocation = !isFetching && match.params.id && locations.find(location => location.nom === match.params.id);
        if (!isFetching && match.params.id && !currentLocation) {
            return <Redirect to='/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie' />
        }

        let sidebar;
        if (currentLocation) {
            sidebar = <CinquanteLieuxDetailsSidebarWithRouter currentLocation={currentLocation} navigateToList={navigateToList} />
        } else if (isFetching) {
            sidebar = <CinquanteLieuxListSidebar><Spinner /></CinquanteLieuxListSidebar>;
        } else {
            sidebar = <CinquanteLieuxListSidebar><PaginatedLocationCardsWithFilters history={history} locations={locations} /></CinquanteLieuxListSidebar>
        }

        const markers = locations
            .filter(location => location.coordonnees)
            .map(location => (
                <Marker key={location.nom}
                    onClick={this.navigateToDetails(location.nom)}
                    icon={buildMarkerIcon(location, false)}
                    position={location.coordonnees} />
            ));

        return <PageLayout sidebar={sidebar}
            markers={markers}
            defaultPosition={[51.505, -0.09]}
            defaultZoom={7} />;
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...(state[PAGE_NAME] || INITIAL_PAGE_STATE),
    history: ownProps.history,
});

export const CinquanteLieuxContainer = connect(mapStateToProps)(CinquanteLieux);
