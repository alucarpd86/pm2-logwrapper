const cluster = require('cluster');
const dateformat = require('dateformat');
const levels = {
    OFF: "OFF",
    FATAL: "FATAL",
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    DEBUG: "DEBUG",
    TRACE: "TRACE"
};
const levelsArray = Object.keys(levels);

module.exports = Logger;

function Logger(category) {
    let opts = {
        errors_on_std_error: false,
        add_timestamp: false,
        add_process: true,
        add_category: true,
        timestamp_format: "yyyy-mm-dd HH:MM:ss",
        default_category : category||"default",
        categories: {
            "default": levels.INFO
        }
    };
    opts.categories[opts.default_category] = levels.INFO;

    ///////////////////////
    // PRIVATE FUNCTIONS //
    ///////////////////////
    function init(options) {
        opts = Object.assign(opts, options);
    }
    function getLogger(category) {
        opts.default_category = category;
        if (!opts.categories[opts.default_category]) {
            opts.categories[opts.default_category] = levels.INFO;
        }
        return this;
    }
    function setCategory(level, category) {
        if (!category) category=opts.default_category;
        if (levelsArray.indexOf(level)==-1) level = levels.INFO;
        opts.categories[category] = level;
        return opts.categories[category];
    }
    function setCategories(categories) {
        if (categories && typeof categories == "object") {
            opts = Object.assign(opts, {categories: categories});
        }
        return opts.categories;
    }
    function getLevels() {
        return levels;
    }
    function trace(message, category) {
        return log(levels.TRACE, message, category);
    }
    function isTraceEnabled(category) {
        return isLevelEnabled(levels.TRACE, category);
    }
    function debug(message, category) {
        return log(levels.DEBUG, message, category);
    }
    function isDebugEnabled(category) {
        return isLevelEnabled(levels.DEBUG, category);
    }
    function info(message, category) {
        return log(levels.INFO, message, category);
    }
    function isInfoEnabled(category) {
        return isLevelEnabled(levels.INFO, category);
    }
    function warn(message, category) {
        return log(levels.WARN, message, category);
    }
    function isWarnEnabled(category) {
        return isLevelEnabled(levels.WARN, category);
    }
    function error(message, category) {
        if (opts.errors_on_std_error) {
            log(levels.ERROR, message, category);
            return stdError(levels.ERROR, message, category);
        } else {
            return log(levels.ERROR, message, category);
        }
    }
    function isErrorEnabled(category) {
        return isLevelEnabled(levels.ERROR, category);
    }
    function fatal(message, category) {
        if (opts.errors_on_std_error) {
            log(levels.FATAL, message, category);
            return stdError(levels.FATAL, message, category);
        } else {
            return log(levels.FATAL, message, category);
        }
    }
    function isFatalEnabled(category) {
        return isLevelEnabled(levels.FATAL, category);
    }

    function isLevelEnabled(level, category) {
        return getLevel(category)>=levelsArray.indexOf(level);
    }

    ///////////////////////
    // PRIVATE FUNCTIONS //
    ///////////////////////
    function log(level, message, category) {
        if (isLevelEnabled(level, category)) {
            if (typeof message!="string") message = JSON.stringify(message);
            return console.log(getPrefix(category,level) + message);
        }
    }

    function stdError(level, message, category) {
        if (getLevel(category)>=levelsArray.indexOf(level)) {
            return console.error(getPrefix(category,level) + message);
        }
    }

    function getLevel(category) {
        let level = opts.categories[category] || opts.categories[opts.default_category] || opts.categories["default"];
        return levelsArray.indexOf(level);
    }

    function getPrefix(category, level) {
        let str = "";
        if (opts.add_timestamp) {
            str += dateformat(new Date(), opts.timestamp_format) + ": ";
        }
        str+= "["+level+"] ";
        if (opts.add_category) {
            str += "[" + (category || opts.default_category) + "] ";
        }
        if (opts.add_process) {
            str += "[" + getId() + "]" + " ";
        }
        return str;
    }

    function getId() {
        return cluster.isMaster?"Master":"Worker-"+cluster.worker.id;
    }
    ////////////////////////

    return {
        init:init,
        getLogger:getLogger,
        setCategory:setCategory,
        setCategories:setCategories,
        getLevels:getLevels,
        trace:trace,
        isTraceEnabled:isTraceEnabled,
        debug:debug,
        isDebugEnabled:isDebugEnabled,
        info:info,
        isInfoEnabled:isInfoEnabled,
        warn:warn,
        isWarnEnabled:isWarnEnabled,
        error:error,
        isErrorEnabled:isErrorEnabled,
        fatal:fatal,
        isFatalEnabled:isFatalEnabled
    }
}