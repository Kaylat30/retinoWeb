import React, { useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { IoArrowBack, IoRefresh } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../store'; 
import { GetBlogById, selectBlogs, selectBlogError, selectBlogStatus } from '../slice/blogSlice'; // Update with your actual slice path

const BlogInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const blogDetails = useAppSelector(selectBlogs);
  const error = useAppSelector(selectBlogError);
  const status = useAppSelector(selectBlogStatus);

  useEffect(() => {
    if (id) {
      dispatch(GetBlogById(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-4">
            <IoRefresh />
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error fetching blog details: <span className='text-red-500'>{error}</span></p>
      </div>
    );
  }

  if (!blogDetails || blogDetails.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No blog details found</p>
      </div>
    );
  }

  const currentBlog = blogDetails[0]; 
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link to={'/blog'} className="back-button">
          <IoArrowBack /> <span>Back to {location.state?.tag || "all"} blogs</span>
        </Link>
      </div>
      <div>
        <img src={currentBlog.image} alt={currentBlog.title} className="w-full h-96 object-cover rounded-md mb-4" />
        <h1 className="text-3xl font-bold mb-2">{currentBlog.title}</h1>
        <div className="flex items-center text-gray-600 mb-2">
          <span>{currentBlog.author}</span>
          <span className="mx-2">•</span>
          <span>{currentBlog.date}</span>
        </div>
        <p className="text-gray-800 leading-7 mb-4">{currentBlog.content}</p>
      </div>
    </div>
  );
};

export default BlogInfo;

