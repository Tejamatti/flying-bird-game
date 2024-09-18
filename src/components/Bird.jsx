import React from 'react';

const Bird = ({ birdX, birdY, birdHeight, birdWidth }) => {
  const birdStyle = {
    position: 'absolute',
    top: `${birdY}px`,
    left: `${birdX}px`,
    width: `${birdWidth}px`,
    height: `${birdHeight}px`,
    backgroundColor: 'yellow',
    borderRadius: '50%',
  };

  return <div style={birdStyle}></div>;
};

export default Bird;