import { Model } from "mongoose";
import { IUser, IUserRepository } from "../interfaces/interfaces";
import { BaseRepository } from "./baseRepository";
export interface IUserModel{
    findOne(query:Object):Promise<IUser|null>
}
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor(userModel:Model<IUser>){super(userModel)}
    async findByEmail(email:string):Promise<IUser|null>{
        try {
           const user=await this.model.findOne({email})
           return user
        } catch (error) {
            console.error("Error finding user by email!")
            throw error
        }
    }
}