import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { handleActions } from './reducers';

export function createSubStore({ID_PROP, COORDINATES_PROP, SEARCH_PROPS, IMAGE_PROP, TITLE_PROP, FILTERS, DATASET_URL, LIST_URL, DEFAULT_ZOOM, DEFAULT_POSITION, DATASET_ID, PAGE_TITLE}) {
    const initialState = {
        conf: {
            ID_PROP,
            COORDINATES_PROP,
            SEARCH_PROPS,
            IMAGE_PROP,
            TITLE_PROP,
            DATASET_URL,
            FILTERS,
            LIST_URL,
            DEFAULT_POSITION,
            DEFAULT_ZOOM,
            DATASET_ID,
            PAGE_TITLE,
        },
        domainData: {
            locationsById: {}
        },
        appState: {
            isFetching: false,
            error: null,
            currentId: null,
            pagination: {
                currentIndex: 0,
                lastIndex: 0,
                pageSize: 10,
            },
            search: {
                textSearch: '',
                filters: FILTERS.reduce((filters, filter) => ({...filters, [filter.prop]: []}), {}),
            }
        },
    };
    return createStore(
        handleActions,
        initialState,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware)
        ),
    );
}