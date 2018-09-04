import React from 'react';

import { connect } from 'react-redux';
import { INITIAL_PAGE_STATE } from '../../../reducers';
import { PAGE_NAME } from '../EteArchi';

import { Link } from 'react-router-dom';

import { ListHeader, DetailsHeader } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Sidebar } from '../../../components/Sidebar';
import { Spinner } from '../../../components/Spinner';
import { LocationCard } from '../../../components/LocationCard';
import { getImageUrl, getImageRatio } from '../eteArchiUtils';

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
    return <EteArchiSidebar><Spinner/></EteArchiSidebar>;
}

export function EteArchiListSidebar({ locations }) {
    return (
        <EteArchiSidebar>
            {locations.filter(location => location.coordonnees).map(location => (
                <Link to={`/ete-archi/${location.date}`} key={location.date}>
                    <LocationCard title={location.titre} imageUrl={getImageUrl(location)} imageRatio={getImageRatio(location)}/>
                </Link>
            ))}
        </EteArchiSidebar>
    )
}

const mapStateToProps = (state, ownProps) => ({
    ...(state[PAGE_NAME] || INITIAL_PAGE_STATE),
});

export const EteArchiListSidebarContainer = connect(mapStateToProps)(EteArchiListSidebar);

export function EteArchiDetailsSidebar({ currentLocation }) {
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
