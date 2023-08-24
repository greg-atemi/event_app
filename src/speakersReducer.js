function speakersReducer(state, action) {
    function updateFavorite(favoriteValue) {
        return state.map((item,index) => {
            if (item.id === action.sessionId) {
                return {...item, favorite:favoriteValue};
            }
            return item;
        })
    }
    switch (action.type) {
        case "setSpeakerList": {
            return action.data;
        }
        case "favourite": {
            return updateFavorite(true);
        }
        case "unfavourite": {
            return updateFavorite(false);
        }
        default :
            return state;
    }
}

export default speakersReducer;