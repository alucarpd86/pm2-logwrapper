var expect = require('chai').expect;

describe('default logger', () => {
    var logger1 = null;
    var logger2 = null;
    var logger3 = null;
    var message = null;
    var levels = null;
    var category = null;

    before(() => {
        overrideConsoleForTesting();
        category = "custom_category";

        logger1 = require('../index')();
        logger2 = require('../index')().getLogger(category);
        logger3 = require('../index')(category);
        message = "test message";
        levels = logger1.getLevels();
    });

    describe('check logger category', () => {
        it('log default category and custom category', () => {
            expect(logger1.info(message)).contains("[default]");
            expect(logger2.info(message)).contains("["+category+"]");
            expect(logger3.info(message)).contains("["+category+"]");
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