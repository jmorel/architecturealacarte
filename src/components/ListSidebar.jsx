
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetCurrentId, setCurrentPageIndex, setTextSearch, toggleFilter } from '../actions';
import { Footer } from './Footer';
import { ListHeader } from './Header';
import { LocationCard } from './LocationCard';
import { PaginatedList } from './PaginatedList';
import { Sidebar } from './Sidebar';
import { getImageRatio, getImageUrl } from '../utils';
import { TextSearch } from './TextSearch';
import { Filter } from './Filter';
import { lastIndexSelector, currentIndexSelector, textSearchSelector, filteredCurrentPageLocationsSelector, filtersSelector, filtersValuesSelector, activeFiltersValuesSelector, datasetIdSelector, idPropSelector, imagePropSelector, listUrlSelector, titlePropSelector, pageTitleSelector } from '../selectors';


export class ListSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.setCurrentPageIndex = this.setCurrentPageIndex.bind(this);
        this.setTextSearch = this.setTextSearch.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
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

    toggleFilter(filterProp, value) {
        const { dispatch } = this.props;
        dispatch(toggleFilter(filterProp, value));
    }

    render() {
        const {
            currentPageLocations,
            lastIndex,
            currentIndex,
            textSearch,
            filters,
            filtersValues,
            activeFiltersValues,
            DATASET_ID,
            LIST_URL,
            ID_PROP,
            IMAGE_PROP,
            TITLE_PROP,
            PAGE_TITLE,
            children,
        } = this.props;
        return (
            <Sidebar>
                <ListHeader title={PAGE_TITLE} />
                <div className="Sidebar-content">
                    {children}
                    <div className="Sidebar-filters">
                        <TextSearch value={textSearch} onChange={this.setTextSearch} />
                        {filters.map(filter => (
                            <Filter
                                key={filter.prop}
                                widget={filter.widget}
                                title={filter.title}
                                filterProp={filter.prop}
                                values={filtersValues[filter.prop]}
                                activeValues={activeFiltersValues[filter.prop]}
                                toggleFilter={this.toggleFilter}
                            />
                        ))}
                    </div>
                    <PaginatedList
                        lastIndex={lastIndex}
                        currentIndex={currentIndex}
                        setCurrentIndex={this.setCurrentPageIndex}
                    >
                        {currentPageLocations.map(location => (
                            <Link to={`${LIST_URL}/${location[ID_PROP]}`} key={location[ID_PROP]}>
                                <LocationCard
                                    title={location[TITLE_PROP]}
                                    imageUrl={getImageUrl(DATASET_ID, location[IMAGE_PROP])}
                                    imageRatio={getImageRatio(location[IMAGE_PROP])}
                                />
                            </Link>
                        ))}
                    </PaginatedList>
                </div>
                <Footer />
            </Sidebar>
        );
    }
}

ListSidebar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentPageLocations: PropTypes.array.isRequired,
    lastIndex: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    textSearch: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired,
    filtersValues: PropTypes.array.isRequired,
    activeFiltersValues: PropTypes.array.isRequired,
    DATASET_ID: PropTypes.string.isRequired,
    LIST_URL: PropTypes.string.isRequired,
    ID_PROP: PropTypes.string.isRequired,
    IMAGE_PROP: PropTypes.string.isRequired,
    TITLE_PROP: PropTypes.string.isRequired,
    PAGE_TITLE: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    currentPageLocations: filteredCurrentPageLocationsSelector(state),
    lastIndex: lastIndexSelector(state),
    currentIndex: currentIndexSelector(state),
    textSearch: textSearchSelector(state),
    filters: filtersSelector(state),
    filtersValues: filtersValuesSelector(state),
    activeFiltersValues: activeFiltersValuesSelector(state),
    DATASET_ID: datasetIdSelector(state),
    ID_PROP: idPropSelector(state),
    IMAGE_PROP: imagePropSelector(state),
    LIST_URL: listUrlSelector(state),
    TITLE_PROP: titlePropSelector(state),
    PAGE_TITLE: pageTitleSelector(state),
    ...ownProps,
});

export const ListSidebarContainer = connect(mapStateToProps)(ListSidebar);
