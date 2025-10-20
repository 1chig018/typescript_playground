import Konva from "konva";

export function arrowControl(
  stage: Konva.Stage,
  layer: Konva.Layer,
  q_1: Konva.Circle,
  a_1: Konva.Circle
) {
  let arrow: Konva.Arrow | null = null;

  // Handle dragstart on q_1 to create a temporary arrow
  q_1.on('mousedown touchstart', (e) => {
    // Prevent default drag behavior
    e.cancelBubble = true;

    // Create a new arrow
    const mousePos = stage.getPointerPosition();
    if (mousePos) {
      arrow = new Konva.Arrow({
        points: [
          q_1.x(), // Tail at center of q_1
          q_1.y(),
          mousePos.x, // Head at cursor
          mousePos.y,
        ],
        pointerLength: 10,
        pointerWidth: 10,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4,
      });
      layer.add(arrow);
      layer.batchDraw();
    }
  });

  // Handle dragmove on stage to update arrow head
  stage.on('mousemove touchmove', () => {
    if (arrow) {
      const mousePos = stage.getPointerPosition();
      if (mousePos) {
        // Update arrow head to cursor position, keep tail at q_1 center
        arrow.points([q_1.x(), q_1.y(), mousePos.x, mousePos.y]);
        layer.batchDraw();
      }
    }
  });

  // Handle dragend on stage to finalize or remove arrow
  stage.on('mouseup touchend', () => {
    if (arrow) {
      const endPoint = { x: arrow.points()[2], y: arrow.points()[3] };
      const a_1Pos = a_1.position();
      const distance = Math.sqrt(
        Math.pow(endPoint.x - a_1Pos.x, 2) + Math.pow(endPoint.y - a_1Pos.y, 2)
      );

      // Check if the arrow's head is within a_1 (radius + tolerance)
      const isOnA1 = distance <= a_1.radius() + 10; // 10px tolerance

      if (isOnA1) {
        // Finalize arrow: Snap head to center of a_1
        arrow.points([q_1.x(), q_1.y(), a_1Pos.x, a_1Pos.y]);
        arrow.fill("green");
        arrow.stroke("green");
      } else {
        // Remove arrow
        arrow.destroy();
      }
      layer.batchDraw();
      arrow = null; // Reset arrow
    }
  });
}