import { json } from "stream/consumers"

class Info {
    constructor(){

    }
    getCollect(ctx, next){
<<<<<<< HEAD
        let a=666
        let b=10
        let result=String(a*b)
        ctx.body = result
=======
        ctx.response.status = 200;
        ctx.body ='43443434'
>>>>>>> ee01b6bcdacbe1590963eee30db2e802c5f5f893
    }
}

export default new Info()