import React, {useState, useRef} from "react";

function Content() {
    const [array, setArray] = useState([]);
    const [showingResults, setShowingResults] = useState(false);
    const darkenerRef = useRef(null);
    const explanationModalRef = useRef(null);
    const explanationTextRef = useRef(null);
    const addIntModalRef = useRef(null);
    const deleteIntModalRef = useRef(null);
    const formatter = new Intl.NumberFormat({maximumSignificantDigits: 3});

    function addNumber() {
        const inputtedNumber = Number(document.getElementById("main-input").value);
        document.getElementById("main-input").value = "";
        if (Number.isInteger(inputtedNumber)) {
            setArray(a => [...a, inputtedNumber]);
        }
        else {
            alert("Must enter an integer.");
        }
    }

    function addNumberPostInitialCalculation() {
        const inputtedNumber = Number(document.getElementById("add-int-input").value);
        closeAddIntModal();
        if (Number.isInteger(inputtedNumber)) {
            setArray(a => [...a, inputtedNumber]);
            alert(inputtedNumber + " added successfully.");
        }
        else {
            alert("Must enter an integer.");
        }
    }

    function deleteNumber() {
        const inputtedNumber = Number(document.getElementById("delete-int-input").value);
        closeDeleteIntModal();
        if (Number.isInteger(inputtedNumber)) {
            const firstOccurrence = __findFirstIdxOfNumber(array, inputtedNumber);
            if (firstOccurrence === -1) { alert(inputtedNumber + " not found."); }
            else {
                setArray(a => a.filter((_, i) => i !== firstOccurrence));
                alert(inputtedNumber + " successfully deleted.");
            }
        }
        else {
            alert("Must enter an integer.");
        }
    }

    function showResults() {
        setShowingResults(true);
    }

    function provideExplanation(explanationToProvide) {
        switch (explanationToProvide) {
            case 1:
                explanationTextRef.current.textContent = "The mean is the number that all the numbers in a set gravitate towards. "
                    + "To calculate it, first, add up all the numbers in the set. Then divide the resulting sum by the number of numbers in the set.";
                break;
            case 2:
                explanationTextRef.current.textContent = "The median is the number that, when the set of numbers it comes from is ordered from least to greatest, is in the middle of that set."
                    + " If there is an even number of numbers in the set, the median is the mean of the 2 numbers that are in the middle of the set when it is ordered from least to greatest.";
                break;
            case 3:
                explanationTextRef.current.textContent = "The range of a set of numbers is the difference between its largest number and its smallest number.";
                break;
            default:
                explanationTextRef.current.textContent = "The standard deviation is a general measure of how far away the numbers in a set are from the set's mean."
                    + " To calculate it, first, for each of the numbers in the set, subtract from it the mean and square the resulting difference."
                    + " Next, calculate the mean of the squared differences you obtained from the previous step."
                    + " Then take the square root of the result you obtain from the previous step.";
        }
        explanationModalRef.current.classList.add("active");
        darkenerRef.current.classList.add("active");
    }

    function closeExplanationModal() {
        explanationModalRef.current.classList.remove("active");
        darkenerRef.current.classList.remove("active");
    }

    function openAddIntModal() {
        addIntModalRef.current.classList.add("active");
        darkenerRef.current.classList.add("active");
    }

    function closeAddIntModal() {
        document.getElementById("add-int-input").value = "";
        addIntModalRef.current.classList.remove("active");
        darkenerRef.current.classList.remove("active");
    }

    function openDeleteIntModal() {
        deleteIntModalRef.current.classList.add("active");
        darkenerRef.current.classList.add("active");
    }

    function closeDeleteIntModal() {
        document.getElementById("delete-int-input").value = "";
        deleteIntModalRef.current.classList.remove("active");
        darkenerRef.current.classList.remove("active");
    }

    function mean() {
        let sum = 0;
        for (let i = 0; i < array.length; i++) { sum += array[i]; }
        return sum / array.length;
    }

    function median() {
        let arrayCopy = []
        for (let i = 0; i < array.length; i++) { arrayCopy.push(array[i]); }
        __heapSort(arrayCopy);
        if (arrayCopy.length % 2 !== 0) { return arrayCopy[(arrayCopy.length - 1) / 2]; }
        else {
            const leftValue = arrayCopy[arrayCopy.length / 2 - 1];
            const rightValue = arrayCopy[arrayCopy.length / 2];
            return (leftValue + rightValue) / 2;
        }
    }

    function range() {
        let largestValue = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] > largestValue) { largestValue = array[i]; }
        }
        let smallestValue = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] < smallestValue) { smallestValue = array[i]; }
        }
        return largestValue - smallestValue;
    }

    function standardDeviation() {
        const average = mean();
        let sumOfSquaredDifferences = 0;
        for (let i = 0; i < array.length; i++) { sumOfSquaredDifferences += Math.pow((array[i] - average), 2); }
        return Math.sqrt(sumOfSquaredDifferences / array.length);
    }

    function __heapSort(arrayToSort) {
        __buildMaxHeap(arrayToSort);
        for (let i = arrayToSort.length - 1; i > 0; i--) {
            __swap(arrayToSort, 0, i);
            __siftDown(arrayToSort, 0, i - 1);
        }
    }
    
    function __swap(array, index1, index2) {
        const placeholder = array[index1];
        array[index1] = array[index2];
        array[index2] = placeholder;
    }
    
    function __buildMaxHeap(array) {
        for (let i = Math.floor((array.length - 2) / 2); i >= 0; i--) { __siftDown(array, i, array.length - 1); }
    }
    
    function __siftDown(array, startIndex, endIndex) {
        let i = startIndex;
        while (2 * i + 1 <= endIndex) {
    
            // index i has 2 children
            if (2 * i + 2 <= endIndex) {
                if (array[i] < array[2 * i + 1] || array[i] < array[2 * i + 2]) {
                    const idxToSwapWith = array[2 * i + 1] >= array[2 * i + 2] ? 2 * i + 1 : 2 * i + 2;
                    __swap(array, i, idxToSwapWith);
                    i = idxToSwapWith;
                }
                else { break; }
            }
    
            // index i has only 1 child
            else {
                if (array[i] < array[2 * i + 1]) {
                    __swap(array, i, 2 * i + 1);
                    i = 2 * i + 1;
                }
                else { break; }
            }
        }
    }

    function __findFirstIdxOfNumber(array, numberBeingSearchedFor) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === numberBeingSearchedFor) { return i; }
        }
        return -1;
    }

    return (<div id="content">
        <div id="darkener" ref={darkenerRef}></div>
        <div id="explanation-modal" ref={explanationModalRef}>
            <p id="explanation" ref={explanationTextRef}>Explanation here.</p>
            <button onClick={closeExplanationModal}>Close</button>
        </div>
        <div id="add-int-modal" ref={addIntModalRef}>
            <p>Enter the integer you would like to add. The integer you enter will get added at the end of the array.</p>
            <input id="add-int-input" type="number" placeholder="Enter the integer here." />
            <button id="add-int-ok-button" onClick={addNumberPostInitialCalculation}>OK</button>
            <button id="add-int-cancel-button" onClick={closeAddIntModal}>Cancel</button>
        </div>
        <div id="delete-int-modal" ref={deleteIntModalRef}>
            <p>Enter the integer you would like to delete. The first occurrence of the integer you enter will get deleted.</p>
            <input id="delete-int-input" type="number" placeholder="Enter the integer here." />
            <button id="delete-int-ok-button" onClick={deleteNumber}>OK</button>
            <button id="delete-int-cancel-button" onClick={closeDeleteIntModal}>Cancel</button>
        </div>
        <p id="instructions" style={{display: (showingResults ? "none" : "block")}}>
            {array.length === 0 ? "To get started, enter an integer to insert into an array of integers." : "Enter another integer, or, if you're done, press the Calculate! button."}
        </p>
        <p id="array">[{array.toString()}]</p>
        <input id="main-input" type="number" placeholder="Enter an integer here." style={{display: (showingResults ? "none" : "block")}} />
        <button id="insert-button" onClick={addNumber} style={{display: (showingResults ? "none" : "block")}}>Insert</button>
        <button disabled={array.length === 0} id="calculate-button" onClick={showResults} style={{display: (showingResults ? "none" : "block")}}>Calculate!</button>
        <h2 style={{display: (showingResults ? "block" : "none")}}>Results</h2>
        <p style={{display: (showingResults ? "block" : "none")}}>Click on one of the statistics terms (on the left side below) for its definition and how to calculate it.</p>
        <table style={{display: (showingResults ? "" : "none")}}>
            <tr>
                <td className="term" onClick={() => provideExplanation(1)}>Mean</td>
                <td className="value">{formatter.format(mean())}</td>
            </tr>
            <tr>
                <td className="term" onClick={() => provideExplanation(2)}>Median</td>
                <td className="value">{formatter.format(median())}</td>
            </tr>
            <tr>
                <td className="term" onClick={() => provideExplanation(3)}>Range</td>
                <td className="value">{range()}</td>
            </tr>
            <tr>
                <td className="term" onClick={() => provideExplanation(4)}>Standard deviation</td>
                <td className="value">{formatter.format(standardDeviation())}</td>
            </tr>
        </table>
        <button style={{display: (showingResults ? "block" : "none")}} onClick={openAddIntModal}>Add Integer</button>
        <button style={{display: (showingResults ? "block" : "none")}} disabled={array.length === 1} onClick={openDeleteIntModal}>Delete Integer</button>
    </div>
    );
}

export default Content