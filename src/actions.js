import axios from 'axios';

export const LOCATIONS_REQUEST = 'LOCATIONS_REQUEST';
export const LOCATIONS_SUCCESS = 'LOCATIONS_SUCCESS';
export const LOCATIONS_FAILURE = 'LOCATIONS_FAILURE';
export const SET_CURRENT_LOCATION_ID = 'SET_CURRENT_LOCATION_ID';
export const RESET_CURRENT_LOCATION_ID = 'RESET_CURRENT_LOCATION_ID';
export const SET_CURRENT_PAGE_INDEX = 'SET_CURRENT_PAGE_INDEX';

export const locationsRequest = (sectionName, url) => ({
    type: LOCATIONS_REQUEST,
    sectionName,
    url,
})
export const locationsSuccess = (sectionName, idPropName, coordinatesPropName, locations) => ({
    type: LOCATIONS_SUCCESS,
    sectionName,
    idPropName,
    coordinatesPropName,
    locations,
})

export const locationsFailure = (sectionName, error) => ({
    type: LOCATIONS_FAILURE,
    sectionName,
    error,
})

const fetchLocations = (sectionName, idPropName, coordinatesPropName, url) => {
    return (dispatch) => {
        dispatch(locationsRequest(sectionName, url));
        return axios.get(url)
            .then(response => response.data)
            .then(locations => dispatch(locationsSuccess(sectionName, idPropName, coordinatesPropName, locations)))
            .catch(error => dispatch(locationsFailure(sectionName, error)));
    }
}

function shouldFetchLocations(state, sectionName) {
    return !state[sectionName] || (!state[sectionName].locations.allIds.length && !state[sectionName].isFetching);
}

export function fetchLocationsIfNeeded(sectionName, idPropName, coordinatesPropName, url) {
    return (dispatch, getState) => {
        if (shouldFetchLocations(getState(), sectionName)) {
            return dispatch(fetchLocations(sectionName, idPropName, coordinatesPropName, url));
        }
    }
}

export const setCurrentLocationId = (sectionName, currentLocationId) => ({
    type: SET_CURRENT_LOCATION_ID,
    sectionName,
    currentLocationId,
})

export const resetCurrentLocationId = (sectionName) => ({
    type: RESET_CURRENT_LOCATION_ID,
    sectionName,
})

export const setCurrentPageIndex = (sectionName, currentIndex) => ({
    type: SET_CURRENT_PAGE_INDEX,
    sectionName,
    currentIndex,
})
