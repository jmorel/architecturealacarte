
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetCurrentLocationId, setCurrentPageIndex } from '../../../actions';
import { Footer } from '../../../components/Footer';
import { ListHeader } from '../../../components/Header';
import { LocationCard } from '../../../components/LocationCard';
import { PaginatedList } from '../../../components/PaginatedList';
import { Sidebar } from '../../../components/Sidebar';
import { getImageRatio, getImageUrl, mapStateToProps, SECTION_NAME } from '../eteArchiUtils';

export class EteArchiListSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.setCurrentPageIndex = this.setCurrentPageIndex.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(resetCurrentLocationId(SECTION_NAME));
    }

    setCurrentPageIndex(index) {
        const { dispatch } = this.props;
        dispatch(setCurrentPageIndex(SECTION_NAME, index));
    }

    render() {
        const { locations, pagination } = this.props;
        return (
            <Sidebar>
                <ListHeader title="L'ete archi de David Abittan" />
                <div className="Sidebar-content">
                    <p>
                        Durant l’été, <a href="">David Abittan</a> nous emmène chaque semaine sur <a href="">France Inter</a> à la découverte de toutes les époques de l’architecture de France.
                </p>
                    <PaginatedList lastIndex={pagination.lastIndex}
                        currentIndex={pagination.currentIndex}
                        setCurrentIndex={this.setCurrentPageIndex}>
                        {locations.currentPageIds
                            .map(id => locations.byId[id])
                            .map(location => (
                                <Link to={`/ete-archi/${location.date}`} key={location.date}>
                                    <LocationCard title={location.titre} imageUrl={getImageUrl(location)} imageRatio={getImageRatio(location)} />
                                </Link>
                            ))}
                    </PaginatedList>
                </div>
                <Footer />
            </Sidebar>
        )
    }
}

export const EteArchiListSidebarContainer = connect(mapStateToProps)(EteArchiListSidebar);
