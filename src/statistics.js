export default class Statistics {
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