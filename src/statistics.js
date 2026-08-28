export default class Statistics {
    static meanTerm = "mean";
    static medianTerm = "median";
    static rangeTerm = "range";
    static standardDeviationTerm = "standard deviation";

    static mean(array) {
        if (array.length === 0) {
            return 0;
        }
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum / array.length;
    }

    static standardDeviation(array) {
        if (array.length === 0) {
            return 0;
        }
        const meanOfValues = Statistics.mean(array);
        let sumOfSquaredDifferences = 0;
        for (let i = 0; i < array.length; i++) {
            sumOfSquaredDifferences += Math.pow((array[i] - meanOfValues), 2);
        }
        return Math.sqrt(sumOfSquaredDifferences / array.length);
    }

    static range(array) {
        return array.length === 0 ? 0 : Statistics.#maximum(array) - Statistics.#minimum(array);
    }

    static median(array) {
        if (array.length === 0) {
            return 0;
        }
        const sortedArray = array.toSorted((a, b) => a - b);
        if (array.length % 2 === 1) {
            return sortedArray[(sortedArray.length - 1) / 2];
        }
        else {
            const leftHalfLastIndex = Math.floor((array.length - 1) / 2);
            const rightHalfFirstIndex = leftHalfLastIndex + 1;
            return (sortedArray[leftHalfLastIndex] + sortedArray[rightHalfFirstIndex]) / 2;
        }
    }

    static getExplanationForTerm(termToExplain) {
        if (termToExplain === Statistics.meanTerm) {
            return "The mean is the number that all the numbers in a set gravitate towards. "
                    + "To calculate it, first, add up all the numbers in the set. Then divide the resulting sum by the number of numbers in the set.";
        }
        else if (termToExplain === Statistics.medianTerm) {
            return "The median is the number that, when the set of numbers it comes from is ordered from least to greatest, is in the middle of that set."
                    + " If there is an even number of numbers in the set, the median is the mean of the 2 numbers that are in the middle of the set when it is ordered from least to greatest.";
        }
        else if (termToExplain === Statistics.rangeTerm) {
            return "The range of a set of numbers is the difference between its largest number and its smallest number.";
        }
        else if (termToExplain === Statistics.standardDeviationTerm) {
            return "The standard deviation is a general measure of how far away the numbers in a set are from the set's mean."
                    + " To calculate it, first, for each of the numbers in the set, subtract from it the mean and square the resulting difference."
                    + " Next, calculate the mean of the squared differences you obtained from the previous step."
                    + " Then take the square root of the result you obtain from the previous step.";
        }
        else {
            return "ERROR: Unrecognized term.";
        }
    }

    // =======================
    // PRIVATE UTILITY METHODS
    // =======================

    static #minimum(array) {
        let minimumValue = array[0];
        for (let i = 0; i < array.length; i++) {
            minimumValue = array[i] < minimumValue ? array[i] : minimumValue;
        }
        return minimumValue;
    }

    static #maximum(array) {
        let maximumValue = array[0];
        for (let i = 0; i < array.length; i++) {
            maximumValue = array[i] > maximumValue ? array[i] : maximumValue;
        }
        return maximumValue;
    }
}