import React, {useContext} from "react";
import { ContentStateContext } from "./Content";
import Statistics from "./statistics.js";

function ResultsScreen() {
    const {array, setArray, showingResults, setShowingResults, isExplanationModalOpen, setIsExplanationModalOpen, termToExplain, setTermToExplain} = useContext(ContentStateContext);

    const formatter = new Intl.NumberFormat("en-US", {style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 4});

    function openExplanationModal(termToExplain) {
        setIsExplanationModalOpen(true);
        setTermToExplain(termToExplain);
    }

    return (
        <div style={{display: showingResults ? "flex" : "none"}} id="results-screen">
            <h2>Results</h2>
            <p>Click on one of the statistics terms (on the left side below) for its definition and how to calculate it.</p>
            <table>
                <tbody>
                    <tr>
                        <th><span onClick={() => openExplanationModal(Statistics.meanTerm)}>Mean</span></th>
                        <td>{formatter.format(Statistics.mean(array))}</td>
                    </tr>
                    <tr>
                        <th><span onClick={() => openExplanationModal(Statistics.medianTerm)}>Median</span></th>
                        <td>{Statistics.median(array)}</td>
                    </tr>
                    <tr>
                        <th><span onClick={() => openExplanationModal(Statistics.rangeTerm)}>Range</span></th>
                        <td>{Statistics.range(array)}</td>
                    </tr>
                    <tr>
                        <th><span onClick={() => openExplanationModal(Statistics.standardDeviationTerm)}>Standard deviation</span></th>
                        <td>{formatter.format(Statistics.standardDeviation(array))}</td>
                    </tr>
                </tbody>
            </table>
            <button>Add Integer</button>
            <button disabled={array.length === 1}>Delete Integer</button>
        </div>
    );
}

export default ResultsScreen