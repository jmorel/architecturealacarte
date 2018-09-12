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

const PAGE_TITLE = 'Les 50 lieux en France à voir au moins une fois dans sa vie';
const DATASET_ID = '50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie';
const LIST_URL = '/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie';

const Intro = () => (
    <p>
        Cette sélection a été composée par les revues <a href="https://www.admagazine.fr/architecture/balade/diaporama/les-50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/43560">AD</a> et <a href="https://www.vanityfair.fr/">Vanity Fair</a> en supplément de leurs numéros de juin 2017.
    </p>
);

const CinquanteLieuxSpinnerSidebar = () => (
    <SpinnerSidebarContainer IntroComponent={Intro} />
);

const CinquanteLieuxListSidebar = () => (
    <ListSidebarContainer><Intro /></ListSidebarContainer>
);

const CinquanteLieuxDetailsSidebar = ({ currentLocation }) => (
    <DetailsSidebar>
        <DetailsHeader
            title={currentLocation.nom}
            imageUrl={getImageUrl(DATASET_ID, currentLocation.image)}
            listUrl={LIST_URL}
        >
            <p>{currentLocation.description}</p>
            <p>{currentLocation.categorie.join(', ')}</p>
        </DetailsHeader>
        <div className="Sidebar-content">
            <p>
                {currentLocation.adresse}<br />
                {currentLocation.code_postal} {currentLocation.ville}
            </p>
        </div>
    </DetailsSidebar>
);

CinquanteLieuxDetailsSidebar.propTypes = {
    currentLocation: PropTypes.object.isRequired,
};

const CinquanteLieuxDetailsSidebarContainer = withCurrentLocation(CinquanteLieuxDetailsSidebar);

export class CinquanteLieuxApp extends React.Component {
    constructor(props) {
        super(props);
        this.store = createSubStore({
            PAGE_TITLE,
            DATASET_ID,
            LIST_URL,
            ID_PROP: 'nom',
            COORDINATES_PROP: 'coordonnees',
            SEARCH_PROPS: ['nom', 'description'],
            IMAGE_PROP: 'image',
            TITLE_PROP: 'nom',
            FILTERS: [
                {
                    title: 'Catégorie',
                    prop: 'categorie',
                    sort: 'value',
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
                    SpinnerSidebarComponent={CinquanteLieuxSpinnerSidebar}
                    ListSidebarComponent={CinquanteLieuxListSidebar}
                    DetailsSidebarComponent={CinquanteLieuxDetailsSidebarContainer}
                />
            </Provider>
        );
    }
}
