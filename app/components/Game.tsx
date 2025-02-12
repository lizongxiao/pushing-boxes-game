"use client";

// components/Game.tsx
import { useState, useEffect } from "react";

type Grid = ("#" | " " | "P" | "B")[][];

interface Position {
  x: number;
  y: number;
}

const Game = () => {
  const initialGrid: Grid = [
    ["#", "#", "#", "#", "#"],
    ["#", " ", " ", " ", "#"],
    ["#", " ", "B", " ", "#"],
    ["#", " ", "P", " ", "#"],
    ["#", "#", "#", "#", "#"],
  ];

  const [grid, setGrid] = useState<Grid>(initialGrid);
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 3, y: 2 });

  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    // Check if player is within bounds
    if (newX < 0 || newX >= grid.length || newY < 0 || newY >= grid[0].length) {
      return;
    }

    // Player moves to empty space
    if (grid[newX][newY] === " ") {
      const newGrid = [...grid];
      newGrid[playerPosition.x][playerPosition.y] = " ";
      newGrid[newX][newY] = "P";
      setGrid(newGrid);
      setPlayerPosition({ x: newX, y: newY });
    }
    // Player pushes box
    else if (grid[newX][newY] === "B") {
      const boxX = newX + dx;
      const boxY = newY + dy;

      // Check if the box can move
      if (grid[boxX] && grid[boxX][boxY] === " ") {
        const newGrid = [...grid];
        newGrid[playerPosition.x][playerPosition.y] = " ";
        newGrid[newX][newY] = "P";
        newGrid[boxX][boxY] = "B";
        setGrid(newGrid);
        setPlayerPosition({ x: newX, y: newY });
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        movePlayer(-1, 0);
        break;
      case "ArrowDown":
        movePlayer(1, 0);
        break;
      case "ArrowLeft":
        movePlayer(0, -1);
        break;
      case "ArrowRight":
        movePlayer(0, 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {/* Render the grid */}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              style={{
                width: "40px",
                height: "40px",
                border: "1px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: cell === "#" ? "#333" : "#fff",
                color: cell === "P" ? "red" : "black",
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game;  // Make sure this is a default export
