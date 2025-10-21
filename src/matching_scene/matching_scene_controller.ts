import Konva from "konva";
import { MatchView } from "./matching_scene_view";
import { App } from "../main";

export class MatchController {
    private view: MatchView;
    private stage: Konva.Stage;
    private screenSwitcher: App;
    constructor(screenSwitcher: App, stage: Konva.Stage){
        this.stage = stage;
        this.screenSwitcher = screenSwitcher;
        this.view = new MatchView(this.stage, this.arrowAnimation, this.switchToScreen.bind(this));
    }

    switchToScreen(s:String): void {
        this.screenSwitcher.switchScreen(s);
    }

    getView(): MatchView {
        return this.view;
    }

    arrowAnimation(stage: Konva.Stage, q: Konva.Circle, a_1: Konva.Circle, a_2: Konva.Circle, a_3: Konva.Circle): void {
        const mousePos = stage.getPointerPosition();
        const layer = stage.getLayers()[0];
        let arrow: Konva.Arrow | null = null; // allow type to be Konva.Arrow/null
        arrow = new Konva.Arrow({
            points: [
                q.x(), // Tail at center of q
                q.y(),
                0, // Head at cursor
                0,
            ],
            pointerLength: 10,
            pointerWidth: 10,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 4,
        });
        if (mousePos){
            arrow.points([q.x(), q.y(), mousePos.x, mousePos.y]);
            layer.add(arrow);
            layer.batchDraw();
        }        

        // Handle dragmove on stage to update arrow head
        stage.on('mousemove touchmove', () => {
        if (arrow) {
            const mousePos = stage.getPointerPosition();
            if (mousePos) {
                // Update arrow head to cursor position, keep tail at q center
                arrow.points([q.x(), q.y(), mousePos.x, mousePos.y]);
                layer.batchDraw();
            }
        }
        });

        // Handle dragend on stage to finalize or remove arrow
        stage.on('mouseup touchend', () => {
        if (arrow) {
            const endPoint = { x: arrow.points()[2], y: arrow.points()[3] };
            const a_1_Pos = a_1.position();
            const a_2_Pos = a_2.position();
            const a_3_Pos = a_3.position();
            const distance_1 = Math.sqrt(
                Math.pow(endPoint.x - a_1_Pos.x, 2) + Math.pow(endPoint.y - a_1_Pos.y, 2)
            );
            const distance_2 = Math.sqrt(
                Math.pow(endPoint.x - a_2_Pos.x, 2) + Math.pow(endPoint.y - a_2_Pos.y, 2)
            );
            const distance_3 = Math.sqrt(
                Math.pow(endPoint.x - a_3_Pos.x, 2) + Math.pow(endPoint.y - a_3_Pos.y, 2)
            );

            // Check if the arrow's head is within a_1 (radius + tolerance)
            const isOnA1 = distance_1 <= a_1.radius() + 10; // 10px tolerance
            const isOnA2 = distance_2 <= a_2.radius() + 10;
            const isOnA3 = distance_3 <= a_3.radius() + 10;

            if (isOnA1) {
                // Finalize arrow: Snap head to center of a
                arrow.points([q.x(), q.y(), a_1_Pos.x, a_1_Pos.y]);
                arrow.fill("green");
                arrow.stroke("green");  
            } 
            else if (isOnA2){
                arrow.points([q.x(), q.y(), a_2_Pos.x, a_2_Pos.y]);
                arrow.fill("blue");
                arrow.stroke("blue");  
            }
            else if (isOnA3){
                arrow.points([q.x(), q.y(), a_3_Pos.x, a_3_Pos.y]);
                arrow.fill("purple");
                arrow.stroke("purple");  
            }
            else {
                // Remove arrow
                arrow.destroy();
            }
            q.moveToTop();
            layer.batchDraw();
            arrow = null; // Reset arrow
        }
        });
    }
}