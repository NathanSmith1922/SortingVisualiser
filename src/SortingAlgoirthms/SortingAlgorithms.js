export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) {
        return array;
    }
    // Setting up a duplicate of the array
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) {
        return;
    }

    const middleIdx = Math.floor((startIdx+endIdx) / 2);
    // Splitting up the array
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    // Actually does the merge
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values being compared
        // They are pushed to change their colour
        animations.push([i, j]);
        // We then push them again to revert their colours
        animations.push([i, j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Overwrites k in the original array with i in the auxiliary array
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // Overwrites k in the original array with j in the auxiliary array
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= middleIdx) {
        // These are the values being compared
        // They are pushed to change their colour
        animations.push([i, i]);
        // We then push them again to revert their colours
        animations.push([i, i]);

        // Overwrites k in the original array with i in the auxiliary array
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= endIdx) {
        // These are the values being compared
        // They are pushed to change their colour
        animations.push([j, j]);
        // We then push them again to revert their colours
        animations.push([j, j]);

        // Overwrites k in the original array with j in the auxiliary array
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}