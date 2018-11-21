# pm2-logwrapper
log wrapper around console.log / console.error to implements different log levels when used with pm2

> Create logger

```js
const logger = require('pm2-logwrapper');
```

> By default the environment variable used to verify the log level enabled is `LOG_LEVEL`. You can change the default with the init option `env_var`. 

```js
logger.init({
     env_var: "MY_CUSTOM_ENV_VAR"
});
```

> By default error and fatal appenders are only on `console.error`. If you want you can append these loggers also on console.log with `errors_on_out` 

```js
logger.init({
     errors_on_out: false
});
```

Both options can be changed runtime