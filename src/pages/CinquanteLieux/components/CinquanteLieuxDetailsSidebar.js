import React from 'react';
import { withRouter } from 'react-router-dom';
import { DetailsHeader } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';

export function CinquanteLieuxDetailsSidebar({history, currentLocation, navigateToList}) {
    return (
        <Sidebar>
            <DetailsHeader navigateToList={navigateToList(history)} title={currentLocation.nom}></DetailsHeader>
        </Sidebar>
    );
}

export const CinquanteLieuxDetailsSidebarWithRouter = withRouter(CinquanteLieuxDetailsSidebar);