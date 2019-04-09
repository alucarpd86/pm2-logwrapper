var expect = require('chai').expect;

describe('change category', () => {
    var logger = null;
    var message = null;
    var levels = null;
    var category = null;

    before(() => {
        console.log = function(){};
        console.error = function(){};
        logger = require('../index');
        message = "test message";
        category = "custom_category";
        levels = logger.levels;
    });

    describe('logger with categories at INFO and single category at DEBUG', () => {
        before(() => {
            var categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.INFO;
            logger.init({categories: categories});
        });
        it('logging at INFO and DEBUG', () => {
            expect(logger.info(message, category)).to.equal(true);
            expect(logger.info(message)).to.equal(true);
            logger.setCategory(levels.DEBUG, category);
            expect(logger.debug(message, category)).to.equal(true);
            expect(logger.debug(message)).to.equal(false);
        });
    });

    describe('logger with updated categories to DEBUG', () => {
        before(() => {
            var categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.INFO;
            logger.init({categories: categories});
        });
        it('logging at INFO and DEBUG', () => {
            expect(logger.info(message, category)).to.equal(true);
            expect(logger.info(message)).to.equal(true);

            var categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.DEBUG;
            logger.setCategories(categories);

            expect(logger.debug(message, category)).to.equal(true);
            expect(logger.debug(message)).to.equal(false);
        });
    });
});