const receiveCharacter = (character) => ({
    type: 'ADD_STORE',
    character,
});


export function fetchAction(){
    return async (dispatch) => {
        const requisition = await fetch('https://rickandmortyapi.com/api/character');
        const characters = await requisition.json();
        console.log(characters);
        return dispatch(receiveCharacter(characters.results));
    };
};