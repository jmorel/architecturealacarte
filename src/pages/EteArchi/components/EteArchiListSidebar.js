
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetCurrentId, setCurrentPageIndex, setTextSearch } from '../../../actions';
import { Footer } from '../../../components/Footer';
import { ListHeader } from '../../../components/Header';
import { LocationCard } from '../../../components/LocationCard';
import { PaginatedList } from '../../../components/PaginatedList';
import { Sidebar } from '../../../components/Sidebar';
import { getImageRatio, getImageUrl } from '../eteArchiUtils';
import { TextSearch } from '../../../components/TextSearch';
import {lastIndexSelector, currentIndexSelector, textSearchSelector, filteredLocationsSelector, filteredCurrentPageLocationsSelector } from '../../../selectors';

export class EteArchiListSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.setCurrentPageIndex = this.setCurrentPageIndex.bind(this);
        this.setTextSearch = this.setTextSearch.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(resetCurrentId());
    }

    setCurrentPageIndex(index) {
        const { dispatch } = this.props;
        dispatch(setCurrentPageIndex(index));
    }

    setTextSearch(value) {
        const { dispatch } = this.props;
        dispatch(setTextSearch(value));
    }

    render() {
        const { currentPageLocations, lastIndex, currentIndex, textSearch } = this.props;
        return (
            <Sidebar>
                <ListHeader title="L'ete archi de David Abittan" />
                <div className="Sidebar-content">
                    <p>
                        Durant l’été, <a href="https://twitter.com/david_abittan">David Abittan</a> nous emmène chaque semaine sur <a href="https://www.franceinter.fr/emissions/l-ete-archi">France Inter</a> à la découverte de toutes les époques de l’architecture de France.
                    </p>
                    <div className="Sidebar-filters">
                        <TextSearch value={textSearch} onChange={this.setTextSearch} />
                    </div>
                    <PaginatedList lastIndex={lastIndex}
                        currentIndex={currentIndex}
                        setCurrentIndex={this.setCurrentPageIndex}>
                        {currentPageLocations.map(location => (
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

const mapStateToProps = (state) => ({
    currentPageLocations: filteredCurrentPageLocationsSelector(state),
    lastIndex: lastIndexSelector(state),
    currentIndex: currentIndexSelector(state),
    textSearch: textSearchSelector(state),
})

export const EteArchiListSidebarContainer = connect(mapStateToProps)(EteArchiListSidebar);
