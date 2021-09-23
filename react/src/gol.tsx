import type { ComponentDescription, ComponentProperties } from '@playful/runtime';
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle} from 'react-konva';


type GolProperties = {} & ComponentProperties;

const valueAt = (cells: Array<boolean>, x: number, y: number, cols: number) => 
  cells[(y * cols + x) % cells.length] ? 1 : 0;

const liveNeighbors = (cells: Array<boolean>, x: number, y: number, cols: number) => 
  valueAt(cells, x - 1, y - 1, cols) +
  valueAt(cells, x - 0, y - 1, cols) +
  valueAt(cells, x + 1, y - 1, cols) +
  valueAt(cells, x - 1, y - 0, cols) +
  valueAt(cells, x + 1, y - 0, cols) +
  valueAt(cells, x - 1, y + 1, cols) +
  valueAt(cells, x - 0, y + 1, cols) +
  valueAt(cells, x + 1, y + 1, cols);

const mapCells = (
  cells: Array<boolean>,
  cols: number,
  itr: (live: boolean, liveNeighbors: number) => boolean
) => cells.map((cell, index) => {
  const x = index % cols;
  const y = Math.floor(index / cols);

  return itr(cell, liveNeighbors(cells, x, y, cols));
}) 

function Gol(props: GolProperties) {
  const { cols, deadColor, framesPerSecond, height, liveColor, rows, width } = props;

  const sX = width / cols;
  const sY = height / rows;
  
  const [cells, setCells] = useState<Array<boolean>>([]);

  useEffect(/* randomizeGrid */() => {
    setCells([...Array(rows*cols)].map(it => Math.random() >= 0.5));
  }, [rows, cols]);

  const nextFrame = () => {
    setCells(mapCells(cells, cols, (alive, liveNeighbors) => {
      if (liveNeighbors < 2 || liveNeighbors > 3) {
        return false;
      } else if (liveNeighbors === 3) {
        return true;
      }
      return alive;
    }));
  }

  useEffect(() => {
    const timer = setInterval(nextFrame, 1000 / framesPerSecond);
    return () => clearInterval(timer);
  });

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {cells.map((cell, index) => (
          <Rect 
            key={index}
            x={sX * (index % cols) + 2} 
            y={sY * Math.floor(index / cols) + 2} 
            width={sX - 4} 
            height={sY - 4} 
            fill={cell ? liveColor : deadColor}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export const GolDescription: ComponentDescription = {
  name: 'Gol',
  renderer: Gol,
  extends: 'Play Kit/View',
  _meta: {
    description: 'The Gol Component ...',
    author: 'Playful Software', // TODO: userId or unique username?
    icon: '...', // TODO: local file?
    preview: '...', // TODO: local file?
    collection: 'React Test Kit',
    properties: {
      // Override default width, height.
      cols: { type: 'number', title: 'Cols', default: 20 },
      deadColor: { type: 'string', title: 'Dead Color', default: "transparent", editor: 'Color' },
      framesPerSecond: { type: 'number', title: "Frames Per Second", default: 8 },
      height: { type: 'number', title: 'Height', default: 300 },
      liveColor: { type: 'string', title: 'Live Color', default: "#AFC", editor: 'Color' },
      rows: { type: 'number', title: 'Rows', default: 20 },
      width: { type: 'number', title: 'Width', default: 300 },
    },
  },
};
