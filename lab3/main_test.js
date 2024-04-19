const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe("Test", () => {
    const calculator = new Calculator();
    it("exp() fun Test", () => {
        let expTest = [
            { param: 87, expected: Math.exp(87)},
            { param: 0, expected: Math.exp(0) },
            { param: -1, expected: Math.exp(-1) },
            { param: '48763', expected: Error, msg: "unsupported operand type" },
            { param: true, expected: Error, msg: "unsupported operand type" },
			{ param: null, expected: Error, msg: 'unsupported operand type'},
            { param: Infinity, expected: Error, msg: "unsupported operand type" },
			{ param: -Infinity, expected: Error, msg: 'unsupported operand type'},
            { param: Number.MAX_VALUE, expected: Error, msg: "over" }
			
        ];

        expTest.map(({ param, expected, msg }) => {
            if (expected === Error) {
                assert.throws(() => calculator.exp(param), expected, msg);
            }
            else {
                assert.strictEqual(calculator.exp(param), expected);
            }
        });
    });

    it("log() fun Test", () => {
        let logTestcase = [
            { param: 87, expected: Math.log(87) },
            { param: 48763, expected: Math.log(48763) },
            { param: '48763', expected: Error, msg: "unsupported operand type" },
            { param: true, expected: Error, msg: "unsupported operand type" },
			{ param: null, expected: Error, msg: 'unsupported operand type'},
            { param: Infinity, expected: Error, msg: "unsupported operand type" },
            { param: 0, expected: Error, msg: "math domain error" },
            { param: -1, expected: Error, msg: "math domain error" },
        ];

        logTestcase.map(({ param, expected, msg }) => {
            if (expected === Error) { 
                assert.throws(() => calculator.log(param), expected, msg);
            }
            else {
                assert.strictEqual(calculator.log(param), expected);
            }
        });
    });
});
