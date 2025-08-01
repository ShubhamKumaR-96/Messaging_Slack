
import mongoose from "mongoose";

const workspaceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Workspace name is required'],
        unique:true
    },
    description:{
        type:String
    },
    members:[
        {
            memberId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            role:{
                type:String,
                enum:['admin','member'],
                default:'member'
            }
        }
    ],
    joinCode:{
        type:String,
        required:[true, 'join code required']
    },
    channels:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Channel"
    }
})

export const Workspace=mongoose.model("Workspace",workspaceSchema)