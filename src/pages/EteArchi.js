import React from 'react';
import { Provider } from 'react-redux';
import { withCurrentLocation } from '../components/DetailsSidebar';
import { DetailsHeader } from '../components/Header';
import { ListSidebarContainer } from '../components/ListSidebar';
import { PageContainerWithRouter } from '../components/Page';
import { Sidebar } from '../components/Sidebar';
import { SpinnerSidebarContainer } from '../components/SpinnerSidebar';
import { createSubStore } from '../store';
import { getImageUrl } from '../utils';

const PAGE_TITLE = 'L\'ete archi de David Abittan';
const DATASET_ID = 'ete-archi';
const LIST_URL = '/ete-archi';

const Intro = () => (
    <p>
        Durant l’été, <a href="https://twitter.com/david_abittan">David Abittan</a> nous emmène chaque semaine sur <a href="https://www.franceinter.fr/emissions/l-ete-archi">France Inter</a> à la découverte de toutes les époques de l’architecture de France.
    </p>
)

const EteArchiSpinnerSidebar = () => (
    <SpinnerSidebarContainer IntroComponent={Intro} />
)

const EteArchiListSidebar = () => (
    <ListSidebarContainer><Intro /></ListSidebarContainer>
)

const EteArchiDetailsSidebar = ({ currentLocation }) => {
    return (
        <Sidebar>
            <DetailsHeader
                title={currentLocation.titre}
                imageUrl={getImageUrl(DATASET_ID, currentLocation.image)}
                listUrl={LIST_URL} >
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
        </Sidebar>
    )
};

const EteArchiDetailsSidebarContainer = withCurrentLocation(EteArchiDetailsSidebar);

export class EteArchiApp extends React.Component {
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
                }
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
                    SpinnerSidebarComponent={EteArchiSpinnerSidebar}
                    ListSidebarComponent={EteArchiListSidebar}
                    DetailsSidebarComponent={EteArchiDetailsSidebarContainer}
                />
            </Provider>
        )
    }
}
