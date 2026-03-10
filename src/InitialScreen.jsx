import { useRef, useContext } from "react";
import { ContentStateContext } from "./Content";

function InitialScreen() {
    const {array, setArray, setShowingResults} = useContext(ContentStateContext);
    const initialScreenInputElementRef = useRef(null);


    function insertNumber() {
        const numberToAdd = Number(initialScreenInputElementRef.current.value);
        initialScreenInputElementRef.current.value = "";
        if (Number.isInteger(numberToAdd)) {
            setArray(a => [...a, numberToAdd]);
        }
        else {
            alert("Must enter an integer");
        }
    }

    function showResults() {
        // document.getElementById("results").classList.remove("hidden");
        setShowingResults(true);
    }

    return (
        <div>
            <p>To get started, enter an integer to insert into an array of integers.</p>
            <input type="number" placeholder="Enter an integer here." ref={initialScreenInputElementRef} />
            <button onClick={insertNumber}>Insert</button>
            <button disabled={array.length === 0} onClick={showResults}>Calculate!</button>
        </div>
    );
}

export default InitialScreen