import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        image:{
            type:String,
            required: true,
            max:200,
        },
        title:{
            type:String,
            required: true,
            min:2,
            max:20,
        },
        author:{
            type:String,
            required: true,
            max:70,
        },
        date:{
            type:String,
            required: true,
            min:5,
        },
        content:{
            type:String,
            required: true,
            min:5,
        },
        tag:{
            type:String,
            required: true,
            max:50
        },
        
    },
    {timestamps: true}
)

const Blog = mongoose.model("Blog",BlogSchema)
export default Blog