import { LOCATIONS_REQUEST, LOCATIONS_SUCCESS, LOCATIONS_FAILURE } from './actions';

export const INITIAL_PAGE_STATE = {
    isFetching: false,
    locations: [],
    errors: null,
};

export function handleActions(state = {}, action) {
    const { pageName } = action;
    const pageState = state[pageName] || INITIAL_PAGE_STATE;
    switch (action.type) {
        case LOCATIONS_REQUEST:
            return Object.assign({}, state, {
                [pageName]: {
                    ...pageState,
                    isFetching: true,
                }
            })
        case LOCATIONS_SUCCESS:
            return Object.assign({}, state, {
                [pageName]: {
                    ...pageState,
                    isFetching: false,
                    locations: action.locations,
                }
            })
        case LOCATIONS_FAILURE:
            return Object.assign({}, state, {
                [pageName]: {
                    ...pageState,
                    isFetching: false,
                    error: action.error,
                }
            })
        default:
            return state;
    }
};
