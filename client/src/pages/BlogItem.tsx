import React from 'react';
import { Link } from 'react-router-dom';

interface BlogItemProps {
  id: string;
  title: string;
  image: string;
  author: string;
  datePosted: string;
  content: string;
  tag:string
 
}

const BlogItem: React.FC<BlogItemProps> = ({ id, title, image, author, datePosted,tag, content }) => {

  const words = content.split(' ');
  const shortenedContent = words.slice(0, 25).join(' ');

  return (
    <Link to={`/blog/${id}`} state={{tag:tag}} className="p-4 border border-gray-300 rounded-md cursor-pointer">
      <img src={image} alt={title} className="w-full h-52 object-cover rounded-md mb-4" />
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>{datePosted}</span>
        </div>
        <p className="text-gray-800 leading-6 mb-4">{shortenedContent}...</p>
      </div>
    </Link>
  );
};

export default BlogItem;
