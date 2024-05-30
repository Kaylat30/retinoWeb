import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';
import { IoJournalOutline, IoFileTrayOutline, IoAnalyticsOutline, IoAttachOutline, IoDuplicateOutline, IoBandageOutline, IoGitBranchOutline } from "react-icons/io5";
import 'tailwindcss/tailwind.css';

type IconData = {
  name: IconType;
  text: string;
};

const icons: IconData[] = [
  { name: IoJournalOutline, text: 'Diabetic Types' },
  { name: IoFileTrayOutline, text: 'Management and Treatment.'},
  { name: IoAnalyticsOutline, text: 'Symptoms and Causes'},
  { name: IoAttachOutline, text: 'Diabetes Complications'},
  { name: IoDuplicateOutline, text: 'Living With' },
  { name: IoBandageOutline, text: 'Diagnosis and Tests'},
  { name: IoGitBranchOutline, text: 'Prevention'},
  // { name: IoCloudOutline, text: 'Travel'},
  // { name: IoEarthOutline, text: 'Fashion'},
  // { name: IoFlowerOutline, text: 'Music'},
];

 const Education: React.FC = () => {
  const navigate = useNavigate();

  const handlePress = (text: string) => {
    navigate(`/education/${text}`);
  };

  return (
    <div className="bg-lightgrey flex flex-wrap justify-center p-4">
      {icons.map((icon, index) => {
        const IconComponent = icon.name;
        return (
          <div key={index} onClick={() => handlePress(icon.text)} className="cursor-pointer m-4">
            <div className="w-40 h-40 flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
              <IconComponent size={80} color="black" />
              <span className="mt-2 text-center">{icon.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Education


