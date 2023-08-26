import ImageToggleOnScroll from './ImageToggleOnScroll';
import React from "react";

const SpeakerDetail = React.memo(
    ({ speakerRec, onHeartFavoriteHandler }) => {
    const {id,firstName,lastName,bio,favorite} = speakerRec;
    console.log(`Speaker Detail:${id} ${firstName} ${lastName} ${favorite}`);

    return (
        <div className="card col-4 cardmin">
            <ImageToggleOnScroll className="card-img-top"
                                 primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
                                 secondaryImg={`/static/speakers/col/Speaker-${id}.jpg`}
                                 alt={`${firstName} ${lastName}`} />
            <div className="card-body">
                <h4 className="card-title">
                    <button
                        className={favorite? 'heartredbutton' : 'heartdarkbutton'}
                        onClick={(e) => {
                        onHeartFavoriteHandler(e, speakerRec);
                        }}
                    />
                    <span> {firstName} {lastName} </span>
                </h4>
                <span> {bio} </span>
            </div>
        </div>
    );
});


export default SpeakerDetail;
