import { json } from "stream/consumers"

class Info {
    constructor(){

    }
    getCollect(ctx, next){
        let a=666
        let b=10
        let result=String(a*b)
        ctx.body = result
    }
}

export default new Info()