class Resolve {
    fail(err:any=null ,code:number = 0, msg:string = 'fail' ) {
      return {
        msg,
        err,
        code
      }
    }
  
    success(data:any=null,code:number = 1, msg:string = 'success' ) {
      return {
        msg,
        code,
        data
      }
    }
  }
  
  export default new Resolve()