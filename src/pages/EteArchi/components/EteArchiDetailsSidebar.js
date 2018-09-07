import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentId } from '../../../actions';
import { DetailsHeader } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import { getImageUrl } from '../eteArchiUtils';
import {EteArchiSpinnerSidebar} from './EteArchiSpinnerSidebar';
import { currentLocationSelector, currentIdSelector } from '../../../selectors';

export class EteArchiDetailsSidebar extends React.Component {
    _dispatchCurrentLocation() {
        const { dispatch, currentId, match } = this.props;
        if (!currentId || currentId !== match.params.id) {
            dispatch(setCurrentId(match.params.id));
        }
    }

    componentDidMount() {
        this._dispatchCurrentLocation();
    }

    componentDidUpdate() {
        this._dispatchCurrentLocation();
    }

    render() {
        let { currentLocation, currentId } = this.props;

        if (!currentLocation && currentId) {
            return <Redirect to='/ete-archi' />
        }

        if (!currentLocation) {
            return <EteArchiSpinnerSidebar/>
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
const mapStateToProps = (state, ownProps) => ({
    currentLocation: currentLocationSelector(state),
    currentId: currentIdSelector(state),
    match: ownProps.match,
});

export const EteArchiDetailsSidebarContainer = connect(mapStateToProps)(EteArchiDetailsSidebar);
