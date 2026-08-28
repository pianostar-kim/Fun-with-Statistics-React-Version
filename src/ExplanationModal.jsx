import React, {useContext} from "react";
import {ContentStateContext} from "./Content";
import Statistics from "./statistics";

function ExplanationModal() {
    const {array, setArray, showingResults, setShowingResults, isExplanationModalOpen, setIsExplanationModalOpen, termToExplain, setTermToExplain} = useContext(ContentStateContext);

    function closeExplanationModal() {
        setIsExplanationModalOpen(false);
    }

    return (
        <>
            <div id="darkener" className={isExplanationModalOpen ? "active" : ""}></div>
            <div id="modal" className={isExplanationModalOpen ? "active" : ""}>
                <p>{Statistics.getExplanationForTerm(termToExplain)}</p>
                <br />
                <button onClick={closeExplanationModal}>Close</button>
            </div>
        </>
    );
}

export default ExplanationModal;