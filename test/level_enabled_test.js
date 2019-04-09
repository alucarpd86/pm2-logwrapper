var expect = require('chai').expect;

describe('logger enabled functions', () => {
    var logger = null;
    var message = null;
    var levels = null;

    before(() => {
        overrideConsoleForTesting();
        logger = require('../index');
        message = "test message";
        levels = logger.levels;
        logger.init();
    });

    describe('check default enabled logger', () => {
        it('log info and above', () => {
            logger.setCategory(levels.INFO);
            expect(logger.isFatalEnabled()).to.equal(true);
            expect(logger.isErrorEnabled()).to.equal(true);
            expect(logger.isWarnEnabled()).to.equal(true);
            expect(logger.isInfoEnabled()).to.equal(true);
            expect(logger.isDebugEnabled()).to.equal(false);
            expect(logger.isTraceEnabled()).to.equal(false);
        });
    });

    describe('check logger enable at trace', () => {
        it('log trace and above', () => {
            logger.setCategory(levels.TRACE);
            expect(logger.isFatalEnabled()).to.equal(true);
            expect(logger.isErrorEnabled()).to.equal(true);
            expect(logger.isWarnEnabled()).to.equal(true);
            expect(logger.isInfoEnabled()).to.equal(true);
            expect(logger.isDebugEnabled()).to.equal(true);
            expect(logger.isTraceEnabled()).to.equal(true);
        });
        it('check logger enable at error', () => {
            logger.setCategory(levels.ERROR);
            expect(logger.isFatalEnabled()).to.equal(true);
            expect(logger.isErrorEnabled()).to.equal(true);
            expect(logger.isWarnEnabled()).to.equal(false);
            expect(logger.isInfoEnabled()).to.equal(false);
            expect(logger.isDebugEnabled()).to.equal(false);
            expect(logger.isTraceEnabled()).to.equal(false);
        });
        it('check logger enable at off', () => {
            logger.setCategory(levels.OFF);
            expect(logger.isFatalEnabled()).to.equal(false);
            expect(logger.isErrorEnabled()).to.equal(false);
            expect(logger.isWarnEnabled()).to.equal(false);
            expect(logger.isInfoEnabled()).to.equal(false);
            expect(logger.isDebugEnabled()).to.equal(false);
            expect(logger.isTraceEnabled()).to.equal(false);
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