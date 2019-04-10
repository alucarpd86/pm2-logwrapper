var expect = require('chai').expect;

describe('category logger', () => {
    var logger = null;
    var message = null;
    var levels = null;
    var category = null;

    before(() => {
        overrideConsoleForTesting();
        logger = require('../index')();
        message = "test message";
        category = "custom_category";
        levels = logger.getLevels();
    });

    describe('logger with custom category', () => {
        before(() => {
            var categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.TRACE;
            logger.init({ categories: categories });
        });
        it('default to info and custom category trace', () => {
            expect(logger.trace(message, category)).contains(console.log(message));
            expect(logger.trace(message)).to.be.an('undefined');
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
            expect(logger.trace(message, category)).to.be.an('undefined');
            expect(logger.trace(message)).to.be.an('undefined');

            logger.setCategory(levels.TRACE, category);

            expect(logger.trace(message, category)).contains(console.log(message));
            expect(logger.trace(message)).to.be.an('undefined');
        });

        it('change all categories', () => {
            logger.setCategory(levels.INFO, category);
            expect(logger.trace(message, category)).to.be.an('undefined');
            expect(logger.trace(message)).to.be.an('undefined');

            var categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.TRACE;
            logger.setCategories(categories);

            expect(logger.trace(message, category)).contains(console.log(message));
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