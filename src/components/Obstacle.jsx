import React from 'react';

const Obstacle = ({ obstacleX, obstacleHeight, gap, obstacleWidth }) => {
  const obstacleStyle = {
    position: 'absolute',
    backgroundColor: 'green',
    width: `${obstacleWidth}px`,
  };

  return (
    <>
      {/* Top obstacle */}
      <div
        style={{
          ...obstacleStyle,
          height: `${obstacleHeight}px`,
          left: `${obstacleX}px`,
          top: '0px',
        }}
      ></div>

      {/* Bottom obstacle */}
      <div
        style={{
          ...obstacleStyle,
          height: `${window.innerHeight - obstacleHeight - gap}px`,
          left: `${obstacleX}px`,
          top: `${obstacleHeight + gap}px`,
        }}
      ></div>
    </>
  );
};

export default Obstacle;