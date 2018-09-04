import React from 'react';

import { connect } from 'react-redux';
import { INITIAL_PAGE_STATE } from '../../../reducers';
import { PAGE_NAME } from '../EteArchi';
import { setCurrentLocation, resetCurrentLocation, setCurrentPageIndex } from '../../../actions';

import { Link, Redirect } from 'react-router-dom';

import { ListHeader, DetailsHeader } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Sidebar } from '../../../components/Sidebar';
import { Spinner } from '../../../components/Spinner';
import { LocationCard } from '../../../components/LocationCard';
import { getImageUrl, getImageRatio } from '../eteArchiUtils';
import { PaginatedList } from '../../../components/PaginatedList';

function EteArchiSidebar({ children }) {
    return (
        <Sidebar>
            <ListHeader title="L'ete archi de David Abittan" />
            <div className="Sidebar-content">
                <p>
                    Durant l’été, <a href="">David Abittan</a> nous emmène chaque semaine sur <a href="">France Inter</a> à la découverte de toutes les époques de l’architecture de France.
                </p>
                {children}
            </div>
            <Footer />
        </Sidebar>
    )
}

export function EteArchiSpinnerSidebar() {
    return <EteArchiSidebar><Spinner /></EteArchiSidebar>;
}

export class EteArchiListSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.setCurrentPageIndex = this.setCurrentPageIndex.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(resetCurrentLocation(PAGE_NAME));
    }

    setCurrentPageIndex(index) {
        const { dispatch } = this.props;
        dispatch(setCurrentPageIndex(PAGE_NAME, index));
    }

    render() {
        const { locations, pagination } = this.props;
        return (
            <EteArchiSidebar>
                <PaginatedList lastIndex={pagination.lastIndex}
                    currentIndex={pagination.currentIndex}
                    setCurrentIndex={this.setCurrentPageIndex}>
                    {locations.currentPageIds
                        .map(id => locations.byId[id])
                        .map(location => (
                            <Link to={`/ete-archi/${location.date}`} key={location.date}>
                                <LocationCard title={location.titre} imageUrl={getImageUrl(location)} imageRatio={getImageRatio(location)} />
                            </Link>
                        ))}
                </PaginatedList>
            </EteArchiSidebar>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...(state[PAGE_NAME] || INITIAL_PAGE_STATE),
    ...ownProps,
});

export const EteArchiListSidebarContainer = connect(mapStateToProps)(EteArchiListSidebar);

export class EteArchiDetailsSidebar extends React.Component {
    getCurrentLocation() {
        const { locations, match } = this.props;
        return locations.byId[match.params.id];
    }

    _dispatchCurrentLocation() {
        const { dispatch } = this.props;
        const currentLocation = this.getCurrentLocation();
        if (currentLocation) {
            dispatch(setCurrentLocation(PAGE_NAME, currentLocation));
        }
    }

    componentDidMount() {
        this._dispatchCurrentLocation();
    }

    componentDidUpdate() {
        this._dispatchCurrentLocation();
    }

    render() {
        const currentLocation = this.getCurrentLocation();

        if (!currentLocation) {
            return <Redirect to='/ete-archi' />
        }

        return (
            <Sidebar>
                <DetailsHeader
                    title={currentLocation.titre}
                    imageUrl={getImageUrl(currentLocation)}
                    date={currentLocation.date}
                    listUrl="/ete-archi" />
                <div className="Sidebar-content">
                    <p>
                        {currentLocation.description}
                    </p>
                    <p>
                        <a href={currentLocation.podcast}>Ecouter l'épisode</a>
                    </p>
                    <p>
                        Crédits photos: {currentLocation.credits_image}
                    </p>
                </div>
            </Sidebar>
        )
    }
}

export const EteArchiDetailsSidebarContainer = connect(mapStateToProps)(EteArchiDetailsSidebar);
