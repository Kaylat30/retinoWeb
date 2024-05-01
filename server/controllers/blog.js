import Blog from "../models/Blog.js";

//add blogs
export const addBlogs = async (req,res) =>
{
    try {
        const {
            image,
            title,
            author,
            content,
            date,
            tag
        } = req.body

        const newBlog = new Blog({
            image,
            title,
            author,
            content,
            date,
            tag
        })

        const savedBlog = await newBlog.save()
        res.status(201).json(savedBlog)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

//get all blogs
export const getBlogs = async (req,res) =>
{

    try {
        let blogs = await Blog.find({})

        return res.status(200).json(blogs)
    } catch (error) {
        res.status(500).send({error : error.message})
    }
}

//get blog details
export const getBlogInfo = async (req,res) =>
{
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)
        return res.status(200).json(blog)
    } catch (error) {
        res.status(500).send({error : error.message})
    }
}


//delete from blog
export const deleteBlog = async (req, res) => {
    try {
      const { blogItemId } = req.body;
      
      const deletedBlogItem = await Blog.findByIdAndDelete(blogItemId);
  
      if (!deletedBlogItem) {
        return res.status(404).json({
          success: false,
          message: 'Blog item not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  //Updating blog
  export const updateBlog = async (req, res) => {
    try {
      const { blogItemId,image,title,author,content,date,tag } = req.body; 

      // Find the blog by its ID and update the image,title,author,content,date,tag fields
      const updatedBlog = await Cart.findByIdAndUpdate(
        blogItemId,
        { image:image,
          title:title,
          author:author,
          content:content,
          date:date,
          tag:tag },
        { new: true } // Return the updated blog
      );
  
      if (!updatedBlog) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        blog: updatedBlog,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

