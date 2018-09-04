import axios from 'axios';

export const LOCATIONS_REQUEST = 'LOCATIONS_REQUEST';
export const LOCATIONS_SUCCESS = 'LOCATIONS_SUCCESS';
export const LOCATIONS_FAILURE = 'LOCATIONS_FAILURE';
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export const RESET_CURRENT_LOCATION = 'RESET_CURRENT_LOCATION';
export const SET_CURRENT_PAGE_INDEX = 'SET_CURRENT_PAGE_INDEX';

export const locationsRequest = (pageName, url) => ({
    type: LOCATIONS_REQUEST,
    pageName,
    url,
})
export const locationsSuccess = (pageName, idPropName, coordinatesPropName, locations) => ({
    type: LOCATIONS_SUCCESS,
    pageName,
    idPropName,
    coordinatesPropName,
    locations,
})

export const locationsFailure = (pageName, error) => ({
    type: LOCATIONS_FAILURE,
    pageName,
    error,
})

const fetchLocations = (pageName, idPropName, coordinatesPropName, url) => {
    return (dispatch) => {
        dispatch(locationsRequest(pageName, url));
        return axios.get(url)
            .then(response => response.data)
            .then(locations => dispatch(locationsSuccess(pageName, idPropName, coordinatesPropName, locations)))
            .catch(error => dispatch(locationsFailure(pageName, error)));
    }
}

function shouldFetchLocations(state, pageName) {
    return !state[pageName] || (!state[pageName].locations.allIds.length && !state[pageName].isFetching);
}

export function fetchLocationsIfNeeded(pageName, idPropName, coordinatesPropName, url) {
    return (dispatch, getState) => {
        if (shouldFetchLocations(getState(), pageName)) {
            return dispatch(fetchLocations(pageName, idPropName, coordinatesPropName, url));
        }
    }
}

export const setCurrentLocation = (pageName, currentLocation) => ({
    type: SET_CURRENT_LOCATION,
    pageName,
    currentLocation,
})

export const resetCurrentLocation = (pageName) => ({
    type: RESET_CURRENT_LOCATION,
    pageName,
})

export const setCurrentPageIndex = (pageName, currentIndex) => ({
    type: SET_CURRENT_PAGE_INDEX,
    pageName,
    currentIndex,
})
