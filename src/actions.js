import axios from 'axios';

export const LOCATIONS_REQUEST = 'LOCATIONS_REQUEST';
export const LOCATIONS_SUCCESS = 'LOCATIONS_SUCCESS';
export const LOCATIONS_FAILURE = 'LOCATIONS_FAILURE';

export const locationsRequest = (pageName, url) => ({
    type: LOCATIONS_REQUEST,
    pageName,
    url,
})
export const locationsSuccess = (pageName, locations) => ({
    type: LOCATIONS_SUCCESS,
    pageName,
    locations,
})

export const locationsFailure = (pageName, error) => ({
    type: LOCATIONS_FAILURE,
    pageName,
    error,
})

const fetchLocations = (pageName, url) => {
    return (dispatch) => {
        dispatch(locationsRequest(pageName, url));
        return axios.get(url)
            .then(response => response.data)
            .then(locations => dispatch(locationsSuccess(pageName, locations)))
            .catch(error => dispatch(locationsFailure(pageName, error)));
    }
}

function shouldFetchLocations(state, pageName) {
    return !state[pageName] || (!state[pageName].locations.length && !state[pageName].isFetching);
}

export function fetchLocationsIfNeeded(pageName, url) {
    return (dispatch, getState) => {
        if (shouldFetchLocations(getState(), pageName)) {
            return dispatch(fetchLocations(pageName, url));
        }
    }
}
