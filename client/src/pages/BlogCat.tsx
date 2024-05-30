import React from 'react';

interface BlogCatProps {
  name: string;
  imageUri: string;
  onClick: () => void;
}

const BlogCat: React.FC<BlogCatProps> = ({ name, imageUri, onClick }) => {
  return (
    <div onClick={onClick} className="relative h-32 w-44 my-4 inline-block border border-gray-300 cursor-pointer">
      <img src={`${imageUri}`} alt={name} className="h-full w-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
        <p className="text-white font-bold">{name}</p>
      </div>
    </div>
  );
};

export default BlogCat;
