import { useState } from 'react';
import ShapeForm from './ShapeForm';
import ShapeViewer from './ShapeViewer';
import './App.css';

function App() {
  const [shapeConfig, setShapeConfig] = useState(null);

  return (
    <div className="App">
      <h1>Figuras 3D</h1>
      <ShapeForm onConfigChange={setShapeConfig} />
      <div className="canvas-container">
        <ShapeViewer shapeConfig={shapeConfig} />
      </div>
    </div>
  );
}

export default App;
