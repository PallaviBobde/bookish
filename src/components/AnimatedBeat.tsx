import React, { useEffect, useState } from "react";
import "./AnimatedBeats.css"; // Import your CSS file for styling

const AnimatedBeats = ({ flextheicon=false}) => {
  const [lines, setLines] = useState([]);

  // Generate random heights for lines on initial mount
  useEffect(() => {
    const initialLines = generateRandomLines();
    setLines(initialLines);

    // Update lines every few seconds
    const interval = setInterval(() => {
      const updatedLines = generateRandomLines();
      setLines(updatedLines);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Function to generate random lines
  const generateRandomLines = () => {
    const numberOfLines = 30; // Adjust number of lines as needed
    const lines = [];

    for (let i = 0; i < numberOfLines; i++) {
      const height = Math.floor(Math.random() * 60) + 20; // Random height between 20 and 80
      lines.push({ id: i, height });
    }

    return lines;
  };

  return (
    <div className={`animated-beats ${flextheicon && "flextheicon"}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="song-svg"
      >
        {lines.map((line) => (
          <line
            key={line.id}
            className="beat"
            x1={`${20 + line.id * 20}`}
            y1="90"
            x2={`${20 + line.id * 20}`}
            y2={`${90 - line.height}`}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBeats;
