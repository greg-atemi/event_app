function speakersReducer(state, action) {
    function updateFavorite(favoriteValue) {
        return state.speakerList.map((item,index) => {
            if (item.id === action.id) {
                return {...item, favorite:favoriteValue};
            }
            return item;
        })
    }
    switch (action.type) {
        case "setSpeakerList": {
            return { ...state, speakerList: action.data, isLoading: false };
        }
        case "favourite": {
            return { ...state, speakerList: updateFavorite(true)};
        }
        case "unfavourite": {
            return { ...state, speakerList: updateFavorite(false)};
        }
        default :
            return state;
    }
}

export default speakersReducer;