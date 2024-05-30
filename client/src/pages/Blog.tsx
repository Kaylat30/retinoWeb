import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { AppDispatch } from '../store';
import { GetAllBlogs, selectBlogs, selectBlogStatus, selectBlogError } from '../slice/blogSlice';
import BlogCat from './BlogCat';
import BlogItem from './BlogItem';
import {IoChevronForward,IoChevronBack} from "react-icons/io5";
import eyeHealthImage from '../assets/eye_health.jpg';
import diabetesCareImage from '../assets/diabetes_care.jpg';
import techAndResearchImage from '../assets/tech_and_research.jpg';
import nutritionImage from '../assets/nutrition.jpg';
import covidImage from '../assets/covid.jpg';

interface Blog {
  _id: string;
  image: string;
  title: string;
  author: string;
  content: string;
  date: string;
  tag: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Blog: React.FC = () => {
  const dispatch = useAppDispatch<AppDispatch>();

  const blogs = useAppSelector(selectBlogs) as Blog[];
  const status = useAppSelector(selectBlogStatus);
  const error = useAppSelector(selectBlogError);
  const [selectedTag, setSelectedTag] = useState<string>("");

  // horizontal scroll slider buttons
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };
  
  const slideRight = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft += 500;
    }
  };
  

  // Initialize the current page state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(GetAllBlogs());
  }, [dispatch]);

  const shuffledBlogs = shuffleArray(blogs);
  const filteredBlogs = selectedTag ? shuffledBlogs.filter((blog: Blog) => blog.tag === selectedTag) : shuffledBlogs;

  // Define the number of blogs to display per page
  const blogsPerPage = 6;

  // Calculate the start and end indexes of the current page's products
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;

  // Get the current page's products
  const currentblogs = filteredBlogs.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Function to handle page navigation
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Topics For You</h1>
      
      <div className='flex justify-center sm:mx-8   lg:mx-20 flex-col'>
        <div className='relative flex items-center bg-white rounded-b-md'>
          <IoChevronBack className=' opacity-50 cursor-pointer hover:opacity-100' onClick={()=>slideLeft()} size={40} />
          <div id='slider' className='w-full  space-x-4  h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-x-hidden'>
            <BlogCat imageUri={eyeHealthImage} name="Eye Health" onClick={() => setSelectedTag('eye_health')} />
            <BlogCat imageUri={diabetesCareImage} name="Diabetes Care" onClick={() => setSelectedTag('diabetes_care')} />
            <BlogCat imageUri={techAndResearchImage} name="Tech and Research" onClick={() => setSelectedTag('tech_and_research')} />
            <BlogCat imageUri={nutritionImage} name="Nutrition and Exercise" onClick={() => setSelectedTag('nutrition_and_exercise')} />
            <BlogCat imageUri={covidImage} name="Covid 19" onClick={() => setSelectedTag('covid_19')} />
          </div>
          <IoChevronForward className=' opacity-50 cursor-pointer hover:opacity-100' onClick={()=>slideRight()} size={40} />
        </div>
      </div>
      <button onClick={() => setSelectedTag("")} className="text-blue-500 mt-4">
        All
      </button>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className='text-red-600'>Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {currentblogs.map(blog => (
          <BlogItem
            key={blog._id}
            id={blog._id}
            title={blog.title}
            image={blog.image}
            author={blog.author}
            datePosted={blog.date}
            content={blog.content}
            tag={selectedTag}
          />
        ))}
      </div>

      
      {/* Page numbers */}
      <div className='flex justify-center mt-4'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-2 text-brightBlue hover:underline focus:outline-none ${
              currentPage === index + 1
                ? 'bg-brightBlue text-yellow-50 rounded-full'
                : 'bg-white text-brightBlue border border-brightBlue rounded-full'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Blog;
