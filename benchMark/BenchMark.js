'use strict';
/*eslint-disable no-console*/

const _ = require('lodash');
const assert = require('assert');
const BubbleSort = require('./../lib/BubbleSort');

// nanosec profiler.
class NanoTimer {
    constructor() {
        this._period = process.hrtime();
    }

    stop() {
        const elapsed = process.hrtime(this._period);
        return elapsed[0] * 1e9 + elapsed[1];   // nano sec.
    }
}

function _benchMark(data) {
    const buffArray = _.shuffle(data);
    const buffBubble = _.cloneDeep(buffArray);

    function _test(_func) {
        const timer = new NanoTimer;
        _func();
        return timer.stop();
    }

    return {
        array: _test(() => {
            buffArray.sort((a, b) => {
                return a.id - b.id;
            });
        }),
        bubble: _test(() => {
            BubbleSort.sort(buffBubble, (a, b) => {
                return (a.id - b.id) > 0;
            });
        })
    }
}

const RECORD_SIZE = 5000;
const ITERATE_COUNT = 100;

function benchMark() {
    const data = _.range(1, RECORD_SIZE).map((key) => {
        return {
            id: key,
            data: "DATA " + key
        }
    });

    let arraySort= 0;
    let bubbleSort = 0;

    for (let i = 0; i < ITERATE_COUNT; ++i) {
        const result = _benchMark(data);
        console.log(i, (result));

        arraySort += result.array;
        bubbleSort += result.bubble;
    }

    const averageArray = (arraySort / ITERATE_COUNT) | 0;
    const averageBubble = (bubbleSort / ITERATE_COUNT) | 0;

    console.log("Average");
    console.log(" JS.Array.sort", averageArray);
    console.log(" Bubble sort", averageBubble, ((averageBubble / averageArray * 100) | 0) + "%");
}

benchMark();

/*eslint-enable no-console*/
