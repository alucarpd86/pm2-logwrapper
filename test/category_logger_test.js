var expect = require('chai').expect;

describe('category logger', () => {
    var logger = null;
    var message = null;
    var levels = null;
    var category = null;

    before(() => {
        logger = require('../index');
        message = "test message";
        category = "custom_category";
        levels = logger.levels;
    });

    describe('logger with custom category', () => {
        before(() => {
            var categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.TRACE;
            logger.init({ categories: categories });
        });
        it('default to info and custom category trace', () => {
            expect(logger.trace(message, category)).to.equal(true);
            expect(logger.trace(message)).to.equal(false);
        });
    });

    describe('set single category', () => {
        before(() => {
            var categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.INFO;
            logger.init({ categories: categories });
        });
        it('change single category', () => {
            expect(logger.trace(message, category)).to.equal(false);
            expect(logger.trace(message)).to.equal(false);

            logger.setCategory(levels.TRACE, category);

            expect(logger.trace(message, category)).to.equal(true);
            expect(logger.trace(message)).to.equal(false);
        });

        it('change all categories', () => {
            logger.setCategory(levels.INFO, category);
            expect(logger.trace(message, category)).to.equal(false);
            expect(logger.trace(message)).to.equal(false);

            var categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.TRACE;
            logger.setCategories(categories);

            expect(logger.trace(message, category)).to.equal(true);
            expect(logger.trace(message)).to.equal(false);
        });
    });
});