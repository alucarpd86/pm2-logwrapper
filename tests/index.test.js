const assert = require("assert");

const logger = require('../index');

logger.init({
     env_var: "LOG_LEVEL",
     errors_on_out: false
});

process.env.LOG_LEVEL = "trace";
assert.ok(logger.isTraceEnabled());
assert.ok(logger.isDebugEnabled());
assert.ok(logger.isInfoEnabled());
assert.ok(logger.isWarnEnabled());
assert.ok(logger.isErrorEnabled());
assert.ok(logger.isFatalEnabled());

assert.ok(logger.debug("debug"));
assert.ok(logger.info("info"));
assert.ok(logger.warn("warn"));
assert.ok(logger.error("error"));
assert.ok(logger.fatal("fatal"));

process.env.LOG_LEVEL = "error";
assert.ok(!logger.isTraceEnabled());
assert.ok(!logger.isDebugEnabled());
assert.ok(!logger.isInfoEnabled());
assert.ok(!logger.isWarnEnabled());
assert.ok(logger.isErrorEnabled());
assert.ok(logger.isFatalEnabled());

assert.ok(!logger.debug("debug"));
assert.ok(!logger.info("info"));
assert.ok(!logger.warn("warn"));
assert.ok(logger.error("error"));
assert.ok(logger.fatal("fatal"));
