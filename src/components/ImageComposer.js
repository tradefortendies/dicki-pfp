import React, { useState } from 'react';

const headParts = [
  '/assets/heads/head1.png',
  '/assets/heads/head2.png',
];

const bodyParts = [
  '/assets/bodies/body1.png',
  '/assets/bodies/body2.png',
];

const bottomParts = [
  '/assets/feet/feet1.png',
  '/assets/feet/feet2.png',
];

const ImageComposer = () => {
  const [currentHead, setCurrentHead] = useState(0);
  const [currentBody, setCurrentBody] = useState(0);
  const [currentBottom, setCurrentBottom] = useState(0);

  const nextPart = (current, setCurrent, parts) => {
    setCurrent((current + 1) % parts.length);
  };

  const prevPart = (current, setCurrent, parts) => {
    setCurrent((current - 1 + parts.length) % parts.length);
  };

  const selectPart = (setCurrent, index) => {
    setCurrent(index);
  };

  const randomize = () => {
    setCurrentHead(Math.floor(Math.random() * headParts.length));
    setCurrentBody(Math.floor(Math.random() * bodyParts.length));
    setCurrentBottom(Math.floor(Math.random() * bottomParts.length));
  };

  const saveImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const images = [
      headParts[currentHead],
      bodyParts[currentBody],
      bottomParts[currentBottom]
    ];

    Promise.all(images.map(loadImage)).then(imgs => {
      const width = imgs[0].width;  // Assuming all parts have the same width
      const height = imgs[0].height;  // Assuming all parts have the same height

      canvas.width = width;
      canvas.height = height;

      imgs.forEach(img => {
        ctx.drawImage(img, 0, 0);  // Draw each image at the top-left corner (0, 0)
      });

      const link = document.createElement('a');
      link.download = 'combined-image.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const loadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold mb-8">Get yo dicki right</h1>
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-1/2 max-w-sm h-96 mr-16 mb-32">
          <img src={headParts[currentHead]} className="absolute inset-0 w-full h-auto" />
          <img src={bodyParts[currentBody]} className="absolute inset-0 w-full h-auto" />
          <img src={bottomParts[currentBottom]} className="absolute inset-0 w-full h-auto" />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <button onClick={() => prevPart(currentHead, setCurrentHead, headParts)} className="px-4 py-2 bg-gray-200 rounded-md mr-2">←</button>
            <div className="flex overflow-x-auto">
              {headParts.map((part, index) => (
                <img
                  key={`head-${index}`}
                  src={part}
                  className={`w-12 h-12 mx-1 cursor-pointer ${currentHead === index ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => selectPart(setCurrentHead, index)}
                />
              ))}
            </div>
            <button onClick={() => nextPart(currentHead, setCurrentHead, headParts)} className="px-4 py-2 bg-gray-200 rounded-md ml-2">→</button>
          </div>
          <div className="flex items-center mb-4">
            <button onClick={() => prevPart(currentBody, setCurrentBody, bodyParts)} className="px-4 py-2 bg-gray-200 rounded-md mr-2">←</button>
            <div className="flex overflow-x-auto">
              {bodyParts.map((part, index) => (
                <img
                  key={`body-${index}`}
                  src={part}
                  className={`w-12 h-12 mx-1 cursor-pointer ${currentBody === index ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => selectPart(setCurrentBody, index)}
                />
              ))}
            </div>
            <button onClick={() => nextPart(currentBody, setCurrentBody, bodyParts)} className="px-4 py-2 bg-gray-200 rounded-md ml-2">→</button>
          </div>
          <div className="flex items-center mb-4">
            <button onClick={() => prevPart(currentBottom, setCurrentBottom, bottomParts)} className="px-4 py-2 bg-gray-200 rounded-md mr-2">←</button>
            <div className="flex overflow-x-auto">
              {bottomParts.map((part, index) => (
                <img
                  key={`bottom-${index}`}
                  src={part}
                  className={`w-12 h-12 mx-1 cursor-pointer ${currentBottom === index ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => selectPart(setCurrentBottom, index)}
                />
              ))}
            </div>
            <button onClick={() => nextPart(currentBottom, setCurrentBottom, bottomParts)} className="px-4 py-2 bg-gray-200 rounded-md ml-2">→</button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button onClick={saveImage} className="px-4 py-2 bg-green-500 text-white rounded-md mr-4">Save Image</button>
        <button onClick={randomize} className="px-4 py-2 bg-blue-500 text-white rounded-md">Randomize</button>
      </div>
    </div>
  );
};

export default ImageComposer;
