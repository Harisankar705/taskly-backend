import mongoose, { Schema } from "mongoose";

const taskSchema=new Schema({
    taskName:{type:String,required:true},
    assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    assignedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    date:{type:Date,default:Date.now},
    status:{type:String,enum:['pending','in-progress','completed'],default:'pending'},
    description:{type:String,required:true},
    priority:{type:String,enum:['low','medium','high'],default:"medium"}
},{timestamps:true})
export const TaskModel=mongoose.model("Task",taskSchema)