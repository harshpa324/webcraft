
import React from 'react'
import DraggableWebsite from '@/components/DraggableWebsite'
import Header from '@/components/Header'
import DraggableToolbar from '@/components/DraggableToolbar'

export const metadata = {
  title: "WebCraft",
  description: "A website that can enable drag and drop editable text and image",
};
const page = () => {
  return (
    <div>
     
    <Header />
    <div className='flex flex-row'>
      
    <DraggableToolbar />
    <DraggableWebsite />
  </div>
    </div>
  )
}

export default page