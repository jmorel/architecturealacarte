import { LOCATIONS_REQUEST, LOCATIONS_SUCCESS, LOCATIONS_FAILURE } from './actions';

const initialStep = {
    isFetching: false,
    error: null,
    locations: [],
};

const eteArchiApp = (state = initialStep, action) => {
    switch (action.type) {
        case LOCATIONS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case LOCATIONS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                locations: action.locations,
            })
        case LOCATIONS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
            })
        default:
            return state;
    }
};

export default eteArchiApp;