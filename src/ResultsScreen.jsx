import React, {useContext} from "react";
import { ContentStateContext } from "./Content";
import Statistics from "./statistics.js";

function ResultsScreen() {
    const {array, setArray, setShowingResults} = useContext(ContentStateContext);

    const formatter = new Intl.NumberFormat("en-US", {style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 4});

    return (
        <div>
            <h2>Results</h2>
            <p>Click on one of the statistics terms (on the left side below) for its definition and how to calculate it.</p>
            <table>
                <tbody>
                    <tr>
                        <th><span>Mean</span></th>
                        <td>{formatter.format(Statistics.mean(array))}</td>
                    </tr>
                    <tr>
                        <th><span>Median</span></th>
                        <td>{Statistics.median(array)}</td>
                    </tr>
                    <tr>
                        <th><span>Range</span></th>
                        <td>{Statistics.range(array)}</td>
                    </tr>
                    <tr>
                        <th><span>Standard deviation</span></th>
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