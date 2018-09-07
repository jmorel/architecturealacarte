import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { handleActions } from './reducers';

export function createSubStore(ID_PROP, COORDINATES_PROP, SEARCH_PROPS, DATASET_URL) {
    const initialState = {
        conf: {
            ID_PROP,
            COORDINATES_PROP,
            DATASET_URL,
            SEARCH_PROPS,
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