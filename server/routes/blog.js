import express from "express"
import { addBlogs, deleteBlog, getBlogInfo, getBlogs, updateBlog} from "../controllers/blog.js"
const router = express.Router()

router.post("/addBlog",addBlogs)
router.post("/getBlogs",getBlogs)
router.post("/getBlog/:id",getBlogInfo)
router.post("/deleteBlog",deleteBlog)
router.patch('/updateBlog',updateBlog);
export {addBlogs,getBlogs,deleteBlog,updateBlog,getBlogInfo}
 