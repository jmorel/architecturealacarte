import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentLocation } from '../../../actions';
import { DetailsHeader } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import { getImageUrl, mapStateToProps, SECTION_NAME } from '../eteArchiUtils';

export class EteArchiDetailsSidebar extends React.Component {
    getCurrentLocation() {
        const { locations, match } = this.props;
        return locations.byId[match.params.id];
    }

    _dispatchCurrentLocation()  {
        const { dispatch } = this.props;
        const currentLocation = this.getCurrentLocation();
        if (currentLocation) {
            dispatch(setCurrentLocation(SECTION_NAME, currentLocation));
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
