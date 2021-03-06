const expect = require('chai').expect;

describe('change category', () => {
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
    });

    describe('logger with categories at INFO and single category at DEBUG', () => {
        before(() => {
            let categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.INFO;
            logger.init({categories: categories});
        });
        it('logging at INFO and DEBUG', () => {
            expect(logger.info(message, category)).contains(console.log(message));
            expect(logger.info(message)).contains(console.log(message));
            logger.setCategory(levels.DEBUG, category);
            expect(logger.debug(message, category)).contains(console.log(message));
            expect(logger.debug(message)).to.be.an('undefined');
        });
    });

    describe('logger with updated categories to DEBUG', () => {
        before(() => {
            let categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.INFO;
            logger.init({categories: categories});
        });
        it('logging at INFO and DEBUG', () => {
            expect(logger.info(message, category)).contains(console.log(message));
            expect(logger.info(message)).contains(console.log(message));

            let categories = {};
            categories["default"] = levels.INFO;
            categories[category] = levels.DEBUG;
            logger.setCategories(categories);

            expect(logger.debug(message, category)).contains(console.log(message));
            expect(logger.debug(message)).to.be.an('undefined');
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