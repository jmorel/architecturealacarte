import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

export const coordinatesPropSelector = state => state.conf.COORDINATES_PROP;
export const idPropSelector = state => state.conf.ID_PROP;
export const searchPropsSelector = state => state.conf.SEARCH_PROPS;

export const pageSizeSelector = state => state.appState.pagination.pageSize;
export const currentIndexSelector = state => state.appState.pagination.currentIndex;
export const locationsByIdSelector = state => state.domainData.locationsById;
export const locationsSelector = state => Object.values(state.domainData.locationsById);
export const currentIdSelector = state => state.appState.currentId;
export const isFetchingSelector = state => state.appState.isFetching;
export const textSearchSelector = state => state.appState.search.textSearch;

const fuseSelector = createSelector(
    [locationsSelector, searchPropsSelector],
    (locations, SEARCH_PROPS) => new Fuse(locations, {
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
    [fuseSelector, textSearchSelector, locationsSelector],
    (fuse, textSearch, locations) => textSearch ? fuse.search(textSearch) : locations
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