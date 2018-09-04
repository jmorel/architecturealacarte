import axios from 'axios';

export const LOCATIONS_REQUEST = 'LOCATIONS_REQUEST';
export const LOCATIONS_SUCCESS = 'LOCATIONS_SUCCESS';
export const LOCATIONS_FAILURE = 'LOCATIONS_FAILURE';
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export const RESET_CURRENT_LOCATION = 'RESET_CURRENT_LOCATION';
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

export const setCurrentLocation = (sectionName, currentLocation) => ({
    type: SET_CURRENT_LOCATION,
    sectionName,
    currentLocation,
})

export const resetCurrentLocation = (sectionName) => ({
    type: RESET_CURRENT_LOCATION,
    sectionName,
})

export const setCurrentPageIndex = (sectionName, currentIndex) => ({
    type: SET_CURRENT_PAGE_INDEX,
    sectionName,
    currentIndex,
})
