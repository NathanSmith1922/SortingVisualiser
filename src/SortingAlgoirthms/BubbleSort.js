export function getBubbleSort(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    bubbleSort(auxiliaryArray, animations);
    array = auxiliaryArray;

    return [animations, array];
}

function bubbleSort(auxiliaryArray, animations) {
    const len = auxiliaryArray.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            animations.push([j, j+1]);
            animations.push([j, j+1]);
            
            if (auxiliaryArray[j] > auxiliaryArray[j+1]) {
                animations.push([j, auxiliaryArray[j+1]]);
                animations.push([j + 1, auxiliaryArray[j]]);
                
                swap(auxiliaryArray, j, j+1);
            } else {
                animations.push([-1, -1]);
                animations.push([-1, -1]);
            }
            
        }
        
    }
}

function swap(auxiliaryArray, firstIdx, secondIdx) {
    let temp = auxiliaryArray[firstIdx];
    auxiliaryArray[firstIdx] = auxiliaryArray[secondIdx];
    auxiliaryArray[secondIdx] = temp;
}