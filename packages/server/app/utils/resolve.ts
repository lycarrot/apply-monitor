class Resolve {
  fail(err: any = null, code = 0, msg = 'fail') {
    return {
      msg,
      err,
      code,
    }
  }

  success(data: any = null, code = 1, msg = 'success') {
    return {
      msg,
      code,
      data,
    }
  }
}

export default new Resolve()
