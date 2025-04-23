declare namespace Express{
    export interface Request{
        user?:{
            userId:string,
            role:"Manager"|"Employee"
    }
    }
}