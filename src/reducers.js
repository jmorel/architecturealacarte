import { LOCATIONS_REQUEST, LOCATIONS_SUCCESS, LOCATIONS_FAILURE, SET_CURRENT_PAGE_INDEX, SET_CURRENT_ID, RESET_CURRENT_ID, SET_TEXT_SEARCH } from './actions';

const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues);

export function handleActions(state, action) {
    const { ID_PROP } = state.conf;
    const { domainData, appState } = state;
    switch (action.type) {
        case LOCATIONS_REQUEST:
            return {
                ...state,
                appState: updateObject(appState, { isFetching: true }),
            }
        case LOCATIONS_FAILURE:
            return {
                ...state,
                appState: updateObject(appState, {
                    isFetching: false,
                    error: action.error,
                })
            }
        case LOCATIONS_SUCCESS:
            const locationsById = action.locations.reduce((index, location) => {
                index[location[ID_PROP]] = location;
                return index;
            }, {});
            return {
                ...state,
                appState: updateObject(appState, { isFetching: false, }),
                domainData: updateObject(domainData, { locationsById })
            }
        case SET_CURRENT_PAGE_INDEX:
            return {
                ...state,
                appState: updateObject(appState, {
                    pagination: updateObject(appState.pagination, { currentIndex: action.currentIndex })
                })
            }
        case SET_CURRENT_ID:
            return {
                ...state,
                appState: updateObject(appState, { currentId: action.currentId, })
            }
        case RESET_CURRENT_ID:
            return {
                ...state,
                appState: updateObject(appState, { currentId: null })
            }
        case SET_TEXT_SEARCH:
            return {
                ...state,
                appState: {
                    ...appState,
                    pagination: updateObject(appState.pagination, { currentIndex: 0 }),
                    search: updateObject(appState.search, { textSearch: action.textSearch, })
                }
            }
        default:
            return state;
    }

}

