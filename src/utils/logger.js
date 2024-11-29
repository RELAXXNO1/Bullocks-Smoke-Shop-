const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

class Logger {
  constructor() {
    this.isDevelopment = import.meta.env.DEV;
  }

  error(message, error, context = {}) {
    this.log(LOG_LEVELS.ERROR, message, error, context);
  }

  warn(message, context = {}) {
    this.log(LOG_LEVELS.WARN, message, null, context);
  }

  info(message, context = {}) {
    this.log(LOG_LEVELS.INFO, message, null, context);
  }

  debug(message, context = {}) {
    if (this.isDevelopment) {
      this.log(LOG_LEVELS.DEBUG, message, null, context);
    }
  }

  log(level, message, error = null, context = {}) {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      ...context,
      ...(error && { error: this.formatError(error) })
    };

    if (this.isDevelopment) {
      console[level](logData);
    } else {
      // In production, you would send this to your logging service
      if (level === LOG_LEVELS.ERROR) {
        console.error(logData);
      }
    }
  }

  formatError(error) {
    return {
      message: error.message,
      stack: error.stack,
      name: error.name,
      ...(error.code && { code: error.code })
    };
  }
}

export default new Logger();