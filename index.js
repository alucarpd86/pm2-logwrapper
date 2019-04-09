const cluster = require('cluster');
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
        if (levelsArray.indexOf(level)==-1) level = levels.INFO;
        opts.categories[category] = level;
        return opts.categories[category];
    },

    setCategories: function(categories) {
        if (categories && typeof categories == "object") {
            opts = Object.assign(opts, {categories: categories});
        }
        return opts.categories;
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
        if (opts.errors_on_out)
            log(levels.ERROR, message, category);
        return stdError(levels.ERROR, message, category);
    },
    isErrorEnabled : function(category) {
        return isLevelEnabled(levels.ERROR, category);
    },

    fatal : function(message, category) {
        if (opts.errors_on_out)
            log(levels.FATAL, message, category);
        return stdError(levels.FATAL, message, category);
    },
    isFatalEnabled : function(category) {
        return isLevelEnabled(levels.FATAL, category);
    }
};

function isLevelEnabled(level, category) {
    return getLevel(category)>=levelsArray.indexOf(level);
}

function log(level, message, category) {
    if (isLevelEnabled(level, category)) {
        return console.log(getPrefix() + message);
    }
}

function stdError(level, message, category) {
    if (getLevel(category)>=levelsArray.indexOf(level)) {
        return console.error(getPrefix() + message);
    }
}

function getLevel(category) {
    var level = opts.categories[category] || opts.categories["default"];
    return levelsArray.indexOf(level);
}

function getPrefix() {
    return "["+getId()+"]" + " ";
}

function getId() {
    return cluster.isMaster?"Master":"Worker-"+cluster.worker.id;
}