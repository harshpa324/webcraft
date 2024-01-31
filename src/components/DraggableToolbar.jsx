"use client"
import React from 'react';
import DraggableText from './DraggableTxt';
import DraggableImage from './DraggableImage';






// Toolbar Component containing draggable tools
const DraggableToolbar = () => {
  return (
    <div className='flex justify-center items-center md:items-start gap-5 pt-5 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-500 h-[15vh] md:h-screen w-full md:w-[30vw]'>
      <div className='bg-gray-400 hover hover:bg-purple-200 py-2 px-8 rounded-md cursor-move'>
        <DraggableText />
      </div>
      <div className='bg-gray-400 hover hover:bg-purple-200 py-2 px-8 rounded-md cursor-move'>
        <DraggableImage />
      </div>
    </div>
  );
};

export default DraggableToolbar;
