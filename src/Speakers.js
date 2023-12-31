import React, {useEffect, useState, useContext, useReducer, useCallback, useMemo} from 'react';
import speakersReducer from "./speakersReducer";
import SpeakerDetail from "./SpeakerDetail";
import SpeakerData from "./SpeakerData";
import { ConfigContext } from "./App";
import {Header} from './Header'
import {Menu} from './Menu'
import useSpeakerDataManager from "./useSpeakerDataManager";

const Speakers = ({}) => {
    const[speakingSaturday, setSpeakingSaturday] = useState(true);
    const[speakingSunday, setSpeakingSunday] = useState(true);
    const context = useContext(ConfigContext);
    const {isLoading, speakerList, toggleSpeakerFavourite} = useSpeakerDataManager();

    const handleChangeSaturday = () => {
        setSpeakingSaturday(!speakingSaturday);
    };

    const handleChangeSunday = () => {
        setSpeakingSunday(!speakingSunday);
    };

    const newSpeakerList = useMemo(() =>
        speakerList.filter(
            ({sat,sun}) =>
                (speakingSaturday && sat) || (speakingSunday && sun),
        ).sort(function (a,b) {
            if(a.firstName < b.firstName) {
                return -1;
            }
            if(a.firstName > b.firstName) {
                return 1;
            }
            return 0;
        }), [speakingSunday, speakingSaturday, speakerList])

    const speakerListFiltered = isLoading ? [] : newSpeakerList;

    const heartFavoriteHandler = useCallback((e, speakerRec) => {
        e.preventDefault();
        toggleSpeakerFavourite(speakerRec);
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <Menu />
            <div className="container">
                <div className="btn-toolbar margintopbottom5 chekbox-bigger">
                    {context.showSpeakerSpeakingDays === false ? null : (
                    <div className="hide">
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    onChange={handleChangeSaturday}
                                    checked={speakingSaturday}
                                />
                                Saturday Speakers
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    onChange={handleChangeSunday}
                                    checked={speakingSunday}
                                />
                                Sunday Speakers
                            </label>
                        </div>
                    </div>
                    )}
                </div>
                <div className="row">
                    <div className="card-deck">
                        {speakerListFiltered.map(
                            (speakerRec) => {
                                return (
                                    <SpeakerDetail
                                        key={speakerRec.id}
                                        speakerRec={speakerRec}
                                        onHeartFavoriteHandler={heartFavoriteHandler}
                                    />
                                );
                            },
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Speakers;
