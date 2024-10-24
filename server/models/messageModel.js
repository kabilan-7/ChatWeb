import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:false,
    },
    messageType:{
        type:String,
        enum:["text","file"],
        required:true,
    },
    content:{
        type:String,
        required: function (){
            return this.messageType === 'text'
        },
    },
    fieUrl:{
        type:String,
        required: function (){
            return this.messageType === 'file'
        },
    },
    timeStamp:{
        type:Date,
        default:Date.now()
    }
})