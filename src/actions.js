import axios from 'axios';

export const LOCATIONS_REQUEST = 'LOCATIONS_REQUEST';
export const LOCATIONS_SUCCESS = 'LOCATIONS_SUCCESS';
export const LOCATIONS_FAILURE = 'LOCATIONS_FAILURE';

export const locationsRequest = (url) => ({
    type: LOCATIONS_REQUEST,
    url,
})
export const locationsSuccess = (locations) => ({
    type: LOCATIONS_SUCCESS,
    locations
})

export const locationsFailure = (error) => ({
    type: LOCATIONS_FAILURE,
    error,
})

const fetchLocations = url => {
    return (dispatch) => {
        dispatch(locationsRequest(url));
        return axios.get(url)
            .then(response => response.data)
            .then(locations => dispatch(locationsSuccess(locations)))
            .catch(error => dispatch(locationsFailure(error)));
    }
}

function shouldFetchLocations(state) {
    return !state.locations.length && !state.isFetching;
}

export function fetchLocationsIfNeeded(url) {
    return (dispatch, getState) => {
        if (shouldFetchLocations(getState())) {
            return dispatch(fetchLocations(url));
        }
    }
}
