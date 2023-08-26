import speakersReducer from "./speakersReducer";
import {useEffect, useReducer} from "react";
import axios from "axios";

function useSpeakerDataManager() {
    const [{isLoading, speakerList}, dispatch] = useReducer(speakersReducer, {
        isLoading: true,
        speakerList: []
    });

    function toggleSpeakerFavourite(speakerRec) {
        const updateData = async function() {
            axios.put(`/api/speakers/${speakerRec.id}`, {...speakerRec, favorite: !speakerRec.favorite,});
            speakerRec.favorite === true
                ? dispatch({type: "unfavourite", id: speakerRec.id})
                : dispatch({type: "favourite", id: speakerRec.id});
        };
        updateData();
    }

    useEffect(() => {
        const fetchData = async function() {
            let result = await axios.get('/api/speakers');
            dispatch({type: 'setSpeakerList', data: result.data});
        };
        fetchData();

        return () => {
            console.log('cleanup');
        };
    }, []);
    return { isLoading, speakerList, toggleSpeakerFavourite};
}

export default useSpeakerDataManager;