export function loggingMiddleware(logger: any = console) {
  return async (params, next) => {
    const before = Date.now()

    const result = await next(params)

    const after = Date.now()

    if (typeof params === 'object') {
      if (params.model != null && params.action != null) {
        logger.log(
          `Query ${params.model}.${params.action} took ${
            after - before
          }ms`,
        )
      }
    }

    return result
  }
}
