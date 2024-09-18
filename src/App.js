// src/App.js
import React, { useState, useEffect } from 'react';
import Bird from './components/Bird';
import Obstacle from './components/Obstacle';

const App = () => {
  const [birdY, setBirdY] = useState(window.innerHeight * 0.5); // Y-coordinate of the bird
  const [birdX, setBirdX] = useState(window.innerWidth * 0.1); // X-coordinate of the bird
  const [obstacleX, setObstacleX] = useState(window.innerWidth); // Obstacle starting X position
  const [obstacleHeight, setObstacleHeight] = useState(window.innerHeight * 0.3); // Random obstacle height
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false); // Tracks if the game is running

  const birdHeight = window.innerHeight * 0.07; // Bird's height relative to screen height (7%)
  const birdWidth = window.innerWidth * 0.07; // Bird's width relative to screen width (7%)
  const obstacleWidth = window.innerWidth * 0.1; // Obstacle width relative to screen width (10%)
  const gap = window.innerHeight * 0.2; // Gap between top and bottom obstacles
  const gravity = window.innerHeight * 0.005; // Gravity based on screen height
  const moveDistance = window.innerHeight * 0.05; // Movement distance for arrow keys

  // Make the bird fall due to gravity when game starts
  useEffect(() => {
    let gameTimerId;
    if (gameRunning && !gameOver) {
      gameTimerId = setInterval(() => {
        setBirdY((birdY) => birdY + gravity);
      }, 30);
    }
    return () => clearInterval(gameTimerId);
  }, [gameRunning, gameOver, gravity]);

  // Handle arrow key presses
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameRunning && !gameOver) {
        switch (e.key) {
          case 'ArrowUp':
            setBirdY((birdY) => Math.max(birdY - moveDistance, 0)); // Move up
            break;
          case 'ArrowDown':
            setBirdY((birdY) => Math.min(birdY + moveDistance, window.innerHeight - birdHeight)); // Move down
            break;
          case 'ArrowLeft':
            setBirdX((birdX) => Math.max(birdX - moveDistance, 0)); // Move left
            break;
          case 'ArrowRight':
            setBirdX((birdX) => Math.min(birdX + moveDistance, window.innerWidth - birdWidth)); // Move right
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning, gameOver, birdHeight, birdWidth, moveDistance]);

  // Move obstacle and reset position after passing the screen
  useEffect(() => {
    let obstacleTimerId;
    if (gameRunning && !gameOver) {
      obstacleTimerId = setInterval(() => {
        setObstacleX((obstacleX) => {
          if (obstacleX < -obstacleWidth) {
            setScore((score) => score + 1);
            setObstacleHeight(Math.floor(Math.random() * (window.innerHeight - gap)));
            return window.innerWidth;
          }
          return obstacleX - window.innerWidth * 0.01; // Obstacle moves relative to screen width (1%)
        });
      }, 30);
    }
    return () => clearInterval(obstacleTimerId);
  }, [gameRunning, gameOver, gap, obstacleWidth]);

  // Check for collisions between bird and obstacle or the ground
  useEffect(() => {
    const hasCollidedWithTopPipe = birdY < obstacleHeight;
    const hasCollidedWithBottomPipe = birdY + birdHeight > obstacleHeight + gap;

    if (
      obstacleX >= birdX &&
      obstacleX <= birdX + birdWidth && // Bird's X range
      (hasCollidedWithTopPipe || hasCollidedWithBottomPipe)
    ) {
      setGameOver(true);
      setGameRunning(false);
    }

    if (birdY >= window.innerHeight - birdHeight) {
      setGameOver(true);
      setGameRunning(false);
    }
  }, [birdY, birdX, obstacleX, obstacleHeight, gap, birdHeight, birdWidth]);

  const handleStartGame = () => {
    setGameOver(false);
    setGameRunning(true);
    setBirdY(window.innerHeight * 0.5);
    setBirdX(window.innerWidth * 0.1);
    setObstacleX(window.innerWidth);
    setScore(0);
  };

  const handleEndGame = () => {
    setGameOver(true);
    setGameRunning(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'skyblue', overflow: 'hidden' }}>
      <h1 style={{ textAlign: 'center' }}>Score: {score}</h1>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        {!gameRunning && <button onClick={handleStartGame}>Start Game</button>}
        <button onClick={handleEndGame} style={{ marginLeft: '10px' }}>
          End Game
        </button>
      </div>
      {!gameOver && gameRunning ? (
        <>
          <Bird birdY={birdY} birdX={birdX} birdHeight={birdHeight} birdWidth={birdWidth} />
          <Obstacle obstacleX={obstacleX} obstacleHeight={obstacleHeight} gap={gap} obstacleWidth={obstacleWidth} />
        </>
      ) : (
        <h2 style={{ textAlign: 'center', color: 'red' }}>
          {gameOver ? `Game Over! Final Score: ${score}` : 'Press Start to Play'}
        </h2>
      )}
    </div>
  );
};

export default App;
