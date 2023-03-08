
class Collect {
    constructor(){

    }
    getInfo(ctx, next){
        let a=666
        let b=10
        let result=String(a*b)
        ctx.body = result
    }
    getSourcemap(ctx, next){
        let a=666
        let b=10
        let result=String(a*b)
        ctx.body = result
    }
}

export default new Collect()