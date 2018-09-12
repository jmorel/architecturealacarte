import axios from 'axios';

// DOMAIN

export const LOCATIONS_REQUEST = 'LOCATIONS_REQUEST';
export const LOCATIONS_SUCCESS = 'LOCATIONS_SUCCESS';
export const LOCATIONS_FAILURE = 'LOCATIONS_FAILURE';

export const locationsRequest = url => ({
    type: LOCATIONS_REQUEST,
    url,
});

export const locationsSuccess = locations => ({
    type: LOCATIONS_SUCCESS,
    locations,
});

export const locationsFailure = error => ({
    type: LOCATIONS_FAILURE,
    error,
});

export const fetchLocations = () => (dispatch, getState) => {
    const state = getState();
    dispatch(locationsRequest(state.conf.DATASET_URL));
    return axios.get(state.conf.DATASET_URL)
        .then(response => response.data)
        .then(locations => dispatch(locationsSuccess(locations)))
        .catch(error => dispatch(locationsFailure(error)));
};

// APP


export const SET_CURRENT_ID = 'SET_CURRENT_ID';
export const RESET_CURRENT_ID = 'RESET_CURRENT_ID';
export const SET_CURRENT_PAGE_INDEX = 'SET_CURRENT_PAGE_INDEX';
export const SET_TEXT_SEARCH = 'SET_TEXT_SEARCH';
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';


export const setCurrentId = currentId => ({
    type: SET_CURRENT_ID,
    currentId,
});

export const resetCurrentId = () => ({
    type: RESET_CURRENT_ID,
});

export const setCurrentPageIndex = currentIndex => ({
    type: SET_CURRENT_PAGE_INDEX,
    currentIndex,
});

export const setTextSearch = textSearch => ({
    type: SET_TEXT_SEARCH,
    textSearch,
});

export const toggleFilter = (filterProp, value) => ({
    type: TOGGLE_FILTER,
    filterProp,
    value,
});
