var test = require('tape');
var helpersUT = require('../src/helpers');

test('builds dictionary', function (t) {
    let inputs = [
        ['a', 0], ['a', 1], ['baaccc', 0], ['1 2 3 aa b', 0], ['', 0], [' ', 0]
    ];
    let expectations = [
        { 'a': { numberOfChars: 1, origins: [0] }},
        { 'a': { numberOfChars: 1, origins: [1] }},
        {
            'b': { numberOfChars: 1, origins: [0] },
            'a': { numberOfChars: 2, origins: [0] },
            'c': { numberOfChars: 3, origins: [0] }
        },
        {
            '1': { numberOfChars: 1, origins: [0] },
            '2': { numberOfChars: 1, origins: [0] },
            '3': { numberOfChars: 1, origins: [0] },
            'a': { numberOfChars: 2, origins: [0] },
            'b': { numberOfChars: 1, origins: [0] },
            ' ': { numberOfChars: 4, origins: [0]}
        },
        {},
        { ' ': { numberOfChars: 1, origins: [ 0 ] }}
    ];
    t.plan(inputs.length);

    inputs.forEach((input, i) => {
        t.deepEqual(helpersUT.buildDictionary.apply(null, input), expectations[i]);
    })
});

test('formats string', function (t) {
    let inputs = [
        [{ key: 'a', origins: [0], numberOfChars: 5 }],
        [{ key: 'a', origins: [1], numberOfChars: 5 }, { key: 'b', origins: [0], numberOfChars: 5 }],
        [{ key: 'a', origins: [0], numberOfChars: 5 }, { key: 'b', origins: [0], numberOfChars: 3 }],
        [{ key: 'a', origins: [1], numberOfChars: 1 }, { key: 'b', origins: [0], numberOfChars: 3 }],
        []
    ];

    let expectations = [
        '1:aaaaa', '2:aaaaa/1:bbbbb','1:aaaaa/1:bbb', '1:bbb/2:a', ''
    ];

    t.plan(inputs.length);

    inputs.forEach((input, i) => {
        t.deepEqual(helpersUT.formatString.call(null, input), expectations[i]);
    })
})

test('returns a json response', function (t) {
    let inputs = [
        ['my&friend&Paul has heavy hats! &', 'my friend John has many many friends &'],
        ['mmmmm m nnnnn y&friend&Paul has heavy hats! &', 'my frie n d Joh n has ma n y ma n y frie n ds n&'],
        ['Are the kids at home? aaaaa fffff', 'Yes they are here! aaaaa fffff'],
        ['aa', ''],
        ['', 'bb'],
        ['']
    ];

    let expectations = [
        [ { key: 'm', origins: [ 1 ], numberOfChars: 3 }, { key: 'y', origins: [ 1 ], numberOfChars: 3 }, { key: 'f', origins: [ 1 ], numberOfChars: 2 }, { key: 'r', origins: [ 1 ], numberOfChars: 2 }, { key: 'i', origins: [ 1 ], numberOfChars: 2 }, { key: 'e', origins: [ 0, 1 ], numberOfChars: 2 }, { key: 'n', origins: [ 1 ], numberOfChars: 5 }, { key: 'd', origins: [ 1 ], numberOfChars: 2 }, { key: 'a', origins: [ 0 ], numberOfChars: 4 }, { key: 'h', origins: [ 0 ], numberOfChars: 3 }, { key: 's', origins: [ 0, 1 ], numberOfChars: 2 } ],
        [ { key: 'm', origins: [ 0 ], numberOfChars: 6 }, { key: 'n', origins: [ 0, 1 ], numberOfChars: 6 }, { key: 'y', origins: [ 1 ], numberOfChars: 3 }, { key: 'f', origins: [ 1 ], numberOfChars: 2 }, { key: 'r', origins: [ 1 ], numberOfChars: 2 }, { key: 'i', origins: [ 1 ], numberOfChars: 2 }, { key: 'e', origins: [ 0, 1 ], numberOfChars: 2 }, { key: 'd', origins: [ 1 ], numberOfChars: 2 }, { key: 'a', origins: [ 0 ], numberOfChars: 4 }, { key: 'h', origins: [ 0 ], numberOfChars: 3 }, { key: 's', origins: [ 0, 1 ], numberOfChars: 2 } ],
        [ { key: 'r', origins: [ 1 ], numberOfChars: 2 }, { key: 'e', origins: [ 1 ], numberOfChars: 5 }, { key: 't', origins: [ 0 ], numberOfChars: 2 }, { key: 'h', origins: [ 0, 1 ], numberOfChars: 2 }, { key: 'a', origins: [ 0, 1 ], numberOfChars: 6 }, { key: 'f', origins: [ 0, 1 ], numberOfChars: 5 } ],
        [ { key: 'a', origins: [ 0 ], numberOfChars: 2 } ],
        [ { key: 'b', origins: [ 1 ], numberOfChars: 2 } ],
        []
    ];

    t.plan(inputs.length);

    inputs.forEach((input, i) => {
        t.deepEqual(helpersUT.getResponse.call(null, input), expectations[i])
    })
})

test('mix solves the problem with formatted string', function (t) {
    let inputs = [
        ['my&friend&Paul has heavy hats! &', 'my friend John has many many friends &', 'ss'],
        ['mmmmm m nnnnn y&friend&Paul has heavy hats! &', 'my frie n d Joh n has ma n y ma n y frie n ds n&'],
        ['Are the kids at home? aaaaa fffff', 'Yes they are here! aaaaa fffff'],
        ['aa', ''],
        ['aa','','aa'],
        ['', 'bb'],
        ['', '', 'cc'],
        ['']
    ];

    let expectations = [
        '2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/1,2:ee/2:ff/2:ii/2:rr/1,2,3:ss',
        '1:mmmmmm/1,2:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/1,2:ee/2:ff/2:ii/2:rr/1,2:ss',
        '1,2:aaaaaa/2:eeeee/1,2:fffff/1,2:hh/2:rr/1:tt',
        '1:aa',
        '1,3:aa',
        '2:bb',
        '3:cc',
        ''
    ];

    t.plan(inputs.length);

    inputs.forEach((input, i) => {
        t.deepEqual(helpersUT.mix.call(null, input), expectations[i])
    })
})