import { useState } from 'react';

const ShapeForm = ({ onConfigChange }) => {
  const [shape, setShape] = useState('sphere');
  const [params, setParams] = useState({});

  const handleShapeChange = (e) => {
    setShape(e.target.value);
    setParams({});
  };

  const handleParamChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleDrawClick = () => {
    onConfigChange({ shape, params });
  };

  return (
    <form className="shape-form">
      <label htmlFor="shape">Elige una forma:</label>
      <select id="shape" value={shape} onChange={handleShapeChange}>
        <option value="sphere">Esfera</option>
        <option value="cube">Cubo</option>
        <option value="torus">Toroide</option>
        <option value="plane">Plano</option>
      </select>

      {shape === 'sphere' && (
        <div>
          <label htmlFor="radius">Radio</label>
          <input type="number" id="radius" name="radius" onChange={handleParamChange} />
        </div>
      )}

      {shape === 'cube' && (
        <div>
          <label htmlFor="width">Lado</label>
          <input type="number" id="width" name="width" onChange={handleParamChange} />
          {/* <label htmlFor="height">Alto</label> */}
          {/* <input type="number" id="height" name="height" onChange={handleParamChange} />
          <label htmlFor="depth">Profundo</label> */}
          {/* <input type="number" id="depth" name="depth" onChange={handleParamChange} /> */}
        </div>
      )}

      {shape === 'torus' && (
        <div>
          <label htmlFor="radius">Radio</label>
          <input type="number" id="radius" name="radius" onChange={handleParamChange} />
          <label htmlFor="tube">Tubo</label>
          <input type="number" id="tube" name="tube" onChange={handleParamChange} />
        </div>
      )}

      {shape === 'plane' && (
        <div>
          <label htmlFor="width">Ancho</label>
          <input type="number" id="width" name="width" onChange={handleParamChange} />
          <label htmlFor="height">Alto</label>
          <input type="number" id="height" name="height" onChange={handleParamChange} />
        </div>
      )}

      <button type="button" onClick={handleDrawClick}>Dibujar</button>
    </form>
  );
};

export default ShapeForm;
