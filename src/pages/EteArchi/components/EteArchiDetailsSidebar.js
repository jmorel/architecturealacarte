import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentLocationId } from '../../../actions';
import { DetailsHeader } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import { getImageUrl, mapStateToProps, SECTION_NAME } from '../eteArchiUtils';

export class EteArchiDetailsSidebar extends React.Component {
    getCurrentLocation() {
        const { locations, match } = this.props;
        return locations.byId[match.params.id];
    }

    _dispatchCurrentLocation()  {
        const { dispatch, locations } = this.props;
        const currentLocation = this.getCurrentLocation();
        if (currentLocation && (!locations.currentId || locations.currentId !== currentLocation.date)) {
            dispatch(setCurrentLocationId(SECTION_NAME, currentLocation.date));
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
                    listUrl="/ete-archi" >
                    <p>Episode du {currentLocation.date}</p>
                </DetailsHeader>
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
