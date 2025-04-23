import mongoose, { mongo, Schema } from "mongoose";
import { IUser } from "../interfaces/interfaces";

const userSchema=new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:['Manager','Employee']},
    isGoogle:{type:Boolean,default:false},
    managerId:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})
export const UserModel=mongoose.model<IUser>("User",userSchema)