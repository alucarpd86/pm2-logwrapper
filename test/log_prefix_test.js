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
  });

  describe('check logger process', () => {
    it('check logger process flag', () => {
      expect(logger.info(message)).contains("[Master]");
      logger.init({
        add_process:false
      });
      expect(logger.info(message)).not.contains("[Master]");
    });
  });

  describe('check logger category', () => {
    it('check logger category flag', () => {
      expect(logger.info(message)).contains("[default]");
      logger.init({
        add_category:false
      });
      expect(logger.info(message)).not.contains("[default]");
    });
  });

});

function overrideConsoleForTesting() {
  console.log = consoleOutFunction;
  console.error = consoleErrorFunction;
}

function consoleErrorFunction(message) {
  return message;
}

function consoleOutFunction(message) {
  return message;
}