// set initial state for filter
const initialState = {filterActive: false}

// create reducer
export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case 'filter/toggleFilter':
            return {
                ...state,
                filterActive: !state.filterActive
            }
        default:
            return state;
    } 
}
