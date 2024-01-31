"use client"
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const DraggableWebsite = () => {
  const [websiteElements, setWebsiteElements] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    const savedElements = JSON.parse(localStorage.getItem('websiteElements')) || [];
    setWebsiteElements(savedElements);
  }, []);

  const [, drop] = useDrop({
    accept: 'TOOL',
    drop: (item) => {
      setWebsiteElements((prevElements) => [
        ...prevElements,
        { id: uuidv4(), type: item.id, content: '' },
      ]);
    },
  });

  const handleTextChange = (index, newText) => {
    const updatedElements = [...websiteElements];
    updatedElements[index].content = newText;
    setWebsiteElements(updatedElements);
  };

  const handleImageChange = (index, newImage) => {
    const updatedElements = [...websiteElements];
    updatedElements[index].content = newImage;
    setWebsiteElements(updatedElements);
  };

  const handleImagePreview = (index) => {
    setSelectedImageIndex(index);
  };

  const handleDelete = (index) => {
    const updatedElements = [...websiteElements];
    updatedElements.splice(index, 1);
    setWebsiteElements(updatedElements);
  };

  const handleSave = () => {
    localStorage.setItem('websiteElements', JSON.stringify(websiteElements));
  };
  const handleDownloadJSON = () => {
    const filename = 'website.json';
    const data = JSON.stringify(websiteElements);

    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const handleDownloadHTML = () => {
    const filename = 'website.html';
    const data = generateHTML(websiteElements);

    const blob = new Blob([data], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const generateHTML = (elements) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated Website</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .content {
            text-align: center;
            margin-top: 10px;
            font-size: 25px;
            font-weight: bold;
           font-family: sans-serif; 
          }
        </style>
      </head>
      <body>
        ${elements.map((element) => (
          element.type === 'text'
            ? `<div class="content">${element.content}</div>`
            : `<div class="content"><img src="${element.content}" alt="Image Preview" style="max-width: 75%;" /></div>`
        )).join('\n')}
      </body>
      </html>
    `;
  };
  
  


  return (
    <div>
      <div className='relative bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 flex flex-col gap-5 h-[83vh] md:h-[100vh] w-[100vw] md:w-[70vw] justify-center items-center' ref={drop}>
        <button className='right-4 top-4 bg-green-400 py-2 px-5 rounded-md text-white font-semibold absolute' onClick={handleSave}>
          Save
        </button>
        <button className='left-4 bottom-10 bg-green-400 py-2 px-5 rounded-md text-white font-semibold absolute' onClick={handleDownloadHTML}>
          Download
        </button>
        {websiteElements.map((element, index) => (
          <div className='py-2 px-8 rounded-md gap-x-6 flex flex-col relative' key={element.id}>
            {element.type === 'text' ? (
              <div className="flex items-center">
                <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type="text"
                    value={element.content}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    className='py-2 px-3 rounded-md w-full'
                    placeholder='Enter your text...'
                  />
                </div>
                <div className="ml-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="hover hover:cursor-pointer transition leading-6 text-gray-900"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type="file"
                    onChange={(e) => {
                      const reader = new FileReader();
                      const file = e.target.files[0];
                      reader.onloadend = () => {
                        handleImageChange(index, reader.result);
                        handleImagePreview(index);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  {selectedImageIndex === index && (
                    <div style={{ position: 'relative', maxWidth: '400px', marginTop: '10px' }}>
                      <img src={element.content} alt="Image Preview" style={{ maxWidth: '100%' }} />
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-gray-900 bg-gray-100  hover hover:cursor-pointer transition leading-6 absolute top-0 right-0"
                      >
                        Delete <FontAwesomeIcon  icon={faTrashAlt} />
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  {(selectedImageIndex === index && element.content) ? "" : (
                    <button
                      onClick={() => handleDelete(index)}
                      className="leading-6 text-gray-900"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableWebsite;
