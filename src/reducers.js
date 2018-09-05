import { LOCATIONS_REQUEST, LOCATIONS_SUCCESS, LOCATIONS_FAILURE, SET_CURRENT_PAGE_INDEX, SET_CURRENT_LOCATION_ID, RESET_CURRENT_LOCATION_ID } from './actions';

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
    const { sectionName } = action;
    const pageState = state[sectionName] || INITIAL_PAGE_STATE;
    switch (action.type) {
        case LOCATIONS_REQUEST:
            return Object.assign({}, state, {
                [sectionName]: {
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
                [sectionName]: {
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
                [sectionName]: {
                    ...pageState,
                    isFetching: false,
                    error: action.error,
                }
            })
        case SET_CURRENT_LOCATION_ID:
            return Object.assign({}, state, {
                [sectionName]: {
                    ...pageState,
                    locations: Object.assign({}, pageState.locations, {
                        currentId: action.currentLocationId,
                    })
                }
            })
        case RESET_CURRENT_LOCATION_ID:
            return Object.assign({}, state, {
                [sectionName]: {
                    ...pageState,
                    locations: Object.assign({}, pageState.locations, {
                        currentId: null,
                    })
                }
            })
        case SET_CURRENT_PAGE_INDEX:
            const start = action.currentIndex * pageState.pagination.pageSize;
            const end = start + pageState.pagination.pageSize;
            return Object.assign({}, state, {
                [sectionName]: {
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
