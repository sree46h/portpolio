import React, { useState, useEffect } from 'react';


const AnimatedText = () => {
  let fullText = "Good";
  const [displayedText, setDisplayedText] = useState('');
  const [showImage, setShowImage] = useState(false);
  const date = new Date().getHours();

  // Set the greeting based on the time of day
  if (date >= 0 && date <= 11) {
    fullText += " Morning";
  } else if (date >= 12 && date <= 16) {
    fullText += " Afternoon";
  } else {
    fullText += " Evening";
  }

  

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayedText.length < fullText.length) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        
      } else {
        clearInterval(interval);
        setShowImage(true);
      }
    }, 300); // Adjust delay between each letter for speed

    return () => {
      clearInterval(interval);
    };
  }, [displayedText, fullText]);

  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        gap: 20,
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <h1  style={{ margin: 0, fontStyle: 'oblique' }}>{displayedText}</h1>
      {showImage && <h1 style={{ margin: 0 }}>😊</h1>}
    </div>
  );
};

export default AnimatedText;
