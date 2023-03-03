class Info {
    constructor(){

    }
    getCollect(ctx, next){
        ctx.response.status = 200;
        ctx.body ='43443434'
    }
}

export default new Info()