import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { withCurrentLocation } from '../components/DetailsSidebar';
import { DetailsHeader } from '../components/Header';
import { ListSidebarContainer } from '../components/ListSidebar';
import { PageContainerWithRouter } from '../components/Page';
import { Sidebar } from '../components/Sidebar';
import { SpinnerSidebarContainer } from '../components/SpinnerSidebar';
import { createSubStore } from '../store';
import { getImageUrl } from '../utils';

const PAGE_TITLE = 'Ile de France';
const DATASET_ID = 'architecture-remarquable-ile-de-france';
const LIST_URL = '/ile-de-france';

const Intro = () => (
    <p>Architecture remarquable des XX<sup>ème</sup> et XXI<sup>ème</sup> siècles en Île de France</p>
);

const IleDeFranceSpinnerSidebar = () => (
    <SpinnerSidebarContainer IntroComponent={Intro} />
);

const IleDeFranceListSidebar = () => (
    <ListSidebarContainer><Intro /></ListSidebarContainer>
);

const IleDeFranceDetailsSidebar = ({ currentLocation }) => {
    const names = currentLocation.architectes;
    let architects;
    if (names.length === 1) {
        architects = names[0];
    } else {
        architects = `${names.slice(0, names.length - 2).join(', ')} et ${names[names.length - 1]}`;
    }

    const start = currentLocation.debut_construction;
    const end = currentLocation.fin_construction;
    let construction;
    if (start && end) {
        construction = `entre ${start} et ${end}`;
    } else {
        construction = `en ${start || end}`;
    }
    return (
        <Sidebar>
            <DetailsHeader
                title={currentLocation.nom}
                imageUrl={getImageUrl(DATASET_ID, currentLocation.image)}
                listUrl={LIST_URL}
            >
                <p>{currentLocation.type_de_batiment}</p>
            </DetailsHeader>
            <div className="Sidebar-content">
                <p>
                    Construit {construction} par {architects}.
                </p>
                <p>
                    {currentLocation.visitable === 'Oui' ? 'Visitable' : 'Non visitable'}
                </p>
                <p>
                    {currentLocation.adresse_raw}<br />
                    {currentLocation.code_postal} {currentLocation.ville}
                </p>
                <p>
                    <a href={currentLocation.wikipedia}>Wikipedia</a><br />
                    <a href={currentLocation.lien_s}>{currentLocation.lien_s}</a>
                </p>
            </div>
        </Sidebar>
    );
};

IleDeFranceDetailsSidebar.propTypes = {
    currentLocation: PropTypes.object.isRequired,
};

const IleDeFranceDetailsSidebarContainer = withCurrentLocation(IleDeFranceDetailsSidebar);

export class IleDeFranceApp extends React.Component {
    constructor(props) {
        super(props);
        this.store = createSubStore({
            PAGE_TITLE,
            DATASET_ID,
            LIST_URL,
            ID_PROP: 'nom',
            COORDINATES_PROP: 'coordonnees',
            SEARCH_PROPS: ['nom', 'ville', 'code_postal', 'architectes', 'type_de_batiment'],
            IMAGE_PROP: 'image',
            TITLE_PROP: 'nom',
            FILTERS: [
                {
                    title: 'Visitable',
                    prop: 'visitable',
                    sort: '-value',
                },
                {
                    title: 'Architectes',
                    prop: 'architectes',
                    sort: 'value',
                    widget: 'dropdown',
                },
            ],
            DATASET_URL: 'https://jmorel.opendatasoft.com/api/v2/catalog/datasets/architecture-remarquable-ile-de-france/exports/json',
            DEFAULT_POSITION: [48.853414, 2.348789],
            DEFAULT_ZOOM: 10,
        });
    }

    render() {
        return (
            <Provider store={this.store}>
                <PageContainerWithRouter
                    SpinnerSidebarComponent={IleDeFranceSpinnerSidebar}
                    ListSidebarComponent={IleDeFranceListSidebar}
                    DetailsSidebarComponent={IleDeFranceDetailsSidebarContainer}
                />
            </Provider>
        );
    }
}
