var expect = require('chai').expect;

describe('default logger', () => {
    var logger = null;
    var message = null;
    var levels = null;
    var category = null;

    before(() => {
        console.log = function(){};
        console.error = function(){};
        delete process.env.LOG_LEVEL;
        logger = require('../index');
        message = "test message";
        category = "custom_category";
        levels = logger.levels;
        logger.init();
    });

    describe('default logger with no configuration and no categories', () => {
        it('log info and above', () => {
            logger.setCategory(levels.INFO);
            expect(logger.fatal(message)).to.equal(true);
            expect(logger.error(message)).to.equal(true);
            expect(logger.warn(message)).to.equal(true);
            expect(logger.info(message)).to.equal(true);
            expect(logger.debug(message)).to.equal(false);
            expect(logger.trace(message)).to.equal(false);
        });
    });

    describe('default logger with specified level and no categories', () => {
        it('log trace and above', () => {
            logger.setCategory(levels.TRACE);
            expect(logger.fatal(message)).to.equal(true);
            expect(logger.error(message)).to.equal(true);
            expect(logger.warn(message)).to.equal(true);
            expect(logger.info(message)).to.equal(true);
            expect(logger.debug(message)).to.equal(true);
            expect(logger.trace(message)).to.equal(true);
        });
        it('log error and above', () => {
            logger.setCategory(levels.ERROR);
            expect(logger.fatal(message)).to.equal(true);
            expect(logger.error(message)).to.equal(true);
            expect(logger.warn(message)).to.equal(false);
            expect(logger.info(message)).to.equal(false);
            expect(logger.debug(message)).to.equal(false);
            expect(logger.trace(message)).to.equal(false);
        });
        it('log off', () => {
            logger.setCategory(levels.OFF);
            expect(logger.fatal(message)).to.equal(false);
            expect(logger.error(message)).to.equal(false);
            expect(logger.warn(message)).to.equal(false);
            expect(logger.info(message)).to.equal(false);
            expect(logger.debug(message)).to.equal(false);
            expect(logger.trace(message)).to.equal(false);
        });
    });
});
