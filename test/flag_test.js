var expect = require('chai').expect;

describe('default logger', () => {
    var logger1 = null;
    var logger2 = null;
    var message = null;
    var levels = null;
    var category = null;

    before(() => {
        overrideConsoleForTesting();
        category = "custom_category";

        logger1 = require('../index');
        logger2 = require('../index').getLogger(category);
        message = "test message";
        levels = logger1.levels;
    });

    describe('check logger category', () => {
        it('log default category and custom category', () => {
            expect(logger1.info(message)).contains("[default]");
            expect(logger2.info(message)).contains("["+category+"]");
        });
    });

});

function overrideConsoleForTesting() {
    console.log = function(message) {
        return message;
    };
    console.error = function(message) {
        return message;
    };
}