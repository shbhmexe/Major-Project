import React, { useState } from 'react';
import './ColorMatrix.css';

const ColorMatrix = () => {
  // Initialize a 3x3 matrix with default color (white)
  const [boxes, setBoxes] = useState(Array(9).fill('white'));
  // Track the number of clicks to know when all boxes have been clicked
  const [clickCount, setClickCount] = useState(0);

  const handleBoxClick = (index) => {
    // Create a copy of the current state
    const newBoxes = [...boxes];
    
    // If this is the 9th click (last box being clicked)
    if (clickCount === 8) {
      // Change all boxes to orange in the sequence they were clicked
      const clickedIndices = [];
      for (let i = 0; i < boxes.length; i++) {
        if (boxes[i] === 'green') {
          clickedIndices.push(i);
        }
      }
      
      // Change all to white first
      const orangeSequence = Array(9).fill('white');
      
      // Function to change to orange with delay
      const changeToOrange = (indices, idx) => {
        if (idx < indices.length) {
          setTimeout(() => {
            setBoxes(prevBoxes => {
              const newState = [...prevBoxes];
              newState[indices[idx]] = 'orange';
              return newState;
            });
            changeToOrange(indices, idx + 1);
          }, 500); // 500ms delay between each color change
        }
      };
      
      // Add the current box if it wasn't clicked before
      if (boxes[index] !== 'green') {
        clickedIndices.push(index);
      }

      setBoxes(orangeSequence);
      changeToOrange(clickedIndices, 0);
      
    } else {
      // For normal clicks (not the last one), change the box to green
      newBoxes[index] = 'green';
      setBoxes(newBoxes);
      setClickCount(prevCount => prevCount + 1);
    }
  };

  return (
    <div className="color-matrix">
      {boxes.map((color, index) => (
        <div
          key={index}
          className="box"
          style={{ backgroundColor: color }}
          onClick={() => handleBoxClick(index)}
        />
      ))}
    </div>
  );
};

export default ColorMatrix; 