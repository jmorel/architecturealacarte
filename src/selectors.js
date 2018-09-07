import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

export const coordinatesPropSelector = state => state.conf.COORDINATES_PROP;
export const idPropSelector = state => state.conf.ID_PROP;
export const searchPropsSelector = state => state.conf.SEARCH_PROPS;
export const filtersSelector = state => state.conf.FILTERS;

export const pageSizeSelector = state => state.appState.pagination.pageSize;
export const currentIndexSelector = state => state.appState.pagination.currentIndex;
export const locationsByIdSelector = state => state.domainData.locationsById;
export const locationsSelector = state => Object.values(state.domainData.locationsById);
export const currentIdSelector = state => state.appState.currentId;
export const isFetchingSelector = state => state.appState.isFetching;
export const textSearchSelector = state => state.appState.search.textSearch;
export const activeFiltersValuesSelector = state => state.appState.search.filters;

export const categoryFilteredLocationsSelector = createSelector(
    [locationsSelector, activeFiltersValuesSelector],
    (locations, activeFiltersValues) => locations.filter(location => {
        return Object.keys(activeFiltersValues)
            .filter(filterProp => activeFiltersValues[filterProp].length)
            .reduce((matchesAllFilters, filterProp) => {
                return matchesAllFilters && activeFiltersValues[filterProp].includes(location[filterProp]);
            }, true)
    })

);

export const fuseSelector = createSelector(
    [categoryFilteredLocationsSelector, searchPropsSelector],
    (categoryFilteredLocations, SEARCH_PROPS) => new Fuse(categoryFilteredLocations, {
        tokenize: true,
        threshold: 0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: SEARCH_PROPS,
    })
)
export const filteredLocationsSelector = createSelector(
    [fuseSelector, textSearchSelector, categoryFilteredLocationsSelector],
    (fuse, textSearch, categoryFilteredLocations) => textSearch ? fuse.search(textSearch) : categoryFilteredLocations
)

export const filteredLocationsWithCoordinatesSelector = createSelector(
    [filteredLocationsSelector, coordinatesPropSelector],
    (filteredLocations, COORDINATES_PROP) => filteredLocations.filter(location => location[COORDINATES_PROP])
)

export const currentLocationSelector = createSelector(
    [locationsByIdSelector, currentIdSelector],
    (locationsById, currentId) => {
        return currentId ? locationsById[currentId] : null
    }
);

export const filteredCurrentPageLocationsSelector = createSelector(
    [currentIndexSelector, pageSizeSelector, filteredLocationsSelector],
    (currentIndex, pageSize, filteredLocations) => filteredLocations.slice(currentIndex * pageSize, (currentIndex + 1) * pageSize)
);

export const lastIndexSelector = createSelector(
    [pageSizeSelector, filteredLocationsSelector],
    (pageSize, filteredLocations) => Math.ceil(filteredLocations.length / pageSize)
);

const SORT_METHODS = {
    '-count': (a, b) => a.count < b.count,
    'count': (a, b) => a.count > b.count,
    '-value': (a, b) => a.value < b.value,
    'value': (a, b) => a.value > b.value,
}

const getFilterValues = (locations, filterProp, filterSort) => {
    const values = {};
    for (let location of locations) {
        const value = location[filterProp];
        if (!values[value]) {
            values[value] = {value: value, count: 1}
        } else {
            values[value].count++;
        }
    }
    const valuesList = Object.values(values);
    valuesList.sort(SORT_METHODS[filterSort])
    return valuesList;
}

export const filtersValuesSelector = createSelector(
    [filteredLocationsSelector, filtersSelector],
    (filteredLocations, filters) => {
        const filtersValues = {};
        for (let filter of filters) {
            filtersValues[filter.prop] = getFilterValues(filteredLocations, filter.prop, filter.sort)
        }
        return filtersValues;
    }
)
