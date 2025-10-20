import Konva from 'konva';

// Initialize Konva stage
const stage = new Konva.Stage({
  container: 'container',
  width: 800,
  height: 800,
});

// Create a layer
const layer = new Konva.Layer();

// Create a background rectangle
const background = new Konva.Rect({
  x: 0,
  y: 0,
  width: stage.width(),
  height: stage.height(),
  fill: '#7c7c80ff', // Dark gray color
});

// Create a circle shape
const q_1 = new Konva.Circle({
  x: stage.width() / 5,
  y: stage.height() / 2,
  radius: 70,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4,
});

// Create a circle shape
const a_1= new Konva.Circle({
  x: stage.width() / 5 * 4,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
});

// Add background to the layer
layer.add(background);
layer.add(q_1);
layer.add(a_1);


// Add layer to the stage
stage.add(layer);

// Export stage and layer for use in other files
export { stage, layer, q_1, a_1 };