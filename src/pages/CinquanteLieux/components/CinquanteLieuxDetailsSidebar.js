import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { setCurrentId } from '../../../actions';
import { Sidebar } from '../../../components/Sidebar';
import { mapStateToProps, SECTION_NAME } from '../cinquanteLieuxUtils';
import { CinquanteLieuxCategoryTag } from './CinquanteLieuxCategoryTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './CinquanteLieuxDetailsSidebar.css';
library.add(faTimes);


export class CinquanteLieuxDetailsSidebar extends React.Component {
    getCurrentLocation() {
        const { locations, match } = this.props;
        return locations.byId[match.params.id];
    }

    _dispatchCurrentLocation() {
        const { dispatch, locations } = this.props;
        const currentLocation = this.getCurrentLocation();
        if (currentLocation && (!locations.currentId || locations.currentId !== currentLocation.nom)) {
            dispatch(setCurrentId(SECTION_NAME, currentLocation.nom));
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
            return <Redirect to='/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie' />
        }

        return (
            <Sidebar>
                <div className="Header --padding-bottom --padding-top">
                    <Link to={'/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie'} className="CinquanteLieuxCloseButton">
                <FontAwesomeIcon icon={faTimes} />
                    </Link>
                    <h2>{currentLocation.nom}</h2>
                    <p>
                        {currentLocation.categorie.map(category => <CinquanteLieuxCategoryTag key={category} category={category} />)}
                    </p>
                </div>
                <div className="Sidebar-content">
                    <p>{currentLocation.description}</p>
                    <p>
                        {currentLocation.adresse}<br/>
                    {currentLocation.code_postal} {currentLocation.ville}
                </p>
                </div>
            </Sidebar>
        );
    }
}

export const CinquanteLieuxDetailsSidebarContainer = connect(mapStateToProps)(CinquanteLieuxDetailsSidebar);