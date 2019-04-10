# pm2-logwrapper
log wrapper around console.log / console.error to implements different log levels and categories.
Useful when used with pm2 and/or docker

> Create logger

```js
const logger = require('pm2-logwrapper')();
```

> Create logger with specific category

```js
const logger = require('pm2-logwrapper')("MY_CUSTOM_CATEGORY");
```
or
```js
const logger = require('pm2-logwrapper')().getLogger("MY_CUSTOM_CATEGORY");
```

> By default the logger is initialized with this set of options 

```js
let opts = {
    errors_on_std_error: false,
    add_timestamp: false,
    timestamp_format: "yyyy-mm-dd HH:MM:ss",
    default_category : "default",
    categories: {
        "default": "INFO"
    }
};
```

- `errors_on_std_error`: if true will print `ERROR` and `FATAL` logs also on standard error. By default is false and will print these logs only on standard out.
- `add_timestamp`: if true will prepend the current timestamp to each log message. By default is false because PM2 can do it
- `timestamp_format`: used to format the current timestamp, if add_timestamp is enabled. By default is "yyyy-mm-dd HH:MM:ss"
- `default_category`: is the name of the default category if none is specified. By default is "default"
- `categories`: object of each category you need to use with this logger. By default only "default" category is defined


> You can specify different set of options by passing them to the `init` method. The object passed will be merged with the default configuration, so you don't need to specify every options, but only the options you need to change

```js
logger.init({
     errors_on_std_error: true
});
```

> To Specify different categories you can initialize the library with an object like. 

```js
logger.init({
    "categories": {
        "myCustomCategory1": logger.getLevels().DEBUG,
        "myCustomCategory2": logger.getLevels().TRACE
    }
});
```

> Categories can be changed also with 
```js
logger.setCategory(logger.getLevels().INFO, "myCustomCategory1");
```

or

```js
logger.setCategories( {
     "myCustomCategory1": logger.getLevels().DEBUG,
     "myCustomCategory2": logger.getLevels().TRACE
});
```

> The log levels allowed can be found
```js
logger.getLevels();
```
>and the available values are:
```js
{
    OFF: "OFF",
    FATAL: "FATAL",
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    DEBUG: "DEBUG",
    TRACE: "TRACE"
}
```

> The logging method, for each level are:
```js
logger.info("myMessage");
```
This method will use the `default` category log level for this `logger` instance. By default is `default` unless specified in the constructor or with `getLogger` method
```js
logger.info("myMessage","myCustomCategory");
```
This method will use `myCustomCategory` category log level for this `logger` instance

> Each log level has a corresponding method to check if the log level is enabled
```js
logger.isInfoEnabled();
logger.isInfoEnabled("myCustomCategory");
```