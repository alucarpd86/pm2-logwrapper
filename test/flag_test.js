const expect = require('chai').expect;
const dateformatLib = require('date-format');

describe('default logger', () => {
    let logger1 = null;
    let logger2 = null;
    let logger3 = null;
    let message = null;
    let levels = null;
    let category = null;

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

describe('check errors_on_out flag', () => {
    let logger = null;
    let message = null;

    before(() => {
        overrideConsoleForWithFunction();
        logger = require('../index')();
        message = "test message";
    });

    it('log at fatal on standard out', () => {
        expect(logger.fatal(message)).is.not.equal(consoleErrorFunction);
        expect(logger.error(message)).is.not.equal(consoleErrorFunction);
        logger.init({
            errors_on_std_error: true
        });
        expect(logger.fatal(message)).is.equal(consoleErrorFunction);
        expect(logger.error(message)).is.equal(consoleErrorFunction);
    });
});

describe('check add_timestamp flag', () => {
    let logger1 = null;
    let message = null;
    let dateFormat = null;

    before(() => {
        overrideConsoleForTesting();
        logger1 = require('../index')();
        message = "test message";
        dateFormat = "yyyy-mm-dd HH:MM:ss";
    });

    it('log at fatal on standard out', () => {
        expect(logger1.info(message)).not.contains(dateformatLib(dateFormat, new Date()));
        logger1.init({
            add_timestamp: true
        });
        expect(logger1.info(message)).contains(dateformatLib(dateFormat, new Date()));
    });
});

describe('check timestamp_format flag', () => {
    let logger1 = null;
    let message = null;
    let dateFormat = null;
    let customDateFormat = null;

    before(() => {
        overrideConsoleForTesting();
        logger1 = require('../index')();
        message = "test message";
        dateFormat = "yyyy-mm-dd HH:MM:ss";
        customDateFormat = "YYYY-mm-dd";
    });

    it('log at fatal on standard out', () => {
        expect(logger1.info(message)).not.contains(dateformatLib.asString(customDateFormat, new Date()));
        logger1.init({
            add_timestamp: true,
            timestamp_format: customDateFormat
        });
        expect(logger1.info(message)).contains(dateformatLib.asString(customDateFormat, new Date()));
    });
});

function overrideConsoleForTesting() {
    console.log = consoleOutFunction;
    console.error = consoleErrorFunction;
}

function overrideConsoleForWithFunction() {
    console.log = function() { return consoleOutFunction };
    console.error = function() { return consoleErrorFunction; };
}

function consoleErrorFunction(message) {
    return message;
}

function consoleOutFunction(message) {
    return message;
}