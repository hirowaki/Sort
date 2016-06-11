'use strict';

// compareFunc(a, b).
//  when you'd like to swap a and b, return true.
//  * the spec of compareFunc is different from javascript.array.sort(compareFunc).
function BubbleSort(data, compareFunc) {
    let i, j, k;
    // I miss pointer...
    for (i = data.length; i > 0; --i) {
        for (j = 0, k = 1; k < i; ++j, ++k) {
            if (compareFunc(data[j], data[k])) {
                const t = data[j];
                data[j] = data[k];
                data[k] = t;
            }
        }
    }
    return data;
}

module.exports = {
    sort: BubbleSort
};
