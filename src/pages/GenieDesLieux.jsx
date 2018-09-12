import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { withCurrentLocation, DetailsSidebar } from '../components/DetailsSidebar';
import { DetailsHeader } from '../components/Header';
import { ListSidebarContainer } from '../components/ListSidebar';
import { PageContainerWithRouter } from '../components/Page';
import { SpinnerSidebarContainer } from '../components/SpinnerSidebar';
import { createSubStore } from '../store';
import { getImageUrl } from '../utils';

const PAGE_TITLE = 'Le Genie Des Lieux';
const DATASET_ID = 'le-genie-des-lieux';
const LIST_URL = '/genie-des-lieux';

const Intro = () => (
    <p>
        Durant l'été, <a href="https://twitter.com/camille_juza">Camille Juza</a> et <a href="https://fr.wikipedia.org/wiki/Julien_Donada">Julien Donada</a> nous emmènent sur <a href="https://www.franceculture.fr/emissions/le-genie-des-lieux">France Culture</a> arpenter des lieux qui ont marqué l'histoire de l'architecture. 8 semaines, 8 réponses de l'architecture à cette question : comment faire un lieu pour rassembler les gens ?
    </p>
);

const GenieDesLieuxSpinnerSidebar = () => (
    <SpinnerSidebarContainer IntroComponent={Intro} />
);

const GenieDesLieuxListSidebar = () => (
    <ListSidebarContainer><Intro /></ListSidebarContainer>
);

const GenieDesLieuxDetailsSidebar = ({ currentLocation }) => (
    <DetailsSidebar>
        <DetailsHeader
            title={currentLocation.titre}
            imageUrl={getImageUrl(DATASET_ID, currentLocation.image)}
            listUrl={LIST_URL}
        >
            <p>Episode du {currentLocation.date}</p>
        </DetailsHeader>
        <div className="Sidebar-content">
            <p>{currentLocation.description}</p>
            <p>
                <a href={currentLocation.page_web}>Page de l'épisode</a> &middot; <a href={currentLocation.podcast}>Ecouter l'épisode</a>
            </p>
            <p>
                Crédits photos: {currentLocation.credits_image}
            </p>
        </div>
    </DetailsSidebar>
);

GenieDesLieuxDetailsSidebar.propTypes = {
    currentLocation: PropTypes.object.isRequired,
};

const GenieDesLieuxDetailsSidebarContainer = withCurrentLocation(GenieDesLieuxDetailsSidebar);

export class GenieDesLieuxApp extends React.Component {
    constructor(props) {
        super(props);
        this.store = createSubStore({
            PAGE_TITLE,
            DATASET_ID,
            LIST_URL,
            ID_PROP: 'date',
            COORDINATES_PROP: 'coordonnees',
            SEARCH_PROPS: ['titre', 'description', 'saison', 'date'],
            IMAGE_PROP: 'image',
            TITLE_PROP: 'titre',
            FILTERS: [
                {
                    title: 'Saison',
                    prop: 'saison',
                    sort: '-value',
                },
            ],
            DATASET_URL: `https://jmorel.opendatasoft.com/api/v2/catalog/datasets/${DATASET_ID}/exports/json`,
            DEFAULT_POSITION: [46.596170, 2.387703],
            DEFAULT_ZOOM: 6,
        });
    }

    render() {
        return (
            <Provider store={this.store}>
                <PageContainerWithRouter
                    SpinnerSidebarComponent={GenieDesLieuxSpinnerSidebar}
                    ListSidebarComponent={GenieDesLieuxListSidebar}
                    DetailsSidebarComponent={GenieDesLieuxDetailsSidebarContainer}
                />
            </Provider>
        );
    }
}
