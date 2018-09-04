import { LOCATIONS_REQUEST, LOCATIONS_SUCCESS, LOCATIONS_FAILURE, SET_CURRENT_LOCATION, RESET_CURRENT_LOCATION, SET_CURRENT_PAGE_INDEX } from './actions';

export const INITIAL_PAGE_STATE = {
    isFetching: false,
    errors: null,
    locations: {
        byId: {},
        allIds: [],
        currentId: null,
        currentPageIds: [],
        withCoordinatesIds: [],
    },
    pagination: {
        currentIndex: 0,
        lastIndex: 0,
        pageSize: 10,
    },
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
            const { idPropName, coordinatesPropName, locations } = action;
            const locationsById = locations.reduce((byId, location) => {
                byId[location[idPropName]] = location;
                return byId;
            }, {});
            const allLocationIDs = Object.keys(locationsById);
            const withCoordinatesIds = locations
                .filter(location => !!location[coordinatesPropName])
                .map(location => location[idPropName]);
            return Object.assign({}, state, {
                [pageName]: {
                    ...pageState,
                    isFetching: false,
                    locations: Object.assign({}, pageState.locations, {
                        byId: locationsById,
                        allIds: allLocationIDs,
                        withCoordinatesIds,
                        currentPageIds: allLocationIDs.slice(0, pageState.pagination.pageSize),
                    }),
                    pagination: Object.assign({}, pageState.pagination, {
                        currentIndex: 0,
                        lastIndex: Math.ceil(allLocationIDs.length / pageState.pagination.pageSize) - 1,
                    }),
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
        case SET_CURRENT_LOCATION:
            return Object.assign({}, state, {
                [pageName]: {
                    ...pageState,
                    currentLocation: action.currentLocation,
                }
            })
        case RESET_CURRENT_LOCATION:
            return Object.assign({}, state, {
                [pageName]: {
                    ...pageState,
                    currentLocation: null,
                }
            })
        case SET_CURRENT_PAGE_INDEX:
            const start = action.currentIndex * pageState.pagination.pageSize;
            const end = start + pageState.pagination.pageSize;
            return Object.assign({}, state, {
                [pageName]: {
                    pagination: Object.assign({}, pageState.pagination, {
                        currentIndex: action.currentIndex,
                    }),
                    locations: Object.assign({}, pageState.locations, {
                        currentPageIds: pageState.locations.allIds.slice(start, end),
                    })
                }
            })
        default:
            return state;
    }
};
