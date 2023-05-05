import type { Context, Next } from 'koa'
export default (ctx: Context, next: Next) => {
  return next().catch((err) => {
    if (err.status === 500) {
      ctx.status = 500
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      }
    } else {
      throw err
    }
  })
}
