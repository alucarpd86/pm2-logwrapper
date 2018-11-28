var cluster = require('cluster');

var opts = {
    env_var : "LOG_LEVEL",
    errors_on_out: false
};

var levels = [
    "off",
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace"
];


module.exports = {
    init : function(options) {
        opts = Object.assign(opts, options);
    },

    trace : function(message) {
        return log("trace", message);
    },
    isTraceEnabled : function() {
        return isLevelEnabled("trace");
    },

    debug : function(message) {
        return log("debug", message);
    },
    isDebugEnabled : function() {
        return isLevelEnabled("debug");
    },

    info : function(message) {
        return log("info", message);
    },
    isInfoEnabled : function() {
        return isLevelEnabled("info");
    },

    warn : function(message) {
        return log("warn", message);
    },
    isWarnEnabled : function() {
        return isLevelEnabled("warn");
    },

    error : function(message) {
        let tmp = true;
        if (opts.errors_on_out)
            tmp = log("error", message);
        return tmp && error("error", message);
    },
    isErrorEnabled : function() {
        return isLevelEnabled("error");
    },

    fatal : function(message) {
        let tmp = true;
        if (opts.errors_on_out)
            tmp = log("fatal", message);
        return tmp && error("error", message);
    },
    isFatalEnabled : function() {
        return isLevelEnabled("fatal");
    }
};

function isLevelEnabled(level) {
    return getLevel()>=levels.indexOf(level);
}

function log(level, message) {
    if (isLevelEnabled(level)) {
        console.log(getPrefix() + message);
        return true;
    }
    return false;
}

function error(level, message) {
    if (getLevel()>=levels.indexOf(level)) {
        console.error(getPrefix() + message);
        return true;
    }
    return false;
}

function getLevel() {
    var level = "info";
    if (process.env[opts.env_var]) {
        level = process.env[opts.env_var].toLowerCase();
    }
    return levels.indexOf(level);
}

function getPrefix() {
    return "["+getId()+"]" + " ";
}

function getId() {
    return cluster.isMaster?"Master":"Worker-"+cluster.worker.id;
}