const INITIAL_STATE = {
    characters: [],
};

function portalReducer(state = INITIAL_STATE, action) {
    if (action.type === 'ADD_STORE') {
        return {
            characters: action.character,
        };
    }
    return state;
};

export default portalReducer;