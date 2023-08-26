import speakersReducer from "./speakersReducer";
import {useEffect, useReducer} from "react";
import SpeakerData from "./SpeakerData";

function useSpeakerDataManager() {
    const [{isLoading, speakerList}, dispatch] = useReducer(speakersReducer, {
        isLoading: true,
        speakerList: []
    });

    function toggleSpeakerFavourite(speakerRec) {
        speakerRec.favorite === true ?
            dispatch({type: "unfavoutite", id: speakerRec.id}) :
             dispatch({type: "favoutite", id: speakerRec.id});
    }

    useEffect(() => {
        new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, 1000);
        }).then(() => {
            dispatch({
                type: "setSpeakerList",
                data: SpeakerData,
            });
        });
        return () => {
            console.log('cleanup');
        };
    }, []);
    return { isLoading, speakerList, toggleSpeakerFavourite};
}

export default useSpeakerDataManager;