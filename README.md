# pm2-logwrapper
log wrapper around console.log / console.error to implements different log levels and categories.
Useful when used with pm2 and/or docker

> Create logger

```js
const logger = require('pm2-logwrapper');
```

> By default the logger is initialized with only one category called `default` at level `INFO`. 

```js
logger.init();
```

> By default error and fatal messages are only sent to`console.error`. If you want you can append these loggers also on console.log with `errors_on_out` 

```js
logger.init({
     errors_on_out: false
});
```

> To Specify different categories you can initialize the library with ab object like. 

```js
logger.init({
    "categories": {
        "myCustomCategory1": logger.levels.DEBUG,
        "myCustomCategory2": logger.levels.TRACE
    }
});
```

> Categories can be changed also with 
```js
logger.setCategory(logger.levels.INFO, "myCustomCategory1");
```

or

```js
logger.setCategories( {
     "myCustomCategory1": logger.levels.DEBUG,
     "myCustomCategory2": logger.levels.TRACE
});
```

> The levels allowed can be found
```js
logger.levels;
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