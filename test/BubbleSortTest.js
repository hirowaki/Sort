'use strict';

const _ = require('lodash');
const assert = require('assert');
const sort = require('./../lib/BubbleSort').sort;

describe('BubbleSort.', function () {
    describe('simple integer array.', function () {
        it('[10, 5] => [5, 10]', function () {
            assert.deepEqual(sort([10, 5], (a, b) => {
                return (a - b) > 0;
            }), [5, 10]);
        });

        it('[5, 4, 3] => [3, 4, 5]', function () {
            assert.deepEqual(sort([5, 4, 3], (a, b) => {
                return (a - b) > 0;
            }), [3, 4, 5]);
        });

        it('[3, 4, 5] => [5, 4, 3]', function () {
            assert.deepEqual(sort([3, 4, 5], (a, b) => {
                return (b - a) > 0;
            }), [5, 4, 3]);
        });

        it('[3, 5, 4, 7, 8] => [8, 7, 5, 4, 3]', function () {
            assert.deepEqual(sort([3, 5, 4, 7, 8], (a, b) => {
                return (b - a) > 0;
            }), [8, 7, 5, 4, 3]);
        });
    });

    describe('object list.', function () {
        const data = [
            {id: 1, data: {}},
            {id: 2, data: {}},
            {id: 3, data: {}},
            {id: 4, data: {}},
            {id: 5, data: {}}
        ];

        it('[1, 2, 3, 4, 5] => [5, 4, 3, 2, 1]', function () {
            sort(data, (a, b) => {
                return (b.id - a.id) > 0;
            });

            assert.deepEqual(data.map(data => data.id), [5, 4, 3, 2, 1]);
        });
    });

    describe('have only one element.', function () {
        it('[5] => [5]', function () {
            let hit = false;
            assert.deepEqual(sort([5], () => {
                hit = true;
                return true;
            }), [5]);
            assert.ok(!hit);    // compareFunc should not got hit.
        });
    });

    describe('compare with array.sort.', function () {
        it('random test', function () {
            const src = _.range(1, 100);
            const dataA = _.shuffle(src);
            const dataB = _.clone(dataA);

            sort(dataA, (a, b) => {return (a - b) > 0;});
            dataB.sort((a, b) => {return a - b;});
            assert.deepEqual(dataA, dataB);
        });
    });
});

