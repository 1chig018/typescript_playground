// import { MatchView } from "./matching_scene/matching_scene_view";
import Konva from "konva";
import { MatchController } from "./matching_scene/matching_scene_controller";

class App {
    private matchingController: MatchController;
    private stage: Konva.Stage;
    private layer: Konva.Layer;
    constructor(){
        this.stage = new Konva.Stage({
			container: "container",
			width: 800,
			height: 800,
		});

        this.matchingController = new MatchController(this.stage);

        this.layer = new Konva.Layer();
		this.stage.add(this.layer);
        this.layer.add(this.matchingController.getView().getGroup());
        this.layer.draw();
        
    }

    switchScreen(s:string): void {
        if (s == "matching") {
            console.log("here")
            this.matchingController.getView().show();
        }
    }
}

console.log("start")
const app = new App();
app.switchScreen("matching");
console.log("end")