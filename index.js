var cluster = require('cluster');

var levels = {
    OFF: "OFF",
    FATAL: "FATAL",
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    DEBUG: "DEBUG",
    TRACE: "TRACE"
};

var opts = {
    env_var : "LOG_LEVEL",
    errors_on_out: false,
    categories: {
        "default": levels.INFO
    }
};

module.exports = {
    init : function(options) {
        opts = Object.assign(opts, options);
        if (opts.env_var && process.env[opts.env_var]) {
            opts.categories.default = process.env[opts.env_var];
        }
    },

    setCategory : function(level, category) {
        if (!category) category="default";
        if (Object.keys(levels).indexOf(level)==-1) level = levels.INFO;
        opts.categories[category] = level;
    },

    setCategories: function(categories) {
        if (categories && typeof categories == "object") {
            opts = Object.assign(opts, {categories: categories});
        }
    },

    levels: levels,

    trace : function(message, category) {
        return log(levels.TRACE, message, category);
    },
    isTraceEnabled : function(category) {
        return isLevelEnabled(levels.TRACE, category);
    },

    debug : function(message, category) {
        return log(levels.DEBUG, message, category);
    },
    isDebugEnabled : function(category) {
        return isLevelEnabled(levels.DEBUG, category);
    },

    info : function(message, category) {
        return log(levels.INFO, message, category);
    },
    isInfoEnabled : function(category) {
        return isLevelEnabled(levels.INFO, category);
    },

    warn : function(message, category) {
        return log(levels.WARN, message, category);
    },
    isWarnEnabled : function(category) {
        return isLevelEnabled(levels.WARN, category);
    },

    error : function(message, category) {
        let tmp = true;
        if (opts.errors_on_out)
            tmp = log(levels.ERROR, message, category);
        return tmp && stdError(levels.ERROR, message, category);
    },
    isErrorEnabled : function(category) {
        return isLevelEnabled(levels.ERROR, category);
    },

    fatal : function(message, category) {
        let tmp = true;
        if (opts.errors_on_out)
            tmp = log(levels.FATAL, message, category);
        return tmp && stdError(levels.FATAL, message, category);
    },
    isFatalEnabled : function(category) {
        return isLevelEnabled(levels.FATAL, category);
    }
};

function isLevelEnabled(level, category) {
    return getLevel(category)>=Object.keys(levels).indexOf(level);
}

function log(level, message, category) {
    if (isLevelEnabled(level, category)) {
        console.log(getPrefix() + message);
        return true;
    }
    return false;
}

function stdError(level, message, category) {
    if (getLevel(category)>=Object.keys(levels).indexOf(level)) {
        console.error(getPrefix() + message);
        return true;
    }
    return false;
}

function getLevel(category) {
    var level = opts.categories[category] || opts.categories["default"];
    return Object.keys(levels).indexOf(level);
}

function getPrefix() {
    return "["+getId()+"]" + " ";
}

function getId() {
    return cluster.isMaster?"Master":"Worker-"+cluster.worker.id;
}