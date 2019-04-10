const expect = require('chai').expect;

describe('default logger', () => {
    let logger = null;
    let message = null;
    let levels = null;
    let category = null;

    before(() => {
        overrideConsoleForTesting();
        logger = require('../index')();
        message = "test message";
        category = "custom_category";
        levels = logger.getLevels();
        logger.init();
    });

    describe('default logger with no configuration and no categories', () => {
        it('log info and above', () => {
            logger.setCategory(levels.INFO);
            expect(logger.fatal(message)).contains(console.log(message));
            expect(logger.error(message)).contains(console.log(message));
            expect(logger.warn(message)).contains(console.log(message));
            expect(logger.info(message)).contains(console.log(message));
            expect(logger.debug(message)).to.be.an('undefined');
            expect(logger.trace(message)).to.be.an('undefined');
        });
    });

    describe('default logger with specified level and no categories', () => {
        it('log trace and above', () => {
            logger.setCategory(levels.TRACE);
            expect(logger.fatal(message)).contains(console.log(message));
            expect(logger.error(message)).contains(console.log(message));
            expect(logger.warn(message)).contains(console.log(message));
            expect(logger.info(message)).contains(console.log(message));
            expect(logger.debug(message)).contains(console.log(message));
            expect(logger.trace(message)).contains(console.log(message));
        });
        it('log error and above', () => {
            logger.setCategory(levels.ERROR);
            expect(logger.fatal(message)).contains(console.log(message));
            expect(logger.error(message)).contains(console.log(message));
            expect(logger.warn(message)).to.be.an('undefined');
            expect(logger.info(message)).to.be.an('undefined');
            expect(logger.debug(message)).to.be.an('undefined');
            expect(logger.trace(message)).to.be.an('undefined');
        });
        it('log off', () => {
            logger.setCategory(levels.OFF);
            expect(logger.fatal(message)).to.be.an('undefined');
            expect(logger.error(message)).to.be.an('undefined');
            expect(logger.warn(message)).to.be.an('undefined');
            expect(logger.info(message)).to.be.an('undefined');
            expect(logger.debug(message)).to.be.an('undefined');
            expect(logger.trace(message)).to.be.an('undefined');
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