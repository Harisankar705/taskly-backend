import { HydratedDocument, Model } from "mongoose";

export class BaseRepository<T>{
    protected model:Model<T>
    constructor(model:Model<T>)
    {
        this.model=model
    }
    async findById(id:string):Promise<T|null>{
        return this.model.findById(id)
    }
    async findAll():Promise<T[]>{
        return this.model.find()
    }
    async create(data:Partial<T>):Promise<HydratedDocument<T>>{
        const doc=new this.model(data)as HydratedDocument<T>
         await doc.save()
         return doc
    }
    async update(id:string,data:Partial<T>):Promise<T|null>{
        return this.model.findByIdAndUpdate(id,data,{new:true})
    }
    async delete(id:string):Promise<boolean>{
        const result=await this.model.findByIdAndDelete(id)
        return result!=null
    }
}